<template>
  <q-btn-toggle v-bind="props">
    <template v-for="slot in slots" #[slot]>
      <slot :name="slot" />
    </template>
  </q-btn-toggle>
</template>

<script setup lang="ts">
import type { QBtnToggleProps, QBtnSlots } from 'quasar';
import { useSlots } from 'vue';

interface HBtnToggleProps extends QBtnToggleProps {}

const props = defineProps<HBtnToggleProps>();
const slots = Object.keys(useSlots()) as Array<keyof QBtnSlots>;
</script>

<style scoped></style>
