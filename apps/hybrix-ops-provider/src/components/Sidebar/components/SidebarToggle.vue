<template>
  <div
    v-show="!isPinned || isHover"
    class="toggle-icon"
    :class="{ open: isPinned }"
    @click="handleToggle"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isPinned: boolean;
  isHover: boolean;
}>();

const emit = defineEmits(['toggle']);

const handleToggle = () => emit('toggle');
</script>

<style scoped>
.toggle-icon {
  width: 25px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.toggle-icon span {
  background-color: #666;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  transition: all var(--transition-duration-default) cubic-bezier(0.8, 0.5, 0.2, 1.4);
}
.toggle-icon:not(.open):hover span:nth-child(1) {
  transform: scaleX(0.8);
}
.toggle-icon:not(.open):hover span:nth-child(2) {
  transform: scaleX(0.5);
}
.toggle-icon:not(.open):hover span:nth-child(3) {
  transform: scaleX(0.8);
}
.toggle-icon.open {
  justify-content: center;
}
.toggle-icon.open span:nth-child(1),
.toggle-icon.open span:nth-child(3) {
  display: none;
}
</style>
