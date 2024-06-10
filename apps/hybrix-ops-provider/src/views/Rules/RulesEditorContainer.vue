<template>
  <main class="main">
    <div class="rule__add">
      <input
        type="file"
        id="upload-file"
        @change="onFileSelected"
        accept=".json"
        ref="fileInput"
        style="display: none"
      />
    </div>

    <div class="container">
      <div class="rule__header">
        <div class="rule__header__left">
          <q-btn label="RESOURCE TYPES">
            <q-popup-proxy
              class="rule__popup"
              :model-value="resourceTypePopupShow"
              :target="true"
              @update:model-value="(val) => settingsPopShow(val, 'resourceType')"
            >
              <div class="popup__container">
                <!-- <q-input
                  class="popup__input"
                  :model-value="resourceInput"
                  @update:model-value="(e) => settingsInputChanged(e, 'resourceType')"
                >
                  <template v-slot:append>
                    <q-icon name="add" @click="settingsAdd('resourceType')"></q-icon>
                  </template>
                </q-input> -->
                <q-chip
                  :key="resource"
                  :v-model="resource"
                  @remove="settingsDelete(resource, 'resourceType')"
                  v-for="resource in resourceTypes"
                >
                  {{ resource }}
                </q-chip>
              </div>
            </q-popup-proxy>
          </q-btn>

          <q-btn label="SECURITY TERMS">
            <q-popup-proxy
              class="rule__popup"
              :model-value="securityTermsPopupShow"
              :target="true"
              @update:model-value="(val) => settingsPopShow(val, 'keyword')"
            >
              <div class="popup__container">
                <!-- <q-input
                  class="popup__input"
                  :model-value="keywordInput"
                  @update:model-value="(e) => settingsInputChanged(e, 'keyword')"
                >
                  <template v-slot:append>
                    <q-icon name="add" @click="settingsAdd('keyword')"></q-icon>
                  </template>
                </q-input> -->
                <q-chip
                  :key="keyword"
                  :v-model="keyword"
                  @remove="settingsDelete(keyword, 'keyword')"
                  v-for="keyword in keywords"
                >
                  {{ keyword }}
                </q-chip>
              </div>
            </q-popup-proxy>
          </q-btn>
          <q-btn label="REGION CODES">
            <q-popup-proxy
              class="rule__popup"
              :model-value="regionPopupShow"
              :target="true"
              @update:model-value="(val) => settingsPopShow(val, 'awsRegionCode')"
            >
              <div class="popup__container">
                <!-- <q-input
                  class="popup__input"
                  :model-value="awsRegionCodeInput"
                  @update:model-value="(e) => settingsInputChanged(e, 'awsRegionCode')"
                >
                  <template v-slot:append>
                    <q-icon name="add" @click="settingsAdd('awsRegionCode')"></q-icon>
                  </template>
                </q-input> -->
                <q-chip
                  :key="awsRegionCode"
                  :v-model="awsRegionCode"
                  @remove="settingsDelete(awsRegionCode, 'awsRegionCode')"
                  v-for="awsRegionCode in awsRegionCodes"
                >
                  {{ awsRegionCode }}
                </q-chip>
              </div>
            </q-popup-proxy>
          </q-btn>
        </div>
        <div class="rule__header__right">
          <q-btn label="Pack 생성" outlined @click="makePack" />
          <q-btn label="EXPORT" outlined @click="exportXlsx" />
        </div>
      </div>
      <h-card class="grid__card">
        <UpdateRulemetadataModal
          :popup-show="ruleTemplatePopupShow"
          :rule-name="selectedRule"
          @popup-changed="(val) => (ruleTemplatePopupShow = val)"
        />

        <h-data-table
          ref="gridRef"
          :datas="rules"
          :column-list="ruleColumns"
          :settings="gridSettings"
          :style="`width: 100%; height: 100% ;`"
          @cell-changed="cellChanged"
          @column-visible="onColumnVisibleChanged"
        >
        </h-data-table>
      </h-card>
      <div class="rule__btn-create">
        <q-btn label="Create" class="q-mr-md" color="green" @click="toggleAddFormShow" />
        <RuleAddForm
          :show="addFormShow"
          :awsResourceTypeOptions="resourceTypes"
          :awsNotAllowedRegionsOptions="awsRegionCodes"
          @add="upsertRule"
          @close="toggleAddFormShow"
        />
        <q-btn label="Remove" class="q-mr-md" color="red" @click="toggleRemoveFormShow" />
        <RuleDeleteForm
          :show="removeFormShow"
          :awsResourceTypeOptions="resourceTypes"
          :awsNotAllowedRegionsOptions="awsRegionCodes"
          @remove="removeRule"
          @close="toggleRemoveFormShow"
        />
        <q-btn
          label="파일 업로드"
          class="q-mr-md"
          outline
          color="blue"
          outlined
          @click="openFileInput"
          disable
        />
      </div>

      <Transition>
        <div v-if="isLoading" class="rule-cloak">
          <q-spinner-ios color="primary" size="6rem" />
        </div>
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import {
  getRules,
  metadataEditing,
  uploadRuleMetadata,
  getRuleSettings,
  setColumnVisible,
  addSetting,
  deleteSetting,
  makePacks,
  upsertRules,
  deleteRules,
} from '@/api/modules/home/rules';
import { HttpStatusCode } from 'axios';

