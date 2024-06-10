<template>
  <q-select v-bind="props" class="h-select" dense outlined>
    <template v-for="qSelectSlot in qSelectSlots" #[qSelectSlot]>
      <slot :name="qSelectSlot" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import type { QSelectProps, QSelectSlots } from 'quasar';

interface HSelectProps extends QSelectProps {}
const props = defineProps<HSelectProps>();

const qSelectSlots = Object.keys(useSlots()) as Array<keyof QSelectSlots>;
</script>

<style lang="scss">
.h-select {
  &.q-field--outlined .q-field__control {
    border-radius: 10px;
  }
}
</style>
