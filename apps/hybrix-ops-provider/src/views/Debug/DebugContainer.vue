<template>
  <div class="debug-cont">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 100%"
      pagination
      :paginationPageSize="15"
      :default-col-def="defaultColDef"
      :column-defs="columnDefs"
      :row-data="apiLogs"
      @grid-ready="onGridReady"
    />

    <Transition>
      <div v-if="isLoading" class="debug-cloak">
        <q-spinner-ios color="primary" size="6rem" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getApiLog } from '@/api/modules/home/log';
import type { GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';

import { AgGridVue } from 'ag-grid-vue3';

const fetchApiLog = async () => {
  try {
    const query = JSON.stringify({});
    const { data } = await getApiLog({ query });

    return data.value.data;
  } catch (error) {
    console.log((error as Error).message);

    return [];
  }
};

const isLoading = ref(true);
const apiLogs = ref<any[]>([]);

onMounted(async () => {
  apiLogs.value = await fetchApiLog();
  setTimeout(() => (isLoading.value = false), 100);
});

const defaultColDef = {
  resizable: true,
  sortable: true,
};

const columnDefs = [
  {
    headerName: 'Request Timestamp',
    children: [{ field: 'timeStamp', minWidth: 230 }],
  },
  {
    headerName: 'Request IP',
    children: [{ field: 'sourceIp' }],
  },
  {
    headerName: 'Request API Type',
    children: [{ field: 'apiType' }],
  },
  {
    headerName: 'Request API Content',
    children: [
      { field: 'method', width: 100 },
      {
        field: 'query',
        valueFormatter: ({ data }: any) => JSON.stringify(data.query),
      },
      { field: 'request', width: 480, autoHeight: true, wrapText: true },
    ],
  },
  {
    headerName: 'Response',
    children: [{ field: 'response', minWidth: 480, autoHeight: true, wrapText: true }],
  },
];

const gridApi = ref<GridApi>();
const gridColumnApi = ref<ColumnApi>();

const onGridReady = ({ api, columnApi }: GridReadyEvent) => {
  gridApi.value = api;
  gridColumnApi.value = columnApi;

  // gridApi.value.sizeColumnsToFit();
};
</script>

<style scoped lang="scss">
.debug {
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