import { settings } from './datas';
import type { Rule } from '@/types';

import HDataTable from '@/components/HDataTable/HDataTable.vue';
import UpdateRulemetadataModal from './_partials/UpdateRulemetadataModal.vue';
import SingleSelectElement from '@/components/HDataTable/_partials/SingleSelectElement.vue';
import MultipleSelectChipElement from '@/components/HDataTable/_partials/MultipleSelectChipElement.vue';

import type {
  ColDef,
  ColumnVisibleEvent,
  ICellRendererParams,
  CellValueChangedEvent,
  GetContextMenuItemsParams,
} from 'ag-grid-community';
import { findAwsResourceType } from '@/api/modules/provider/aws-resourcetype';
import { findAwsRegion } from '@/api/modules/provider/aws-region';
import { useRowDataStore } from '@/store/rowData';
import { storeToRefs } from 'pinia';
import { ROW_DATA } from '@/types';
import RuleAddForm from './_partials/RuleAddForm.vue';
import RuleDeleteForm from './_partials/RuleDeleteForm.vue';
import { useRouter } from 'vue-router';
import HeaderComponent from './_partials/HeaderComponent.vue';
import { matEdit } from '@quasar/extras/material-icons';

const router = useRouter();

const rowDataStore = useRowDataStore();
// const { rule } = storeToRefs(rowDataStore);
const isLoading = ref(true);

const rules = ref<Rule[]>([]);

const gridRef = ref();
const gridSettings = ref(settings);

const ruleColumns = ref<ColDef[]>([]);

const keywords = ref<string[]>([]);
const resourceTypes = ref<string[]>([]);
const awsRegionCodes = ref<string[]>([]);

const selectedFile = ref<File | null>();

// 기존 file upload은 내부 처리가 부족해 /dump api로 변경, json 파일 업로드로 수정됨
const openFileInput = () => {
  const fileInput = document.getElementById('upload-file');
  if (fileInput) fileInput.click();
};

const confirmFileUpload = () => {
  if (selectedFile.value && confirm(`'${selectedFile.value.name}' 파일을 업로드하시겠습니까?`)) {
    uploadFile();
  } else {
    selectedFile.value = null;
  }
};

const uploadFile = async () => {
  const formData = new FormData();
  formData.append('file', selectedFile.value!);
  const uploadRes = await uploadRuleMetadata(formData);

  if (uploadRes.data.value.statusCode !== HttpStatusCode.Ok) {
    alert(uploadRes.data.value.message);
  } else {
    alert('업로드를 완료했습니다.');
    await fetch();
  }
};

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];

    if (file) {
      selectedFile.value = file;
      confirmFileUpload();
    }
  }
};

