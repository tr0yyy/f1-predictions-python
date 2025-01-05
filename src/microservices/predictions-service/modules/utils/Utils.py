import jwt
from datetime import datetime, timedelta

from flask import current_app


class Utils:

    @staticmethod
    def decode_jwt(token: str):
        try:
            payload = jwt.decode(token, current_app.config["secret_key"], algorithms=["HS256"])
            print("Decoded JWT Payload:", payload)
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None