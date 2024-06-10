<template>
  <main class="main">
    <div class="rule__add">
      <input
        type="file"
        id="upload-file"
        @change="onFileSelected"
        accept=".xlsx"
        ref="fileInput"
        style="display: none"
      />
    </div>
    <div class="container">
      <div class="rule__header">
        <div class="rule__header__left"></div>
        <div class="rule__header__right">
          <q-btn label="파일 업로드" outlined @click="openFileInput" />
          <q-btn label="EXPORT" outlined @click="exportXlsx" />
        </div>
      </div>
      <h-card class="grid__card">
        <h-data-table
          ref="gridRef"
          :datas="awsService"
          :column-list="awsServiceColumns"
          :settings="gridSettings"
          :style="`width: 100%; height: 100% ;`"
          @cell-changed="cellChanged"
        >
          <!-- @column-visible="onColumnVisibleChanged" -->
        </h-data-table>
      </h-card>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { HttpStatusCode } from 'axios';
import HDataTable from '@/components/HDataTable/HDataTable.vue';
import { settings, columnDefs } from './datas';
import type { CellValueChangedEvent, ICellRendererParams } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import {
  findAwsService,
  updateAwsService,
  uploadAwsService,
} from '@/api/modules/provider/aws-service';

const gridRef = ref();
const gridSettings = ref(settings);

const awsService = ref<any[]>([]);
const awsServiceColumns = ref<ColDef[]>([]);

const selectedFile = ref<File | null>();

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
  const uploadRes = await uploadAwsService(formData);

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

const exportXlsx = () => {
  gridRef.value.exportAsExcel(true);
};

const cellChanged = async (e: CellValueChangedEvent | ICellRendererParams) => {
  if (!e.column) return;
  const updateAwsServiceDto: any = {};
  updateAwsServiceDto['awsServiceCode'] = e.data['awsServiceCode'];
  updateAwsServiceDto[e.column.getColId()] = e.value;

  await updateAwsService(updateAwsServiceDto);
};
// const onColumnVisibleChanged = async (e: ColumnVisibleEvent) => {
//   const column = e.column?.getColId();
//   const visible = e.column?.isVisible();
//   if (!column || visible === undefined) return;
//   setColumnVisible({
//     column,
//     visible,
//   });
// };

const fetch = async () => {
  const query = JSON.stringify({});
  const res = await findAwsService({ query });
  awsService.value = res.data.value.data;
};
const setColumns = async () => {
  awsServiceColumns.value = columnDefs;
  for (const column of awsServiceColumns.value) {
    if (column.field === 'awsServiceCode') {
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
  }
};
onMounted(async () => {
  await fetch();
  await setColumns();
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
</style>
