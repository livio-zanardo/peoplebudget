import json


def get_config(path_to_config: str = "config.json") -> dict:
    """
    Reads configuration json file for initial data pre-processing pipeline
    :param path_to_config: Path string
    :return: Configuration dictionary
    """
    with open(path_to_config) as f:
        config_data = json.load(f)
    return config_data
