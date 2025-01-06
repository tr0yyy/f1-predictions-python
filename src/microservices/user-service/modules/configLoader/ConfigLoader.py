import json
import os

CONFIG = None


# for type hints
class Config:
    def __init__(self, mongo_url=None, secret_key=None):
        self.secret_key = secret_key
        self.mongo_url = mongo_url


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
        secret_key=CONFIG['secret_key']
    )


