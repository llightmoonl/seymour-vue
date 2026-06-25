<script setup lang="ts">
import { useRoute } from 'vue-router';

import VButton from '@common/components/VButton/VButton.vue';
import VCarousel from '@common/components/VCarousel/VCarousel.vue';

import DeltaSamplesTable from './DeltaSamplesTable.vue';
import { DrawingGridEditable, DrawingGridView } from '../../_';

import { useGenerateData } from '../queries/useGenerateData.ts';
import { useDelta } from '../composables/useDelta';

import { A, B, C } from '../models/constant';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types.ts';

const route = useRoute();
const pageId = String(route.params.id ?? '');

const { x, samples, rawSamples, fetchSamples, addSample, isUnchanged } = useDelta();

const { generateData, asyncStatus } = useGenerateData(pageId, fetchSamples);
</script>

<template>
  <div class="delta-generation">
    <div class="delta-generation__content">
      <div class="delta-generation__input-panel">
        <drawing-grid-editable class="delta-generation__input-panel-grid" v-model:grid="x" />
        <div class="delta-generation__input-panel-controllers">
          <v-button
            class="delta-generation__input-panel-button"
            @click="() => addSample(A)"
            :disabled="isUnchanged"
            :variant="ButtonVariants.SUBTLE"
            :size="ButtonSizes.MD">
            A
          </v-button>
          <v-button
            class="delta-generation__input-panel-button"
            @click="() => addSample(B)"
            :disabled="isUnchanged"
            :variant="ButtonVariants.SUBTLE"
            :size="ButtonSizes.MD">
            B
          </v-button>
          <v-button
            class="delta-generation__input-panel-button"
            @click="() => addSample(C)"
            :disabled="isUnchanged"
            :variant="ButtonVariants.SUBTLE"
            :size="ButtonSizes.MD">
            C
          </v-button>
        </div>
        <v-button
          v-if="samples.length >= 3"
          :disabled="asyncStatus === 'loading'"
          :is-loading="asyncStatus === 'loading'"
          class="delta-generation__complete"
          @click="generateData">
          {{ $t('delta.generation.finish') }}
        </v-button>
      </div>
      <delta-samples-table :data="samples" />
    </div>

    <v-carousel class="delta-generation__samples" :options="{ slidesToScroll: 8 }" :items="rawSamples">
      <template #slide="{ item }">
        <drawing-grid-view :size="50" :grid="item"></drawing-grid-view>
      </template>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
.delta-generation {
  margin-top: rem(32);

  &__content {
    display: flex;
    align-items: start;
    column-gap: rem(48);
  }

  &__input-panel {
    display: flex;
    flex-direction: column;
    gap: rem(16);

    &-controllers {
      display: flex;
      gap: rem(8);
    }

    &-button {
      flex-grow: 1;
    }
  }

  &__samples {
    margin-block: rem(32);
  }
}
</style>
