<template>
  <div class="object-cell" ref="cellRef">
    {{ params.value.displayName }}

    <q-popup-proxy
      class="cell-dialog"
      :model-value="detailShow"
      :target="true"
      @update:model-value="(val) => onUpdateShow(val)"
    >
      <div class="object-cell-item" :style="{ position: 'absolute', top: 100 }">
        {{ params.value }}
      </div>
    </q-popup-proxy>
  </div>
</template>

<script setup lang="ts">
import type { IDetailCellRendererParams } from 'ag-grid-community';
import { ref } from 'vue';

const props = defineProps<{ params: IDetailCellRendererParams }>();
const cellRef = ref();

const detailShow = ref(false);
const onUpdateShow = (val: boolean) => {
  detailShow.value = val;
};
</script>

<style scoped lang="scss"></style>
