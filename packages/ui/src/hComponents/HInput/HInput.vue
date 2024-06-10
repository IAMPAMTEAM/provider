<template>
  <q-input v-bind="props" class="h-input" outlined>
    <template v-for="qInputSlot in qInputSlots" #[qInputSlot]>
      <slot :name="qInputSlot" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import type { QInputProps, QInputSlots } from 'quasar';

interface HInputProps extends QInputProps {}
const props = defineProps<HInputProps>();

const qInputSlots = Object.keys(useSlots()) as Array<keyof QInputSlots>;
</script>

<style lang="scss">
// .h-input {
//   &.q-field--outlined .q-field__control {
//     border-radius: 10px;
//   }
// }
</style>
