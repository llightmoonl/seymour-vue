<script setup lang="ts">
import type { DetailListItem } from '../DetailList';

defineProps<DetailListItem>();
</script>

<template>
  <div class="detail-block">
    <header class="header">
      <p v-if="title" class="title">{{ title }}</p>
    </header>
    <div class="value">
      <span v-if="marker">{{ marker }} = </span>
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.detail-block {
  display: flex;
  flex-direction: column;
  row-gap: rem(6);

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
  }
}
</style>
