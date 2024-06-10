<template>
  <div class="management-whitelist-cont">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 100%"
      :default-col-def="DEFAULT_COL_DEF"
      :column-defs="columnDefs"
      :row-data="whitelist"
      pagination
      :paginationPageSize="15"
      @grid-ready="onGridReady"
    />

    <div class="management-whitelist__btn-create">
      <q-btn label="Create" color="green" @click="toggleShow" />
      <WhitelistAddForm :show="show" @add="updateWhitelist" @close="toggleShow" />
    </div>

    <Transition>
      <div v-if="isLoading" class="management-whitelist-cloak">
        <q-spinner-ios color="primary" size="6rem" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import WhitelistAddForm from './_partials/WhitelistAddForm.vue';
import { onMounted, ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { storeToRefs } from 'pinia';
import { useRowDataStore } from '@/store/rowData';
import type { GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import { DEFAULT_COL_DEF } from '@/constants';
import { retrieveAllowlist, addWhitelist } from '@/api/modules/provider/allowlist';
import { useRouter } from 'vue-router';
import HCellRendererBtnRemove from '@/components/HCellRenderer/HCellRendererBtnRemove.vue';
import { ROW_DATA } from '@/types';

const router = useRouter();
const isLoading = ref(true);

const rowDataStore = useRowDataStore();
const { whitelist } = storeToRefs(rowDataStore);

const fetchWhitelist = async () => {
  try {
    const query = JSON.stringify({});
    const { data } = await retrieveAllowlist({ query });
    const whitelistData = data.value.data[0].whitelist;
    return whitelistData.map((item: any) => {
      return {
        whitelist: item.email,
        isUsed: item.isUsed,
      };
    });
  } catch (error) {
    console.log((error as Error).message);

    return [];
  }
};

const updateWhitelist = async (payload: any) => {
  try {
    const response = await addWhitelist(payload);
    rowDataStore.addRowData(ROW_DATA.WHITELIST, { whitelist: payload.email, isUsed: false });
    // router.go(0);
  } catch (e) {
    console.log((e as Error).message);
  }
};

onMounted(async () => {
  whitelist.value = await fetchWhitelist();
  setTimeout(() => (isLoading.value = false), 100);
});

const columnDefs = [
  { headerName: 'White List', field: 'whitelist' },
  { headerName: 'Used', field: 'isUsed' },
  {
    headerName: '',
    field: 'removeWhitelist',
    sortable: false,
    width: 10,
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
</script>

<style scoped lang="scss">
.management-whitelist {
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
