<template>
  <header class="header-container">
    <!-- <div class="header__coin">
        <span class="header__coin__prefix">Coins</span>
        <span class="header__coin__amount">73,000</span>
      </div> -->

    <h-dropdown class="header-profile-container" justify="end" expand-mode="click">
      <img class="header-profile__avatar" alt="profiles" :src="profileImg()" />

      <template #content>
        <div class="header-profile__menu">
          <p class="header-profile__menu__item" v-for="(menu, idx) in availableMenuList" :key="idx">
            <RouterLink
              class="header-profile__menu__item__link"
              :to="{ name: getNearestRouteName(menu.menus) }"
              >{{ menu.title }}
            </RouterLink>
          </p>
          <p class="header-profile__menu__item">
            <a class="header-profile__menu__item__link" @click="logout">Log Out</a>
          </p>
        </div>
      </template>
    </h-dropdown>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { Settings, Service } from './enums';
import type { Menu } from './types';
import { HEADER_OPTION } from './constants';
import { useRouter } from 'vue-router';
import bgProfile from '@/assets/images/backgrounds/bg-user-profile.png';
import { useCookies } from '@vueuse/integrations/useCookies';

const router = useRouter();

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo!);
// const userInfo = ref<any>();

const profileImg = () => {
  if (userInfo?.value?.profileImg) return userInfo?.value?.profileImg;
  return bgProfile;
};

const getNearestRouteName = (menus: Menu[]): string | undefined => {
  for (let i = 0; i < menus.length; i++) {
    const routeName = menus[i].routeName;
    const subMenus = menus[i].subMenus;
    if (routeName) return routeName;
    else if (!routeName && subMenus) return getNearestRouteName(subMenus);

    break;
  }
};

const availableMenuList = computed(() => {
  // const menus = HEADER_OPTION;
  const menus = HEADER_OPTION.filter(
    (menu) => true
    /*menu.privileges.includes(userStore.userInfo.privilege)*/
  );
  return menus;
});

// const logoutUser = () => {
//   const cookies = useCookies();
//   cookies.remove('c_auth_token');

//   userStore.userInfo = null;
// };
const logout = () => {
  // logoutUser();
  router.push({ name: 'EntryView' });
};
</script>

<style scoped lang="scss">
.header {
  &-container {
    display: flex;
    height: var(--height-header);
    margin: var(--gap-1 0);
    padding-right: var(--gap-1);
    align-items: center;
    justify-content: flex-end;
  }
  &__coin {
    padding: 3px 15px;
    margin-right: 10px;
    color: var(--color-purple-deep);
    box-shadow: inset 4px 4px 8px #00000029;
    border-radius: 10px;
    &__prefix {
      font-size: 1.2rem;
      line-height: 1.7rem;
      margin-right: 0.5rem;
    }
    &__amount {
      font-size: 2.4rem;
      line-height: 3.5rem;
    }
  }
  &-profile {
    &__avatar {
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 50%;
      user-select: none;
    }
    &__menu {
      width: 180px;
      border-radius: 8px;
      background-color: #ebebeb;
      color: #666;
      font-size: 1.4rem;
      &__item {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:not(:last-child) {
          border-bottom: 1px solid var(--color-white);
        }
        &:hover {
          background-color: #ccc;
          &:last-child {
            border-radius: 0px 0px 8px 8px;
          }
          &:first-child {
            border-radius: 8px 8px 0px 0px;
          }
        }
        &__link {
          width: 100%;
          padding: 16px 8px;
        }
      }
    }
  }
}
</style>
