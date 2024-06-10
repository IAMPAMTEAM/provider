<template>
  <div :id="uniqeId" class="h-dropdown-item">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { getRandomString } from '@hybrix/libs/src/random';
import type { Direction, Justify } from '../types';

const props = defineProps<{
  direction: Direction;
  justify: Justify;
}>();

const uniqeId = getRandomString(10);

const itemElement = computed<HTMLDivElement | undefined>(() => {
  const target = document.getElementById(uniqeId);
  if (target) {
    return target as HTMLDivElement;
  }
});

const wrapperElement = computed(() => {
  if (itemElement.value) {
    let target: HTMLElement | HTMLDivElement = itemElement.value;
    while (true) {
      if (Array.from(target.classList).includes('h-dropdown-wrapper')) {
        return target;
      } else if (target.tagName === 'BODY') {
        return undefined;
      } else {
        if (target.parentElement) target = target.parentElement;
      }
    }
  }
});

const position = reactive({
  top: '',
  left: '',
  bottom: '',
  right: '',
});

const translate = reactive({
  x: '',
  y: '',
});

const cssText = ref('');

const renderDirection = (direction: Direction) => {
  const wrapperRect = wrapperElement.value!.getBoundingClientRect();

  if (direction === 'top') {
    position.bottom = `${wrapperRect.height}px`;
  } else if (direction === 'right') {
    position.top = `0px`;
    position.left = `${wrapperRect.width}px`;
  } else if (direction === 'bottom') {
    position.top = `${wrapperRect.height}px`;
  } else if (direction === 'left') {
    position.top = `0px`;
    position.right = `${wrapperRect.width}px`;
  }

  cssText.value += `top:${position.top};right:${position.right};bottom:${position.bottom};left:${position.left};`;
};

const renderJustify = (direction: Direction, justify: Justify) => {
  const wrapperRect = wrapperElement.value!.getBoundingClientRect();
  const itemRect = itemElement.value!.getBoundingClientRect();

  if (direction === 'top' || direction === 'bottom') {
    if (justify === 'start') {
      // Do not need to translate
    } else if (justify === 'center') {
      translate.x = `${((itemRect.width - wrapperRect.width) / 2) * -1}px`;
    } else if (justify === 'end') {
      translate.x = `${(itemRect.width - wrapperRect.width) * -1}px`;
    }
  } else if (direction === 'left' || direction === 'right') {
    if (justify === 'start') {
      // Do not need to translate
    } else if (justify === 'center') {
      translate.y = `${((itemRect.height - wrapperRect.height) / 2) * -1}px`;
    } else if (justify === 'end') {
      translate.y = `${(itemRect.height - wrapperRect.height) * -1}px`;
    }
  }

  cssText.value += `translate: ${translate.x} ${translate.y}`;
};

onMounted(() => {
  renderDirection(props.direction);
  renderJustify(props.direction, props.justify);

  if (itemElement.value) {
    itemElement.value.style.cssText = cssText.value;
  }
});
</script>

<style scoped>
.h-dropdown-item {
  z-index: 10;
  position: absolute;
}
</style>
