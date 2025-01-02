from dataclasses import dataclass


@dataclass
class Session:
    def __init__(self, session_key, results):
        self.session_key = session_key
        self.results = results
