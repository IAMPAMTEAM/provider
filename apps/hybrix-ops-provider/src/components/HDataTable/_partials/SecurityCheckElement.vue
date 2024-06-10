<template>
  <div class="security-check">
    <div class="security-check-date">
      {{ params.value }}
    </div>
    <button class="security-check-button" @click="securityCheck">Check</button>
  </div>
</template>

<script setup lang="ts">
import type { IDetailCellRendererParams } from 'ag-grid-community';
import dayjs from 'dayjs';

const props = defineProps<{ params: IDetailCellRendererParams }>();

const securityCheck = () => {
  if (props.params && props.params.setValue) {
    props.params.setValue(dayjs().format('YYYY-MM-DD'));
  }
};
</script>

<style scoped></style>
