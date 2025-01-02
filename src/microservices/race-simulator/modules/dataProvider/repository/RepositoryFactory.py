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
            case 'Session':
                return SessionRepository()
            case _:
                return None
