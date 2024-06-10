import { defineStore } from 'pinia';
import { useSessionStorage, type RemovableRef } from '@vueuse/core';

interface SidebarStoreState {
  isHover: boolean;
  isPinned: boolean;
  isSelectorOpened: boolean;
  status: RemovableRef<number>;
  sidebarIndex: number;
}

export const useSidebarStore = defineStore('sidebar', {
  state: (): SidebarStoreState => ({
    isHover: false,
    isPinned: false,
    isSelectorOpened: false,
    status: useSessionStorage('sidebar-status', 0),
    sidebarIndex: 0,
  }),
  actions: {
    toggleHover() {
      this.isHover = !this.isHover;
    },
    togglePin() {
      this.isPinned = !this.isPinned;
    },
    toggleSelector() {
      this.isSelectorOpened = !this.isSelectorOpened;
    },
    setHover(flag: boolean) {
      this.isHover = flag;
    },
    setSelector(flag: boolean) {
      this.isSelectorOpened = flag;
    },
    setStatus(idx: number) {
      this.status = idx;
    },
    setSidebarIndex(idx: number) {
      this.sidebarIndex = idx;
    },
  },
  getters: {
    isBeforeClosed: ({ isHover, isPinned }) => {
      return isHover && isPinned;
    },
    isClosed: ({ isHover, isPinned }) => {
      return !isHover && isPinned;
    },
  },
});
