<template>
  <div style="text-align: center">
    <q-img :src="params.data.url" style="width: 36px" />
    <!-- <p
      :key="props.params.data.name"
      style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px"
      v-html="props.params.data.image"
    ></p> -->
  </div>
</template>

<script setup lang="ts">
import type { CellEvent } from 'ag-grid-community';

const props = defineProps<{
  params: CellEvent;
}>();
</script>
<style scoped lang="scss"></style>
