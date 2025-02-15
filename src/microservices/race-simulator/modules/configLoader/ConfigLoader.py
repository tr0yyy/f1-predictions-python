import json
import os

CONFIG = None


class Config:
    def __init__(self, rabbitmq_url=None, rabbitmq_queue=None, mongo_url=None, predictions_url=None, data_fetcher_url=None, port=None):
        """
        Config class for the application
        rabbitmq_url: str - the url for the rabbitmq
        rabbitmq_queue: str - the queue name for the rabbitmq
        mongo_url: str - the url for the mongo database
        predictions_url: str - the url for the predictions service
        data_fetcher_url: str - the url for the data fetcher service
        port: int - the port on which the application will run
        """
        self.rabbitmq_url = rabbitmq_url
        self.rabbitmq_queue = rabbitmq_queue
        self.mongo_url = mongo_url
        self.predictions_url = predictions_url
        self.data_fetcher_url = data_fetcher_url
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
        rabbitmq_url=CONFIG['rabbitmq_url'],
        rabbitmq_queue=CONFIG['rabbitmq_queue'],
        mongo_url=CONFIG['mongo_url'],
        predictions_url=CONFIG['predictions_url'],
        data_fetcher_url=CONFIG['data_fetcher_url'],
        port=CONFIG['port']
    )


