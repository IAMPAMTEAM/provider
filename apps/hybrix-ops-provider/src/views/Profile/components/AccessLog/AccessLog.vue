<template>
  <h-card>
    <div class="accesslog-content-wrapper">
      <AccountLockLayout :option-list="accountLockOption" />
      <AccessLogLayout :option-list="accessLogOption" />
      <AccessLogResetLayout />
    </div>
  </h-card>
</template>

<script setup lang="ts">
import AccountLockLayout from './components/AccountLockLayout.vue';
import AccessLogLayout from './components/AccessLogLayout.vue';
import AccessLogResetLayout from './components/AccessLogResetLayout.vue';
import { useUserStore } from '@/store/user';
import dayjs from 'dayjs';

const accountLockOption = [
  {
    type: 'text',
    label: 'Lock',
    modelValue: useUserStore().userInfo?.isLocked,
  },
  {
    type: 'text',
    label: 'Last Password Change',
    modelValue: (90 - dayjs().diff(useUserStore().userInfo?.lastPwChange, 'day')).toString(),
  },
  {
    type: 'text',
    label: 'Login Failed',
    modelValue: useUserStore().userInfo?.loginFails.toString(),
  },
  { invisible: true },
];
const accessLogOption = [
  {
    type: 'text',
    label: 'Login Location',
    modelValue: useUserStore().userInfo?.loginLocation,
  },
  { invisible: true },
  {
    type: 'text',
    label: 'Last Login',
    modelValue: useUserStore().userInfo?.lastLogin,
  },
  {
    type: 'text',
    label: 'Lost Logout',
    modelValue: useUserStore().userInfo?.lastLogin,
  },
];
</script>

<style scoped lang="scss">
.accesslog-content-wrapper {
  margin-top: var(--gap-1);
}
</style>
