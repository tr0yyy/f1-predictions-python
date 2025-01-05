from datetime import timedelta, datetime
from flask import Blueprint, request
from modules.dataProvider.model.Task import Task, TaskStatus
from modules.dataProvider.model.User import User
from modules.dataProvider.repository.UserRepository import UserRepository
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
        return response_error("Username and password are required"), 400

    user_repo = UserRepository()
    existing_user = user_repo.get_by_username(username)

    if existing_user:
        return response_error("Username already exists"), 400

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    user = User(id=None, username=username, password=hashed_password, role=role)
    user_repo.insert_one(user.__dict__)

    return response_ok("Registered successfully, welcome to the F1 world!! :D"), 200

@router.route("/login", methods=["POST"])
async def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return response_error("Username and password are required"), 400

    user_repo = UserRepository()
    user = user_repo.get_by_username(username)

    if not user:
        return response_error("Invalid username or password"), 401

    user = user[0]

    if not bcrypt.checkpw(password.encode(), user['password'].encode()):
        return response_error("Invalid username or password"), 401

    token = Utils.encode_jwt(user_id=str(user['_id']), username=user['username'], role=user['role'])

    return response_ok({"message": "Login successful", "token": token}), 200

def normalize_args(args):
    for key in args:
        try:
            args[key] = int(args[key])
        except ValueError:
            pass
    return args
