import asyncio

import aio_pika

from modules.configLoader.ConfigLoader import config
from modules.utils.Singleton import Singleton


class RabbitMqClient(metaclass=Singleton):
    def __init__(self):
        self.connection = None
        self.rabbitmq_url = config().rabbitmq_url

    async def connect(self):
        if not self.rabbitmq_url:
            raise ValueError("RabbitMQ URL is not set")
        if not self.connection:
            self.connection = await aio_pika.connect_robust(self.rabbitmq_url)
        return self.connection

    async def close(self):
        if self.connection:
            await self.connection.close()

    async def consume_messages(self, queue_name: str, callback):
        connection = await aio_pika.connect_robust(self.rabbitmq_url, loop=asyncio.get_event_loop())
        channel = await connection.channel()
        await channel.set_qos(prefetch_count=1)
        queue = await channel.get_queue(queue_name)
        await queue.consume(callback)

    async def publish_message(self, queue_name: str, message: str):
        connection = await aio_pika.connect_robust(self.rabbitmq_url, loop=asyncio.get_event_loop())
        channel = await connection.channel()
        await channel.default_exchange.publish(
            aio_pika.Message(body=message.encode()),
            routing_key=queue_name
        )
        await connection.close()
