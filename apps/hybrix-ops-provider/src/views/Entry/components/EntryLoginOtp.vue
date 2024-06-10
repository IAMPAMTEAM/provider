<template>
  <!-- <div class="otp-login__section" v-show="step === 'otp'"> -->
  <div class="otp-login__section">
    <form class="form">
      <div class="input__container" :class="{ 'border-up--focus': isOTPFocus }">
        <input
          class="otp__input"
          :type="otpType"
          placeholder="OTP"
          name="OTP"
          v-model="otp"
          @focus="onOTPFocus"
          @blur="onOTPBlur"
        />
        <button
          class="otp-show__button"
          :class="{
            'otp-show__button--click': isOTPShow,
            'border-up--focus': isOTPFocus,
          }"
          @click="toggleOTPType"
        >
          show
        </button>
        <div class="input-title__text" :class="{ 'color-change--focus': isOTPFocus }">
          Password
        </div>
      </div>
      <!-- <button class="login__button" @click="otpLogin">Login</button> -->
    </form>
    <div class="button__container">
      <button @click="moveRegister">회원가입</button>
      <div class="line"></div>
      <button @click="moveRegister">이메일 찾기</button>
      <div class="line"></div>
      <button @click="moveRegister">비밀번호 찾기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import loginApi from '@/api/module/LoginApi';
// import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// import { useStore } from '@/store/topology';

// const store = useStore();
const router = useRouter();

let step = ref('password');

let otp = ref('');
let otpType = ref('password');
let isOTPFocus = ref(false);
let isOTPShow = ref(false);

// let accessToken: string = '';

const onOTPFocus = () => {
  isOTPFocus.value = true;
};
const onOTPBlur = () => {
  isOTPFocus.value = false;
};
const toggleOTPType = (e: Event) => {
  e.preventDefault();
  isOTPShow.value = !isOTPShow.value;

  if (isOTPShow.value) {
    otpType.value = 'text';
  } else {
    otpType.value = 'password';
  }
};
// const otpLogin = async (e: Event) => {
//   try {
//     e.preventDefault();
//     const _otp = otp.value;
//     if (accessToken.length > 0) {
//       await loginApi.otpLogin(accessToken, _otp).then(async (res1) => {
//         if (res1.data.step === 'portal') {
//           await loginApi.twoFactorSessionLogin(accessToken).then((res2) => {
//             store.commit('setUser', res2.data);
//             store.commit('setSession', true);
//             store.commit('setIsLogin', true);
//             step.value = res1.data.step;
//             document.cookie = `jwt=${res1.data.accessToken}`;
//             accessToken = `Bearer ${res1.data.accessToken}`;
//           });
//         } else {
//           throw new Error('wrong response');
//         }
//       });
//     }
//   } catch (err) {
//     window.alert(err);
//     step.value = 'password';
//   }
// };

const moveRegister = () => {
  router.push({ name: 'RegisterView' });
};
</script>

<style scoped></style>
