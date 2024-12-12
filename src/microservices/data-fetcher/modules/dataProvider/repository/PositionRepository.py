from pymongo.database import Database

from modules.dataProvider.model.Position import Position
from modules.dataProvider.repository.BaseRepository import BaseRepository


class PositionRepository(BaseRepository):
    def __init__(self):
        super().__init__('positions')

    def update_one(self, update: Position, query=None, upsert=True):
        return super().update_one(
            query={
                'meeting_key': update.meeting_key,
                'session_key': update.session_key,
                'driver_number': update.driver_number
            }, update={
                update
            }, upsert=True
        )

