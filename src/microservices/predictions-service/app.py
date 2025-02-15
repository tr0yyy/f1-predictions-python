from flask import Flask
import asyncio
from hypercorn.asyncio import serve
from hypercorn.config import Config
from flask_cors import CORS

from modules.configLoader.ConfigLoader import config
from modules.router.Router import router
from modules.router.Health import health
from modules.configLoader.ConfigLoader import config

app = Flask(__name__)
app.register_blueprint(router)
app.register_blueprint(health)
app.config["secret_key"] = config().secret_key
CORS(app)


async def run_flask():
    configFlask = Config()
    configFlask.bind = [f"0.0.0.0:{config().port}"]
    await serve(app, configFlask)


async def main():
    await asyncio.gather(run_flask())


if __name__ == '__main__':
    asyncio.run(main())
