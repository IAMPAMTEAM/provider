<template>
  <q-dialog persistent :model-value="show" @hide="emit('close')">
    <q-card style="min-width: 480px">
      <q-card-section>
        <h2>Add Tenant</h2>
      </q-card-section>

      <q-card-section class="create-form-cont">
        <q-input outlined label="Tenant Name" v-model="state.tenantName" />
        <q-input outlined label="Account Urn" v-model="state.accountUrn" />
        <q-input outlined label="Product Urn" v-model="state.productUrn" />
        <q-input outlined label="Company Name" v-model="state.companyName" />
        <q-input outlined label="Company Email" v-model="state.companyEmail" />
        <q-input outlined label="Company Contact" v-model="state.companyContact" />
        <q-input outlined label="Company Business Number" v-model="state.businessNumber" />
        <q-input outlined label="Payment Name" v-model="state.paymentName" />
        <q-input outlined label="AWS Account Id" v-model="state.awsAccountId" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="cancel" color="primary" />
        <q-btn v-close-popup label="add" color="primary" @click="handleAdd" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['add', 'close']);

const state = reactive({
  tenantName: '',
  accountUrn: '',
  productUrn: '',
  companyName: '',
  companyEmail: '',
  companyContact: '',
  businessNumber: '',
  paymentName: '',
  tenantStatus: 'Running',
  awsAccountId: '',
});

const handleAdd = () => emit('add', state);
</script>

<style scoped lang="scss">
.create-form {
  &-cont {
    & > *:not(:last-child) {
      margin-bottom: var(--gap-sm-2);
    }
  }
}
</style>
