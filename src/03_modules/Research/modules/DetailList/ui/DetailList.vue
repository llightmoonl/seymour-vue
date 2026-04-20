<script setup lang="ts">
import { computed } from 'vue';
import { DetailBlock } from '../';
import type { DetailListProps } from '../DetailList';

const props = defineProps<DetailListProps>();
const directionObject = computed(() => (props.direction ? `detail-list__${props.direction}` : 'detail-list__row'));
</script>

<template>
  <div class="detail-list" :class="directionObject">
    <DetailBlock
      v-for="detail in details"
      :key="detail.id"
      :id="detail.id"
      :formula="detail.formula"
      :marker="detail.marker"
      :title="detail.title"
      :value="detail.value"
      :table-data="detail.tableData"
      :table-columns="detail.tableColumns" />
  </div>
</template>

<style scoped lang="scss">
.detail-list {
  display: flex;
  row-gap: rem(32);
  flex-wrap: wrap;

  &__column {
    flex-direction: column;

    & .detail-block {
      flex: 0;
    }
  }
}
</style>
