<template>
  <div class="field2 ag-cell-label-container" role="presentation">
    <div class="field2 ag-header-cell-label" role="presentation">
      <span class="ag-header-cell-text" role="columnheader">asdf </span>
      <q-icon size="sm" :name="matEdit" />
      <span class="ag-header-icon ag-filter-icon"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Quasar from 'quasar';
import { matEdit } from '@quasar/extras/material-icons';
</script>
<style scoped lang="scss">
.field {
  width: 2em !important;
  height: 2em !important;
}
</style>
