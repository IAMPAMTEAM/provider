<template>
  <div class="image-layout-container">
    <div class="image-layout-side">
      <img class="image-layout-side__img" :src="previewProfileImg" alt="test" />
      <div class="image-layout-side-upload-container">
        <button class="image-layout-side-upload__button" @click="fileUpload">
          업로드
        </button>
        <button class="image-layout-side-upload__button" @click="resetUpload">
          리셋
        </button>
      </div>
      <input
        class="fileUploader"
        type="file"
        multiple
        ref="fileRef"
        @change="UploadFiles"
      />
    </div>

    <div class="image-layout-list">
      <p v-for="(option, idx) in optionList" class="image-layout-list__item" :key="idx">
        <h-input
          v-if="option.invisible !== true"
          :type="option.type"
          :label="option.label"
          :options="option.options"
          :model-value="modelValues[idx]"
        />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';
import bgProfile from '@/assets/images/backgrounds/bg-user-profile.png';

defineProps<{
  optionList: any[];
  modelValues: any[];
}>();

const uploadImageFile = ref();
const previewProfileImg = ref();
const getProfille = () => {
  previewProfileImg.value = useUserStore().userInfo?.profileImg ?? bgProfile;
};
const fileRef = ref<HTMLInputElement>();

const fileUpload = () => {
  if (fileRef.value) fileRef.value.click();
};

const resetUpload = () => {
  if (fileRef.value) fileRef.value = undefined;
  previewProfileImg.value = useUserStore().userInfo?.profileImg;
};

const UploadFiles = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      previewProfileImg.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
  const target = e.target as HTMLInputElement;
  const files = target.files || [];
  const file = new FormData();
  file.append('image', files[0]);
  uploadImageFile.value = file;
};
onMounted(() => getProfille());
</script>

<style scoped lang="scss">
.image-layout {
  &-container {
    display: flex;
    border-top: 1px solid var(--color-gray-20);
    font-size: 1.4rem;
  }
  &-side {
    display: flex;
    flex-direction: column;
    width: 20%;
    min-width: 120px;
    background: var(--color-purple-transparent);

    position: relative;
    &__img {
      position: absolute;
      width: 60%;
      height: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 100px;
      object-fit: contain;
      border: 1px none; // none
      background-color: white; // white
    }
    .fileUploader {
      display: none;
    }
    &-upload {
      &-container {
        visibility: hidden;
        position: absolute;
        width: 100%;
        max-height: 30px;
        height: 50px;
        bottom: 0px;
      }
      &__button {
        position: relative;
        width: 50%;
        height: 100%;
        opacity: 60%;
        border: 1px solid;
        &:nth-child(1) {
          background-color: var(--color-blue-transparent);
        }
        &:nth-child(2) {
          background-color: var(--color-red-transparent);
        }
      }
    }
  }
  &-side:hover &-side-upload-container {
    visibility: visible;
  }
  &-list {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    &__item {
      padding: var(--gap-sm-2) var(--gap-2);
      &:not(:nth-last-child(1), :nth-last-child(2)) {
        border-bottom: 1px solid var(--color-gray-20);
      }
      & > span {
        margin-left: var(--gap-1);
      }
    }
  }
}
</style>
