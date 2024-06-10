<template>
  <inline-svg v-if="isSvg" class="h-img" :src="src" :width="width" :height="height" />
  <q-img v-else v-bind="props" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InlineSvg from 'vue-inline-svg';
import type { QImgProps } from 'quasar';

interface HImgProps extends QImgProps {
  src?: string;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<HImgProps>(), {
  src: '',
});

const isSvg = computed(() => props.src?.endsWith('.svg'));
</script>
