<template>
  <div class="toggle-layout">
    <div class="edit-mode__text">Edit Mode</div>
    <q-toggle @click="handleToggle" v-model="canUpdate"></q-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import 'quasar';

const canUpdate = ref(false);
const emit = defineEmits(['toggle']);
const handleToggle = () => {
  emit('toggle', canUpdate);
};
</script>
<style scoped lang="scss">
.toggle-layout {
  width: 100%;
  font-size: 1.4rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.edit-mode__text {
  font-size: 20px;
  font-family: 'Roboto-Medium, Roboto';
  font-weight: 500px;
  margin-right: 8px;
}
</style>
