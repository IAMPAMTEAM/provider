<template>
  <div class="profile-wrapper">
    <div class="profile-container">
      <smart-tabs ref="smartTabsRef" theme="hybrix" @change="onChange">
        <smart-tab-item label="Profile">
          <Profile v-show="selectedIndex === 0" />
        </smart-tab-item>
        <smart-tab-item label="Policy">
          <Privilege v-show="selectedIndex === 1" />
        </smart-tab-item>
        <smart-tab-item label="Access Log">
          <AccessLog v-show="selectedIndex === 2" />
        </smart-tab-item>
      </smart-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'smart-webcomponents/source/modules/smart.tabs.js';

import Profile from './components/Profile/Profile.vue';
import Privilege from './components/Privilege/Privilege.vue';
import AccessLog from './components/AccessLog/AccessLog.vue';

import { ref } from 'vue';

const smartTabsRef = ref();
const selectedIndex = ref(0);
const onChange = () => {
  // https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/
  selectedIndex.value = ~~smartTabsRef.value.getAttribute('selected-index');
};
</script>
<style scoped lang="scss">
.profile {
  &-wrapper {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: var(--gap-1);
    width: 100%;
    height: 100%;
  }
  &-container {
    grid-column: 2 / span 8;
  }
}
:deep(.smart-tabs) {
  --smart-tabs-default-width: 100%;
  --smart-tabs-default-height: 100%;
}
</style>
