<script setup lang="ts" generic="T">
import type { VTableProps } from './VTable';
import { FlexRender, useVueTable, getCoreRowModel } from '@tanstack/vue-table';

const props = defineProps<VTableProps<T>>();

const table = useVueTable({
  get data() {
    return props.data;
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr class="row" v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan" class="column">
            <template v-if="!header.isPlaceholder">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="table.getRowModel().rows.length === 0">
          <td :colspan="props.columns.length" class="column">{{$t('table.empty')}}</td>
        </tr>
        <tr class="row" v-for="row in table.getRowModel().rows" :key="row.id">
          <td class="column" v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  border-radius: rem(4);
  border: 1px solid var(--ring);
  overflow: hidden;
}

.table {
  .row {
    border-bottom: 1px solid var(--ring);

    @include hover {
      background: color-mix(in srgb, var(--muted) 15%, transparent);
    }

    &:last-child {
      border-bottom: none;
    }

    & th {
      border-bottom: 1px solid var(--ring);
    }
  }

  .column {
    text-align: center;
    padding: rem(8);
    min-width: rem(60);
    min-height: rem(60);
  }
}
</style>
