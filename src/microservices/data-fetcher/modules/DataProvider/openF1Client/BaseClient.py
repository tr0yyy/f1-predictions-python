from modules.restClient import RestClient


class BaseClient:
    def __init__(self, client: RestClient, model_name: str):
        self.client = client
        self.model_name = model_name

    async def get(self, params: dict = None):
        """
        Perform a GET request to the specified model using params

        :param params: The parameters to include in the request
        :return: The response from the server
        """
        endpoint = f"/{self.model_name}"
        return await self.client.get(endpoint, params=params)

    async def post(self, data: dict = None):
        """
        Perform a POST request to the specified model using data

        :param data: Data to be included in the request
        :return: The response from the server
        """
        endpoint = f"/{self.model_name}"
        return await self.client.post(endpoint, data=data)
