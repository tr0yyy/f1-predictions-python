from datetime import timedelta, datetime

from flask import Blueprint, request
from modules.dataProvider.model.Task import Task, TaskStatus
from modules.dataProvider.repository.DriverRepository import DriverRepository
from modules.dataProvider.repository.MeetingRepository import MeetingRepository
from modules.dataProvider.repository.PositionRepository import PositionRepository
from modules.dataProvider.repository.SessionRepository import SessionRepository
from modules.dataProvider.repository.TaskRepository import TaskRepository
from modules.processor import MqProcessor
from modules.router.Message import response_ok, response_error

router = Blueprint("router", __name__, url_prefix="/api")


@router.route("/drivers", methods=["GET"])
async def get_drivers():
    args = request.args.to_dict()
    return await process_request("Driver", args, DriverRepository())


@router.route("/meetings", methods=["GET"])
async def get_meetings():
    args = request.args.to_dict()
    return await process_request("Meeting", args, MeetingRepository())


@router.route("/positions", methods=["GET"])
async def get_positions():
    args = request.args.to_dict()
    return await process_request("Position", args, PositionRepository())


@router.route("/sessions", methods=["GET"])
async def get_sessions():
    args = request.args.to_dict()
    return await process_request("Session", args, SessionRepository())


def check_resync(args):
    force_resync = args.get("force_resync", False)
    args = {k: v for k, v in args.items() if k != "force_resync"}
    return args, force_resync


async def process_request(model, args, repository):
    args = normalize_args(args)
    if not should_process_task(model, args):
        return response_error("Data is being fetched. Please try again later.")
    args, force_resync = check_resync(args)
    cached_data = repository.get(query=args)
    if not cached_data or force_resync:
        save_task(model, args)
        await MqProcessor.publish_task(Task(model=model, params=args))
        return response_error("Data is being fetched. Please try again later.")
    return response_ok(cached_data)


def normalize_args(args):
    # Convert values to numbers if possible
    for key in args:
        try:
            args[key] = int(args[key])
        except ValueError:
            pass
    return args


def should_process_task(model, args):
    task_repository = TaskRepository()
    existing_tasks = task_repository.get(query={"model": model, "params": args})
    existing_task = existing_tasks[0] if existing_tasks else None
    if (
        existing_task
        and existing_task['task_status'] == TaskStatus.IN_PROGRESS.value
        and datetime.now() - existing_task['date_started'] < timedelta(minutes=1)
    ):
        return False
    return True


def save_task(model, args):
    task_repository = TaskRepository()
    task_repository.update_one(query={"model": model, "params": args}, update=Task(model=model, params=args),
                               upsert=True)
