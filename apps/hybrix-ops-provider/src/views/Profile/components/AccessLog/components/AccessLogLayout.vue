<template>
  <p class="access-log-title">Access Log</p>
  <div class="access-log-container">
    <div class="access-log-list">
      <p v-for="(option, idx) in optionList" class="access-log-list__item" :key="idx">
        <h-input
          v-if="option.invisible !== true"
          class="profile-text"
          :type="option.type"
          :label="option.label"
          :options="option.options"
          :model-value="option.modelValue"
        />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';

defineProps<{
  optionList: any[];
}>();

const profileImgSrc = ref('');
const getProfille = () => {
  const userInfo = useUserStore().userInfo;
  profileImgSrc.value = userInfo?.profileImg ?? '@/assets/images/backgrounds/bg-user-profile.png';
};
onMounted(() => getProfille());
</script>

<style scoped lang="scss">
.access-log {
  &-title {
    font-size: 1.8rem;
    margin: var(--gap-sm-1) 0 var(--gap-sm-2) var(--gap-2);
  }
  &-container {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-gray-20);
    font-size: 1.4rem;
  }
  &-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    &__item {
      padding: var(--gap-sm-2) var(--gap-2);
      border-bottom: 1px solid var(--color-gray-20);
    }
  }
}
</style>
