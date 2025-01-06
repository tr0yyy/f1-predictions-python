from dataclasses import dataclass


@dataclass
class User:
    def __init__(self, id: str, username: str, password: str, role: str):
        self.username = username
        self.password = password
        self.role = role
