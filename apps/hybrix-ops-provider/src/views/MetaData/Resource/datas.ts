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
  { headerName: 'checkRuleID', field: 'checkRuleID', hide: false },
  { headerName: 'checkRuleName', field: 'checkRuleName', hide: false },
  {
    headerName: 'checkRuleName-ko',
    field: 'checkRuleName-ko',
    hide: false,
  },
  {
    headerName: 'description',
    field: 'description',
    hide: false,
    minWidth: 400,
  },
  {
    headerName: 'description-ko',
    field: 'description-ko',
    hide: false,
    minWidth: 400,
  },
  {
    headerName: 'checkRuleType',
    field: 'checkRuleType',
    hide: false,
  },
  {
    headerName: 'ifApply',
    field: 'ifApply',
    hide: false,
  },
  {
    headerName: 'securityTerms',
    field: 'securityTerms',
    hide: false,
  },
  {
    headerName: 'awsResourceType',
    field: 'awsResourceType',
    hide: false,
  },
  {
    headerName: 'awsResourceTypeName',
    field: 'awsResourceTypeName',
    hide: false,
  },
  {
    headerName: 'identifier',
    field: 'identifier',
    hide: false,
  },
  {
    headerName: 'awsProductCode',
    field: 'awsProductCode',
    hide: false,
  },
  {
    headerName: 'triggerType',
    field: 'triggerType',
    hide: false,
  },
  {
    headerName: 'defaultSeverity',
    field: 'defaultSeverity',
    hide: false,
  },
  {
    headerName: 'financeSeverity',
    field: 'financeSeverity',
    hide: false,
  },
  {
    headerName: 'customerPersonalInfoSeverity',
    field: 'customerPersonalInfoSeverity',
    hide: false,
  },
  {
    headerName: 'hybrixRuleName',
    field: 'hybrixRuleName',
    hide: false,
  },
  {
    headerName: 'lambdaName',
    field: 'lambdaName',
    hide: false,
  },
];
