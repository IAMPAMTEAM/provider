// import { consoleLogInstance } from '@/api';
import { useAxios } from '@vueuse/integrations/useAxios';

enum Api {
  GET_ACCESS_LOG = '/access-log',
  POST_ACCESS_LOG = '/access-log',
}

export const createLog = (params: any) => {
  const url = Api.POST_ACCESS_LOG;
  return useAxios(
    url,
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    // consoleLogInstance
  );
};

export const getConsoleAccessLogs = (params: any) => {
  const url = Api.GET_ACCESS_LOG + '?query=' + params.query;
  return useAxios(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    // consoleLogInstance
  );
};
