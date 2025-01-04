from modules.mongoClient.Mongo import Mongo


class BaseRepository:
    def __init__(self, collection_name: str):
        self.db = Mongo().get_db()
        self.collection = self.db.get_collection(collection_name)

    def get(self, query):
        return self.collection.find(query).to_list()

    def insert_one(self, value):
        return self.collection.insert_one(value)

    def insert(self, values):
        return self.collection.insert_many(values)

    def update_one(self, query, update, upsert=False):
        return self.collection.update_one(filter=query, update=update, upsert=upsert)

    def delete(self, query):
        return self.collection.delete_one(query)

    def delete_many(self, query):
        return self.collection.delete_many(query)
