<template>
  <div class="sidebar-selector-wrapper" @click="handleToggle">
    <div class="sidebar-selector-container">
      <h-img class="sidebar__icon" :src="sidebarServiceMenu" alt="서비스 선택" />
      <span v-if="!isClosed" class="sidebar-selector__selected">
        {{ sidebarOptions[selectedServiceIndex].title }}
      </span>
      <span v-if="!isClosed" class="sidebar-selector__arrow"></span>
    </div>
  </div>

  <Transition name="service-selector">
    <div v-if="isSelectorOpened" class="service-selector-wrapper">
      <div class="service-selector-container">
        <div class="service-selector__header">
          <span class="service-selector__header__title">Service</span>
          <div class="service-selector__header__button" @click="handleClose"></div>
        </div>

        <div
          v-for="(service, idx) in serviceList"
          class="service-selector__service"
          :key="idx"
          @click="handleSelect(idx)"
        >
          <h-img class="service-selector__service__icon" :src="service.icon" />
          <p class="service-selector__service__text">{{ service.title }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import sidebarServiceMenu from '@/assets/images/icons/sidebar-service-menu.svg';
import type { SidebarOption } from '../types';

const props = defineProps<{
  sidebarOptions: SidebarOption[];
  selectedServiceIndex: number;
  isClosed: boolean;
  isSelectorOpened: boolean;
}>();

const emit = defineEmits(['toggle', 'select', 'close']);

const serviceList = computed(() => {
  return props.sidebarOptions.map((sidebarOption) => ({
    title: sidebarOption.title,
    icon: sidebarOption.icon,
  }));
});

const handleClose = () => emit('close');

const handleSelect = (index: number) => emit('select', index);

const handleToggle = () => emit('toggle');
</script>

<style scoped lang="scss">
.sidebar__item {
  display: flex;
  font-size: 1.8rem;
  align-items: center;
}
.sidebar__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-right: var(--gap-sm-2);
  &__sub {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    margin: 0 var(--gap-sm-2);
    border-radius: 50%;
    border: 1px solid var(--color-gray-60);
  }
}
.sidebar-selector-wrapper {
  margin: var(--gap-1) 0;
  padding: 12px var(--gap-sm-2) 12px var(--gap-1);
  background-color: #212121;
  border-radius: 0 24px 24px 0;
  cursor: pointer;
}
.sidebar-selector-container {
  display: flex;
  align-items: center;
}
.sidebar-selector__title {
  font-size: 1.8rem;
  color: var(--color-white);
  margin-right: auto;
}
.sidebar-selector__selected {
  padding: 4px 12px;
  background-color: var(--color-purple-deep);
  border-radius: 500px;
  font-size: 1.2rem;
  color: var(--color-white);
}
.sidebar-selector__arrow {
  display: flex;
  width: 16px;
  height: 16px;
  margin-left: var(--gap-sm-2);
  align-items: center;
  justify-content: center;
  &::after {
    content: url('@/assets/images/icons/ic-arrow.svg');
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(104deg) brightness(103%) contrast(103%);
    rotate: -90deg;
  }
}
.service-selector-enter-active {
  transition: all var(--transition-duration-default) ease;
}
.service-selector-enter-from {
  opacity: 0;
  translate: -10px;
}

.service-selector-wrapper {
  position: absolute;
  top: 0;
  left: var(--width-sidebar-opened);
  width: 178px;
  height: 100vh;
  padding: var(--gap-sm-2) var(--gap-1);
  background-color: #212121;
}
.service-selector-container {
  display: flex;
  flex-direction: column;
  color: var(--color-white);
}
.service-selector__header {
  display: flex;
  margin-bottom: var(--gap-xs-1);
  font-size: 1.8rem;
  justify-content: space-between;
  &__button {
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &::after {
      content: url('@/assets/images/icons/ic-close.svg');
    }
  }
}
.service-selector__button {
  margin-top: var(--gap-sm-2);
  margin-bottom: 28px;
}
.service-selector__service {
  display: flex;
  flex-direction: column;
  margin-top: var(--gap-1);
  padding: var(--gap-sm-2) 0;
  border-radius: 10px;
  border: 1px solid #ffffff33;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-duration-default) ease;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f91c;
    border-color: var(--color-white);
  }
  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: var(--gap-sm-1);
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(104deg) brightness(103%) contrast(103%);
  }
  &__text {
    font-size: 1.4rem;
    text-align: center;
    color: var(--color-white);
  }
}
</style>
