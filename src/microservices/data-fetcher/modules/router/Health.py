from flask import Blueprint

health = Blueprint("health", __name__, url_prefix="/health")


@health.route("/", methods=["GET"])
def get_health():
    return "UP", 200
