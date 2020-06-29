from typing import Tuple

import flair

# Loading a sentiment analysis pre trained model
sentiment_model = flair.models.TextClassifier.load('en-sentiment')


def get_sentiment(sentence: str) -> Tuple:
    """
    Generates emotional polar of the sentence positive/negative and gets the confidence score of that polarity 0-1
    :param sentence: str
    :return: sentiment_value: str (returns "POSITVE" or "NEGATIVE" strings)
             sentiment_confidence: float (returns confidence score between 0 and 1)
    """
    s = flair.data.Sentence(sentence)
    sentiment_model.predict(s)
    s = s.to_dict()
    sentiment_value = s['labels'][0]['value']
    sentiment_confidence = s['labels'][0]['confidence']
    return sentiment_value, sentiment_confidence
