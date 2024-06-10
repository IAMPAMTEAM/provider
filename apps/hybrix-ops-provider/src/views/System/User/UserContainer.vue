<template>
  <div class="management-users-cont">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 100%"
      :default-col-def="DEFAULT_COL_DEF"
      :column-defs="columnDef"
      :row-data="providerAccounts"
      pagination
      :paginationPageSize="15"
      @grid-ready="onGridReady"
    />

    <div class="management-users__btn-create">
      <q-btn label="Create" color="green" @click="toggleShow" />
      <ProviderAccountCreateForm :show="show" @add="createProviderAccount" @close="toggleShow" />
    </div>

    <Transition>
      <div v-if="isLoading" class="management-users-cloak">
        <q-spinner-ios color="primary" size="6rem" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import ProviderAccountCreateForm from './_partials/ProviderAccountCreateForm.vue';

import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRowDataStore } from '@/store/rowData';
import { retrieveProviderAccounts } from '@/api/modules/provider/provider-account';
import { DEFAULT_COL_DEF } from '@/constants';
import { useRouter } from 'vue-router';
import { AgGridVue } from 'ag-grid-vue3';
import HCellRendererBtnRemove from '@/components/HCellRenderer/HCellRendererBtnRemove.vue';
import HCellRendererBtnEdit from '@/components/HCellRenderer/HCellRendererBtnEdit.vue';
import HCellRendererProfileImg from '@/components/HCellRenderer/HCellRendererProfileImg.vue';
import type { GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import { registProviderAccount } from '@/api/modules/provider/auth';

const router = useRouter();

const rowDataStore = useRowDataStore();
const { providerAccounts } = storeToRefs(rowDataStore);

const isLoading = ref(true);

const fetchUsers = async () => {
  try {
    const query = JSON.stringify({});
    const { data } = await retrieveProviderAccounts({ query });

    return data.value.data;
  } catch (error) {
    console.log((error as Error).message);

    return [];
  }
};

onMounted(async () => {
  providerAccounts.value = await fetchUsers();
  setTimeout(() => (isLoading.value = false), 100);
});

const columnDef = [
  {
    field: 'profileImg',
    sortable: false,
    cellRenderer: HCellRendererProfileImg,
  },
  { field: 'provider' },
  { field: 'providerId' },
  { field: 'displayName' },
  { field: 'email' },
  { field: 'loginLocation' },
  { field: 'lastLoginDate' },
  {
    headerName: '',
    field: 'editProviderAccount',
    cellRenderer: HCellRendererBtnEdit,
  },
  {
    headerName: '',
    field: 'removeProviderAccount',
    cellRenderer: HCellRendererBtnRemove,
  },
];

const gridApi = ref<GridApi>();
const gridColumnApi = ref<ColumnApi>();

const onGridReady = ({ api, columnApi }: GridReadyEvent) => {
  gridApi.value = api;
  gridColumnApi.value = columnApi;

  gridApi.value.sizeColumnsToFit();
};

const show = ref(false);
const toggleShow = () => (show.value = !show.value);

const createProviderAccount = async (payload: any) => {
  try {
    const response = await registProviderAccount(payload);
    router.go(0);
  } catch (e) {
    console.log((e as Error).message);
  }
};
</script>

<style scoped lang="scss">
.management-users {
  &-cont {
    position: relative;
    height: calc(100vh - 118px);
    margin: var(--gap-1);
    margin-bottom: unset;
    padding: var(--gap-sm-2);
    border-radius: 8px;
    background: var(--color-white);
    box-shadow: var(--shadow-dev-1);
  }
  &-cloak {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--color-white);
  }
  &__btn-create {
    position: absolute;
    left: 16px;
    bottom: 14px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
