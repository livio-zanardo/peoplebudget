from pandas import DataFrame

from helpers import get_config
import pandas as pd


def melt_table(df: DataFrame, id_vars: list, value_vars: list, months_mapping: dict) -> DataFrame:
    """
    :param df: data table DataFrame
    :param id_vars: list of columns to keep in the table
    :param value_vars:list of columns to unpivot upon
    :param months_mapping: map of months and their calendar numbers
    :return: unpivoted data table DataFrame
    """
    df = pd.melt(df, id_vars=id_vars, value_vars=value_vars)
    df.rename(columns={"variable": "month", "value": "amount"}, inplace=True)
    df["month"] = df["month"].apply(lambda x: months_mapping[x])
    return df


def generate_date_column(df: DataFrame) -> DataFrame:
    """
    Generates date column in melted data table and deletes unnecessary columns
    :param df: melted data table DtataFrame
    :return: Data table with date column
    """
    df["date"] = df["fy"].astype(str) + "-" + df["month"].astype(str) + "-1"
    df.drop(columns=["fy", "month"], axis=1, inplace=True)
    return df


def generate_dataset(path):
    raw_data = pd.read_csv(op_budget_data_path)
    month_columns = config["MONTH-COLUMNS"]
    fy_column = config["FISCAL-YEAR-COLUMN"]
    non_moths_cols = list(set(raw_data.columns).difference(set(config["MONTH-COLUMNS"])))
    months_mapping = config["MONTHS-MAPPING"]
    df = melt_table(raw_data, id_vars=non_moths_cols, value_vars=month_columns, months_mapping=months_mapping)
    df = generate_date_column(df)
    return df


if __name__ == "__main__":
    config = get_config()
    op_budget_data_path = config["OPERATING-BUDGET-DATA-PATH"]
    re_budget_data_path = config["REVENUE-BUDGET-DATA-PATH"]
    df_op = generate_dataset(op_budget_data_path)
    df_re = generate_dataset(re_budget_data_path)
    df_re.to_csv(config["REVENUE-BUDGET-DATASET"])
    df_op.to_csv(config["OPERATING-BUDGET-DATASET"], index=False, header=True)