const makePack = async () => {
  await makePacks();
  alert('완료!');
};

const exportXlsx = () => {
  gridRef.value.exportAsExcel(true);
};

const cellChanged = async (e: CellValueChangedEvent | ICellRendererParams) => {
  if (!e.column) return;
  await metadataEditing({
    checkRuleName: e.data['checkRuleName'],
    key: e.column.getColId(),
    value: e.value,
  });
};

const onColumnVisibleChanged = async (e: ColumnVisibleEvent) => {
  const column = e.column?.getColId();
  const visible = e.column?.isVisible();
  if (!column || visible === undefined) return;
  setColumnVisible({
    column,
    visible,
  });
};

const selectedRule = ref('');
const ruleTemplatePopupShow = ref(false);

const keywordInput = ref('');
const securityTermsPopupShow = ref(false);

const resourceInput = ref('');
const resourceTypePopupShow = ref(false);

const awsRegionCodeInput = ref('');
const regionPopupShow = ref(false);

const addFormShow = ref(false);
const toggleAddFormShow = () => (addFormShow.value = !addFormShow.value);

const removeFormShow = ref(false);
const toggleRemoveFormShow = () => (removeFormShow.value = !removeFormShow.value);

const settingsInputChanged = (value: any, target: string) => {
  if (target === 'resourceType') {
    if (!value || value.length === 0) return;
    resourceInput.value = value;
  } else if (target === 'keyword') {
    if (!value || value.length === 0) return;
    keywordInput.value = value;
  } else if (target === 'awsRegionCode') {
    if (!value || value.length === 0) return;
    awsRegionCodeInput.value = value;
  }
};
const settingsAdd = async (target: string) => {
  if (target === 'resourceType') {
    const isExist = resourceTypes.value.findIndex(
      (resourceType) => resourceType === resourceInput.value
    );
    if (isExist < 0) {
      resourceTypes.value.push(resourceInput.value);
      await addSetting({ category: 'resourceTypes', name: resourceInput.value });

      resourceInput.value = '';
    }
  } else if (target === 'keyword') {
    const isExist = keywords.value.findIndex((keyword) => keyword === keywordInput.value);
    if (isExist < 0) {
      keywords.value.push(keywordInput.value);
      await addSetting({ category: 'keywords', name: keywordInput.value });

      keywordInput.value = '';
    }
  } else if (target === 'awsRegionCode') {
    const isExist = awsRegionCodes.value.findIndex((keyword) => keyword === keywordInput.value);
    if (isExist < 0) {
      awsRegionCodes.value.push(awsRegionCodeInput.value);
      await addSetting({ category: 'regions', name: awsRegionCodeInput.value });

      awsRegionCodeInput.value = '';
    }
  }
};
const settingsPopShow = (val: boolean, target: string) => {
  if (target === 'resourceType') {
    resourceTypePopupShow.value = val;
  } else if (target === 'keyword') {
    securityTermsPopupShow.value = val;
  } else if (target === 'awsRegionCode') {
    regionPopupShow.value = val;
  }
};
const settingsDelete = async (value: string, target: string) => {
  if (target === 'resourceType') {
    const idx = resourceTypes.value.findIndex((resource) => resource === value);

    if (idx >= 0) {
      await deleteSetting({
        category: 'resourceTypes',
        name: value,
      });
      resourceTypes.value.splice(idx, 1);
    }
  } else if (target === 'keyword') {
    const idx = keywords.value.findIndex((keyword) => keyword === value);

    if (idx >= 0) {
      await deleteSetting({
        category: 'keywords',
        name: value,
      });
      keywords.value.splice(idx, 1);
    }
  }
};

