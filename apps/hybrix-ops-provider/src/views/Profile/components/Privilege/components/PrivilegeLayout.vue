<template>
  <div class="otp-container">
    <div class="otp-title">OTP Policy</div>
    <!-- <div class="otp-option">
      <span>
        <input
          type="radio"
          name="otp"
          value="require"
          id="require"
          v-model="otpOption.useOtp"
          :disabled="otpOption.disabled"
        />
        <label for="require"> Required</label>
      </span>
      <span>
        <input
          type="radio"
          name="otp"
          value="optional"
          id="optional"
          v-model="otpOption.useOtp"
          :disabled="otpOption.disabled"
        />
        <label for="optional"> Optional</label>
      </span>
      <span>
        <h-button label="Reset OTP" :disabled="otpOption.disabled"></h-button>
      </span>
    </div> -->
  </div>

  <div class="privilege-container">
    <div class="privilege-title">Access Policy</div>
    <div class="privilege-option">
      <span>
        <h-check
          label="NetOps"
          :disabled="accessOption.disabled"
          :model-value="accessOption.modelValue.SecOps"
        ></h-check>
      </span>
      <span>
        <h-check
          class="this"
          label="SecOps"
          :disabled="accessOption.disabled"
          :model-value="accessOption.modelValue.Diag"
        ></h-check>
      </span>
      <span>
        <h-check
          label="ISMS-P"
          :disabled="accessOption.disabled"
          :model-value="accessOption.modelValue.Diag"
        ></h-check>
      </span>
      <span>
        <h-check
          label="Admin"
          :disabled="accessOption.disabled"
          :model-value="accessOption.modelValue.Admin"
        ></h-check>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  otpOption: any;
  accessOption: any;
}>();
</script>
<style scoped lang="scss">
.otp,
.privilege {
  &-container {
    display: flex;
    margin-top: var(--gap-1);
    height: 60px;

    border-top: 1px solid var(--color-gray-20);
    border-bottom: 1px solid var(--color-gray-20);
    font-size: 1.4rem;
  }
  &-title {
    display: flex;
    width: 20%;
    background: var(--color-purple-transparent);
    align-items: center;
    justify-content: center;
  }
  &-option {
    display: flex;
    width: 80%;
    padding: var(--gap-sm-1) 0;
    align-items: center;
    justify-content: space-evenly;
    input[type='radio'] {
      border: 0px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
