import jwt
from datetime import datetime, timedelta

from flask import current_app

from modules.configLoader.ConfigLoader import config


class Utils:

    @staticmethod
    def encode_jwt(user_id: str, username: str, role: str):
        expiration = datetime.utcnow() + timedelta(hours=1)
        payload = {
            "user_id": str(user_id),
            "username": username,
            "role": role,
            "exp": expiration
        }
        return jwt.encode(payload, config().secret_key, algorithm="HS256")

    @staticmethod
    def decode_jwt(token: str):
        try:
            payload = jwt.decode(token, config["secret_key"], algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None