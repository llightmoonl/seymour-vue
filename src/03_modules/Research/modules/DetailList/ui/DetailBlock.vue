<script setup lang="ts">
import type { DetailListItem } from '../DetailList';
import { VMarkdown } from '@common/components';

defineProps<DetailListItem>();
</script>

<template>
  <div class="detail-block">
    <header class="header">
      <p v-if="title" class="title">{{ title }}</p>
    </header>
    <div class="value">
      <span v-if="marker">{{ marker }} =</span>
      <span v-if="formula"><v-markdown :content="formula" /></span>
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail-block {
  display: flex;
  flex-direction: column;
  row-gap: rem(6);
  flex: 0 0 calc(100% / 4);

  & .header {
    display: flex;
    column-gap: rem(8);
    justify-content: space-between;
  }

  & .title {
    font-size: rem(20);
    font-weight: 700;
  }

  & .value {
    font-size: rem(18);
    display: flex;
    align-items: center;
  }
}
</style>
