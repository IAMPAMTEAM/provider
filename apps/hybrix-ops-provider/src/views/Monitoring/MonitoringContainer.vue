<template>
  <main class="main">
    <q-tabs v-model="selectedTab" align="left" active-bg-color="orange" active-color="white">
      <q-tab v-for="(tab, idx) in tabs" :name="tab" :label="tab" :key="idx"></q-tab>
    </q-tabs>

    <q-card>
      <q-tab-panels v-model="selectedTab" animated class="monitoring-panels">
        <q-tab-panel v-for="(tab, idx) in tabs" :name="tab" :key="idx" class="monitoring-panel">
          <AppListContainer :apps="appList" @toggle-app="toggleApp"></AppListContainer>
          <LogViewer :appName="selectedApp" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </main>
</template>

<script setup lang="ts">
import AppListContainer from './_partials/AppListContainer.vue';
import LogViewer from './_partials/LogViewer.vue';
import { listApps } from '@/api/modules/monitoring';
import type { AppStatus } from './types';
import { ref, onMounted, computed } from 'vue';
import { watch } from 'vue';

const apps = ref<AppStatus[]>([]);
const tabs = ref<string[]>([]);
const selectedTab = ref('');
const selectedApp = ref('');
const toggleApp = (name: string) => {
  selectedApp.value = name;
};

const settingTabs = () => {
  tabs.value = [
    ...new Set(
      apps.value.filter((app) => app.name.includes('hybrix')).map((app) => app.name.split('-')[1])
    ),
  ];
  selectedTab.value = tabs.value[0];
};

const appList = computed<AppStatus[]>(() =>
  apps.value.filter((app) => app.name.includes(selectedTab.value))
);

watch(selectedTab, () => {
  selectedApp.value = '';
});

onMounted(async () => {
  const res = await listApps();
  apps.value = res.data.value.data;
  console.log(apps.value);
  settingTabs();
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.monitoring {
  &-panels {
    height: calc(100vh - 200px);
  }
  &-panel {
    display: flex;
    height: inherit;
    overflow-y: scroll;
  }
}
</style>
