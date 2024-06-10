export const excelStyles = [
  {
    id: 'header',
    interior: {
      color: '#ebebeb',
      pattern: 'Solid',
    },
    alignment: {
      vertical: 'Center',
    },
  },
  {
    id: 'tag',
    interior: {
      color: '#6667ab',
      pattern: 'Solid',
    },
    font: {
      color: '#ffffff',
    },
  },

  {
    id: 'cell',
    alignment: {
      vertical: 'Center',
    },
  },
  {
    id: 'row.danger',
    interior: {
      color: '#c20101cc',
      pattern: 'Solid',
    },
    font: {
      color: '#ffffff',
    },
  },
];

export const defaultExcelExportParams = {
  author: 'hybrixOps',
  fontSize: 15,
  headerRowHeight: 40,
  rowHeight: 30,
  sheetName: 'HybrixOps',
  fileName: 'HybrixOps.xlsx',
};
