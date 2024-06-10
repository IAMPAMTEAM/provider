<!-- <template>
  <div class="security-check" @click="securityCheck">
    <span class="date">{{ params.value }}</span>
    <span class="check">점검</span>
  </div>
</template>

<script setup lang="ts">
import type { IDetailCellRendererParams } from 'ag-grid-community';
import dayjs from 'dayjs';

const props = defineProps<{ params: IDetailCellRendererParams }>();

const securityCheck = () => {
  if (props.params && props.params.setValue) {
    props.params.setValue(dayjs().format('YYYY-MM-DD'));
  }
};
</script>

<style scoped></style> -->
