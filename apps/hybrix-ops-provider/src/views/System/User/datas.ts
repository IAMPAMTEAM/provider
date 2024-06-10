import ButtonElementVue from '@/components/HDataTable/_partials/ButtonElement.vue';

export const defaultProviderAccountColumns = [
  { field: 'displayName', width: 160 },
  { field: 'urn', width: 220 },
  { field: 'profileImg', width: 100 },
  { field: 'email', width: 200 },
  { field: 'loginLocation', width: 160 },
  { field: 'lastLoginDate', width: 160 },
  {
    field: 'deleteProviderAccount',
    cellRenderer: ButtonElementVue,
    width: 160,
    headerName: 'Delete Account',
  },
];

export const parseProviderAccountItem = (item: any) => {
  return {
    displayName: item?.displayName,
    urn: item?.urn?.urn,
    profileImg: item?.profileImg,
    email: item?.email,
    loginLocation: item?.loginLocation,
    lastLoginDate: item?.lastLoginDate,
  };
};
