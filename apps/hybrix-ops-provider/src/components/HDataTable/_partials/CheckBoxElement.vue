<template>
  <div class="cell-checkbox">
    <h-checkbox :disable="params.disable" v-model="value" @update:model-value="onCheckValue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IDetailCellRendererParams } from 'ag-grid-community';

const props = defineProps<{
  params: IDetailCellRendererParams & {
    disable?: boolean;
  };
}>();
const value = ref(props.params.value ? (props.params.value === 'false' ? false : true) : false);
const onCheckValue = () => {
  if (props.params && props.params.setValue) {
    props.params.setValue(value.value);
  }
};
</script>

<style scoped></style>
