import ButtonElementVue from '@/components/HDataTable/_partials/ButtonElement.vue';

export const parseTenantItem = (item: any) => {
  return {
    tenantName: item?.tenantName,
    urn: item?.urn?.urn,
    companyName: item?.companyName,
    companyEmail: item?.companyEmail,
    companyContact: item?.companyContact,
    companyBusinessNumber: item?.businessNumber,
    productName: item?.products?.length ? item?.products[0]?.productName : '',
    paymentStartDate: item?.paymentStartDate,
    paymentName: item?.paymentName,
    consoleURL: `https://${item?.tenantName}.hybrix.site`,
  };
};

export const defaultTenantColumns = [
  {
    field: 'tenant',
    children: [
      { field: 'tenantName', width: 160 },
      { field: 'urn', width: 220, headerName: 'urn' },
    ],
  },
  {
    field: 'company',
    children: [
      { field: 'companyName', width: 160 },
      { field: 'companyEmail', width: 160 },
      { field: 'companyContact', width: 160 },
      { field: 'companyBusinessNumber', width: 160 },
    ],
  },
  {
    field: 'product',
    children: [{ field: 'productName', width: 160 }],
  },
  {
    field: 'payment',
    children: [
      { field: 'paymentStartDate', width: 160 },
      { field: 'paymentName', width: 160 },
    ],
  },
  {
    field: 'deleteTenant',
    cellRenderer: ButtonElementVue,
    width: 160,
  },
  {
    field: 'console',
    children: [
      {
        field: 'consoleURL',
        width: 160,
      },
      {
        field: 'consolePassword',
        cellRenderer: ButtonElementVue,
        width: 160,
      },
      {
        field: 'consoleOTP',
        cellRenderer: ButtonElementVue,
        width: 160,
      },
    ],
  },
];
