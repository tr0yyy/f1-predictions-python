from datetime import timedelta, datetime

from flask import Blueprint, request, jsonify

from modules.dataProvider.model.Task import Task, TaskStatus
from modules.dataProvider.model.User import User
from modules.dataProvider.repository.DriverRepository import DriverRepository
from modules.dataProvider.repository.MeetingRepository import MeetingRepository
from modules.dataProvider.repository.PositionRepository import PositionRepository
from modules.dataProvider.repository.SessionRepository import SessionRepository
from modules.dataProvider.repository.TaskRepository import TaskRepository
from modules.dataProvider.repository.UserRepository import UserRepository
from modules.processor import MqProcessor
from modules.router.Message import response_ok, response_error
import bcrypt
from modules.utils.Utils import Utils
router = Blueprint("router", __name__, url_prefix="/api")

@router.route("/register", methods=["POST"])
async def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "user")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user_repo = UserRepository()
    existing_user = user_repo.get_by_username(username)

    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    user = User(id=None, username=username, password=hashed_password, role=role)

    user_repo.insert_one(user.__dict__)

    return jsonify({"message": "Registered successfully, welcome to the F1 world!! :D"}), 200


@router.route("/login", methods=["POST"])
async def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user_repo = UserRepository()
    user = user_repo.get_by_username(username)

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    user = user[0]

    if not bcrypt.checkpw(password.encode(), user['password'].encode()):
        return jsonify({"error": "Invalid username or password"}), 401

    token = Utils.encode_jwt(user_id=str(user['_id']), username=user['username'], role=user['role'])

    return jsonify({"message": "Login successful", "token": token}), 200

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
