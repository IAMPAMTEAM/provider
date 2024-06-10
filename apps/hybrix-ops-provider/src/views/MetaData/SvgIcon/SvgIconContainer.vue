<template>
  <main class="main">
    <!-- <div class="svgicon__add">
      <input
        type="file"
        id="upload-file"
        @change="onFileSelected"
        accept=".xlsx"
        ref="fileInput"
        style="display: none"
      />
    </div> -->
    <div class="container">
      <div class="svgicon__header">
        <div class="svgicon__header__left"></div>
        <div class="svgicon__header__right">
          <q-btn label="파일 업로드" outlined @click="openFileInput" />
          <q-btn label="EXPORT" outlined @click="exportXlsx" />
        </div>
      </div>
      <h-card class="grid__card">
        <h-data-table
          ref="gridRef"
          :datas="svgIcon"
          :column-list="svgIconColumns"
          :settings="gridSettings"
          :style="`width: 100%; height: 100% ;`"
          @cell-changed="cellChanged"
        >
          <!-- @column-visible="onColumnVisibleChanged" -->
        </h-data-table>
      </h-card>
      <div class="rule__btn-create">
        <q-btn label="Create" class="q-mr-md" color="green" @click="toggleAddFormShow" />
        <SvgAddForm :show="addFormShow" @add="upsertSvg" @close="toggleAddFormShow" />
        <q-btn label="Remove" class="q-mr-md" color="red" @click="toggleRemoveFormShow" />
        <SvgDeleteForm :show="removeFormShow" @remove="removeSvg" @close="toggleRemoveFormShow" />
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
import { ref } from 'vue';
import { onMounted } from 'vue';
import { HttpStatusCode } from 'axios';
import HDataTable from '@/components/HDataTable/HDataTable.vue';
import { settings, columnDefs } from './datas';
import type { CellValueChangedEvent, ICellRendererParams } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import {
  findSvgIcon,
  updateSvgIcon,
  uploadSvgIcon,
  deleteSvgIcon,
} from '@/api/modules/provider/svgicons';
import { useRouter } from 'vue-router';
import SvgAddForm from './_partials/SvgAddForm.vue';
import SvgDeleteForm from './_partials/SvgDeleteForm.vue';

const router = useRouter();

const gridRef = ref();
const gridSettings = ref(settings);

const svgIcon = ref<any[]>([]);
const svgIconColumns = ref<ColDef[]>([]);

const selectedFile = ref<File | null>();

const isLoading = ref(true);

const addFormShow = ref(false);
const toggleAddFormShow = () => (addFormShow.value = !addFormShow.value);

const removeFormShow = ref(false);
const toggleRemoveFormShow = () => (removeFormShow.value = !removeFormShow.value);

const openFileInput = () => {
  const fileInput = document.getElementById('upload-file');
  if (fileInput) fileInput.click();
};

// const confirmFileUpload = () => {
//   if (selectedFile.value && confirm(`'${selectedFile.value.name}' 파일을 업로드하시겠습니까?`)) {
//     uploadFile();
//   } else {
//     selectedFile.value = null;
//   }
// };

// const uploadFile = async () => {
//   const formData = new FormData();
//   formData.append('file', selectedFile.value!);
//   const uploadRes = await uploadSvgIcon(formData);

//   if (uploadRes.data.value.statusCode !== HttpStatusCode.Ok) {
//     alert(uploadRes.data.value.message);
//   } else {
//     alert('업로드를 완료했습니다.');
//     await fetch();
//   }
// };

// const onFileSelected = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.files) {
//     const file = target.files[0];

//     if (file) {
//       selectedFile.value = file;
//       confirmFileUpload();
//     }
//   }
// };

const exportXlsx = () => {
  gridRef.value.exportAsExcel(true);
};

const cellChanged = async (e: CellValueChangedEvent | ICellRendererParams) => {
  if (!e.column) return;
  const updateSvgIconDto: any = {};
  // updateSvgIconDto['svgIconCode'] = e.data['svgIconCode'];
  // updateSvgIconDto[e.column.getColId()] = e.value;

  await updateSvgIcon(updateSvgIconDto);
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
  const res = await findSvgIcon({ query });
  svgIcon.value = res.data.value.data;
};
const setColumns = async () => {
  svgIconColumns.value = columnDefs;
  for (const column of svgIconColumns.value) {
    if (column.field === 'image') {
      column.cellStyle = (params) => {
        return { backgroundColor: '#EFEFEF' };
      };
    }
    if (column.editable) {
      column.headerComponentParams = {
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

const upsertSvg = async (payload: any) => {
  try {
    if (payload?.name === '' || !payload?.image) {
      alert('내용을 입력해주세요.');
      return;
    }
    // image upload
    const formData = new FormData();
    formData.append('file', payload.image!);
    const uploadRes = await uploadSvgIcon(payload.name, formData);

    if (uploadRes.data.value.statusCode !== HttpStatusCode.Ok) {
      alert(uploadRes.data.value.message);
    } else {
      alert('업로드를 완료했습니다.');
      await fetch();
    }
    const forValidate = Object.entries(payload).map(([key, value]: any) =>
      value == '' ? [key, undefined] : [key, value]
    );
    const value = Object.fromEntries(forValidate);
    const upsertSvgDto = { name: value.name, data: { name: value.name } };
    // const response = await updateSvgIcon(upsertSvgDto);
    // rowDataStore.addRowData(ROW_DATA.RULE, payload);
    if (uploadRes.data.value.statusCode === HttpStatusCode.Ok) {
      router.go(0);
    } else {
      alert(uploadRes.data.value.message);
    }
  } catch (e) {
    console.log((e as Error).message);
  }
};
const removeSvg = async (payload: { name: string }) => {
  try {
    if (payload.name === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const response = await deleteSvgIcon(payload);
    router.go(0);
  } catch (e) {
    console.log((e as Error).message);
  }
};

onMounted(async () => {
  await fetch();
  await setColumns();
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

.svgicon {
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
