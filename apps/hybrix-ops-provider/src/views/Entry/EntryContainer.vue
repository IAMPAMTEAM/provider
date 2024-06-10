<template>
  <main class="entry-container">
    <header class="entry-header">
      <!-- <h-img class="entry-header__logo" width="148px" height="38px" :src="izeroSymbol" /> -->
      <p class="entry-header__logo">Provider</p>
      <!-- <q-btn
        v-if="account.isLogin"
        class="entry-header__logout"
        label="Log Out"
        style="color: var(--color-purple-deep); background-color: var(--color-white)"
        @click="logout"
      /> -->
      <TheHeader />
    </header>

    <section class="entry-body">
      <EntryMenu />
      <!-- <EntryLogin v-else /> -->
    </section>
  </main>
</template>

<script setup lang="ts">
import EntryLogin from './components/EntryLogin.vue';
import EntryMenu from './components/EntryMenu.vue';
import { useAccountStore } from '@/store/account';
import logoHybrixOpsProviderBlack from '@/assets/images/logo/logo-hybrixops-provider-black.svg';
import izeroSymbol from '@/assets/images/logo/izero-symbol.svg';
import TheHeader from '@/components/Header/index.vue';

const account = useAccountStore();

const logout = () => {
  account.isLogin = false;
};
</script>

<style scoped lang="scss">
.entry {
  &-container {
    background: linear-gradient(130deg, var(--color-purple-deep) 0%, #2c2c2c 100%);
  }
  &-header {
    display: flex;
    height: var(--height-header);
    padding: 0 var(--gap-1);
    align-items: center;
    justify-content: space-between;
    &__logo {
      font-size: 2.4em;
      font-weight: bold;
      text-transform: uppercase;
      color: var(--color-white);
    }
    &__logout {
      margin-left: 24px;
    }
  }
  &-body {
    display: flex;
    height: calc(100vh - var(--height-header));
    align-items: center;
    justify-content: center;
  }
}
</style>
