<script setup lang="ts">
import { VButton, VTable } from '@common/components';
import { DrawingGridEditable } from '@modules/Research';

import { useHebbian, createSamplesColumns } from '../models/useHebbian';
import { EVEN, ODD, SAMPLE_LENGTH } from '../models/constant';


const { x, samples, addSample } = useHebbian();
const columns = createSamplesColumns(SAMPLE_LENGTH);
</script>

<template>
  <div class="hebbian-generation">
    <div class="header">

      <DrawingGridEditable class="drawing-grid" v-model:grid="x" />
      <div class="table">
        <VTable :data="samples" :columns="columns" />
      </div>
    </div>
    <div class="controllers">
      <div class="group">
        <VButton @click="() => addSample(EVEN)" size="md" variant="subtle">
          {{ $t('hebbian.buttons.even.title') }}
        </VButton>
        <VButton @click="() => addSample(ODD)" size="md">{{ $t('hebbian.buttons.odd.title') }}</VButton>
      </div>
    </div>
    <VCarousel :options="{ slidesToScroll: 5 }" :items="samples">
      <template #slide="{ item }">
        <DrawingGridView :grid="item"></DrawingGridView>
      </template>
    </VCarousel>
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
    align-items: center;
    gap: rem(8);
  }
}
</style>
