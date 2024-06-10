<template>
  <div class="resource-type">
    <q-select
      filled
      v-model="value"
      use-input
      use-chips
      fill-input
      multiple
      bg-color="transparent"
      input-debounce="0"
      :options="filterOptions"
      hide-dropdown-icon
      @filter="filterFn"
      ref="selectRef"
    />
  </div>
</template>

<script setup lang="ts">
import type { IDetailCellRendererParams } from 'ag-grid-community';

import { ref, watch } from 'vue';

const props = defineProps<{
  params: IDetailCellRendererParams & {
    onChange: Function;
    options: string[];
  };
}>();

const value = ref(
  !props.params.value
    ? []
    : !Array.isArray(props.params.value)
    ? props.params.value.split(',').map((keyword: string) => keyword.trim())
    : props.params.value
);

const selectRef = ref();

const filterOptions = ref(props.params.options);

const filterFn = (val: string, update: Function) => {
  update(() => {
    const needle = val.toLocaleLowerCase();
    filterOptions.value = props.params.options.filter(
      (v) => v.toLocaleLowerCase().indexOf(needle) > -1
    );
  });
};

watch(value, () => {
  props.params.onChange(value.value);
});
</script>

<style scoped></style>
