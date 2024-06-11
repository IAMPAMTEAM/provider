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

    <!-- <div class="management-account__btn-create">
      <q-btn label="Update" color="primary" />
      <TenantCreateForm />
    </div> -->

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
import HDataTable from '@/components/HDataTable/HDataTable.vue';
import { useRowDataStore } from '@/store/rowData';
import { getSocialUsers, updateSocialUser } from '@/api/modules/provider/account';
import { DEFAULT_COL_DEF } from '@/constants';

import { AgGridVue } from 'ag-grid-vue3';
import HCellRendererBtnRemove from '@/components/HCellRenderer/HCellRendererBtnRemove.vue';
import HCellRendererBtnEdit from './_partials/HCellRendererBtnEdit.vue';
import HCellRendererProfileImg from '@/components/HCellRenderer/HCellRendererProfileImg.vue';
import type {
  GridReadyEvent,
  GridApi,
  ColumnApi,
  CellValueChangedEvent,
  ICellRendererParams,
  ColDef,
} from 'ag-grid-community';
import HCellRendererToggleBtn from '@/components/HCellRenderer/HCellRendererToggleBtn.vue';
import { findSecurityTerm } from '@/api/modules/provider/security-term';

import axios from 'axios';

const rowDataStore = useRowDataStore();
const { accounts } = storeToRefs(rowDataStore);

const isLoading = ref(true);

const fetchAccountInfo = async () => {
  try {
    const { data } = await getSocialUsers();
    return JSON.parse(data.value.body);
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

const columnDefs: ColDef[] = [
  {
    headerName: 'Profile Image',
    field: 'profileImage',
    sortable: false,
    hide: false,
    editable: true,
    cellRenderer: HCellRendererProfileImg,
  },
  { headerName: 'Display Name', field: 'displayName', editable: true },
  { headerName: 'Social Email', field: 'socialEmail', editable: true },
  {
    headerName: 'Email Status',
    field: 'emailStatus',
    editable: false,
    cellStyle: ({ data }: any) => {
      if (data['emailStatus'] === 'loggedIn') {
        return { backgroundColor: '#EC5858', color: '#FFFFFF' };
      }
      if (data['emailStatus'] === 'emailVerified') {
        return { backgroundColor: '#FFB830', color: '#FFFFFF' };
      }
      if (data['emailStatus']['getStarted']) {
        return { backgroundColor: '#3DB2FF', color: '#FFFFFF' };
      }
    },
  },
  { headerName: 'GEO Location', field: 'geoLocation' },
  { headerName: 'Login IP Address', field: 'loginIpaddress' },
  { headerName: 'Login Location', field: 'loginLocation' },
  { headerName: 'Last Login', field: 'lastLogin' },
  {
    headerName: '',
    field: 'editSocialUser',
    cellRenderer: HCellRendererBtnEdit,
  },
];

const gridApi = ref<GridApi>();
const gridColumnApi = ref<ColumnApi>();

const onGridReady = ({ api, columnApi }: GridReadyEvent) => {
  gridApi.value = api;
  gridColumnApi.value = columnApi;

  gridApi.value.sizeColumnsToFit();
};

const cellChanged = async (e: CellValueChangedEvent | ICellRendererParams) => {
  console.log(e.column);
  accounts.value.forEach((account) => {
    console.log(account);
  });

  if (!e.column) return;

  console.log(e);
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
