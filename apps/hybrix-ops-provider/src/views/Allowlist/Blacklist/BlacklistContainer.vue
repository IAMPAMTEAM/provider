<template>
  <div class="management-blacklist-cont">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 100%"
      :default-col-def="DEFAULT_COL_DEF"
      :column-defs="columnDefs"
      :row-data="blacklist"
      pagination
      :paginationPageSize="15"
      @grid-ready="onGridReady"
    />

    <div class="management-blacklist__btn-create">
      <q-btn label="Create" color="green" @click="toggleShow" />
      <BlacklistAddForm :show="show" @add="updateBlacklist" @close="toggleShow" />
    </div>

    <Transition>
      <div v-if="isLoading" class="management-blacklist-cloak">
        <q-spinner-ios color="primary" size="6rem" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import BlacklistAddForm from './_partials/BlacklistAddForm.vue';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { AgGridVue } from 'ag-grid-vue3';
import { useRowDataStore } from '@/store/rowData';
import type { GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import { DEFAULT_COL_DEF } from '@/constants';
import { retrieveAllowlist, addBlacklist } from '@/api/modules/provider/allowlist';
import { useRouter } from 'vue-router';
import HCellRendererBtnRemove from '@/components/HCellRenderer/HCellRendererBtnRemove.vue';
import { ROW_DATA } from '@/types';
const router = useRouter();

const isLoading = ref(true);

const rowDataStore = useRowDataStore();
const { blacklist } = storeToRefs(rowDataStore);

const fetchBlacklist = async () => {
  try {
    const query = JSON.stringify({});
    const { data } = await retrieveAllowlist({ query });
    const blacklistDomain = data.value.data[0].blacklist;
    return blacklistDomain.map((item: string) => {
      return {
        blacklist: item,
      };
    });
  } catch (error) {
    console.log((error as Error).message);

    return [];
  }
};

const updateBlacklist = async (payload: any) => {
  try {
    const response = await addBlacklist(payload);
    rowDataStore.addRowData(ROW_DATA.BLACKLIST, { blacklist: payload.domain });
    // router.go(0);
  } catch (e) {
    console.log((e as Error).message);
  }
};
onMounted(async () => {
  blacklist.value = await fetchBlacklist();
  setTimeout(() => (isLoading.value = false), 100);
});

const columnDefs = [
  { headerName: 'Black List', field: 'blacklist' },
  {
    headerName: '',
    field: 'removeBlacklist',
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
.management-blacklist {
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
