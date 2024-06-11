<template>
  <main class="main">
    <div class="rule__add">
      <q-input label="이름" v-model="tagName" />
      <q-input label="타입" v-model="tagType" />
      <q-btn label="생성" outline @click="onInsertRuleTag" />
    </div>
    <div class="container">
      <h-card class="grid__card">
        <!-- <h-data-table
          :datas="rules"
          :column-list="ruleColumns"
          :settings="gridSettings"
          :style="`width: 100%; height: 100% ;`"
          @row-selected="onRowSelected"
        >  </h-data-table> -->
      </h-card>
    </div>
  </main>
</template>

<script setup lang="ts">
// import { getRules, insertRuleTag, getRuleTagColumn } from '@/api/modules/home/rules';
import HDataTable from '@/components/HDataTable/HDataTable.vue';
import { ref } from 'vue';
import type { Rule, RuleTagType } from './types';
import { onMounted } from 'vue';
import type { ColGroupDef, GetDetailRowDataParams } from 'ag-grid-community';
import type { RowSelectedEvent } from 'ag-grid-community';
// import { defaultRuleColumns } from './datas';

import type { CellValueChangedEvent } from 'ag-grid-community';

const rules = ref<Rule[]>([]);
const gridSettings = ref({
  masterDetail: true,
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: new Array(),

      onCellValueChanged: async (params: CellValueChangedEvent) => {
        const key = params.column.getId();
        const value = params.newValue;
        const RuleName = params.node.data['RuleName'];
        // if (RuleName) {
        //   await ruleTagEditing({
        //     key,
        //     value,
        //     RuleName,
        //   });
        // }
      },
    },
    // get the rows for each Detail Grid
    getDetailRowData: (params: GetDetailRowDataParams) => {
      params.successCallback(params.data.ruleTags);
    },
  },

  sideBar: {
    position: 'left',
    width: 300,
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: false,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
    ],
  },
  suppressRowTransform: false,
  sortable: true,
  resizable: true,
  pagination: true,
  paginationPageSize: 16,
  suppressMovable: false,
});
const selectedRule = ref<Rule>();
// const ruleColumns = ref<ColGroupDef[]>(defaultRuleColumns);

const tagName = ref('');
const tagType = ref('');

const onRowSelected = (e: RowSelectedEvent) => {
  if (e.rowIndex !== null && e.rowIndex >= 0) selectedRule.value = e.data;
};

const onInsertRuleTag = async () => {
  // await insertRuleTag({
  //   ruleTagName: tagName.value,
  //   ruleTagType: tagType.value,
  // });
  setTagColumns();
};

const setTagColumns = async () => {
  // const tagColumns: RuleTagType[] = (await getRuleTagColumn()).data.value;
  // gridSettings.value.detailCellRendererParams.detailGridOptions.columnDefs = tagColumns.map(
  //   (tagColumns) => ({
  //     field: tagColumns.ruleTagName,
  //     editable: true,
  //   })
  // );
};

onMounted(async () => {
  await setTagColumns();
  // const res = await getRules();
  // rules.value = res.data.value;
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

  display: flex;
  position: relative;
}

.rule {
  &__detail {
    position: absolute;
    top: 0;
    right: 0;
    padding: 3rem 0;
    background-color: white;
    width: 37%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-shadow: 0 3px 6px #00000029;
    padding-left: 10px;
    border-radius: 10px;
  }
  display: flex;
  &__key {
    font-size: 16px;
    flex: 1;
  }
  &__value {
    font-size: 13px;
    flex: 3;
  }
  &__add {
    display: flex;
  }
}
</style>
