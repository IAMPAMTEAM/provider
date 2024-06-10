import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    setIsLogin() {
      this.isLogin = true;
    },
  },
});
