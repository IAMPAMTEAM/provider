<template>
  <div class="edit-btn-cell-renderer">
    <q-btn label="edit" color="blue" @click="toggleShow" />
  </div>

  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 480px">
      <q-card-section class="edit-form-cont">
        <q-avatar v-if="params.data.profileImg" size="180px">
          <q-img :src="state.profileImg" />
        </q-avatar>

        <q-input
          v-if="params.data.displayName"
          outlined
          label="Display Name"
          v-model="state.displayName"
        />

        <q-input v-if="params.data.email" outlined label="Email" v-model="state.email" />

        <q-input
          v-if="params.data.tenantName"
          outlined
          label="Tenant Name"
          v-model="state.tenantName"
        />

        <q-select
          v-if="params.data.tenantStatus"
          outlined
          label="Tenant Status"
          v-model="state.tenantStatus"
          :options="TENANT_STATUS_OPTIONS"
        />

        <q-input
          v-if="params.data.companyName"
          outlined
          label="Company Name"
          v-model="state.companyName"
        />

        <q-input
          v-if="params.data.companyEmail"
          outlined
          type="email"
          label="Company Email"
          v-model="state.companyEmail"
        />

        <q-input
          v-if="params.data.companyContact"
          outlined
          label="Company Contact"
          v-model="state.companyContact"
        />

        <q-input
          v-if="params.data.businessNumber"
          outlined
          type="number"
          label="Company Business Number"
          v-model="state.businessNumber"
        />

        <q-input
          v-if="params.data.awsAccountId"
          outlined
          type="number"
          label="AWS Account Id"
          v-model="state.awsAccountId"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="Cancel" />
        <q-btn v-close-popup color="primary" label="Save" @click="saveRowData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRowDataStore } from '@/store/rowData';
import { updateAccount } from '@/api/modules/provider/account';
import { updateProviderAccount } from '@/api/modules/provider/provider-account';
import { updateTenant } from '@/api/modules/provider/tenant';
import { TENANT_STATUS_OPTIONS } from '@/constants';
import { ROW_DATA, type EditRowData } from '@/types';
import type { CellEvent } from 'ag-grid-community';

const rowDataStore = useRowDataStore();

const props = defineProps<{
  params: CellEvent;
}>();

const show = ref(false);
const toggleShow = () => (show.value = true);

const state = reactive({
  profileImg: props.params.data?.profileImg ?? undefined,
  email: props.params.data?.email ?? undefined,
  displayName: props.params.data?.displayName ?? undefined,
  tenantName: props.params.data?.tenantName ?? undefined,
  tenantStatus: props.params.data?.tenantStatus ?? undefined,
  companyName: props.params.data?.companyName ?? undefined,
  companyEmail: props.params.data?.companyEmail ?? undefined,
  companyContact: props.params.data?.companyContact ?? undefined,
  businessNumber: props.params.data?.businessNumber ?? undefined,
  awsAccountId: props.params.data?.awsAccountId ?? undefined,
});

type StateKey = keyof typeof state;

const EditRowDataMap = {
  editAccount: ROW_DATA.ACCOUNTS,
  editTenant: ROW_DATA.TENANTS,
  editProviderAccount: ROW_DATA.PROVIDER_ACCOUNT,
};

const EditFunctionMap = {
  editAccount: updateAccount,
  editTenant: updateTenant,
  editProviderAccount: updateProviderAccount,
};

const saveRowData = async () => {
  const { colDef, data, rowIndex } = props.params;

  if (rowIndex === null) {
    return;
  }

  Object.keys(state).forEach((k) => {
    const key = k as StateKey;
    state[key] === undefined && delete state[key];
  });

  const urn = data?.urn.urn;
  const field = colDef.field as EditRowData;

  await EditFunctionMap[field]({ urn, data: state });
  rowDataStore.updateRowData(EditRowDataMap[field], rowIndex, data, state);
};
</script>

<style lang="scss">
.edit-btn-cell-renderer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-form {
  &-cont {
    text-align: center;

    & > *:not(:last-child) {
      margin-bottom: var(--gap-sm-2);
    }
  }
}
</style>
