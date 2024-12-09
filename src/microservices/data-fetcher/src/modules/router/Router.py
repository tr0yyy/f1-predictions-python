from flask import Blueprint, jsonify, request

from src.modules.DataProvider.openF1Client.OpenF1Client import OpenF1Client

router = Blueprint("router", __name__, url_prefix="/api")


@router.route("/drivers", methods=["GET"])
async def get_drivers():
    args = request.args.to_dict()
    driver = OpenF1Client.get_client("Driver")
    output = await driver.get(args)
    return jsonify(output)


@router.route("/meetings", methods=["GET"])
async def get_meetings():
    args = request.args.to_dict()
    meeting = OpenF1Client.get_client("Meeting")
    output = await meeting.get(args)
    return jsonify(output)


@router.route("/positions", methods=["GET"])
async def get_positions():
    args = request.args.to_dict()
    position = OpenF1Client.get_client("Position")
    output = await position.get(args)
    return jsonify(output)


@router.route("/sessions", methods=["GET"])
async def get_sessions():
    args = request.args.to_dict()
    session = OpenF1Client.get_client("Session")
    output = await session.get(args)
    return jsonify(output)