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
  { headerName: 'awsRegionCode', field: 'awsRegionCode', hide: false },
  { headerName: 'awsRegionName', field: 'awsRegionName', hide: false, editable: true },
  { headerName: 'awsRegionName-ko', field: 'awsRegionName-ko', hide: false, editable: true },
  {
    headerName: 'awsRegionCountry',
    field: 'awsRegionCountry',
    hide: false,
    editable: true,
  },
  {
    headerName: 'awsRegionCountry-ko',
    field: 'awsRegionCountry-ko',
    hide: false,
    editable: true,
  },
  {
    headerName: 'awsRegionCity',
    field: 'awsRegionCity',
    hide: false,
    editable: true,
  },
  {
    headerName: 'awsRegionCity-ko',
    field: 'awsRegionCity-ko',
    hide: false,
    editable: true,
  },
];
