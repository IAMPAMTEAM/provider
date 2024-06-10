<template>
  <q-dialog persistent :model-value="show" @hide="emit('close')">
    <q-card style="min-width: 480px">
      <q-card-section>
        <h2>Add Svg Icon</h2>
      </q-card-section>

      <q-card-section class="create-form-cont">
        <q-file filled bottom-slots v-model="state.image" label="image" counter>
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="state.image = null" class="cursor-pointer" />
          </template>

          <template v-slot:hint> Image Upload </template>
        </q-file>
        <q-input
          outlined
          label="name (required)"
          v-model="state.name"
          :rules="[(val) => !!val || 'name is required']"
        />
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
import { ref } from 'vue';

// const severityOptions = ref(['WARNING', 'CRITICAL']);
// const ifApplyOptions = ref(['TRUE, FALSE']);

defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['add', 'close']);

const state = reactive({
  image: null,
  url: '',
  name: '',
  category: '',
  tag: '',
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
