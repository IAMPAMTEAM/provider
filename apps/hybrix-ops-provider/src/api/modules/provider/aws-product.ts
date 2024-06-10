import { useAxios } from '@vueuse/integrations/useAxios';
import { providerAwsProductInstance, providerAuthInstance } from '@/api';

enum Api {
  FIND_AWS_PRODUCT = '/',
  ADD_AWS_PRODUCT = '/',
  REMOVE_AWS_PRODUCT = '/',
  UPDATE_AWS_PRODUCT = '/',
  UPLOAD_AWS_PRODUCT = '/upload',
}

const findAwsProduct = ({ query }: any) => {
  return useAxios(
    `${Api.FIND_AWS_PRODUCT}?query=${query}`,
    {
      method: 'GET',
    },
    providerAwsProductInstance
  );
};

const addAwsProduct = (params: any) => {
  return useAxios(
    Api.ADD_AWS_PRODUCT,
    {
      method: 'POST',
      data: params,
    },
    providerAwsProductInstance
  );
};

const removeAwsProduct = (params: any) => {
  return useAxios(
    Api.REMOVE_AWS_PRODUCT,
    {
      method: 'DELETE',
      data: params,
    },
    providerAwsProductInstance
  );
};

const updateAwsProduct = (params: any) => {
  return useAxios(
    Api.UPDATE_AWS_PRODUCT,
    {
      method: 'PATCH',
      data: params,
    },
    providerAwsProductInstance
  );
};

export const uploadAwsProduct = async (data: FormData) => {
  return useAxios(
    Api.UPLOAD_AWS_PRODUCT,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerAwsProductInstance
  );
};
export { findAwsProduct, addAwsProduct, removeAwsProduct, updateAwsProduct };
