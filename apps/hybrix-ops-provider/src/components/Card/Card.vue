<template>
  <div class="card-container">
    <div class="card-header">
      <span class="card-header__title">{{ title }}</span>

      <div class="card-header__btn">
        <span v-if="sub" class="card-header__btn__text" @click.stop="handleClickSub">
          {{ sub }}
        </span>

        <div v-if="icon" class="card-header__btn__icon" @click.stop="handleClickIcon">
          <h-img :src="icon" />
        </div>
      </div>
    </div>

    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface CardProps extends HTMLAttributes {
  title: string;
  sub?: string;
  icon?: string;
}

defineProps<CardProps>();

const emit = defineEmits(['iconClicked', 'subClicked']);

const handleClickIcon = () => emit('iconClicked');

const handleClickSub = () => emit('subClicked');
</script>

<style scoped lang="scss">
.card {
  &-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0px 1px 3px var(--color-shadow);
    transition: all 0.3s;
    &:hover {
      box-shadow: 0px 6px 10px var(--color-shadow);
    }
  }
  &-header {
    display: flex;
    padding: 0 var(--gap-sm-2);
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid var(--color-gray-20);
    background: var(--color-white);
    color: var(--color-gray-80);
    align-items: center;
    justify-content: space-between;
    &__title {
      padding: 6px 0;
      font-weight: 500;
      font-size: larger;
    }
    &__btn {
      display: flex;
      &__text {
        padding: 6px var(--gap-sm-1);
        border-left: 1px solid var(--color-gray-20);
        border-right: 1px solid var(--color-gray-20);
        color: var(--color-gray-40);
        cursor: pointer;
        &:hover {
          background: orange;
        }
      }
      &__icon {
        display: flex;
        width: 30px;
        height: 30px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        filter: invert(63%) sepia(11%) saturate(14%) hue-rotate(355deg) brightness(95%)
          contrast(92%);
        &:hover {
          background: orange;
          filter: unset;
        }
      }
    }
  }
  &-content {
    flex: 1;
    background: var(--color-white);
    border-radius: 0 0 8px 8px;
  }
}
</style>
