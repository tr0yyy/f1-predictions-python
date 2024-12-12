from flask import Flask
import asyncio
from threading import Thread
from hypercorn.asyncio import serve
from hypercorn.config import Config

from modules.processor.MqProcessor import start_mq_processor
from modules.router.Router import router

app = Flask(__name__)
app.register_blueprint(router)


async def run_flask():
    config = Config()
    config.bind = ["0.0.0.0:8000"]
    await serve(app, config)


async def main():
    await asyncio.gather(run_flask(), start_mq_processor())


if __name__ == '__main__':
    asyncio.run(main())
