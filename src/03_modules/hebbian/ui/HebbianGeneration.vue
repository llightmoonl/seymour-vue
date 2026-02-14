<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { VButton, DrawingGrid } from '@common/components';
import BaseTable from '@common/components/BaseTable/BaseTable.vue';

const x = ref(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => 0)));
const generatedData: Ref<number[][]> = ref([]);
</script>

<template>
  <div class="hebbian-generation">
    <div class="header">
      <DrawingGrid class="drawing-grid" v-model:grid="x" />
      <div class="table">
        <BaseTable
          :headers="[$t('hebbian.tables.examples'), 'y', ...Array.from({ length: 15 }, (_, i) => `x${i + 1}`)]"
          :data="generatedData" />
      </div>
    </div>
    <div class="controllers">
      <div class="group">
        <VButton>{{ $t('hebbian.buttons.even.title') }}</VButton>
        <VButton variant="outline">{{ $t('hebbian.buttons.odd.title') }}</VButton>
      </div>
    </div>
    <div class="slider"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.hebbian-generation {
  margin-top: rem(32);

  & .header {
    display: flex;
    column-gap: rem(48);
  }

  & .drawing-grid {
    flex-shrink: 0;
  }
}

.controllers {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: rem(16);

  & .group {
    display: flex;
    align-items: stretch;
    gap: rem(8);
  }
}
</style>
