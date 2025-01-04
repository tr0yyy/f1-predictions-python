from dataclasses import dataclass


@dataclass
class Prediction:
    def __init__(self, session_key: str, driver: str, odds: dict):
        self.session_key = session_key
        self.driver = driver
        self.odds = odds

    def to_dict(self):
        return {
            "session_key": self.session_key,
            "driver": self.driver,
            "odds": self.odds,
        }

    @staticmethod
    def from_dict(data: dict):
        return Prediction(
            session_key=data["session_key"],
            driver=data["driver"],
            odds=data["odds"]
        )
