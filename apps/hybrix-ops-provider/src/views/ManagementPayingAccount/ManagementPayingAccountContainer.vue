<template>
  <div class="management-tenants-cont">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 100%"
      :default-col-def="DEFAULT_COL_DEF"
      :column-defs="columnDefs"
      :row-data="tenants"
      pagination
      :paginationPageSize="15"
      @grid-ready="onGridReady"
    />

    <!-- <div class="management-tenants__btn-create">
      <q-btn label="Create" color="green" @click="toggleShow" />
      <TenantCreateForm :show="show" @add="createTenant" @close="toggleShow" />
    </div> -->

    <Transition>
      <div v-if="isLoading" class="management-tenants-cloak">
        <q-spinner-ios color="primary" size="6rem" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { getAccounts } from '@/api/modules/provider/account';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRowDataStore } from '@/store/rowData';
import { addTenantInfo } from '@/api/modules/home/tenant';
import { retrieveTenants } from '@/api/modules/provider/tenant';
import { DEFAULT_COL_DEF } from '@/constants';
import { useRouter } from 'vue-router';
import { AgGridVue } from 'ag-grid-vue3';
import HCellRendererBtnRemove from '@/components/HCellRenderer/HCellRendererBtnRemove.vue';
import HCellRendererBtnEdit from '@/components/HCellRenderer/HCellRendererBtnEdit.vue';
import type { GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import { retrieveAccounts } from '@/api/modules/provider/account';
import { retrieveAllowlist } from '@/api/modules/provider/allowlist';
import dayjs from 'dayjs';
import type { ColDef } from 'ag-grid-community';

const router = useRouter();

const rowDataStore = useRowDataStore();
const { tenants, accounts, whitelist, blacklist } = storeToRefs(rowDataStore);
const data = ref<any[]>([]);

const isLoading = ref(true);

const fetchTenantInfo = async () => {
  try {
    const { data } = await getAccounts();

    return JSON.parse(data.value.body);
  } catch (error) {
    console.log((error as Error).message);

    return [];
  }
};

onMounted(async () => {
  tenants.value = await fetchTenantInfo();

  setTimeout(() => (isLoading.value = false), 100);
});

const columnDefs: ColDef[] = [
  {
    headerName: 'AWS Account',
    field: 'awsAccount',
    editable: true,
    minWidth: 300,
  },
  {
    headerName: 'AWS Account Name',
    field: 'awsAccountName',
    minWidth: 290,
  },
  {
    headerName: 'AWS Account Full Name',
    field: 'awsAccountFullName',
    minWidth: 320,
  },
  {
    headerName: 'Company Name',
    field: 'companyName',
    minWidth: 280,
  },
  {
    headerName: 'AWS Account Type',
    field: 'awsAccountType',
    minWidth: 320,
  },
];

const gridApi = ref<GridApi>();
const gridColumnApi = ref<ColumnApi>();

const onGridReady = ({ api, columnApi }: GridReadyEvent) => {
  gridApi.value = api;
  gridColumnApi.value = columnApi;

  // gridApi.value.sizeColumnsToFit();
};

const show = ref(false);
const toggleShow = () => (show.value = !show.value);

const createTenant = async (payload: any) => {
  try {
    const response = await addTenantInfo(payload);
    router.go(0);
  } catch (e) {
    console.log((e as Error).message);
  }
};
</script>

<style scoped lang="scss">
.management-tenants {
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
