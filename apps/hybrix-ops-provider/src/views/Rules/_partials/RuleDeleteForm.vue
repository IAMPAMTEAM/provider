<template>
  <q-dialog persistent :model-value="show" @hide="emit('close')">
    <q-card style="min-width: 480px">
      <q-card-section>
        <h2>Remove Rule</h2>
      </q-card-section>

      <q-card-section class="create-form-cont">
        <q-input
          outlined
          label="checkRuleName (required)"
          v-model="state.checkRuleName"
          :rules="[(val) => !!val || 'checkRuleName is required']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="cancel" color="primary" />
        <q-btn v-close-popup label="delete" color="primary" @click="handleRemove" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['remove', 'close']);

const state = reactive({
  checkRuleName: '',
});

const handleRemove = () => emit('remove', state);
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
