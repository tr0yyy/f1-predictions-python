import aiohttp


class RestClient:
    def __init__(self, host: str):
        """
        Initialize the RestClient with a specified host

        :param host: The base URL for the REST API
        """
        self._host = host

    @property
    def host(self) -> str:
        """
        Get the base URL for the REST API

        :return: The base URL for the REST API
        """
        return self._host

    @host.setter
    def host(self, host: str):
        """
        Set the base URL for the REST API

        :param host: The base URL for the REST API
        """
        self._host = host

    @host.getter
    def host(self) -> str:
        """
        Get the base URL for the REST API

        :return: The base URL for the REST API
        """
        return self._host

    async def get(self, endpoint: str, params: dict = None, headers: dict = None):
        """
        Perform a GET request to the specified endpoint

        :param endpoint: The endpoint to send the request to
        :param params: The parameters to include in the request
        :param headers: The headers to include in the request
        :return: The response from the server
        """
        url = self._host + endpoint
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, params=params, headers=headers) as response:
                    return await response.json()
        except aiohttp.ClientError as e:
            return {"error": str(e)}

    async def post(self, endpoint: str, data: dict = None, headers: dict = None):
        """
        Perform a POST request to the specified endpoint

        :param endpoint: The endpoint to send the request to
        :param data: The data to include in the request
        :param headers: The headers to include in the request
        :return: The response from the server
        """
        url = self._host + endpoint
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=data, headers=headers) as response:
                    return await response.json()
        except aiohttp.ClientError as e:
            return {"error": str(e)}