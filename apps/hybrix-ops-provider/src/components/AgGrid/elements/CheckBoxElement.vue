<!-- <template>
  <div class="custom-element">
    <div class="checkbox">
      <h-checkbox :model-value="params.value" @update="onCheckValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDetailCellRendererParams } from 'ag-grid-community';

const props = defineProps<{ params: IDetailCellRendererParams }>();

const onCheckValue = (e: any) => {
  if (props.params && props.params.setValue) {
    props.params.setValue(!props.params.value);
  }
};
</script>

<style scoped></style> -->
