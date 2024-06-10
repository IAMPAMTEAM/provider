<template>
  <div
    ref="dropdownRef"
    class="h-dropdown-wrapper"
    @click="setDropdownByClick"
    @mouseenter.prevent="setDropdownByHover"
    @mouseleave.prevent="setDropdownByHover"
  >
    <div class="h-dropdown-container">
      <slot />

      <Transition name="dropdown">
        <HDropdownItem v-if="isToggled" :direction="direction" :justify="justify">
          <slot name="content" />
        </HDropdownItem>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import HDropdownItem from './components/HDropdownItem.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { Direction, ExpandMode, Justify } from './types';

export interface DropdownProps {
  direction?: Direction;
  expandMode?: ExpandMode;
  justify?: Justify;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  direction: 'bottom',
  expandMode: 'hover',
  justify: 'start',
});

const isToggled = ref(false);

const setDropdownByClick = () => {
  if (props.expandMode === 'click') {
    isToggled.value = !isToggled.value;
  }
};

const setDropdownByHover = () => {
  if (props.expandMode === 'hover') {
    isToggled.value = !isToggled.value;
  }
};

const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => (isToggled.value = false));
</script>

<style scoped>
.h-dropdown-wrapper {
  position: relative;
  user-select: none;
  cursor: pointer;
}
.dropdown-enter-from {
  opacity: 0;
}
.dropdown-enter-active {
  transition: opacity 0.35s ease;
}
</style>
