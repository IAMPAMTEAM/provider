<template>
  <div class="select-cell">
    <div class="select-area">
      <q-select
        v-model="selectedValue"
        dense
        borderless
        @update:model-value="updateSelected"
        :disable="params.disable"
        :options="options"
      >
        <template #selected-item>
          <q-item
            class="selected"
            :class="{
              'severity-normal': selectedValue === 'normal',
              'severity-warning': selectedValue === 'warning',
              'severity-critical': selectedValue === 'critical',
            }"
          >
            <q-item-section> {{ selectedValue }}</q-item-section>
          </q-item>
        </template>
        <template #option="{ opt, selected, toggleOption }">
          <q-item :selected="selected" class="select-option">
            <q-item-section :class="opt" @click="toggleOption(opt)">{{ opt }}</q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IDetailCellRendererParams } from 'ag-grid-community';

const props = defineProps<{ params: IDetailCellRendererParams & { disable?: boolean } }>();
const selectedValue = ref(props.params.value ?? '');
const options = ['Normal', 'Warning', 'Critical'];
const updateSelected = (val: string) => {
  selectedValue.value = val;
  if (props.params.setValue) props.params.setValue(val);
};
</script>

<style scoped lang="scss"></style>
