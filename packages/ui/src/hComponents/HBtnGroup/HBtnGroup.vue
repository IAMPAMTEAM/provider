<template>
  <q-btn-group v-bind="props">
    <template v-for="qBtnGroupSlot in qBtnGroupSlots" #[qBtnGroupSlot]>
      <slot :name="qBtnGroupSlot" />
    </template>
  </q-btn-group>
</template>

<script setup lang="ts">
import type { QBtnGroupProps, QBtnGroupSlots } from 'quasar';
import { useSlots } from 'vue';

interface HBtnGroupProps extends QBtnGroupProps {}
const props = defineProps<HBtnGroupProps>();

const qBtnGroupSlots = Object.keys(useSlots()) as Array<keyof QBtnGroupSlots>;
</script>

<style scoped></style>
