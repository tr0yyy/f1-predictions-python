from src.modules.DataProvider.openF1Client.ModelFactory import ModelFactory
from src.modules.restClient.RestClient import RestClient


class OpenF1Client:
    _instance = None  # Singleton instance

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(OpenF1Client, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, "initialized"):
            self.base_url = 'https://api.openf1.org/v1'
            self.restClient = RestClient(self.base_url)
            self.initialized = True

    available_models = {
        'Driver': 'drivers',
        'Meeting': 'meetings',
        'Position': 'position',
        'Session': 'sessions'
    }

    @staticmethod
    def get_client(model: str):
        """
        Get a client for the specified model

        :param model: The model to get a client for
        :return: A client for the specified model
        """
        if model not in OpenF1Client.available_models:
            raise ValueError(f"Model {model} not found")

        instance = OpenF1Client()

        return ModelFactory.create_model(OpenF1Client.available_models.get(model), instance.restClient)()