const fetch = async () => {
  const res = await getRules();
  rules.value = res.data.value;
  gridRef.value.setContext((params: GetContextMenuItemsParams) => {
    const result: any[] = ['copy'];
    if (params.node?.data['checkRuleType'] && params.node.data['checkRuleType'] === 'HYBRIXOPS') {
      result.push({
        // custom item
        name: 'Rule Metadata Apply',

        action: () => {
          selectedRule.value = params.node!.data['hybrixRuleName'];
          ruleTemplatePopupShow.value = true;
        },
      });
    }
    return result;
  });
};
const setColumns = async () => {
  const ruleSettingRes = await getRuleSettings();
  const query = JSON.stringify({});
  const resourceTypeRes = await findAwsResourceType({ query });
  const regionCodeRes = await findAwsRegion({ query });

  if (!ruleSettingRes || ruleSettingRes.data.value.length === 0) {
    alert('Rule Setting 정보 없음. DB.rule.rule_settings 데이터베이스 확인 요망 ');
    return;
  }
  if (!resourceTypeRes || resourceTypeRes.data.value.length === 0) {
    alert('ResourceType 정보 없음. DB.rule.aws_resourcetypes 데이터베이스 확인 요망 ');
    return;
  }
  if (!regionCodeRes || regionCodeRes.data.value.length === 0) {
    alert('Region 정보 없음. DB.rule.aws_regions 데이터베이스 확인 요망 ');
    return;
  }
  const ruleSettings = ruleSettingRes.data.value[0];

  keywords.value = ruleSettings.keywords;
  resourceTypes.value = resourceTypeRes.data.value.data.map((item: any) => item.awsResourceType);
  awsRegionCodes.value = regionCodeRes.data.value.data.map((item: any) => item.awsRegionCode);

  ruleColumns.value = ruleSettings.columns.map((column: ColDef) => {
    if (column.field === 'checkRuleName') {
      column.cellStyle = (params) => {
        return { backgroundColor: '#EFEFEF' };
      };
    }
    if (column.editable) {
      column.headerComponentParams = {
        name: 'Security Terms',
        template: `<div class="ag-cell-label-container" role="presentation">
                    <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
                    <div ref="eLabel" class="ag-header-cell-label" role="presentation">
                        <span ref="eSortOrder" class="ag-header-icon ag-sort-order ag-hidden"></span>
                        <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon ag-hidden"></span>
                        <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon ag-hidden"></span>
                        <span ref="eSortMixed" class="ag-header-icon ag-sort-mixed-icon ag-hidden"></span>
                        <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon ag-hidden"></span>
                        <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>
                        <span data-v-5467b966="" class="q-icon" aria-hidden="true" role="presentation" style="font-size: 18px;"><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" style="fill: none;"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></span>
                        <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
                    </div>
                </div>`,
      };
    }
    if (column.field === 'securityTerms') {
      column.cellRendererSelector = (params) => {
        const onChange = (value: string[]) => {
          params.value = value;
          cellChanged(params);
          gridRef.value.sizeFitByColumns([
            'securityTerms',
            'awsResourceType',
            'awsNotAllowedRegions',
          ]);
        };
        return {
          component: MultipleSelectChipElement,
          params: {
            onChange,
            options: keywords.value,
          },
        };
      };
    } else if (column.field === 'awsResourceType') {
      column.cellRendererSelector = (params) => {
        const onChange = async (value: string[]) => {
          params.value = value;
          await cellChanged(params);
          await fetch();
          await setColumns();
          await gridRef.value.setRowData(rules.value);
          gridRef.value.sizeFitByColumns([
            'securityTerms',
            'awsResourceType',
            'awsNotAllowedRegions',
          ]);
        };
        return {
          component: MultipleSelectChipElement,
          params: {
            onChange,
            options: resourceTypes.value,
          },
        };
      };
    } else if (column.field === 'awsNotAllowedRegions') {
      column.cellRendererSelector = (params) => {
        const onChange = async (value: string[]) => {
          params.value = value;
          await cellChanged(params);
          await fetch();
          await setColumns();
          await gridRef.value.setRowData(rules.value);
          gridRef.value.sizeFitByColumns([
            'securityTerms',
            'awsResourceType',
            'awsNotAllowedRegions',
          ]);
        };
        return {
          component: MultipleSelectChipElement,
          params: {
            onChange,
            options: awsRegionCodes.value,
          },
        };
      };
    } else if (column.field == 'ifApply') {
      column.cellRendererSelector = (params) => {
        const onChange = (value: string) => {
          if (value !== params.value) {
            params.value = value;
            cellChanged(params);
          }
        };
        return {
          component: SingleSelectElement,
          params: {
            onChange,
            options: ['TRUE', 'FALSE'],
          },
        };
      };
    } else if (
      column.field == 'defaultSeverity' ||
      column.field == 'financeSeverity' ||
      column.field == 'customerPersonalInfoSeverity'
    ) {
      column.cellRendererSelector = (params) => {
        const onChange = (value: string) => {
          if (value !== params.value) {
            params.value = value;
            cellChanged(params);
          }
        };
        return {
          component: SingleSelectElement,
          params: {
            onChange,
            options: ['WARNING', 'CRITICAL'],
          },
        };
      };
    }
    return column;
  });
};

