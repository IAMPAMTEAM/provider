import { useAxios } from '@vueuse/integrations/useAxios';
import { homeLogInstance } from '@/api';
import type { FindInfoParams } from '@/api/types';

enum Api {
  GET_ACCESS_LOG = '/access-log',
  GET_COIN_EXCHANGE_LOG = '/coin-exchange-log',
  GET_API_LOG = '/api-log',
}

const getHomeAccessLog = (params: FindInfoParams) => {
  return useAxios(
    Api.GET_ACCESS_LOG + '?query=' + params.query,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeLogInstance
  );
};
const getCoinExchageLog = (params: FindInfoParams) => {
  return useAxios(
    Api.GET_COIN_EXCHANGE_LOG + '?query=' + params.query,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeLogInstance
  );
};

const getApiLog = (params: FindInfoParams) => {
  return useAxios(
    Api.GET_API_LOG + '?query=' + params.query,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeLogInstance
  );
};

export { getHomeAccessLog, getCoinExchageLog, getApiLog };
