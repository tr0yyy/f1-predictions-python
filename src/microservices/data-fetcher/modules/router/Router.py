from flask import Blueprint, request

from modules.dataProvider.model.Task import Task
from modules.dataProvider.repository.DriverRepository import DriverRepository
from modules.dataProvider.repository.MeetingRepository import MeetingRepository
from modules.dataProvider.repository.PositionRepository import PositionRepository
from modules.dataProvider.repository.SessionRepository import SessionRepository
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
    args, force_resync = check_resync(args)
    cached_data = repository.get(query=args)
    if not cached_data or force_resync:
        await MqProcessor.publish_task(Task(model=model, params=args))
        return response_error("Data is being fetched. Please try again later.")
    return response_ok(cached_data)
