from modules.dataProvider.model import Prediction
from modules.dataProvider.repository.BaseRepository import BaseRepository


class PredictionRepository(BaseRepository):
    def __init__(self):
        super().__init__('predictions')

    def insert_prediction(self, prediction: Prediction):
        return self.insert_one(prediction.to_dict())

    def get_predictions(self, session_key: str):
        return self.get(query={'session_key': session_key})

    def update_prediction(self, prediction: Prediction, query=None, upsert=True):
        if query is None:
            query = {'session_key': prediction.session_key}
        return self.update_one(query=query, update={'$set': prediction.to_dict()}, upsert=upsert)

    def delete_predictions(self, session_key: str):
        return self.delete_many(query={'session_key': session_key})