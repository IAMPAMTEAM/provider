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
  { headerName: 'securityTerm', field: 'securityTerm', hide: false },
  { headerName: 'awsSecurityCategory', field: 'awsSecurityCategory', hide: false, editable: true },
  { headerName: 'csaCategory', field: 'csaCategory', hide: false, editable: true },
  { headerName: 'hybrixOpsCategory', field: 'hybrixOpsCategory', hide: false, editable: true },
  { headerName: 'securityTerm-ko', field: 'securityTerm-ko', hide: false, editable: true },
];
