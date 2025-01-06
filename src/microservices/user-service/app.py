from flask import Flask
import asyncio
from threading import Thread
from hypercorn.asyncio import serve
from hypercorn.config import Config
from flask_cors import CORS

from modules.configLoader.ConfigLoader import config
from modules.router.Router import router

app = Flask(__name__)
app.register_blueprint(router)
CORS(app)
app.config["secret_key"] = config().secret_key

async def run_flask():
    config = Config()
    config.bind = ["0.0.0.0:8001"]
    await serve(app, config)


async def main():
    await asyncio.gather(run_flask())


if __name__ == '__main__':
    asyncio.run(main())
