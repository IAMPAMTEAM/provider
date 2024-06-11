// import {  } from '@/api';
import { useAxios } from '@vueuse/integrations/useAxios';
// import {
//   AddUserInfoParams,
//   GetUserInfoParams,
//   RemoveUserInfoParams,
//   UpdateUserInfoParams,
// } from '../types';

enum Api {
  GET_USER_INFO = '/',
  UPDATE_USER_INFO = '/',
  ADD_USER_INFO = '/',
  REMOVE_USER_INFO = '/',
  UPDATE_PROFILE_IMG = '/profile-img',
  FETCH_USER = '/me',
}

export const fetchUser = (params: any) => {
  return useAxios(Api.FETCH_USER, { method: 'GET' });
};

const createUser = (params: any) => {
  return useAxios(Api.ADD_USER_INFO, {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

const getUsers = (params: any) => {
  return useAxios(`${Api.GET_USER_INFO}?query=${params.query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

const updateUser = (params: { urn: string; updateUserRequest: any }) => {
  return useAxios(`${Api.UPDATE_USER_INFO}/${params.urn}`, {
    method: 'PATCH',
    data: params.updateUserRequest,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

const deleteUser = (params: { urn: string }) => {
  return useAxios(Api.REMOVE_USER_INFO + '/' + params.urn, {
    method: 'DELETE',
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

const uploadImageToS3 = (params: any) => {
  return useAxios(Api.UPDATE_PROFILE_IMG, {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export { createUser, getUsers, updateUser, deleteUser, uploadImageToS3 };
