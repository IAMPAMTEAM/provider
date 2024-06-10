<template>
  <div class="management-account-cont">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 100%"
      :default-col-def="DEFAULT_COL_DEF"
      :column-defs="columnDefs"
      :row-data="accounts"
      pagination
      :paginationPageSize="15"
      @grid-ready="onGridReady"
    />

    <!-- <q-btn label="submit" color="primary" @click="submit" /> -->

    <Transition>
      <div v-if="isLoading" class="management-account-cloak">
        <q-spinner-ios color="primary" size="6rem" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRowDataStore } from '@/store/rowData';
import { retrieveAccounts } from '@/api/modules/provider/account';
import { DEFAULT_COL_DEF } from '@/constants';

import { AgGridVue } from 'ag-grid-vue3';
import HCellRendererBtnRemove from '@/components/HCellRenderer/HCellRendererBtnRemove.vue';
import HCellRendererBtnEdit from '@/components/HCellRenderer/HCellRendererBtnEdit.vue';
import HCellRendererProfileImg from '@/components/HCellRenderer/HCellRendererProfileImg.vue';
import type {
  GridReadyEvent,
  GridApi,
  ColumnApi,
  CellValueChangedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import HCellRendererToggleBtn from '@/components/HCellRenderer/HCellRendererToggleBtn.vue';
import { findSecurityTerm } from '@/api/modules/provider/security-term';

import axios from 'axios';

const rowDataStore = useRowDataStore();
const { accounts } = storeToRefs(rowDataStore);

const isLoading = ref(true);

const fetchAccountInfo = async () => {
  try {
    /**
     * 1. DB
     */
    const query = JSON.stringify({});
    const { data } = await retrieveAccounts({ query });

    return data.value.data;

    /**
     * 2. S3 Bucket JSON
     */
    // const { data } = await axios.get(
    //   'https://email-form-images.s3.ap-northeast-2.amazonaws.com/home.accounts.json',
    //   {
    //     responseType: 'json',
    //   }
    // );

    // return data;
  } catch (error) {
    console.log((error as Error).message);

    return [];
  }
};

/**
 * 🧪 for s3 test
 */
// import json from './data.json';

// const submit = async () => {
//   await axios
//     .put('https://email-form-images.s3.ap-northeast-2.amazonaws.com/home.accounts.json', json)
//     .then((rsp) => {
//       // console.log('Successful');
//       // console.log(rsp);
//     })
//     .catch((err) => err);
// };

onMounted(async () => {
  accounts.value = await fetchAccountInfo();
  setTimeout(() => (isLoading.value = false), 100);
});

const columnDefs = [
  {
    headerName: 'Profile Image',
    field: 'profileImg',
    sortable: false,
    cellRenderer: HCellRendererProfileImg,
  },
  { headerName: 'Display Name', field: 'displayName', editable: true },
  // update: tenant name 삭제
  // {
  //   headerName: 'Tenant Name',
  //   field: 'tenants',

  //   valueFormatter: ({ data }: any) => data.tenants.at(0)?.tenantName ?? '-',
  // },
  { headerName: 'Social Email', field: 'email' },
  {
    headerName: 'Account Status',
    field: 'accountStatus',
    sortable: false,
    valueFormatter: ({ data }: any) => {
      if (!data['accountStatus']['emailVerified'] && !data['accountStatus']['getStarted']) {
        return 'loggedIn';
      }
      if (!data['accountStatus']['getStarted'] && data['accountStatus']['emailVerified']) {
        return 'emailVerified';
      }
      if (data['accountStatus']['getStarted']) {
        return 'getStarted';
      }
    },
    cellStyle: ({ data }: any) => {
      if (!data['accountStatus']['emailVerified'] && !data['accountStatus']['getStarted']) {
        return { backgroundColor: '#EC5858', color: '#FFFFFF' };
      }
      if (!data['accountStatus']['getStarted'] && data['accountStatus']['emailVerified']) {
        return { backgroundColor: '#FFB830', color: '#FFFFFF' };
      }
      if (data['accountStatus']['getStarted']) {
        return { backgroundColor: '#3DB2FF', color: '#FFFFFF' };
      }
    },
  },
  { headerName: 'Login Location', field: 'loginLocation' },
  { headerName: 'Last Login Date', field: 'lastLoginDate' },
  // {
  //   headerName: '',
  //   field: 'editAccount',
  //   sortable: false,
  //   cellRenderer: HCellRendererBtnEdit,
  // },
  // {
  //   headerName: '',
  //   field: 'removeAccount',
  //   sortable: false,
  //   cellRenderer: HCellRendererBtnRemove,
  // },
];

const gridApi = ref<GridApi>();
const gridColumnApi = ref<ColumnApi>();

const onGridReady = ({ api, columnApi }: GridReadyEvent) => {
  gridApi.value = api;
  gridColumnApi.value = columnApi;

  gridApi.value.sizeColumnsToFit();
};

const cellChanged = async (e: CellValueChangedEvent | ICellRendererParams) => {
  accounts.value.forEach((account) => {
    // console.log(account);
  });

  if (!e.column) return;

  console.log(e);

  // axios
  //   .put('https://email-form-images.s3.ap-northeast-2.amazonaws.com/home.accounts.json')
  //   .then((rsp) => {});
};

const setColumns = async () => {
  accounts.value;
};
</script>

<style scoped lang="scss">
.management-account {
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
