<template>
  <div
    style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center"
  >
    <q-btn :class="color" text-color="white" size="90%" @click="onclick">{{ params.value }} </q-btn>
  </div>
  <!-- <div class="default-button">{{ params.value }}</div> -->
</template>

<script setup lang="ts">
import { deleteAccount } from '@/api/modules/home/account';
import { deleteProviderAccount } from '@/api/modules/home/provider-account';
import { removeTenantInfo } from '@/api/modules/home/tenant';
import type { IDetailCellRendererParams } from 'ag-grid-community';
import { ref, onMounted, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{ params: IDetailCellRendererParams; test: any }>();
const color = ref('primary');
let onclick = ref(() => {});

const onClckUnSubscribe = async (urn: string) => {
  await deleteAccount({ urn });
};

const onClickDeleteTenant = async (urn: string) => {
  await removeTenantInfo({ urn });
};

const onClickDeleteProviderAccount = async (urn: string) => {
  await deleteProviderAccount({ urn });
};

const resetPassword = async (urn: string) => {
  // await deleteAccount({ urn });
};

const resetOTP = async (urn: string) => {
  // await deleteAccount({ urn });
};

onMounted(() => {
  if (props.params && props.params.setValue) {
    let urn = props.params.data?.urn?.urn ?? props.params.data?.urn;
    switch (props.params?.colDef?.field) {
      case 'socialLoginUnsubscribing':
        props.params.setValue('Unsubscribe');
        color.value = 'danger';
        onclick.value = async () => {
          if (confirm('정말로 삭제하시겠습니까?')) {
            await onClckUnSubscribe(urn);
            router.go(0);
          }
        };
        break;
      case 'deleteTenant':
        props.params.setValue('Delete Tenant');
        color.value = 'danger';
        onclick.value = async () => {
          if (confirm('정말로 삭제하시겠습니까?')) {
            await onClickDeleteTenant(urn);
            router.go(0);
          }
        };
        break;
      case 'consolePassword':
        props.params.setValue('Reset Password');
        onclick.value = () => {
          if (confirm('비밀번호를 초기화하겠습니까?')) {
            console.log('Password reset');
            router.go(0);
          }
        };
        break;
      case 'consoleOTP':
        props.params.setValue('Reset OTP');
        onclick.value = () => {
          if (confirm('OTP를 초기화하겠습니까?')) {
            console.log('OTP reset');
            router.go(0);
          }
        };
        break;
      case 'deleteProviderAccount':
        props.params.setValue('Delete Account');
        color.value = 'danger';
        onclick.value = async () => {
          if (confirm('정말로 삭제하시겠습니까?')) {
            await onClickDeleteProviderAccount(urn);
            router.go(0);
          }
        };
        break;
      default:
        onclick.value = () => {
          console.log('default');
        };
    }
  }
});
</script>
