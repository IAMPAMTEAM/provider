import { useAxios } from '@vueuse/integrations/useAxios';
import { montiorInstance } from '@/api';

enum Api {
  LIST_APPS = '/apps',
  GET_LOGS = '/logs',
  GET_DATES = '/logDates',
  GET_CURRENT_LOGS = '/logs/current',
}

export const listApps = async () => {
  return useAxios(
    `${Api.LIST_APPS}`,
    {
      method: 'GET',
    },
    montiorInstance
  );
};

export const getLogs = async (appName: string, date: string, nextKey: string, type: string) => {
  return useAxios(
    `${Api.GET_LOGS}/${appName}?date=${date}&nextKey=${nextKey}&type=${type}`,
    {
      method: 'GET',
    },
    montiorInstance
  );
};

export const getCurrentLogs = async (
  appName: string,
  date: string,
  endKey: string,
  type: string
) => {
  return useAxios(
    `${Api.GET_CURRENT_LOGS}/${appName}?date=${date}&endKey=${endKey}&type=${type}`,
    {
      method: 'GET',
    },
    montiorInstance
  );
};

export const getDates = async (appName: string, type: string) => {
  return useAxios(
    `${Api.GET_DATES}/${appName}?type=${type}`,
    {
      method: 'GET',
    },
    montiorInstance
  );
};
