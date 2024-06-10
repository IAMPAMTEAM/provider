<template>
  <div class="toggle-btn-cell-renderer">
    <q-btn :class="btnColorClass" :label="btnLabel" @click="updateRowData" />
  </div>
</template>

<script setup lang="ts">
import { useRowDataStore } from '@/store/rowData';
import { updateAccount } from '@/api/modules/provider/account';
import { updateProviderAccount } from '@/api/modules/provider/provider-account';
import { updateTenant } from '@/api/modules/provider/tenant';
import { ROW_DATA, type EditRowData } from '@/types';
import type { CellEvent } from 'ag-grid-community';
import { ref, type Ref } from 'vue';

const rowDataStore = useRowDataStore();

const props = defineProps<{
  params: CellEvent;
}>();

const btnColorClass: Ref<string> = ref('user-btn-black');
const btnLabel: Ref<string> = ref('black user');

const EditRowDataMap = {
  editAccount: ROW_DATA.ACCOUNTS,
  editTenant: ROW_DATA.TENANTS,
  editProviderAccount: ROW_DATA.PROVIDER_ACCOUNT,
};

const EditFunctionMap = {
  editAllowList: updateAccount,
  editAccount: updateAccount,
  editTenant: updateTenant,
  editProviderAccount: updateProviderAccount,
};

const updateRowData = async () => {
  const { data, colDef, rowIndex } = props.params;

  if (!colDef.field || !rowIndex) {
    return;
  }

  const alertString = `정말 ${
    data.allowList === 'blackuser'
      ? '블랙리스트에서 삭제하시겠습니까?'
      : '블랙리스트에 추가하시겠습니까?'
  }`;

  if (confirm(alertString)) {
    btnColorClass.value = data.allowList === 'blackuser' ? 'user-btn-white' : 'user-btn-black';
    btnLabel.value = data.allowList === 'blackuser' ? 'white user' : 'black user';
    data.allowList = !data.allowList;

    const urn = data.urn.urn;
    const field = colDef.field as EditRowData;
    const updateAccountData = {
      allowList: data.allowlist,
    };
    await EditFunctionMap[field]({ urn, data: updateAccountData });
    rowDataStore.updateRowData(EditRowDataMap[field], rowIndex);
  }
};
</script>

<style lang="scss">
.toggle-btn-cell-renderer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  &-black {
    background-color: #666666;
    color: white;
  }
  &-white {
    background-color: white;
    color: #666666;
  }
}
</style>
