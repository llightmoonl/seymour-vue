<script setup lang="ts">
import type { DrawingGridBaseEmits, DrawingGridBaseProps } from '../DrawingGrid';
import { TAB_FOCUS, TAB_NO_FOCUS } from '@common/constants/a11y.ts';
import { computed } from 'vue';

const props = defineProps<DrawingGridBaseProps>();
defineEmits<DrawingGridBaseEmits>();

const sizeStyle = computed(() => (props.size ? { width: `${props.size}px`, height: `${props.size}px` } : {}));
</script>

<template>
  <table class="drawing-grid">
    <tbody>
      <tr :key="rowKey" v-for="(row, rowKey) in grid">
        <td
          v-for="(column, columnKey) in row"
          class="column"
          :class="{
            filled: column,
            disabled: disabled,
          }"
          :style="sizeStyle"
          :key="columnKey"
          :aria-disabled="disabled"
          :tabIndex="disabled ? TAB_NO_FOCUS : TAB_FOCUS"
          :aria-label="`${$t('drawing-grid.aria-label')} ${rowKey + 1}-${columnKey + 1} - ${column ? $t('drawing-grid.aria-label-filled') : $t('drawing-grid.aria-label-empty')}`"
          @click="$emit('click', rowKey, columnKey)"></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.drawing-grid {
  border-collapse: collapse;

  & .column {
    width: 90px;
    height: 90px;
    border: 1px solid var(--foreground);
  }

  & .filled {
    background-color: var(--foreground);
  }

  & .disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>
