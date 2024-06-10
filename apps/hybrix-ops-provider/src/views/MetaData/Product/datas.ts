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
  { headerName: 'awsProductCode', field: 'awsProductCode', hide: false },
  { headerName: 'awsProductName', field: 'awsProductName', hide: false, editable: true },
  {
    headerName: 'awsProductCategory',
    field: 'awsProductCategory',
    hide: false,
    editable: true,
  },
  {
    headerName: 'awsProductDescription',
    field: 'awsProductDescription',
    hide: false,
    editable: true,
  },
];
