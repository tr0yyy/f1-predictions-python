from modules.dataProvider.model import Prediction
from modules.dataProvider.repository.BaseRepository import BaseRepository


class PredictionRepository(BaseRepository):
    def __init__(self):
        super().__init__('predictions')

    def get_by_session_key(self, session_key: int):
        return self.get(query={'session_key': session_key})

    def insert_prediction(self, prediction: Prediction):
        return self.insert_one(prediction.to_dict())