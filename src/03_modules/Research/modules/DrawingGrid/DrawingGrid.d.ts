import type { MaybeRefOrGetter } from 'vue';

export interface DrawingGridBaseProps {
  grid: MaybeRefOrGetter<number[][]>;
  disabled?: boolean;
  size?: number;
}

export interface DrawingGridBaseEmits {
  click: [rowKey: number, columnKey: number];
}

export type DrawingGridViewProps = DrawingGridBaseProps;

export type DrawingGridEditableProps = Omit<DrawingGridBaseProps, 'grid'>;
