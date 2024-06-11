import { useAxios } from '@vueuse/integrations/useAxios';
// import { baseApi } from '@/api';
// import { golddataInstance } from '@/api';

// const getOneGoldData = (payload: any) => {
//   payload.url = `/golddata/${payload.name}?urn=${payload.urn}${
//     payload.revision ? '&revision=' + payload.revision : ''
//   }`;
//   return baseApi(payload);
// };

// const updateOneGoldData = (payload: any) => {
//   payload.url = `/golddata/${payload.name}?id=${payload.id}`;
//   payload.method = 'PATCH';
//   return baseApi(payload);
// };

// const getManagements = (payload: any) => {
//   payload.url = `/managements?urn=urn:megazone:kr:megazone:golddata-ec2_keys:ge-20221228000001&stage=table`;
//   return baseApi(payload);
// };
// NEW
export type Resource = 'db' | 'ec2' | 'elb' | 'user';

interface GetDashboardDailyParams {
  resource: Resource;
  date: string;
}

interface GetDashboardWeeklyParams {
  resource: Resource;
  startDate: string;
}

export const getDashboardDaily = (params: GetDashboardDailyParams) => {
  return useAxios(
    `/dashboard/${params.resource}/daily`,
    {
      method: 'GET',
      params: {
        date: params.date,
      },
    }
    // golddataInstance
  );
};

export const getDashboardWeekly = (params: GetDashboardWeeklyParams) => {
  return useAxios(
    `/dashboard/${params.resource}/weekly`,
    {
      method: 'GET',
      params: {
        startDate: params.startDate,
      },
    }
    // golddataInstance
  );
};
