from dataclasses import dataclass


@dataclass
class Prediction:
    def __init__(self, session_key, first_place, second_place, third_place):
        self.session_key = session_key
        self.first_place = first_place
        self.second_place = second_place
        self.third_place = third_place