import { useAxios } from '@vueuse/integrations/useAxios';
// import { portalPolicyInstance } from '../..';

enum Api {
  GET_PORTAL_POLICY_INFO = '/',
  UPDATE_PORTAL_POLICY_INFO = '/',
  ADD_PORTAL_POLICY_INFO = '/',
  REMOVE_PORTAL_POLICY_INFO = '/',
}

const createPortalPolicy = (params: any) => {
  return useAxios(
    Api.ADD_PORTAL_POLICY_INFO,
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    // portalPolicyInstance
  );
};

const getPortalPolicies = (params: any) => {
  return useAxios(
    `${Api.GET_PORTAL_POLICY_INFO}?query=${params.query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    // portalPolicyInstance
  );
};

const updatePortalPolicy = (params: any) => {
  return useAxios(
    Api.UPDATE_PORTAL_POLICY_INFO,
    {
      method: 'PATCH',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    // portalPolicyInstance
  );
};

const deletePortalPolicy = (params: any) => {
  return useAxios(
    Api.REMOVE_PORTAL_POLICY_INFO + '/' + params.urn,
    {
      method: 'DELETE',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    // portalPolicyInstance
  );
};

export { createPortalPolicy, getPortalPolicies, updatePortalPolicy, deletePortalPolicy };
