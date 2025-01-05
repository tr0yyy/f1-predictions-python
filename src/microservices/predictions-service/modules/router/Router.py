from flask import Blueprint, request, jsonify

from modules.dataProvider.model.Prediction import Prediction
from modules.dataProvider.repository.PredictionRepository import PredictionRepository

router = Blueprint("router", __name__, url_prefix="/api")

repository = PredictionRepository()


@router.route('/predictions', methods=['POST'])
def create_prediction():
    data = request.get_json()
    prediction = Prediction.from_dict(data)
    repository.insert_prediction(prediction)
    return jsonify({"message": "Prediction added successfully"}), 201

@router.route('/predictions', methods=['GET'])
def get_predictions():
    session_key = request.args.get('session_key')
    if not session_key:
        return jsonify({"error": "Session key is required"}), 400
    predictions = repository.get_predictions(session_key)
    return jsonify(predictions), 200

@router.route('/predictions', methods=['PUT'])
def update_prediction():
    data = request.get_json()
    prediction = Prediction.from_dict(data)
    repository.update_prediction(prediction)
    return jsonify({"message": "Prediction updated successfully"}), 200

@router.route('/predictions', methods=['DELETE'])
def delete_predictions():
    session_key = request.args.get('session_key')
    if not session_key:
        return jsonify({"error": "Session key is required"}), 400
    repository.delete_predictions(session_key)
    return jsonify({"message": "Predictions deleted successfully"}), 200