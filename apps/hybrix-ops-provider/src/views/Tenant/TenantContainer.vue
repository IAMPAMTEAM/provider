<template>
  <div class="management-tenants-cont">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 100%"
      :default-col-def="DEFAULT_COL_DEF"
      :column-defs="columnDefs"
      :row-data="data"
      pagination
      :paginationPageSize="15"
      @grid-ready="onGridReady"
    />

    <div class="management-tenants__btn-create">
      <q-btn label="Create" color="green" @click="toggleShow" />
      <TenantCreateForm :show="show" @add="createTenant" @close="toggleShow" />
    </div>

    <Transition>
      <div v-if="isLoading" class="management-tenants-cloak">
        <q-spinner-ios color="primary" size="6rem" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import TenantCreateForm from './_partials/TenantCreateForm.vue';

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

const router = useRouter();

const rowDataStore = useRowDataStore();
const { tenants, accounts, whitelist, blacklist } = storeToRefs(rowDataStore);
const data = ref<any[]>([]);

const isLoading = ref(true);

const fetchTenantInfo = async () => {
  try {
    const query = JSON.stringify({});
    const { data } = await retrieveTenants({ query });

    return data.value.data;
  } catch (error) {
    console.log((error as Error).message);

    return [];
  }
};

const fetchAccountInfo = async () => {
  try {
    const query = JSON.stringify({});
    const { data } = await retrieveAccounts({ query });

    return data.value.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

const fetchAllowlist = async () => {
  try {
    const query = JSON.stringify({});
    const { data } = await retrieveAllowlist({ query });

    return data.value.data[0].whitelist.map((item: string) => {
      return item;
    });
  } catch (error) {
    console.log((error as Error).message);
  }
};

onMounted(async () => {
  tenants.value = await fetchTenantInfo();
  accounts.value = await fetchAccountInfo();
  whitelist.value = await fetchAllowlist();

  tenants.value.forEach((tenant: any) => {
    // Allow Customer
    if (whitelist.value.includes(tenant['companyEmail'])) {
      tenant['allowCustomer'] = 'Whitelist';
    } else if (tenant['companyEmail'].includes('mz')) {
      tenant['allowCustomer'] = 'Megazone';
    } else {
      tenant['allowCustomer'] = 'Blacklist';
    }
    const currentTime = dayjs();
    const endTime = dayjs(tenant['createDate']).add(6, 'hour');
    // Add Report Success
    if (tenant['diagopsReportURL'] !== undefined && tenant['diagopsReportURL'] !== '') {
      tenant['diagopsReportSuccess'] = 'Success';
    } else if (endTime.isBefore(currentTime)) {
      tenant['diagopsReportSuccess'] = 'Fail';
    } else {
      tenant['diagopsReportSuccess'] = 'Pending';
    }

    // Add Account Info
    accounts.value.forEach((account) => {
      if (tenant['accountUrn'] === account['tenants'][0]?.accountUrn) {
        data.value.push({ ...tenant, ...account });
      }
    });
  });
  tenants.value.forEach((tenant) => {});

  setTimeout(() => (isLoading.value = false), 100);
});

const columnDefs = [
  {
    headerName: 'Company Info',
    children: [
      { headerName: 'Name', field: 'companyName' },
      { headerName: 'Email', field: 'companyEmail', width: 180 },
      // { headerName: 'Contact', field: 'companyContact', width: 180 },
      // { headerName: 'Business Number', field: 'businessNumber', width: 180 },
    ],
  },
  {
    headerName: 'Tenant Info',
    children: [
      { headerName: 'Name', field: 'tenantName' },
      { headerName: 'Report Url', field: 'diagopsReportURL', width: 400, editable: true },
      {
        headerName: 'Report Status',
        field: 'diagopsReportSuccess',
        cellStyle: ({ data }: any) => {
          if (data['diagopsReportSuccess'] === 'Pending') {
            return { backgroundColor: '#999999', color: '#FFFFFF' };
          } else if (data['diagopsReportSuccess'] === 'Success') {
            return { backgroundColor: '#ADD8E6', color: '#FFFFFF' };
          } else {
            return { backgroundColor: '#FF6347', color: '#FFFFFF' };
          }
        },
      },
      // { headerName: 'Status', field: 'tenantStatus' },
    ],
  },
  {
    headerName: 'AWS Info',
    children: [
      { headerName: 'Account Id', field: 'awsAccountId' },
      { headerName: 'Regions', field: 'allowRegions' },
    ],
  },
  {
    headerName: 'Social User',
    children: [
      {
        headerName: 'Company Type',
        field: 'allowCustomer',
        cellStyle: ({ data }: any) => {
          if (data['allowCustomer'] === 'Megazone') {
            return { backgroundColor: '#537FE7', color: '#FFFFFF' };
          } else if (data['allowCustomer'] === 'Blacklist') {
            return { backgroundColor: '#181823', color: '#FFFFFF' };
          }
        },
      },
      {
        headerName: 'Social Display Name',
        field: 'displayName',
      },
      { headerName: 'Social Email', field: 'email' },
      { headerName: 'Register Date', field: 'registerDate' },
    ],
  },
  // {
  //   headerName: 'Product Info',
  //   children: [
  //     {
  //       headerName: 'Name',
  //       field: 'productName',
  //       valueFormatter: ({ data }: any) => data.products.at(0)?.productName ?? '-',
  //     },
  //   ],
  // },
  // {
  //   headerName: 'Payment Info',
  //   children: [
  //     { headerName: 'Name', field: 'paymentName' },
  //     { headerName: 'Start Date', field: 'paymentStartDate', width: 240 },
  //   ],
  // },
  // {
  //   headerName: '',
  //   field: 'editTenant',
  //   width: 80,
  //   cellRenderer: HCellRendererBtnEdit,
  // },
  // {
  //   headerName: '',
  //   field: 'removeTenant',
  //   width: 100,
  //   cellRenderer: HCellRendererBtnRemove,
  // },
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
