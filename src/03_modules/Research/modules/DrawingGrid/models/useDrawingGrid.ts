import { clone2DArray } from '@common/utils/array.ts';
import  { type ModelRef } from 'vue';

export function useDrawingGrid(grid: ModelRef<number[][]>) {
  const paintOverCell = (rowIndex: number, columnIndex: number) => {
    const updatedGrid: number[][] = clone2DArray(grid.value);

    if (updatedGrid[rowIndex] === undefined) return;

    updatedGrid[rowIndex][columnIndex] = Number(!updatedGrid[rowIndex][columnIndex]);
    grid.value = updatedGrid;
  };

  return {
    paintOverCell,
  };
}
