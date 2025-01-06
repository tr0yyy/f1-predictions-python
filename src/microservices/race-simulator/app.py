from flask import Flask
import asyncio
from hypercorn.asyncio import serve
from hypercorn.config import Config
from flask_cors import CORS

from modules.router.Router import router
from modules.router.Health import health

app = Flask(__name__)
app.register_blueprint(router)
app.register_blueprint(health)
CORS(app)


async def run_flask():
    config = Config()
    config.bind = ["0.0.0.0:8002"]
    await serve(app, config)


async def main():
    await asyncio.gather(run_flask())


if __name__ == '__main__':
    asyncio.run(main())
