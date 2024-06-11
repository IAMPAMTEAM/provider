import { useAxios } from '@vueuse/integrations/useAxios';
import { providerAwsResourceTypeInstance, awsCheckRulesInstance } from '@/api';

enum Api {
  FIND_AWS_RESOURCE_TYPE = '/',
  ADD_AWS_RESOURCE_TYPE = '/',
  REMOVE_AWS_RESOURCE_TYPE = '/',
  UPDATE_AWS_RESOURCE_TYPE = '/',
  UPLOAD_AWS_RESOURCE_TYPE = '/upload',
}

const findAwsResourceType = () => {
  return useAxios(
    '/',
    {
      method: 'GET',
    },
    awsCheckRulesInstance
  );
};

const addAwsResourceType = (params: any) => {
  return useAxios(
    Api.ADD_AWS_RESOURCE_TYPE,
    {
      method: 'POST',
      data: params,
    },
    providerAwsResourceTypeInstance
  );
};

const removeAwsResourceType = (params: any) => {
  return useAxios(
    Api.REMOVE_AWS_RESOURCE_TYPE,
    {
      method: 'DELETE',
      data: params,
    },
    providerAwsResourceTypeInstance
  );
};

const updateAwsResourceType = (params: any) => {
  return useAxios(
    Api.UPDATE_AWS_RESOURCE_TYPE,
    {
      method: 'PATCH',
      data: params,
    },
    providerAwsResourceTypeInstance
  );
};

export const uploadAwsResourceType = async (data: FormData) => {
  return useAxios(
    Api.UPLOAD_AWS_RESOURCE_TYPE,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerAwsResourceTypeInstance
  );
};
export { findAwsResourceType, addAwsResourceType, removeAwsResourceType, updateAwsResourceType };
