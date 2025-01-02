from modules.dataProvider.model.Task import Task
from modules.dataProvider.repository.BaseRepository import BaseRepository


class TaskRepository(BaseRepository):
    def __init__(self):
        super().__init__('tasks')

    def update_one(self, update: Task, query=None, upsert=True):
        return super().update_one(
            query={
                'model': update.model,
                'params': update.params
            }, update={
                '$set': update.__dict__
            }, upsert=True
        )
