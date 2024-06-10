<template>
  <RouterLink :to="{ name: 'EntryView' }">
    <div class="sidebar-logo-cont">
      Provider
      <!-- <h-img :src="hybrixOpsSymbol" width="38px" height="38px" />
      <h-img v-if="!isClosed" :src="hybrixOpsText" width="100px" height="28px" /> -->
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import hybrixOpsSymbol from '@/assets/images/logo/hybrix-ops-symbol.svg';
import hybrixOpsText from '@/assets/images/logo/logo-hybrixops-provider-text.svg';

defineProps<{
  isClosed: boolean;
}>();
</script>

<style scoped lang="scss">
.sidebar-logo-cont {
  display: flex;
  margin-left: var(--gap-sm-2);
  align-items: center;
  transition: all var(--transition-duration-default) ease;
  cursor: pointer;
  font-size: 2.4rem;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--color-black);
  & > *:first-child {
    margin-right: var(--gap-sm-1);
  }
}
</style>
