<template>
  <div class="update-layout-wrapper">
    <div class="update-layout-container">
      <h-button label="Update" figure="outlined" color="primary" :disabled="option.disabled" />
      <span> </span>
      <h-button label="Cancel" figure="outlined" color="secondary" :disabled="option.disabled" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  option: any;
}>();
</script>

<style scoped lang="scss">
.update-layout {
  &-wrapper {
    display: flex;
    justify-content: end;
    margin-top: 2rem;
    font-size: 1.4rem;
  }
  &-container {
    display: flex;
    justify-content: end;
    align-items: center;
    & span {
      margin: 0 var(--gap-sm-1);
    }
  }
}
</style>
