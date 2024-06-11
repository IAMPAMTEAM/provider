<template>
  <div style="text-align: center">
    <q-img :src="params.data.profileImg" style="width: 36px" />
  </div>
</template>

<script setup lang="ts">
import type { CellEvent } from 'ag-grid-community';
import { onMounted } from 'vue';

defineProps<{
  params: CellEvent;
}>();
</script>
