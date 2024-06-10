<template>
  <div
    class="sidebar-cont"
    :class="[
      { 'js-before-closed': sidebarStore.isBeforeClosed },
      { 'js-closed': sidebarStore.isClosed },
    ]"
    @mouseenter.prevent="sidebarStore.toggleHover"
    @mouseleave.prevent="sidebarStore.toggleHover"
  >
    <div class="sidebar-container">
      <div class="sidebar-header">
        <SidebarLogo :is-closed="sidebarStore.isClosed" />
        <SidebarToggle
          :is-hover="sidebarStore.isHover"
          :is-pinned="sidebarStore.isPinned"
          @toggle="sidebarStore.togglePin"
        />
      </div>

      <!-- <SidebarSelector
        :sidebar-options="SIDEBAR_OPTIONS"
        :selected-service-index="selectedServiceIndex"
        :is-selector-opened="sidebarStore.isSelectorOpened"
        :is-closed="sidebarStore.isClosed"
        @toggle="sidebarStore.toggleSelector"
        @select="setSelectedServiceIndex"
        @close="closeSelector"
      /> -->
      <div class="separator-cont">
        <q-separator spaced="48px" :color="statusColor" />
        <div class="separator__selected">
          {{ SIDEBAR_OPTIONS[selectedServiceIndex]?.title }}
        </div>
      </div>

      <div class="sidebar-tree-wrap">
        <q-list class="sidebar-tree-cont" :class="{ 'js-closed': sidebarStore.isClosed }">
          <template
            v-for="(menu, menuIdx) in SIDEBAR_OPTIONS[selectedServiceIndex]?.menus"
            :key="menuIdx"
          >
            <!-- 💡 Paying Customers 개발 예정 (임시 비활성화) -->
            <q-item
              v-if="!menu.subMenus"
              ref="treeItemRefs"
              v-ripple
              :to="{ name: menu.routeName }"
              :key="menuIdx"
              @click="sidebarStore.setStatus(menuIdx)"
              :disable="menu.title === Service.MANAGEMENT_PAYING_CUSTOMERS"
            >
              <q-item-section avatar>
                <q-icon name="radio_button_unchecked" size="8px" />
                <!-- <h-img width="24px" height="24px" :src="icDot" /> -->
              </q-item-section>

              <q-item-section v-if="!sidebarStore.isClosed">
                <span>{{ menu?.title }}</span>
              </q-item-section>
            </q-item>

            <q-expansion-item
              v-else
              ref="treeItemRefs"
              group="sidebarItem"
              :icon="`img:${menu.icon}`"
              :expand-icon="statusExpandIcon"
              :label="statusLabel(menu?.title)"
            >
              <q-item
                v-for="(subMenu, subMenuIdx) in menu.subMenus"
                v-ripple
                :to="{ name: subMenu.routeName }"
                :key="subMenuIdx"
                @click="sidebarStore.setStatus(menuIdx)"
              >
                <q-item-section v-if="!sidebarStore.isClosed" avatar>
                  <q-avatar size="24px">
                    <q-icon name="radio_button_unchecked" size="8px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section v-if="!sidebarStore.isClosed">
                  <span>{{ subMenu?.title }}</span>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </template>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarLogo from './components/SidebarLogo.vue';
import SidebarToggle from './components/SidebarToggle.vue';
import SidebarSelector from './components/SidebarSelector.vue';
import icDot from '@/assets/images/icons/ic-dot.svg';

import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSidebarStore } from './store';

import 'smart-webcomponents/source/modules/smart.tree.js';
import type { Tree } from 'smart-webcomponents/source/typescript/smart.tree';

import { SIDEBAR_OPTIONS } from './constants';
import { computed } from 'vue';
import { onUnmounted } from 'vue';
import type { QExpansionItem, QItem } from 'quasar';

import { Service } from './enums';

const sidebarStore = useSidebarStore();

const treeItemRefs = ref<(QExpansionItem | QItem)[]>([]);

const isQExpansionItem = (arg: any): arg is QExpansionItem => {
  return arg.hide !== undefined;
};

const applySidebarStatus = () => {
  const target = treeItemRefs.value[sidebarStore.status];
  if (target && isQExpansionItem(target)) {
    target.show();
  }
};

const collapseSidebar = () => {
  treeItemRefs.value.forEach((el) => {
    if (isQExpansionItem(el)) el.hide();
  });
};

onMounted(() => applySidebarStatus());
onUnmounted(() => sidebarStore.setStatus(0));

watch(
  () => sidebarStore.isClosed,
  (flag) => {
    if (flag) {
      collapseSidebar();
      sidebarStore.setSelector(false);
    } else {
      applySidebarStatus();
    }
  }
);

const statusColor = computed(() => {
  return sidebarStore.isClosed ? 'transparent' : undefined;
});
const statusExpandIcon = computed(() => {
  return sidebarStore.isClosed ? 'none' : undefined;
});
const statusLabel = (title: string) => {
  return sidebarStore.isClosed ? undefined : title;
};

// const menus = computed(() => HYBRIX_OPS_MENUS.filter((menu) => true));

/**
 * @description
 * 새로고침을 하여도 선택한 서비스가 바뀌지 않기 위하여
 * route의 meta 정보에 title을 서비스 이름과 동일하게 기입해주세요.
 */
const router = useRouter();

const currentSidebar = SIDEBAR_OPTIONS.findIndex((option) => {
  if (option.menus.find((menu) => menu.routeName === router.currentRoute.value.name)) {
    return true;
  }
  if (
    option.menus.find((menu) =>
      menu.subMenus?.find((subMenu) => subMenu.routeName === router.currentRoute.value.name)
    )
  ) {
    return true;
  }
  // return option?.title === router.currentRoute.value.meta.title;
});

const selectedServiceIndex = ref(currentSidebar < 0 ? 0 : currentSidebar);
</script>

<style scoped lang="scss">
.sidebar {
  &-cont {
    z-index: 999;
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    width: var(--width-sidebar-opened);
    background: var(--color-gray-3);
    font-size: 1.6rem;
    user-select: none;
    transition: all var(--transition-duration-default) ease;
    &.js-before-closed {
      box-shadow: 3px 0 6px #0000000f;
    }
    &.js-closed {
      width: var(--width-sidebar-closed);
      padding: unset;
    }
  }
  &-header {
    display: flex;
    margin: 0 var(--gap-1) 20px 0;
    padding: var(--gap-sm-2) 0;
    align-items: center;
    justify-content: space-between;
  }
  &-tree {
    &-wrap {
      flex: 1;
      overflow: auto;
    }
    &-cont {
      height: 100%;
      margin-right: var(--gap-1);
      &.js-closed {
        margin-right: unset;
      }
    }
  }
}

.separator {
  &-cont {
    position: relative;
    margin-right: var(--gap-1);
  }
  &__selected {
    position: absolute;
    top: 50%;
    left: 23px;
    padding: 0 4px;
    background: var(--color-gray-3);
    color: var(--color-gray-20);
    font-size: 1.2rem;
    transform: translate(0, -50%);
    transition: all var(--transition-duration-default) ease;
    &.js-closed {
      left: 8px;
    }
  }
}

:deep(.q-item) {
  border-radius: 0 24px 24px 0;
}
:deep(.q-item__section--main) {
  overflow: hidden;
  width: min-content;
  white-space: nowrap;
}
:deep(.q-router-link--exact-active) {
  background: var(--color-purple-deep);
  color: var(--color-white);
  & * {
    stroke: var(--color-white);
  }
}
</style>
