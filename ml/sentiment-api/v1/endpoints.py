from flask import Flask, request, jsonify, make_response
from utils import get_sentiment
app = Flask(__name__)


@app.route('/v1/sentiment', methods=["POST"])
def sentiment():
    body = request.get_json()
    message = body["message"]
    try:
        sentiment_value, sentiment_confidence = get_sentiment(message)
        result = {
            'success': True,
            'value': sentiment_value,
            'confidence': float(sentiment_confidence)
        }
    except Exception as ex:
        result = {
            'success': False,
            'message': str(ex)
        }
    if result['success']:
        return make_response(jsonify(result), 200)
    else:
        return make_response(jsonify(result), 400)


if __name__ == '__main__':
    app.run(host='localhost', port=4000)
