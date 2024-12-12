from modules.dataProvider.repository.DriverRepository import DriverRepository
from modules.dataProvider.repository.MeetingRepository import MeetingRepository
from modules.dataProvider.repository.PositionRepository import PositionRepository
from modules.dataProvider.repository.SessionRepository import SessionRepository


class RepositoryFactory:
    @staticmethod
    def create_repository(repository_name: str):
        """
        Create a repository class for the given repository name

        :param repository_name: Name of the repository
        :return: A repository instance for the given repository name
        """
        match repository_name:
            case 'Driver':
                return DriverRepository()
            case 'Meeting':
                return MeetingRepository()
            case 'Position':
                return PositionRepository()
            case 'Session':
                return SessionRepository()
            case _:
                return None
