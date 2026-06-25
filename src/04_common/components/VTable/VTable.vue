<script setup lang="ts" generic="T">
import type { VTableProps } from './VTable.types';
import { FlexRender, useVueTable, getCoreRowModel } from '@tanstack/vue-table';
import { nextTick, ref, watch } from 'vue';

const props = defineProps<VTableProps<T>>();

const table = useVueTable({
  get data() {
    return props.data;
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
});

function isCellHighlighted(rowIndex: number, columnIndex: number): boolean {
  return rowIndex === props.rowIndexHighlight && columnIndex === props.columnIndexHighlight;
}

const activeCell = ref<HTMLElement | null>(null);

watch(
  () => props.columnIndexHighlight,
  async () => {
    await nextTick();

    if (!activeCell.value) return;

    activeCell.value.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  },
);
</script>

<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr class="row" v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan" class="column">
            <template v-if="!header.isPlaceholder">
              <flex-render :render="header.column.columnDef.header" :props="header.getContext()" />
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="table.getRowModel().rows.length === 0">
          <td :colspan="columns.length" class="column">{{ $t('table.empty') }}</td>
        </tr>
        <tr class="row" v-for="(row, rowIndex) in table.getRowModel().rows" :key="row.id">
          <td
            v-for="(cell, cellIndex) in row.getVisibleCells()"
            class="column"
            :ref="
              (el) => {
                if (cellIndex === props.columnIndexHighlight && rowIndex === props.rowIndexHighlight) {
                  activeCell = el as HTMLElement;
                }
              }
            "
            :class="{
              column__highlight: isCellHighlighted(rowIndex, cellIndex),
            }"
            :key="cell.id">
            <flex-render :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  border-radius: rem(4);
  border: 1px solid var(--border);
  overflow: clip;
}

.table {
  .row {
    border-bottom: 1px solid var(--border);

    @include hover {
      background: var(--accent);
    }

    &:last-child {
      border-bottom: none;
    }

    & th {
      border-bottom: 1px solid var(--border);
    }
  }

  .column {
    text-align: center;
    padding: rem(8);
    min-width: rem(60);
    min-height: rem(60);

    &__highlight {
      box-shadow: inset 0 0 0 rem(4) var(--destructive);
    }
  }
}
</style>
