import json
import os

CONFIG = None


class Config:
    """
    Config class for the application
    rabbitmq_url: str - the url for the rabbitmq
    rabbitmq_queue: str - the queue name for the rabbitmq
    mongo_url: str - the url for the mongo database
    port: int - the port on which the application will run
    """
    def __init__(self, rabbitmq_url=None, rabbitmq_queue=None, mongo_url=None, port=None):
        self.rabbitmq_url = rabbitmq_url
        self.rabbitmq_queue = rabbitmq_queue
        self.mongo_url = mongo_url
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
        port=CONFIG['port']
    )


