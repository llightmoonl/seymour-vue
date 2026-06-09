<script setup lang="ts">
import { computed, h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';

import VTable from '@common/components/VTable/VTable.vue';
import type { VTableProps } from '@common/components/VTable/VTable.types.ts';

import { SAMPLE_LENGTH } from '../models/constant';

type HebbianSamplesTableProps = Pick<VTableProps<number[]>, 'data' | 'rowIndexHighlight' | 'columnIndexHighlight'>;
defineProps<HebbianSamplesTableProps>();

const columns = computed<ColumnDef<number[]>[]>(() => {
  return [
    ...Array.from({ length: SAMPLE_LENGTH }, (_, i) => ({
      id: String(i),
      header: () => h('span', [h('span', 'x'), h('sub', {}, i + 1)]),
      accessorFn: (row: number[]) => row[i],
    })),
    {
      id: '15',
      header: 'y',
      accessorFn: (row: number[]) => row[row.length - 1],
    },
  ];
});
</script>

<template>
  <v-table
    class="hebbian-samples-table"
    :data="data"
    :columns="columns"
    :column-index-highlight="columnIndexHighlight"
    :row-index-highlight="rowIndexHighlight" />
</template>

<style scoped lang="scss"></style>
