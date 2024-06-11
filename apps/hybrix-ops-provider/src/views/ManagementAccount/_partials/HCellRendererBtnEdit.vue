<template>
  <div class="edit-btn-cell-renderer">
    <q-btn label="edit" color="grey" @click="toggleShow" outline />
  </div>

  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 480px">
      <q-card-section class="edit-form-cont">
        <q-avatar v-if="params.data.profileImg" size="180px">
          <q-img :src="state.profileImage" />
        </q-avatar>

        <q-input
          v-if="params.data.profileImg"
          outlined
          label="Profile Image"
          v-model="state.profileImage"
        />

        <q-input
          v-if="params.data.displayName"
          outlined
          label="Display Name"
          v-model="state.displayName"
        />

        <q-input
          v-if="params.data.socialEmail"
          outlined
          label="Social Email"
          v-model="state.socialEmail"
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
import { ROW_DATA, type EditRowData } from '@/types';
import type { CellEvent } from 'ag-grid-community';
import { updateSocialUser } from '@/api/modules/provider/account';

const rowDataStore = useRowDataStore();

const props = defineProps<{
  params: CellEvent;
}>();

const show = ref(false);
const toggleShow = () => (show.value = true);

const state = reactive({
  profileImage: props.params.data?.profileImage ?? undefined,
  displayName: props.params.data?.displayName ?? undefined,
  socialEmail: props.params.data?.socialEmail ?? undefined,
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

  // const urn = data?.urn.urn;
  const field = colDef.field as EditRowData;

  // const {displayName, socialEmail} = data

  const displayName = state.displayName;
  const socialEmail = state.socialEmail;

  const res = {
    ...data,
    displayName,
    socialEmail,
  };

  await updateSocialUser({ data: res });

  // await EditFunctionMap[field]({ data: res });
  // rowDataStore.updateRowData(EditRowDataMap[field], rowIndex, data, state)

  // await EditFunctionMap[field]({ urn, data: state });
  // rowDataStore.updateRowData(EditRowDataMap[field], rowIndex, data, state);
};
</script>

<style lang="scss">
.edit-btn-cell-renderer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
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
