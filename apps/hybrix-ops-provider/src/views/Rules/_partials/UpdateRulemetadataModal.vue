<template>
  <q-dialog :model-value="popupShow" @update:model-value="updatePopupShow">
    <div class="rule-metadata-container">
      <div class="rule-metadata-header">
        {{ props.ruleName }}
      </div>
      <div class="rule-metadata-info">
        <div class="rule-metadata-info-child">
          <div class="rule-metadata-title">BEFORE</div>
          <div class="rule-metadata-before">
            <vue-json-pretty :data="beforeData"></vue-json-pretty>
          </div>
        </div>

        <div class="rule-metadata-info-child">
          <div class="rule-metadata-title">CURRENT</div>
          <div class="rule-metadata-current">
            <vue-json-pretty :data="currentData"></vue-json-pretty>
          </div>
        </div>
      </div>
      <div class="rule-metadata-footer">
        <!-- <span class="rule-metadata-message">{{ resMessage }}</span> -->
        <q-btn
          style="align-self: flex-end; margin: 0 1rem; width: 100px; border-radius: 0.5rem"
          label="적용"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { watch } from 'vue';
import { onMounted } from 'vue';

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

// import { getRuleTemplate, updateRuleTemplate } from '@/api/modules/home/rules';
const props = defineProps<{
  ruleName: string;
  popupShow: boolean;
}>();

const emit = defineEmits(['popup-changed']);

const updatePopupShow = (value: boolean) => {
  emit('popup-changed', value);
};

const beforeData = ref('');
const currentData = ref('');

// const fetch = async () => {
//   if (!props.popupShow || props.ruleName === '') return;

//   const res = await getRuleTemplate(props.ruleName);
//   if (res.data.value.data) {
//     const { before, current } = res.data.value.data;
//     beforeData.value = before;
//     currentData.value = current;
//   }
// };

// const resMessage = ref('');

// const ruleTemplateUpdate = async () => {
//   if (props.ruleName !== '') {
//     const res = await updateRuleTemplate(props.ruleName);
//     if (res.data.value.data) {
//       await fetch();
//       resMessage.value = '변경되었습니다.';
//     } else {
//       if (res.data.value.statusCode === 304) {
//         resMessage.value = '변경사항이 없습니다.';
//       } else {
//         resMessage.value = '오류가 발생했습니다.';
//       }
//     }
//   }
// };

// watch(
//   () => props.popupShow,
//   async () => {
//     resMessage.value = '';
//     if (props.popupShow) {
//       await fetch();
//     }
//   }
// );

// watch(
//   () => props.ruleName,
//   async () => {
//     if (props.popupShow) {
//       await fetch();
//     }
//   }
// );
// onMounted(async () => {
//   await fetch();
// });

onMounted(() => {});
</script>

<style scoped lang="scss">
.rule-metadata {
  &-container {
    display: flex;
    flex-direction: column;

    max-width: 1000px;
    padding: 1rem;
    background-color: #fff;
  }
  &-header {
    font-size: 2.4rem;
    font-weight: bold;
    text-transform: uppercase;
    align-self: center;
  }

  &-info {
    display: flex;

    padding: 10px;
    gap: 10px;
    &-child {
      flex: 1;
    }
  }
  &-title {
    font-size: 2rem;
    text-align: center;
  }
  &-before {
    flex: 1;
    max-height: 600px;
    padding: 1rem;
    border-radius: 1rem;
    overflow-y: scroll;
  }
  &-current {
    flex: 1;
    padding: 1rem;
    background-color: #e8e8e8;

    max-height: 600px;
    border-radius: 1rem;
    overflow-y: scroll;
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: right;
  }
  &-message {
    font-size: 1.6rem;
  }
}
</style>
