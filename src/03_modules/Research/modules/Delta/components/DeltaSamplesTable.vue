<script setup lang="ts">
import { computed, h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';

import VTable from '@common/components/VTable/VTable.vue';
import type { VTableProps } from '@common/components/VTable/VTable.types';

import { SAMPLE_LENGTH } from '../models/constant';

type DeltaSamplesTableProps = Pick<VTableProps<number[]>, 'data' | 'rowIndexHighlight' | 'columnIndexHighlight'>;
defineProps<DeltaSamplesTableProps>();

const columns = computed<ColumnDef<number[]>[]>(() => {
  return [
    ...Array.from({ length: SAMPLE_LENGTH }, (_, i) => ({
      id: String(i),
      header: () => h('span', [h('span', 'x'), h('sub', {}, i + 1)]),
      accessorFn: (row: number[]) => row[i],
    })),
    {
      id: 'y',
      header: () => h('span', [h('span', 'y')]),
      accessorFn: (row: number[]) => row[row.length - 1],
    },
  ];
});
</script>

<template>
  <v-table
    class="delta-samples-table"
    :data="data"
    :columns="columns"
    :column-index-highlight="columnIndexHighlight"
    :row-index-highlight="rowIndexHighlight" />
</template>

<style scoped lang="scss"></style>
