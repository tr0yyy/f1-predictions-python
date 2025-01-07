import json
import os

CONFIG = None


# for type hints
class Config:
    """
    Config class for the application
    mongo_url: str - the url for the mongo database
    data_fetcher_url: str - the url for the data fetcher service
    secret_key: str - the secret key for the application
    port: int - the port on which the application will run
    """
    def __init__(self, mongo_url=None, data_fetcher_url=None, secret_key=None, port=None):
        self.mongo_url = mongo_url
        self.data_fetcher_url = data_fetcher_url
        self.secret_key = secret_key
        self.port = port


def config() -> Config:
    global CONFIG
    if CONFIG is None:
        config_path = os.path.join(os.path.dirname(__file__), '..', '..', 'config.json')
        with open(config_path, 'r') as file:
            CONFIG = json.load(file)
        for key in CONFIG:
            env_value = os.getenv(key.upper())
            if env_value:
                CONFIG[key] = env_value
    return Config(
        mongo_url=CONFIG['mongo_url'],
        data_fetcher_url=CONFIG['data_fetcher_url'],
        secret_key=CONFIG['secret_key'],
        port=CONFIG['port']
    )


