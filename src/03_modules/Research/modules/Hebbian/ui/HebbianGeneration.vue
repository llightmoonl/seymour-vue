<script setup lang="ts">
import { VButton, VTable, VCarousel } from '@common/components';
import { DrawingGridEditable, DrawingGridView } from '@modules/Research';

import { useHebbian, createSamplesColumns } from '../models/useHebbian';
import { EVEN, ODD, SAMPLE_LENGTH } from '../models/constant';

const { x, samples, rawSamples, addSample } = useHebbian();
const columns = createSamplesColumns(SAMPLE_LENGTH);
</script>

<template>
  <div class="hebbian-generation">
    <div class="header">
      <div class="drawing-canvas">
        <drawing-grid-editable class="drawing-grid" v-model:grid="x" />
        <div class="drawing-canvas__controllers">
          <v-button class="drawing-canvas__button" @click="() => addSample(EVEN)" size="md" variant="subtle">
            {{ $t('hebbian.buttons.even.title') }}
          </v-button>
          <v-button class="drawing-canvas__button" @click="() => addSample(ODD)" size="md">
            {{ $t('hebbian.buttons.odd.title') }}
          </v-button>
        </div>
      </div>
      <v-table class="table" :data="samples" :columns="columns" />
    </div>
    <v-carousel class="carousel-samples" :options="{ slidesToScroll: 8 }" :items="rawSamples">
      <template #slide="{ item }">
        <drawing-grid-view :size="50" :grid="item"></drawing-grid-view>
      </template>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.hebbian-generation {
  margin-top: rem(32);

  & .header {
    display: flex;
    align-items: start;
    column-gap: rem(48);
  }
}

.drawing-canvas {
  display: flex;
  flex-direction: column;
  gap: rem(16);

  &__controllers {
    display: flex;
    gap: rem(8);
  }

  &__button {
    flex-grow: 1;
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

.carousel-samples {
  margin-block: rem(32);
}
</style>
