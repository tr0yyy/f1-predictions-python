from modules.DataProvider.openF1Client.BaseClient import BaseClient
from modules.restClient.RestClient import RestClient


class ModelFactory:
    @staticmethod
    def create_model(model_name: str, client: RestClient):
        """
        Create a restclient class for the given model name

        :param model_name: Name of the model
        :param client:  An instance of RestClient
        :return: A restclient class for the given model name
        """
        class Model(BaseClient):
            def __init__(self):
                super().__init__(client, model_name)

        return Model
