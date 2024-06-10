<template>
  <div class="console-wrap">
    <TheSidebar />
    <div
      class="console-cont"
      :class="[
        { 'js-before-closed': sidebarStore.isBeforeClosed },
        { 'js-closed': sidebarStore.isClosed },
      ]"
    >
      <TheHeader />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSidebar from '@/components/Sidebar/Sidebar.vue';
import TheHeader from '@/components/Header/index.vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useSidebarStore } from '@/components/Sidebar/store';

const sidebarStore = useSidebarStore();

onBeforeRouteLeave(() => {
  sidebarStore.setSelector(false);
});
</script>

<style scoped lang="scss">
.console {
  &-wrap {
    min-height: 100vh;
    padding-left: var(--width-sidebar-opened);
    padding-bottom: var(--gap-1);
    background: var(--color-gray-3);
  }
  &-cont {
    max-width: var(--width-container);
    padding: 0 var(--gap-sm-1);
    transition: all var(--transition-duration-default) ease;
    &.js-before-closed,
    &.js-closed {
      transform: translateX(-100px);
    }
  }
}
</style>
