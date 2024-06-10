<template>
  <div class="app-list-container">
    <div v-for="(app, idx) in apps" :key="idx" class="app-list-app">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" @click="onClickApp(app.name)">
          <div class="absolute-bottom">
            <div class="text-h2">{{ app.name }}</div>
          </div>
        </q-img>

        <q-card-actions>
          <q-btn flat>START</q-btn>
          <q-btn flat>STOP</q-btn>
          <q-btn flat>RELOAD</q-btn>
          <q-btn flat>RESTART</q-btn>
          <q-btn flat>LOG</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppStatus } from '../types';

const props = defineProps<{
  apps: AppStatus[];
}>();
const emit = defineEmits(['toggleApp']);
const onClickApp = (name: string) => {
  emit('toggleApp', name);
};
</script>

<style scoped lang="scss">
.app-list {
  &-container {
    flex: 1;
    display: inline-flex;
    justify-content: left;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    overflow-y: scroll;
    transition: all 0.5s ease-in-out;
    // height: 500px;
    min-width: 250px;
    max-height: inherit;
  }

  &-app {
    min-width: 420px;

    font-size: 20px;
    border-radius: 10px;
  }
}
</style>
