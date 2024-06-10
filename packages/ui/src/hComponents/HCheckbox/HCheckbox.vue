<template>
  <q-checkbox class="h-checkbox" v-bind="props" />
</template>

<script setup lang="ts">
import type { QCheckboxProps } from 'quasar';

interface HCheckboxProps extends QCheckboxProps {}
const props = defineProps<HCheckboxProps>();
</script>

<style lang="scss">
.q-checkbox__bg {
  border-radius: 4px;
}
</style>
