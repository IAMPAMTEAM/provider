import { useAxios } from '@vueuse/integrations/useAxios';
import { providerAwsRegionInstance } from '@/api';

enum Api {
  FIND_AWS_REGION = '/',
  ADD_AWS_REGION = '/',
  REMOVE_AWS_REGION = '/',
  UPDATE_AWS_REGION = '/',
  UPLOAD_AWS_REGION = '/upload',
}

const findAwsRegion = ({ query }: any) => {
  return useAxios(
    `${Api.FIND_AWS_REGION}?query=${query}`,
    {
      method: 'GET',
    },
    providerAwsRegionInstance
  );
};

const addAwsRegion = (params: any) => {
  return useAxios(
    Api.ADD_AWS_REGION,
    {
      method: 'POST',
      data: params,
    },
    providerAwsRegionInstance
  );
};

const removeAwsRegion = (params: any) => {
  return useAxios(
    Api.REMOVE_AWS_REGION,
    {
      method: 'DELETE',
      data: params,
    },
    providerAwsRegionInstance
  );
};

const updateAwsRegion = (params: any) => {
  return useAxios(
    Api.UPDATE_AWS_REGION,
    {
      method: 'PATCH',
      data: params,
    },
    providerAwsRegionInstance
  );
};

export const uploadAwsRegion = async (data: FormData) => {
  return useAxios(
    Api.UPLOAD_AWS_REGION,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerAwsRegionInstance
  );
};
export { findAwsRegion, addAwsRegion, removeAwsRegion, updateAwsRegion };
