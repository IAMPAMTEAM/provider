import { useAxios } from '@vueuse/integrations/useAxios';
import { providerSvgIconInstance } from '@/api';
import type { RetrieveParams, UpdateParams } from '@/api/types';

enum Api {
  UPLOAD_SVG_ICON = '/',
  CREATE_SVG_ICON = '/',
  FIND_SVG_ICON = '/',
  UPDATE_SVG_ICON = '/',
  DELETE_SVG_ICON = '/',
}

export const uploadSvgIcon = (name: any, formData: any) => {
  return useAxios(
    `${Api.UPLOAD_SVG_ICON}${name}/upload`,
    {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerSvgIconInstance
  );
};

export const createSvgIcon = (createSvgIconDto: any) => {
  return useAxios(
    Api.FIND_SVG_ICON,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: createSvgIconDto,
    },
    providerSvgIconInstance
  );
};

export const findSvgIcon = ({ query }: RetrieveParams) => {
  return useAxios(
    Api.FIND_SVG_ICON + '?query=' + query,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerSvgIconInstance
  );
};

export const updateSvgIcon = ({ name, data }: any) => {
  return useAxios(
    Api.UPDATE_SVG_ICON + name,
    {
      method: 'PATCH',
      data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerSvgIconInstance
  );
};

export const deleteSvgIcon = ({ name }: any) => {
  return useAxios(
    Api.DELETE_SVG_ICON + `${name}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerSvgIconInstance
  );
};
