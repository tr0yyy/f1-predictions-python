from datetime import datetime
from enum import Enum


class Task:
    def __init__(self, model, params, task_status=0):
        self.model = model
        self.params = params
        self.task_status = task_status
        self.date_started = datetime.now()


class TaskStatus(Enum):
    IN_PROGRESS = 1
    FAILED = 2
    COMPLETED = 3
