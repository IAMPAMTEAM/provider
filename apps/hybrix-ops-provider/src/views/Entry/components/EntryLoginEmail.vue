<template>
  <q-form class="login-container" @submit="onSubmit">
    <div class="login__input">
      <q-input
        outlined
        clearable
        lazy-rules
        label="Username"
        v-model="username"
        :rules="usernameRules"
      />
    </div>

    <div class="login__input">
      <q-input
        outlined
        clearable
        lazy-rules
        label="Password"
        v-model="password"
        :rules="passwordRules"
        :type="isPasswordVisible ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
            @click="isPasswordVisible = !isPasswordVisible"
          />
        </template>
      </q-input>
    </div>

    <div class="login__button-container">
      <q-checkbox v-model="isLoginToBeSaved" id="save" label="Save Login Information" />

      <q-btn
        class="full-width"
        label="Login"
        type="submit"
        block
        style="background-color: var(--color-purple-deep); color: var(--color-white)"
      />

      <p v-if="loginErrorMessage" class="login__error-message">
        {{ loginErrorMessage }}
      </p>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { required, helpers } from '@vuelidate/validators';
import { useAccountStore } from '@/store/account';
import { loginProviderAccount } from '@/api/modules/provider/auth';

const account = useAccountStore();

const username = ref('');
const usernameRules = [(val: any) => !!val || 'Please enter your username.'];
const password = ref('');
const passwordRules = [(val: any) => !!val || 'Please enter your password.'];

const isLoginToBeSaved = ref(false);
const loginErrorMessage = ref('');
const isPasswordVisible = ref(true);

watch([username, password], () => (loginErrorMessage.value = ''));

const rules = computed(() => ({
  id: {
    required: helpers.withMessage('id를 입력해주세요.', required),
  },
  password: {
    required: helpers.withMessage('비밀번호를 입력해주세요.', required),
  },
}));

// const v$ = useVuelidate(rules, { username, password });

// const errorMessage = computed(() => ({
//   email: v$.value.email.$errors[0]?.$message,
//   password: v$.value.password.$errors[0]?.$message,
// }));

const onSubmit = async () => {
  try {
    const params = {
      providerId: username.value,
      password: password.value,
    };
    const res = await loginProviderAccount(params);
    // console.log(res?.data?.value?.data);
    if (!res?.data?.value?.data || res.data.value?.data.length === 0) {
      throw new Error('Please check username or password');
    }
    account.setIsLogin();
  } catch (error) {
    const { message } = error as Error;
    loginErrorMessage.value = message;
  }
};
</script>

<style scoped lang="scss">
.login {
  &-container {
    position: relative;
  }
  &__input {
    margin-bottom: var(--gap-sm-1);
  }
  &__error-message {
    position: absolute;
    bottom: -36px;
    color: var(--color-red);
    font-size: 1.8rem;
  }
}

.q-checkbox {
  margin-bottom: var(--gap-sm-1);
  transform: translate(-8px, 0);
  font-size: 1.4rem;
}
</style>
