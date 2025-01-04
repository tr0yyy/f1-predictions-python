import jwt
from datetime import datetime, timedelta

from flask import current_app


class Utils:

    @staticmethod
    def encode_jwt(user_id: str, username: str, role: str):
        expiration = datetime.utcnow() + timedelta(hours=1)
        payload = {
            "sub": user_id,
            "username": username,
            "role": role,
            "exp": expiration
        }
        return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")

    @staticmethod
    def decode_jwt(token: str):
        try:
            payload = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None