const upsertRule = async (payload: Rule) => {
  try {
    if (
      payload.checkRuleName === '' ||
      payload['description-ko'] === '' ||
      payload['ifApply'] === '' ||
      payload['awsProductCode'] === '' ||
      payload['defaultSeverity'] === '' ||
      payload['customerPersonalInfoSeverity'] === '' ||
      payload['financeSeverity'] === ''
    ) {
      alert('내용을 입력해주세요.');
      return;
    }
    const forValidate = Object.entries(payload).map(([key, value]: any) =>
      value == '' ? [key, undefined] : [key, value]
    );
    const upsertRuleDto = Object.fromEntries(forValidate);
    const response = await upsertRules(upsertRuleDto);
    // rowDataStore.addRowData(ROW_DATA.RULE, payload);
    if (response.data.value.statusCode === HttpStatusCode.Ok) {
      router.go(0);
    } else {
      alert(response.data.value.message);
    }
  } catch (e) {
    console.log((e as Error).message);
  }
};

const removeRule = async (payload: { checkRuleName: string }) => {
  try {
    if (payload.checkRuleName === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const response = await deleteRules(payload);
    router.go(0);
  } catch (e) {
    console.log((e as Error).message);
  }
};

onMounted(async () => {
  await fetch();
  await setColumns();
  gridRef.value.sizeFitByColumns(['securityTerms', 'awsResourceType', 'awsNotAllowedRegions']);
  setTimeout(() => (isLoading.value = false), 100);
});
</script>

<style scoped lang="scss">
.main {
  &-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &-cont {
    flex: 1;
  }
}
.grid__card {
  height: 75vh;
  margin-bottom: 1rem;

  display: flex;
  position: relative;
}

.rule {
  &__add {
    display: flex;
  }
  &__header {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 2rem 1rem;
    &__left {
      flex: 1;
    }
    &__right {
      flex: 1;
      display: flex;
      justify-content: right;
    }
  }
  &__popup {
    max-width: 1080px;
    height: 500px;
    .popup__input {
      width: 240px;
      margin-bottom: 1rem;
    }
    .popup__title {
      font-size: 2.4rem;
      font-weight: bold;
    }
    .popup__container {
      max-width: 1080px;
      padding: 1rem;
    }
  }
}
.ag-theme-alpine .ag-icon-group {
  --ag-icon-font-family: 'Material Design Icons';
  --ag-icon-font-code-group: '\F0328';
}
.management-whitelist {
  &-cont {
    position: relative;
    height: calc(100vh - 118px);
    margin: var(--gap-1);
    margin-bottom: unset;
    padding: var(--gap-sm-2);
    border-radius: 8px;
    background: var(--color-white);
    box-shadow: var(--shadow-dev-1);
  }
  &-cloak {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--color-white);
  }
  &__btn-create {
    position: absolute;
    left: 16px;
    bottom: 14px;
  }
}
</style>
