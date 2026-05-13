<script setup lang="ts">
import type { DetailListItem } from '../DetailList';
import { VMarkdown, VTable } from '@common/components';

defineProps<DetailListItem>();
</script>

<template>
  <div class="detail-block">
    <p v-if="title" class="detail-block__title">{{ title }}</p>

    <div class="detail-block__value">
      <span v-if="marker">{{ marker }} =</span>

      <span v-if="formula">
        <v-markdown :content="formula" />
      </span>
      <span>{{ value }}</span>
    </div>

    <v-table class="detail-block__table" v-if="tableData && tableColumns" :data="tableData" :columns="tableColumns" />
  </div>
</template>

<style scoped lang="scss">
.detail-block {
  display: flex;
  flex-direction: column;
  row-gap: rem(6);

  &__title {
    font-size: rem(20);
    font-weight: 700;
  }

  &__value {
    font-size: rem(18);
    display: flex;
    align-items: center;

    &:deep(.markdown p) {
      margin: 0;
    }
  }

  &__table {
    margin-top: rem(4);
    width: fit-content;

    &:deep(.column) {
      width: rem(100);
    }
  }
}
</style>
