<template>
  <q-btn v-bind="props" class="h-btn" :icon="icon" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QBtnProps } from 'quasar';

interface HBtnProps extends QBtnProps {
  icon?: string;
}

const props = defineProps<HBtnProps>();

// ICON
const isPath = (str: string) => /^(?:\/|(?:[A-Za-z]:)?[\\/])[\w.\-\\/]+$/.test(str);

const icon = computed(() => {
  if (props.icon && isPath(props.icon)) {
    return `img:${props.icon}`;
  }

  return props.icon;
});
</script>

<style scoped lang="scss">
// .h-btn:not(.q-btn--round) {
//   border-radius: 10px;
// }
</style>
