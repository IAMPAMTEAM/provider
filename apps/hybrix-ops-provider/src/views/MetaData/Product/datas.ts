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
  {
    headerName: 'awsResourceType',
    field: 'awsResourceType',
    hide: false,
    editable: true,
  },
  {
    headerName: 'awsResourceTypeName',
    field: 'awsResourceTypeName',
    hide: false,
    editable: true,
    minWidth: 240,
  },
  {
    headerName: 'awsResourceTypeFullName',
    field: 'awsResourceTypeFullName',
    hide: false,
    editable: true,
    minWidth: 280,
  },
  {
    headerName: 'awsServiceName',
    field: 'awsServiceName',
    hide: false,
    editable: true,
    maxWidth: 200,
  },
  {
    headerName: 'awsServiceCategory',
    field: 'awsServiceCategory',
    hide: false,
    editable: true,
    minWidth: 208,
  },
  {
    headerName: 'awsResourceTypeShortName',
    field: 'awsResourceTypeShortName',
    hide: false,
    editable: true,
    minWidth: 265,
  },
];
