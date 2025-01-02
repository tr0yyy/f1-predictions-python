import random

from flask import Blueprint, request

from modules.configLoader.ConfigLoader import config
from modules.dataProvider.repository.SessionRepository import SessionRepository
from modules.restClient.RestClient import RestClient
from modules.router.Message import response_ok, response_error

router = Blueprint("router", __name__, url_prefix="/api")


@router.route("/simulate", methods=["POST"])
async def get_drivers():
    from flask import current_app
    data = request.get_json(force=True)
    return await process_request(current_app, data, SessionRepository())


async def process_request(current_app, data, repository):
    cached_data = repository.get(query={'session_key': data['session_key']})
    if not cached_data:
        if config().predictions_url is '':
            current_app.logger.info(f'Will compute equal chances for session {data["session_key"]}')
            data_fetcher_client = RestClient(config().data_fetcher_url)
            drivers = (await data_fetcher_client.get('/api/drivers', {
                'session_key': data['session_key']
            }))
            if 'error' in drivers:
                return response_error(drivers['error'])
            drivers_odds = {
                driver['name_acronym']: {
                    '1stPlaceCount': 0,
                    '2ndPlaceCount': 0,
                    '3rdPlaceCount': 0
                } for driver in drivers['data']
            }
        else:
            current_app.logger.info(f'Will fetch predictions for session {data["session_key"]}')
            predictions_client = RestClient(config().predictions_url)
            predictions = await predictions_client.get('/predictions', {
                'session_key': data['session_key']
            })
            if 'error' in predictions:
                return response_error(predictions['error'])
            drivers_odds = {
                prediction['driver']: prediction['odds'] for prediction in predictions['data']
            }
        result = {
            'session_key': data['session_key'],
            'results': compute_race_result(drivers_odds)
        }
        repository.insert_one(result)
        return response_ok(result)
    return response_ok(cached_data)


def compute_race_result(votes):
    racers = list(votes.keys())

    base_weight = 1
    weights = {
        racer: base_weight +
               votes[racer].get("1stPlaceCount", 0) * 3 +
               votes[racer].get("2ndPlaceCount", 0) * 2 +
               votes[racer].get("3rdPlaceCount", 0)
        for racer in list(votes.keys())
    }
    race_result = []
    while racers:
        total_weight = sum(weights[racer] for racer in racers)
        probabilities = [weights[racer] / total_weight for racer in racers]
        selected_racer = random.choices(racers, weights=probabilities, k=1)[0]
        race_result.append(selected_racer)
        racers.remove(selected_racer)

    return race_result
