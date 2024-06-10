<template>
  <div class="resource-type">
    <q-select
      filled
      :model-value="value"
      use-input
      hide-selected
      fill-input
      bg-color="transparent"
      :options="options"
      hide-dropdown-icon
      @filter="filterFn"
      @input-value="setModel"
      ref="selectRef"
      option
      hint="Text autocomplete"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import type { IDetailCellRendererParams } from 'ag-grid-community';

import { ref } from 'vue';

const props = defineProps<{
  params: IDetailCellRendererParams & {
    onChange: Function;
    options: string[];
  };
}>();

const value = ref(props.params.value);
const selectRef = ref();

const options = ref(props.params.options);

const filterFn = (val: string, update: Function) => {
  update(() => {
    const needle = val.toLocaleLowerCase();
    options.value = props.params.options.filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
  });
};
const setModel = (val: string) => {
  value.value = val;
  if (props.params.options.find((option) => option === val)) {
    props.params.onChange(val);
  }
};
</script>

<style scoped></style>
