<template>
  <div class="cell-date" ref="cellRef">
    {{ params.value }}
    <q-popup-proxy
      :model-value="calendarView"
      :target="params.eGridCell"
      @update:model-value="(val) => onUpdateShow(val)"
    >
      <q-date :model-value="currentValue" minimal @update:model-value="onDayClick" />
    </q-popup-proxy>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IDetailCellRendererParams } from 'ag-grid-community';
import dayjs from 'dayjs';

const props = defineProps<{ params: IDetailCellRendererParams }>();
const cellRef = ref();

const currentValue = ref(
  dayjs(props.params.value).isValid() ? dayjs(props.params.value).format('YYYY/MM/DD') : undefined
);

const calendarView = ref(false);

const scrollCallback = (mutationList: MutationRecord[]) => {
  const oldClass = mutationList[0].oldValue;
  const newClass = mutationList[0].target.firstChild?.parentElement?.getAttribute('class');

  //스크롤 도중 누른 calendar 생성될 시 사라짐 방지
  if (newClass && oldClass && newClass.length < oldClass.length) {
    return;
  }
  if (calendarView.value) {
    calendarView.value = false;
    observer = null;
  }
};

const onUpdateShow = (val: boolean) => {
  calendarView.value = val;
  if (calendarView.value) {
    const scrollbarEl = document.getElementsByClassName(
      'ag-scrollbar-invisible ag-apple-scrollbar'
    );
    const len = scrollbarEl.length;

    for (let i = len - 1; i >= scrollbarEl.length - 2; i--) {
      observer = new MutationObserver(scrollCallback);
      observer.observe(scrollbarEl[i], scrollObserverConfig);
    }
  }
};

let observer: null | MutationObserver = null;
const scrollObserverConfig = {
  attributes: true,
  childList: true,
  subtree: false,
  attributeOldValue: true,
};

const onDayClick = (updatedValue: any) => {
  if (props.params && props.params.setValue) {
    if (updatedValue === null) updatedValue = dayjs();
    props.params.setValue(dayjs(updatedValue).format('YYYY-MM-DD'));
    calendarView.value = false;
  }
};
</script>

<style scoped lang="scss"></style>
