<template>
  <ag-grid-vue
    v-if="datas && columnList"
    class="ag-theme-hybrix"
    :style="style"
    :rowHeight="rowHeight ?? 41"
    :rowData="datas"
    :columnDefs="columnList"
    :defaultColDef="settings"
    :pagination="settings.pagination"
    :rowSelection="settings.rowSelection"
    :undoRedoCellEditing="settings.undoRedoCellEditing"
    :paginationPageSize="settings.paginationPageSize"
    :masterDetail="settings.masterDetail"
    :detailCellRendererParams="settings.detailCellRendererParams"
    :excelStyles="excelStyles"
    :defaultExcelExportParams="defaultExcelExportParams"
    :suppressRowTransform="settings.suppressRowTransform"
    :suppressCellFocus="settings.suppressCellFocus"
    :sideBar="settings.sideBar"
    :sideBarDef="{
      position: 'left',
    }"
    @column-visible="onColumnVisible"
    @gridReady="onGridReady"
    @first-data-rendered="onRendered"
    @cellValueChanged="onCellChanged"
    @columnResized="onColumnResized"
    @selection-changed="onSelectionChanged"
    @sort-changed="onSortChanged"
  >
  </ag-grid-vue>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import type {
  GridApi,
  RowClassParams,
  GridReadyEvent,
  CellValueChangedEvent,
  ColumnResizedEvent,
  ColumnApi,
  FirstDataRenderedEvent,
} from 'ag-grid-community';

import { excelStyles, defaultExcelExportParams } from './datas';
import type { ColumnVisibleEvent } from 'ag-grid-community';
// import type { SecurityViolationCheckType } from '../DataTable/types';

const props = defineProps<{
  datas: any;
  columnList: any;
  settings: any;
  style?: string;
  keyword?: string;
  hasGroup?: boolean;
  subField?: string;
  rowHeight?: number;
  editable?: boolean;
  rowSelectable?: (params: any) => boolean;
  rowClass?: (params: RowClassParams) => string;
}>();

const gridApi = ref<GridApi>();
const gridColumnApi = ref<ColumnApi>();

const onGridReady = async (params: GridReadyEvent) => {
  gridApi.value = params.api;
  gridColumnApi.value = params.columnApi;
  if (props.rowClass) params.api.setGetRowClass(props.rowClass);
  params.api.redrawRows();

  if (props.settings.sizeColumnsToFit) params.api.sizeColumnsToFit();
  if (props.rowSelectable) params.api.setIsRowSelectable(props.rowSelectable);
  const setEditable = (column: any) => {
    Object.assign(column, { editable: props.editable });
    if (column?.children) {
      column.children.forEach((childColumn: any) => setEditable(childColumn));
    }
  };
  props.columnList.forEach((column: any) => setEditable(column));
  await checkColumnSizes();
};
const onRendered = (params: FirstDataRenderedEvent) => {
  if (props.settings.sizeColumnsToFit) params.api.sizeColumnsToFit();
};
const emit = defineEmits([
  'cell-changed',
  'column-resized',
  'row-selected',
  'update:datas',
  'column-visible',
]);

/** management에 width가 저장되지 않은 경우, 요소의 사이즈에 맞게 표현한다.
 * define 된 width가 존재하지 않거나, 타입이 string일 경우 autosize로 보여줄 수 있도록 한다.
 */
const checkColumnSizes = async () => {
  if (gridColumnApi.value) {
    const nullWidthCols = gridColumnApi.value
      .getColumns()
      ?.filter(
        (column) => !column.getColDef().width || typeof column.getColDef().width === 'string'
      );
    nullWidthCols?.forEach((column) => {
      gridColumnApi.value?.autoSizeColumn(column.getId(), false);
    });
  }
};
const onSortChanged = () => {
  if (props.settings.isSpanTable) gridApi.value?.redrawRows();
};
const onCellChanged = (e: CellValueChangedEvent) => {
  emit('cell-changed', e);
};

const onColumnResized = (e: ColumnResizedEvent) => {
  if (e.finished) emit('column-resized', e);
};

const onSelectionChanged = () => {
  emit('row-selected', gridApi.value?.getSelectedNodes()[0]);
};

const onColumnVisible = (e: ColumnVisibleEvent) => {
  emit('column-visible', e);
};

watch(
  () => props.keyword,
  () => {
    gridApi.value?.setQuickFilter(props.keyword!);
  }
);

watch(
  () => props.rowHeight,
  () => {
    setTimeout(() => {
      gridApi.value?.resetRowHeights();
    }, 0);
  }
);

// < Export functions
const setRowData = (data: any) => {
  setTimeout(() => {
    gridApi.value?.setRowData(data);
  }, 0);
};

const setColumns = (columnDef: any) => {
  gridApi.value?.setColumnDefs(columnDef);
};

const getSelected = () => {
  const rows = gridApi.value?.getSelectedNodes()[0];
  return rows;
};

const exportAsExcel = (skipGroupHeaders = false) => {
  gridApi.value?.exportDataAsExcel({ skipColumnGroupHeaders: skipGroupHeaders });
};

const filtering = () => {
  if (props.rowClass) {
    gridApi.value?.setGetRowClass(props.rowClass);
    gridApi.value?.redrawRows();
  }
};

const selectRow = async (index: number) => {
  const row = gridApi.value?.getRowNode(index.toString());

  if (row) {
    row.setSelected(true, true);
  }
};

const resizing = () => {
  gridApi.value?.sizeColumnsToFit();
};

const redraw = () => {
  setTimeout(() => {
    gridApi.value?.redrawRows();
  }, 0);
};

const sizeFitByColumn = (key: string) => {
  gridColumnApi.value?.autoSizeColumn(key);
};

const sizeFitByColumns = (keys: string[]) => {
  gridColumnApi.value?.autoSizeColumns(keys);
};

const setContext = (test: any) => {
  gridApi.value?.setGetContextMenuItems(test);
};

defineExpose({
  setRowData,
  getSelected,
  exportAsExcel,
  selectRow,
  filtering,
  redraw,
  resizing,
  setColumns,
  sizeFitByColumn,
  sizeFitByColumns,
  setContext,
});
</script>
