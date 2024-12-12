from pymongo.database import Database

from modules.dataProvider.model.Meeting import Meeting
from modules.dataProvider.repository.BaseRepository import BaseRepository


class MeetingRepository(BaseRepository):
    def __init__(self):
        super().__init__('meetings')

    def update_one(self, update: Meeting, query=None, upsert=True):
        return super().update_one(
            query={
                'meeting_key': update.meeting_key
            }, update={
                update
            }, upsert=True
        )
