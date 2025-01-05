from modules.dataProvider.model import Prediction
from modules.dataProvider.repository.BaseRepository import BaseRepository


class PredictionRepository(BaseRepository):
    def __init__(self):
        super().__init__('predictions')

    def get_predictions_by_user_and_session(self, user_id, session_key):
        return self.get({"user_id": user_id, "session_key": session_key})

    def get_predictions_by_session(self, session_key):
        return self.get({"session_key": session_key})


    def insert_prediction(self, prediction: Prediction):
        return self.insert_one(prediction.__dict__)

    def get_user_predictions(self, user_id):
        return self.get({"user_id": user_id})