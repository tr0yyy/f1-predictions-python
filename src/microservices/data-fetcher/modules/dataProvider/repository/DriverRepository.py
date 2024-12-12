from pymongo.database import Database

from modules.dataProvider.model.Driver import Driver
from modules.dataProvider.repository.BaseRepository import BaseRepository


class DriverRepository(BaseRepository):
    def __init__(self):
        super().__init__('drivers')

    def update_one(self, update: Driver, query=None, upsert=True):
        return super().update_one(
            query={
                'name_acronym': update.name_acronym,
                'session_key': update.session_key
            }, update={
                '$set': update.__dict__
            }, upsert=True
        )
