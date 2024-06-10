import bgUserProfile from '@/assets/images/backgrounds/bg-user-profile.png';
import ButtonElementVue from '@/components/HDataTable/_partials/ButtonElement.vue';

const updatePreviewProfileImage = (profileImg: any) => {
  if (profileImg && profileImg !== '') {
    return profileImg;
  }
  return bgUserProfile;
};

export const defaultAccountColumns = [
  { field: 'displayName', width: 160 },
  { field: 'urn', width: 220 },
  {
    field: 'profileImg',
    width: 100,
    cellRenderer: (params: any) =>
      `<img style="width: 100%; height: 100%; object-fit: contain;" src=${updatePreviewProfileImage(
        params.data.profileImg
      )} />`,
  },
  { field: 'email', width: 200 },
  { field: 'loginLocation', width: 160 },
  { field: 'lastLoginDate', width: 160 },
  {
    field: 'socialLoginUnsubscribing',
    cellRenderer: ButtonElementVue,
    width: 160,
    headerName: 'Unsubscribe',
  },
];

export const parseAccountItem = (item: any) => {
  return {
    displayName: item?.displayName,
    urn: item?.urn?.urn,
    profileImg: item?.profileImg,
    email: item?.email,
    loginLocation: item?.loginLocation,
    lastLoginDate: item?.lastLoginDate,
  };
};
