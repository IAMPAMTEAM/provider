<template>
  <div class="menu-cont">
    <div class="menu__title">Service Controller</div>

    <!-- TODO: Sidebar 값 전달 -->
    <div class="menu-cnt">
      <RouterLink
        class="menu-item"
        v-for="(menu, idx) in SIDEBAR_OPTIONS"
        :to="{ name: getNearestRouteName(menu.menus, idx) }"
        :key="idx"
        @click="setSelectedServiceIndex(idx)"
      >
        <div class="menu-item__icon-container">
          <h-img
            v-if="menu.title === 'Customer Management'"
            class="menu-item__icon"
            :src="icCustomerService"
          />
          <h-img v-else class="menu-item__icon" :src="menu.icon" />
        </div>
        <p class="menu-item__title">{{ menu.title }}</p>
      </RouterLink>
    </div>
    <h-btn padding="8px 82px" color="primary" label="로그아웃" @click="logout" />
  </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/components/Sidebar/store';
import { SIDEBAR_OPTIONS } from '@/components/Sidebar/constants';
import type { Menu } from '@/components/Sidebar/types';
import { useAccountStore } from '@/store/account';
import { useRouter } from 'vue-router';
import icCustomerService from '@/assets/images/icons/customer-service.svg';

const router = useRouter();

const account = useAccountStore();

const sidebarStore = useSidebarStore();

const setSelectedServiceIndex = (index: number) => {
  sidebarStore.setSidebarIndex(index);
};

const getNearestRouteName = (menus: Menu[], idx: number): string | undefined => {
  for (let i = 0; i < menus.length; i++) {
    const routeName = menus[i].routeName;
    const subMenus = menus[i].subMenus;

    if (routeName) return routeName;
    else if (!routeName && subMenus) return getNearestRouteName(subMenus, idx);

    break;
  }
};

// import icShield from '@/assets/images/icons/ic-shield.svg';
// import icNetwork from '@/assets/images/icons/ic-network.svg';
// import icBell from '@/assets/images/icons/ic-bell.svg';
// import icFlow from '@/assets/images/icons/ic-flow.svg';
// import icGear from '@/assets/images/icons/ic-gear.svg';

// const serviceList = [
//   { icon: icShield, title: 'SecOps', routeName: '사용자관리' },
//   { icon: icNetwork, title: 'NetOps', routeName: '네트워크자원관리_서버' },
//   { icon: icBell, title: 'EventOps', routeName: '이벤트실시간조회' },
//   { icon: icFlow, title: 'FlowOps', routeName: 'VPC Traffic' },
//   { icon: icGear, title: 'Setup', routeName: '계정관리_사용자' },
// ];

const logout = () => {
  account.isLogin = false;

  router.push({
    name: 'EntryView',
  });
};
</script>

<style lang="scss" scoped>
.menu {
  &-cont {
    text-align: center;
  }
  &__title {
    margin-bottom: var(--gap-4);
    color: var(--color-white);
    font-size: 6rem;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0 3px 6px var(--color-shadow);
  }
  &-cnt {
    display: flex;
    column-gap: var(--gap-1);
    margin-bottom: var(--gap-2);
    align-items: center;
    justify-content: space-between;
  }
  &-item {
    position: relative;
    display: flex;
    width: 100%;
    aspect-ratio: 1;
    max-height: 120px;
    background: rgba(250, 250, 250, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 4px var(--color-shadow);
    width: 18rem;
    // &__all {
    //   display: flex;
    // }
    &__icon {
      &-container {
        position: absolute;
        top: -40px;
        right: 0;
        left: 0;
        margin: 0 auto;
        display: flex;
        width: 80px;
        aspect-ratio: 1;
        background: linear-gradient(180deg, var(--color-orange) 0%, var(--color-purple-deep) 100%);
        border-radius: 50%;
        align-items: center;
        justify-content: center;
      }
      & {
        max-width: 40px;
        max-height: 40px;
        filter: invert(100%) sepia(94%) saturate(25%) hue-rotate(91deg) brightness(106%)
          contrast(100%);
      }
    }
    &__title {
      color: var(--color-white);
      font-size: 1.8rem;
      font-weight: 900;
      text-shadow: 2px 2px 3px #00000066;
      margin: calc(35px + var(--gap-sm-2)) auto 0 auto;
      max-width: 160px;
      height: 80px;
    }
  }
}
</style>
