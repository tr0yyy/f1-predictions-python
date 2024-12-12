from pymongo import MongoClient

from modules.configLoader.ConfigLoader import config
from modules.utils.Singleton import Singleton


class Mongo(metaclass=Singleton):
    def __init__(self):
        self.mongo_url = config().mongo_url
        self.client = None

    def connect(self) -> MongoClient:
        if not self.mongo_url:
            raise ValueError("Mongo URL is not set")
        if not self.client:
            self.client = MongoClient(self.mongo_url)
        return self.client

    def get_db(self):
        client = self.connect()
        return client.get_database('f1datafetcher')

    def close(self):
        if self.client:
            self.client.close()

