<template>
  <div class="password-layout-container">
    <div class="password-layout-list">
      <div v-for="(option, idx) in optionList" class="password-layout-list__item" :key="idx">
        <h-input
          v-if="option.invisible !== true"
          :class="`option-list__item__${idx}`"
          :type="option.type"
          v-model="option.label"
        ></h-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  optionList: any[];
}>();
</script>

<style scoped lang="scss">
.password-layout {
  &-container {
    display: flex;
    border-top: 1px solid var(--color-gray-20);
    border-bottom: 1px solid var(--color-gray-20);
    font-size: 1.4rem;
  }
  &-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    &__item {
      padding: var(--gap-sm-2) var(--gap-2);
      &:not(:nth-last-child(1), :nth-last-child(2)) {
        border-bottom: 1px solid var(--color-gray-20);
      }
      & > span {
        margin-left: var(--gap-1);
      }
    }
  }
}
</style>
