<template>
  <div class="login-cont">
    <div class="login__title">Service Controller</div>
    <EntryLoginEmail />
    <!-- <EntryLoginOtp v-if="false" />s -->
  </div>
</template>

<script setup lang="ts">
import EntryLoginEmail from './EntryLoginEmail.vue';
// import EntryLoginOtp from './EntryLoginOtp.vue';
</script>

<style lang="scss" scoped>
.login {
  &-cont {
    padding: var(--gap-2);
    border-radius: 8px;
    background-color: var(--color-white);
    box-shadow: 0 3px 6px var(--color-shadow);
  }
  &__title {
    margin-bottom: var(--gap-1);
    font-size: 4.8rem;
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>
