import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';

export type UserPrivilege = 'Admin' | 'General';

export interface UserInfo {
  authenType: { password: boolean; otp: boolean };
  chatRoomInfos: any[];
  createDate: string;
  displayname: string;
  email: string;
  isLocked: boolean;
  isPwReset: boolean;
  lastLogin: string;
  lastLoginDate: string;
  lastLogout: string;
  lastPwChange: string;
  lockType: 'Unlock';
  loginFails: number;
  loginLocation: string;
  notiGroups: any[];
  notiRoomInfos: any[];
  password: string;
  phone: string;
  portalPolicyUrn: string;
  privilege: string;
  profileImg: string;
  team: any;
  tenantName: string;
  urn: {
    revision: { revisionDate: string; revisionSequence: string };
    savePolicy: 'everyday' | 'static';
    urn: string;
  };
  userId: string;
  _id: string;
}

interface UserStoreState {
  userInfo: any;
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    userInfo: null,
    // {
    //   _id: '63c4d72502d6630ef3a32dd0',
    //   urn: {
    //     urn: 'urn:megazone:kr:megazone:tenant-user:tu-20230116000001',
    //     savePolicy: 'static',
    //     revision: {
    //       revisionDate: '20230116',
    //       revisionSequence: '000001',
    //     },
    //   },
    //   loginFails: 0,
    //   isLocked: false,
    //   lockType: 'Unlock',
    //   isPwReset: false,
    //   loginLocation: '127.0.0.1[US/TX]',
    //   team: {
    //     teamUrn: 'urn:megazone:kr:megazone:tenant-team:tt-20230106000001',
    //   },
    //   chatRoomInfos: [],
    //   notiRoomInfos: [],
    //   notiGroups: [],
    //   lastPwChange: '2023-01-16T04:48:36.883Z',
    //   lastLogin: '2023-01-16T04:48:36.883Z',
    //   lastLogout: '2023-01-16T04:48:36.883Z',
    //   createDate: '2023-01-16T04:48:36.883Z',
    //   userId: 'demo',
    //   password: '$2a$10$R8vK9b8z6Qvp5vi855g6OeTvFcvCdANJ1EqoR22cvmPb9EcPrUqFq',
    //   tenantName: 'megazone',
    //   displayname: '테스트사용자(데모/일반)',
    //   email: 'wanis@mz.co.kr',
    //   phone: '01012345678',
    //   profileImg:
    //     'https://hybrix-user-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/avatars/20220711163755_mzcloud-logo-2-new.png',
    //   privilege: 'Admin',
    //   authenType: {
    //     password: true,
    //     otp: true,
    //   },
    //   portalPolicyUrn: 'urn:megazone:kr:megazone:tenant-portalpolicy:tp-20221222000001',
    //   lastLoginDate: '2023-01-18T16:18:03+09:00',
    // },
  }),
  getters: {
    isLogin: ({ userInfo }) => {
      if (userInfo) return true;
      return false;
    },
  },
  actions: {
    logoutUser() {
      const cookies = useCookies();
      cookies.remove('hop_access_key');

      this.userInfo = null;
    },
  },
});
