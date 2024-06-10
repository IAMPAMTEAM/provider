import { defineStore } from 'pinia';

import type { Account, ProviderAccount, Tenant, RowData } from '@/types';

export const useRowDataStore = defineStore('rowData', {
  state: () => ({
    accounts: [] as Account[],
    tenants: [] as Tenant[],
    providerAccounts: [] as ProviderAccount[],
    rule: [] as String[],
    blacklist: [] as String[],
    whitelist: [] as String[],
  }),
  actions: {
    addRowData(data: RowData, value: any) {
      const copiedRowData = JSON.parse(JSON.stringify(this[data]));
      copiedRowData.push(value);
      this[data] = copiedRowData;
    },
    updateRowData(data: RowData, index: number, oldValue?: any, newValue?: any) {
      const copiedRowData = JSON.parse(JSON.stringify(this[data]));

      if (!oldValue && !newValue) {
        copiedRowData.splice(index, 1);
      } else {
        copiedRowData[index] = { ...oldValue, ...newValue };
      }
      this[data] = copiedRowData;
    },
  },
});
