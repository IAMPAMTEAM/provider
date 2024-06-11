<template>
  <div class="delete-btn-cell-renderer">
    <q-btn color="red" label="remove" @click="deleteRowData" />
  </div>
</template>

<script setup lang="ts">
import { useRowDataStore } from '@/store/rowData';
import { deleteAccount } from '@/api/modules/provider/account';
import { deleteProviderAccount } from '@/api/modules/provider/provider-account';
import { deleteTenant } from '@/api/modules/provider/tenant';
import { ROW_DATA, type RemoveRowData } from '@/types';
import type { CellEvent } from 'ag-grid-community';
import { removeBlacklist, removeWhitelist } from '@/api/modules/provider/allowlist';

const rowDataStore = useRowDataStore();

const props = defineProps<{
  params: CellEvent;
}>();

const RemoveRowDataMap = {
  removeAccount: ROW_DATA.ACCOUNTS,
  removeTenant: ROW_DATA.TENANTS,
  removeProviderAccount: ROW_DATA.PROVIDER_ACCOUNT,
  removeBlacklist: ROW_DATA.BLACKLIST,
  removeWhitelist: ROW_DATA.WHITELIST,
};

const RemoveFunctionMap = {
  removeAccount: deleteAccount,
  removeProviderAccount: deleteProviderAccount,
  removeTenant: deleteTenant,
  removeBlacklist: removeBlacklist,
  removeWhitelist: removeWhitelist,
};

const deleteRowData = async () => {
  const { data, colDef, rowIndex } = props.params;

  if (!colDef.field || !rowIndex) {
    return;
  }

  if (confirm('정말 삭제하시겠습니까?')) {
    let params = {};
    const field = colDef.field as RemoveRowData;
    switch (field) {
      case 'removeBlacklist':
        params = { domain: data.blacklist };
        break;
      case 'removeWhitelist':
        params = { email: data.whitelist };
        break;
      default:
        params = { urn: data.urn.urn };
        break;
    }

    // await RemoveFunctionMap[field](params);
    // rowDataStore.updateRowData(RemoveRowDataMap[field], rowIndex);
  }
};
</script>

<style lang="scss">
.delete-btn-cell-renderer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
