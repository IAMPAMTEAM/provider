export const defaultApiLogColumns = [
  { field: 'Request Timestamp', children: [{ field: 'timeStamp', width: 200 }] },
  { field: 'Request IP', children: [{ field: 'sourceIp', width: 200 }] },
  { field: 'Request API Type', children: [{ field: 'apiType', width: 200 }] },
  {
    field: 'Request API Content',
    children: [
      { field: 'method', width: 200 },
      { field: 'query', width: 200 },
      {
        field: 'request',
        width: 200,
      },
    ],
  },
  {
    field: 'Response',
    children: [
      {
        field: 'response',
        width: 200,
        cellStyle: { 'white-space': 'normal' },
      },
    ],
  },
];

export const parseDebugItem = (item: any) => {
  return {
    timeStamp: item?.timeStamp,
    sourceIp: item?.sourceIp,
    apiType: item?.apiType,
    method: item?.method,
    query: Object.entries(item?.query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&'),
    request: item?.request,
    response: item?.response,
  };
};
