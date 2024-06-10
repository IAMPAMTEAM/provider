<template>
  <div class="h-card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.h-card {
  width: 100%;
  height: 100%;
  padding: var(--gap-1);
  border-radius: 20px;
  background-color: var(--color-white);
  box-shadow: 0 1px 3px var(--color-shadow);
}
</style>
