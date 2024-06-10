import { teamInstance } from '@/api';
import { useAxios } from '@vueuse/integrations/useAxios';

enum Api {
  GET_TEAM_INFO = '/urn/',
  GET_TEAMS_INFO = '/',
  UPDATE_TEAM_INFO = '/',
  ADD_TEAM_INFO = '/',
  REMOVE_TEAM_INFO = '/',
}

const createTeam = (params: any) => {
  return useAxios(
    Api.ADD_TEAM_INFO,
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    teamInstance
  );
};

const getTeams = (params: any) => {
  return useAxios(
    `${Api.GET_TEAMS_INFO}?query=${params.query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    teamInstance
  );
};

const getTeam = (params: any) => {
  return useAxios(
    Api.GET_TEAM_INFO + params,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    teamInstance
  );
};

const updateTeam = (params: any) => {
  return useAxios(
    Api.UPDATE_TEAM_INFO,
    {
      method: 'PATCH',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    teamInstance
  );
};

const deleteTeam = (params: any) => {
  return useAxios(
    Api.REMOVE_TEAM_INFO + params.urn,
    {
      method: 'DELETE',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    teamInstance
  );
};

export { createTeam, getTeams, getTeam, updateTeam, deleteTeam };
