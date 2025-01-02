import json
from flask import jsonify, Response
from bson import json_util


def response_ok(data) -> Response:
    return jsonify({"success": True, "data": json.loads(json_util.dumps(data))})


def response_error(error: str) -> Response:
    return jsonify({"success": False, "error": error})
