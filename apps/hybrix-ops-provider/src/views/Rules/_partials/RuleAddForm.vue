<template>
  <q-dialog persistent :model-value="show" @hide="emit('close')">
    <q-card style="min-width: 480px">
      <q-card-section>
        <h2>Add Rule</h2>
      </q-card-section>

      <q-card-section class="create-form-cont">
        <q-input
          outlined
          label="checkRuleName (required)"
          v-model="state.checkRuleName"
          :rules="[(val) => !!val || 'checkRuleName is required']"
        />
        <q-input outlined label="checkRuleName-ko" v-model="state['checkRuleName-ko']" />
        <q-input outlined label="checkRuleID" v-model="state['checkRuleID']" />
        <q-input
          outlined
          label="description (required)"
          v-model="state['description']"
          :rules="[(val) => !!val || 'description is required']"
        />
        <q-input
          outlined
          label="description-ko (required)"
          v-model="state['description-ko']"
          :rules="[(val) => !!val || 'description-ko is required']"
        />
        <q-select
          outlined
          v-model="state['ifApply']"
          :options="ifApplyOptions"
          label="ifApply (required)"
          :rules="[(val) => !!val || 'ifApply is required']"
        />
        <q-input outlined label="triggerType" v-model="state['triggerType']" />
        <q-input
          outlined
          label="awsProductCode (required)"
          v-model="state['awsProductCode']"
          :rules="[(val) => !!val || 'awsProductCode is required']"
        />
        <q-input outlined label="lambdaName" v-model="state['lambdaName']" />
        <q-input outlined label="ismsCompliance" v-model="state['ismsCompliance']" />
        <q-select
          outlined
          v-model="state['defaultSeverity']"
          :options="severityOptions"
          label="defaultSeverity (required)"
          :rules="[(val) => !!val || 'defaultSeverity is required']"
        />
        <q-select
          outlined
          v-model="state['customerPersonalInfoSeverity']"
          :options="severityOptions"
          label="customerPersonalInfoSeverity (required)"
          :rules="[(val) => !!val || 'customerPersonalInfoSeverity is required']"
        />
        <q-select
          outlined
          v-model="state['financeSeverity']"
          :options="severityOptions"
          label="financeSeverity (required)"
          :rules="[(val) => !!val || 'financeSeverity is required']"
        />
        <q-select
          outlined
          v-model="state['awsResourceType']"
          multiple
          :options="awsResourceTypeOptions"
          label="awsResourceType (multi select)"
        />
        <q-select
          outlined
          v-model="state['awsNotAllowedRegions']"
          multiple
          :options="awsNotAllowedRegionsOptions"
          label="awsNotAllowedRegions (multi select)"
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

const severityOptions = ref(['WARNING', 'CRITICAL']);
const ifApplyOptions = ref(['TRUE, FALSE']);

defineProps<{
  show: boolean;
  awsResourceTypeOptions: string[];
  awsNotAllowedRegionsOptions: string[];
}>();

const emit = defineEmits(['add', 'close']);

const state = reactive({
  checkRuleName: '',
  'checkRuleName-ko': '',
  checkRuleID: '',
  description: '',
  'description-ko': '',
  criteria: '',
  'criteria-ko': '',
  ifApply: '',
  recommendation: '',
  'recommendation-ko': '',
  remediation: '',
  'remediation-ko': '',
  risk: '',
  'risk-ko': '',
  triggerType: '',
  identifier: '',
  awsProductCode: '',
  lambdaName: '',
  defaultSeverity: '',
  customerPersonalInfoSeverity: '',
  financeSeverity: '',
  ismsCompliance: '',
  awsResourceType: [],
  configRuleParams: null,
  awsNotAllowedRegions: [],
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
