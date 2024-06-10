<template>
  <div :style="`width: ${columnWidth}px; height: 41px; overflow: hidden`">
    <q-select style="width: auto; height: auto" v-model="value" multiple :options="params.list" />
  </div>
</template>

<script lang="ts">
/**
 * script setup으로 작동하지 않음.
 * value는 array여야 하며, param에 옵션을 전해줘야 함. string[]
 */
import type { ICellEditorParams } from 'ag-grid-community';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

export default {
  setup(props: { params: ICellEditorParams & { list: string[]; type?: string } }) {
    const value = ref(props.params.value);

    const getValue = () => {
      return value.value;
    };

    const onButtonClick = () => {
      value.value = dayjs().format('YYYY-MM-DD');
      props.params.stopEditing();
    };

    const columnWidth = computed(() => props.params.column.getActualWidth());

    return {
      value,
      getValue,
      onButtonClick,
      columnWidth,
    };
  },
};
</script>

<style scoped></style>
