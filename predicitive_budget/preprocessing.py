import pandas as pd
from predicitive_budget.helpers import get_config


def melt_table(df: pd.DataFrame, id_vars: list, value_vars: list, months_mapping: dict) -> pd.DataFrame:
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


def generate_date_column(df: pd.DataFrame) -> pd.DataFrame:
    """
    Generates date column in melted data table and deletes unnecessary columns
    :param df: melted data table DtataFrame
    :return: Data table with date column
    """
    df["date"] = df["fy"].astype(str) + "-" + df["month"].astype(str) + "-1"
    df.drop(columns=["fy", "month"], axis=1, inplace=True)
    return df


if __name__ == "__main__":
    config = get_config()
    op_budget_data_path = config["OPERATING-BUDGET-DATA-PATH"]
    raw_data = pd.read_csv(op_budget_data_path)
    month_columns = config["MONTH-COLUMNS"]
    fy_column = config["FISCAL-YEAR-COLUMN"]
    non_moths_cols = list(set(raw_data.columns).difference(set(config["MONTH-COLUMNS"])))
    months_mapping = config["MONTHS-MAPPING"]
    df = melt_table(raw_data, id_vars=non_moths_cols, value_vars=month_columns, months_mapping=months_mapping)
    df = generate_date_column(df)
    df.to_csv(config["OPERATING-BUDGET_PROCESSED-DATA-PATH"], index=False, header=True)