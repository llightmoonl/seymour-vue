<script setup lang="ts">
import type { DrawingGridProps } from '../DrawingGrid';
import { useDrawingGrid } from '../models/useDrawingGrid.ts';
import { TAB_FOCUS, TAB_NO_FOCUS } from '@common/constants/a11y.ts';

defineProps<DrawingGridProps>();
const grid = defineModel<number[][]>('grid', { required: true });

const { paintOverCell } = useDrawingGrid(grid);
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
          :key="columnKey"
          :aria-disabled="disabled"
          :tabIndex="disabled ? TAB_NO_FOCUS : TAB_FOCUS"
          :aria-label="`${$t('drawing-grid.aria-label')} ${rowKey + 1}-${columnKey + 1} - ${column ? $t('drawing-grid.aria-label-filled') : $t('drawing-grid.aria-label-empty')}`"
          @click="() => !disabled && paintOverCell(rowKey, columnKey)"></td>
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
    border: 1px solid var(--text-primary);
  }

  & .filled {
    background-color: var(--text-primary);
  }

  & .disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>
