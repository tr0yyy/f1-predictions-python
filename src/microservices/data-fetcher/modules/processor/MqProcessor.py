import json
import importlib
import aio_pika

from modules.dataProvider.model.Task import Task
from modules.dataProvider.openF1Client.OpenF1Client import OpenF1Client
from modules.configLoader.ConfigLoader import config
from modules.dataProvider.repository.RepositoryFactory import RepositoryFactory
from modules.mongoClient.Mongo import Mongo
from modules.rabbitMqClient.RabbitMqClient import RabbitMqClient


async def mq_processor_callback(message: aio_pika.IncomingMessage):
    """
    Process the incoming message
    """
    async with message.process():
        decoded_message = message.body.decode()
        print(f"Received message: {decoded_message}")
        try:
            data = json.loads(decoded_message)
            task = Task(
                model=data.get("model"),
                params=data.get("params")
            )
            moduleModel = importlib.import_module('modules.dataProvider.model.' + task.model)
            cls = getattr(moduleModel, task.model)
            model_task = OpenF1Client.get_client(task.model)
            output = await model_task.get(task.params)
            repository = RepositoryFactory.create_repository(task.model)
            for element in output:
                instance = cls(**element)
                repository.update_one(instance)
        except Exception as e:
            print(f"Error processing message: {e}")
            pass
        finally:
            print(f"Message {decoded_message} ACK")


async def start_mq_processor():
    """
    Start the RabbitMQ processor
    """
    client = RabbitMqClient()
    connection = await client.connect()
    channel = await connection.channel()
    await channel.declare_queue(config().rabbitmq_queue, durable=True)
    await client.consume_messages(config().rabbitmq_queue, mq_processor_callback)



async def publish_task(task: Task):
    """
    Publish a task to the RabbitMQ queue
    """
    client = RabbitMqClient()
    await client.publish_message(config().rabbitmq_queue, json.dumps(task, default=lambda k: k.__dict__))
