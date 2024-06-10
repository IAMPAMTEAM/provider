import HCellRendererSvgImgVue from '@/components/HCellRenderer/HCellRendererSvgImg.vue';
import type { ColDef } from 'ag-grid-community';

export const settings = {
  sideBar: {
    position: 'left',
    width: 300,
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: false,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
    ],
    defaultToolPanel: 'columns',
  },
  suppressCellFocus: true,
  suppressRowTransform: false,
  sortable: true,
  resizable: true,
  // suppressMovable: false,
  filter: true,
  undoRedoCellEditing: true,
};

export const columnDefs: ColDef[] = [
  { headerName: 'image', field: 'image', hide: false, cellRenderer: HCellRendererSvgImgVue },
  { headerName: 'url', field: 'url', hide: false },
  { headerName: 'name', field: 'name', hide: false, editable: true },
  { headerName: 'category', field: 'category', hide: false, editable: true },
  { headerName: 'tag', field: 'tag', hide: false, editable: true },
];
