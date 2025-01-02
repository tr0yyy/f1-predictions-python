from modules.dataProvider.model.Session import Session
from modules.dataProvider.repository.BaseRepository import BaseRepository


class SessionRepository(BaseRepository):
    def __init__(self):
        super().__init__('sessions')

    def update_one(self, update: Session, query=None, upsert=True):
        return super().update_one(
            query={
                'session_key': update.session_key
            }, update={
                update
            }, upsert=True
        )