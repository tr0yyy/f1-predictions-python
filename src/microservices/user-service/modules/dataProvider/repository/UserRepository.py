from modules.dataProvider.repository.BaseRepository import BaseRepository
from modules.dataProvider.model.User import User


class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__('users')

    def create_user(self, user: User):
        return self.insert_one(user.__dict__)

    def update_user(self, user: User):
        return self.update_one(
            query={"username": user.username},
            update={"$set": user.__dict__}
        )

    def get_by_username(self, username):
        return self.get({'username': username})