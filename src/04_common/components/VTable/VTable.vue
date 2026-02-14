<script setup lang="ts">
import type { BaseTableProps } from '@common/components/BaseTable/BaseTable';

defineProps<BaseTableProps>();
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <td class = "column" v-for="(header, index) in headers" :key="index">{{ header }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rows, rowIndex) in data" :key="rowIndex">
        <td class = "column">{{ rowIndex + 1 }}</td>
        <td class = "column" v-for="(item, columnIndex) in rows" :key="columnIndex">
          {{item}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.table {
  .column {
    text-align: center;
    border: 1px solid var(--text-primary);
    padding: rem(16);
    min-width: rem(60);
    min-height: rem(60);
  }
}
</style>
