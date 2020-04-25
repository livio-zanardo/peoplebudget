API Conventions
URL
HTTP://{URL}/API/{VERSION}/{CONTROLLER}/{FUNCTION}
ERROR
{error: "message", type: "type"}
RESPONSE
{response: {data} || [data]}
PAGINATED RESPONSE
{response: {count: int, rows: [data], pages: int}}