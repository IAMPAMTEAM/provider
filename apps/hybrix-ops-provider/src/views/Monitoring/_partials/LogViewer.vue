<template>
  <Transition name="list">
    <div v-if="appName !== ''" class="log-viewer-container">
      <q-tabs v-model="selectedTab" align="left" active-bg-color="orange" active-color="white">
        <q-tab v-for="(tab, idx) in tabs" :name="tab" :label="tab" :key="idx"></q-tab>
      </q-tabs>
      <q-select
        v-model="selectedDate"
        :options="dates"
        label="dates"
        @update:model-value="onDateChanged"
      />

      <q-tab-panels v-model="selectedTab" animated>
        <q-tab-panel :name="'out'" :key="'out'">
          <div
            class="log-viewer-log"
            ref="outLogEl"
            @wheel.prevent="(e) => handleMouseScroll(e, 'out')"
          >
            <div v-for="(log, idx) in logs" :key="idx" class="log-viewer-line">
              <span class="dot">•</span>
              <div class="log">{{ log }}</div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel :name="'error'" :key="'error'">
          <div
            class="log-viewer-log"
            ref="errLogEl"
            @wheel.prevent="(e) => handleMouseScroll(e, 'err')"
          >
            <div v-for="(log, idx) in logs" :key="idx" class="log-viewer-line">
              <span class="dot">•</span>
              <div class="log">{{ log }}</div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { getDates, getLogs, getCurrentLogs } from '@/api/modules/monitoring';
import { useScroll } from '@vueuse/core';
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{ appName: string }>();

const selectedTab = ref('out');
const tabs = ref(['out', 'error']);

/** log, log viewers */
const logs = ref<any[]>([]);
const errLogEl = ref<HTMLElement | null>(null);
const outLogEl = ref<HTMLElement | null>(null);
const outLogArrived = useScroll(outLogEl).arrivedState;
const errLogArrived = useScroll(errLogEl).arrivedState;

const getScrollTop = (target: string) => {
  const container = target === 'out' ? outLogEl.value : errLogEl.value;

  return container ? container.scrollHeight : -1;
};

const handleMouseScroll = (event: WheelEvent, target: string) => {
  const container = target === 'out' ? outLogEl.value : errLogEl.value;

  if (container) {
    const delta = event.deltaY; // 마우스 스크롤 이벤트의 deltaY 값을 가져옵니다.
    container.scrollTop -= delta; // 스크롤 위치를 deltaY 값만큼 조정합니다.
  }
};

/** datas */
/**
 * props app name 바뀔시 dates부터 구한 후  nextKey, log 초기화 log 표시
 * out -> error 탭 변경시 dates부터 구한 후  nextKey, log 초기화 log 표시
 * date 변경시 -> log api만 호출  nextKey, log 초기화
 */

const nextKey = ref('');
const endKey = ref('');
const onDateChanged = (changedDate: string) => {
  selectedDate.value = changedDate;
  reset();
  appendBeforeLog('next');
};
const isFetching = ref(false);
const dates = ref<string[]>(['Current']);
const selectedDate = ref('Current');

const reset = () => {
  nextKey.value = '';
  logs.value = [];
  endKey.value = '';
};

const appendBeforeLog = async (mode: 'fetch' | 'next') => {
  if (mode === 'fetch') {
    const listDate = await getDates(props.appName, selectedTab.value);
    dates.value = ['Current', ...listDate.data.value];
    if (dates.value.length === 0) return;
    selectedDate.value = dates.value[0];
  }

  if (nextKey.value === '-1' || nextKey.value === '0') return;

  if (!isFetching.value) {
    isFetching.value = true;

    const res = await getLogs(
      props.appName,
      selectedDate.value === 'Current' ? '' : selectedDate.value,
      nextKey.value,
      selectedTab.value
    );
    if (res.data.value.lines) {
      logs.value.push(...(res.data.value.lines as any[]));
      nextKey.value = res.data.value.nextKey.toString();
      if (mode === 'fetch') {
        endKey.value = res.data.value.endKey ? res.data.value.endKey.toString() : '';
      }
    }

    isFetching.value = false;
  }
};

const appendCurrentLog = async () => {
  if (endKey.value && endKey.value !== '' && !isFetching.value) {
    isFetching.value = true;
    const res = await getCurrentLogs(
      props.appName,
      selectedDate.value === 'Current' ? '' : selectedDate.value,
      endKey.value,
      selectedTab.value
    );

    if (res.data.value.lines) {
      logs.value = [...res.data.value.lines, ...logs.value];

      endKey.value = res.data.value.endKey.toString();
    }
    isFetching.value = false;
  }
};

watch(selectedTab, async () => {
  reset();
  await appendBeforeLog('fetch');
});

watch(outLogArrived, async () => {
  if (outLogArrived.bottom) {
    await appendBeforeLog('next');
  } else if (outLogArrived.top && selectedDate.value === 'Current') {
    const scrollTop = getScrollTop('out');

    await appendCurrentLog();

    if (outLogEl.value) {
      outLogEl.value.scrollTop = outLogEl.value.scrollHeight - scrollTop;
    }
  }
});

watch(errLogArrived, async () => {
  if (errLogArrived.bottom) {
    await appendBeforeLog('next');
  } else if (errLogArrived.top && selectedDate.value === 'Current') {
    const scrollTop = getScrollTop('error');
    await appendCurrentLog();
    if (errLogEl.value) {
      errLogEl.value.scrollTop = scrollTop > 0 ? scrollTop : errLogEl.value.scrollTop;
    }
  }
});

watch(
  () => props.appName,
  async () => {
    reset();
    await appendBeforeLog('fetch');
  }
);
onMounted(async () => {
  if (props.appName) {
    reset();
    await appendBeforeLog('fetch');
  }
});
</script>

<style scoped lang="scss">
.log-viewer {
  &-container {
    width: 950px;
    transition: width 0.5s ease-in-out;
  }

  &-log {
    transition: all 0.5s ease-in-out;
    height: 500px;
    max-height: 500px;
    max-width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: #2b2b2b;
    overflow-y: scroll;
    transform: scaleY(-1);
  }

  &-line {
    transition: all 0.5s ease-in-out;
    transform: scaleY(-1);
    display: flex;
    font-size: 16px;
    color: white;
    & > .dot {
      padding-right: 10px;
    }
    & > .log {
      padding-bottom: 4px;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0.8;
  transform: translateX(600px);
}
</style>
