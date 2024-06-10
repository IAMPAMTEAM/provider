import { useAxios } from '@vueuse/integrations/useAxios';
import { rulesInstance } from '@/api';

enum Api {
  GET_RULES = '/',
  INSERT_RULE_TAG = '/insert',
  EDITING = '/editing',
  UPSERT = '/upsert-rule',
  DELETE = '/delete-rule',
  RULE_TAG_COLUMNS = '/columns',
  UPLOAD = '/upload',
  DUMP = '/dump',
  SETTINGS = '/settings',
  COLUMN_VISIBLE = '/column',
  ADD_SETTINGS = '/add_setting',
  DELETE_SETTINGS = '/delete_setting',
  GET_RULE_TEMPLATE = '/get_rule_template',
  UPDATE_RULE_TEMPLATE = '/update_rule_template',
  MAKE_PACKS = '/make_packs',
}

export const getRules = async () => {
  return useAxios(
    Api.GET_RULES,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const insertRuleTag = async (data: any) => {
  return useAxios(
    Api.INSERT_RULE_TAG,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data,
    },
    rulesInstance
  );
};

export const upsertRules = async (data: any) => {
  return useAxios(
    Api.UPSERT,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data,
    },
    rulesInstance
  );
};

export const deleteRules = async (data: any) => {
  return useAxios(
    Api.DELETE,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data,
    },
    rulesInstance
  );
};

export const metadataEditing = async (data: any) => {
  return useAxios(
    Api.EDITING,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const getRuleTagColumn = async () => {
  return useAxios(
    Api.RULE_TAG_COLUMNS,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const uploadRuleMetadata = async (data: FormData) => {
  return useAxios(
    Api.UPLOAD,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const dumpRuleMetadata = async (data: FormData) => {
  return useAxios(
    Api.DUMP,
    {
      method: 'PUT',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const getRuleSettings = async () => {
  return useAxios(
    Api.SETTINGS,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const setColumnVisible = async (data: any) => {
  return useAxios(
    Api.COLUMN_VISIBLE,
    {
      method: 'PATCH',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const addSetting = async (data: any) => {
  return useAxios(
    Api.ADD_SETTINGS,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const deleteSetting = async (data: any) => {
  return useAxios(
    Api.DELETE_SETTINGS,
    {
      method: 'DELETE',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const getRuleTemplate = async (ruleName: string) => {
  return useAxios(
    Api.GET_RULE_TEMPLATE,
    {
      params: {
        ruleName,
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const updateRuleTemplate = async (ruleName: string) => {
  return useAxios(
    Api.UPDATE_RULE_TEMPLATE,
    {
      method: 'POST',
      data: {
        ruleName,
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};

export const makePacks = async () => {
  return useAxios(
    Api.MAKE_PACKS,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    rulesInstance
  );
};
