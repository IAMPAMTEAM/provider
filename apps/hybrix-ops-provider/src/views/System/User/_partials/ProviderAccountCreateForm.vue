<template>
  <q-dialog persistent :model-value="show" @hide="emit('close')">
    <q-card style="min-width: 480px">
      <q-card-section>
        <h2>Add Provider User</h2>
      </q-card-section>

      <q-card-section class="create-form-cont">
        <q-input outlined label="ID" v-model="state.providerId" />
        <q-input outlined label="Password" v-model="state.password" />
        <q-input outlined label="Display Name" v-model="state.displayName" />
        <q-input outlined label="Email" v-model="state.email" />
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

const state = reactive({
  providerId: '',
  provider: 'local',
  displayName: '',
  email: '',
  password: '',
});

defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['add', 'close']);
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
