<template>
  <h-card>
    <div class="privilege-content-wrapper">
      <p class="privilege-content-title">Access Policy</p>
      <div class="privilege-content-item">
        <!-- <h-select label="계정 권한" v-model="privilegeOptions" /> -->
      </div>

      <PrivilegeLayout
        :privilege-option-list="privilegeOptions"
        :otp-option="otpOption"
        :access-option="accessOption"
      />
      <UpdateBtnLayout :option="updateBtnOption" />
    </div>
  </h-card>
</template>
<script setup lang="ts">
import PrivilegeLayout from './components/PrivilegeLayout.vue';
import UpdateBtnLayout from '../UpdateBtnLayout.vue';
import { useUserStore } from '@/store/user';

import { ref } from 'vue';

const privilegeOptions = [
  {
    label: 'Admin',
  },
  { label: 'General' },
];
const otpOption = {
  useOtp: useUserStore().userInfo?.authenType.otp ? 'require' : 'optional',
  // disabled: useUserStore().userInfo?.privilege !== 'Admin',
  disabled: true,
};
const accessOption = {
  disabled: true,
  modelValue: {
    SecOps: true,
    Diag: true, //useUserStore().userInfo?.privilege === 'Admin',
    Admin: true, //useUserStore().userInfo?.privilege === 'Admin',
  },
};
const updateBtnOption = {
  disabled: false,
};
</script>
<style scoped lang="scss">
.privilege-content {
  &-wrapper {
    margin-top: var(--gap-1);
  }
  &-title {
    font-size: 1.8rem;
    margin: var(--gap-sm-1) 0 var(--gap-sm-2) var(--gap-2);
  }
  &-item {
    padding: var(--gap-sm-2) var(--gap-2) 0;
    border-top: 1px solid var(--color-gray-20);
  }
}
</style>
