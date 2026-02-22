<script setup lang="ts">
import DrawingGridBase from './DrawingGridBase.vue';
import { useDrawingGrid } from '../models/useDrawingGrid.ts';
import type { DrawingGridEditableProps } from '../DrawingGrid';

const props = defineProps<DrawingGridEditableProps>();
const grid = defineModel<number[][]>('grid', { required: true });

const { paintOverCell } = useDrawingGrid(grid);
const editDrawingCell = (rowKey: number, columnKey: number) => !props.disabled && paintOverCell(rowKey, columnKey);
</script>

<template>
  <drawing-grid-base :grid="grid" @click="editDrawingCell"></drawing-grid-base>
</template>
