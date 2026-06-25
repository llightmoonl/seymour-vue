<script setup lang="ts">
import { computed, h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';

import VTable from '@common/components/VTable/VTable.vue';
import type { VTableProps } from '@common/components/VTable/VTable.types.ts';

import { SAMPLE_LENGTH } from '../models/constant';

type DeltaSamplesTableProps = Pick<VTableProps<number[]>, 'data' | 'rowIndexHighlight' | 'columnIndexHighlight'>;
defineProps<DeltaSamplesTableProps>();

const columns = computed<ColumnDef<number[]>[]>(() => {
  return [
    ...Array.from({ length: SAMPLE_LENGTH }, (_, i) => ({
      id: String(i + 1),
      header: () => h('span', [h('span', 'w'), h('sub', {}, i + 1)]),
      accessorFn: (row: number[]) => row[i]?.toFixed(2),
    })),
  ];
});
</script>

<template>
  <v-table
    class="delta-weight-table"
    :data="data"
    :columns="columns"
    :column-index-highlight="columnIndexHighlight"
    :row-index-highlight="rowIndexHighlight" />
</template>

<style scoped lang="scss"></style>
