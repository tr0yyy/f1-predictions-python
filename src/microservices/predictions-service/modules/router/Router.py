from flask import Blueprint, request
from modules.dataProvider.model.Prediction import Prediction
from modules.dataProvider.repository.PredictionRepository import PredictionRepository
from modules.router.Message import response_ok, response_error

router = Blueprint("router", __name__, url_prefix="/api")

repo = PredictionRepository()


@router.route("/predictions", methods=["POST"])
def submit_prediction():
    data = request.json
    session_key = int(data.get('session_key'))
    first_place = data.get('first_place')
    second_place = data.get('second_place')
    third_place = data.get('third_place')

    existing_prediction = repo.get_predictions_by_session(session_key)

    if existing_prediction:
        return response_error(f"A prediction already exists for session {session_key}."), 400

    prediction = Prediction(session_key=session_key, first_place=first_place, second_place=second_place,
                            third_place=third_place)

    repo.insert_prediction(prediction)

    return response_ok(prediction.__dict__), 201


@router.route("/predictions/", methods=["GET"])
def get_predictions_by_session():
    session_key = request.args.get("session_key")

    if not session_key:
        return response_error("Session key is required."), 400

    try:
        session_key = int(session_key)
    except ValueError:
        return response_error("Invalid session key format."), 400

    prediction_repo = PredictionRepository()
    predictions = prediction_repo.get_predictions_by_session(session_key)

    if not predictions:
        return response_error("No predictions found for this session."), 404

    return response_ok(predictions)


def normalize_args(args):
    for key in args:
        try:
            args[key] = int(args[key])
        except ValueError:
            pass
    return args