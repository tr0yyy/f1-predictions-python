import random

from flask import Blueprint, request

from modules.configLoader.ConfigLoader import config
from modules.dataProvider.repository.PredictionRepository import SessionRepository, PredictionRepository
from modules.restClient.RestClient import RestClient
from modules.router.Message import response_ok, response_error

router = Blueprint("router", __name__, url_prefix="/api")

