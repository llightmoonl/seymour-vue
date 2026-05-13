<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import { VMarkdown } from '@common/components';
import { useBackpropagationStore } from '../stores/backpropagation';
import { BACKPROP_STEPS } from '../models/constants';
import { nextTick, ref, watch } from 'vue';

const { t } = useI18n();
const backpropagationStore = useBackpropagationStore();
const { steps } = storeToRefs(backpropagationStore);

const containerRef = ref<HTMLElement | null>(null);

watch(steps, async () => {
  await nextTick();

  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight;
  }
});
</script>

<template>
  <div ref="containerRef" class="backpropagation-backward">
    <div v-if="steps >= BACKPROP_STEPS['GRADIENT']" class="backpropagation-backward__item --group">
      <div class="backpropagation-backward__group --title">{{ t('backpropagation.info.gradient') }}</div>
      <VMarkdown class="backpropagation-backward__group --value" content="$\delta = \epsilon*y(1 - y)$" />
    </div>
    <div v-if="steps >= BACKPROP_STEPS['WEIGHT_UPDATE_W21']" class="backpropagation-backward__item --group">
      <div class="backpropagation-backward__group --title">Корректировка весовых коэффициентов:</div>
      <VMarkdown
        class="backpropagation-backward__group --value"
        content="$w_{21} = w_{21} - \eta \cdot \delta \cdot f_{11}$" />
    </div>
    <VMarkdown
      v-if="steps >= BACKPROP_STEPS['WEIGHT_UPDATE_W22']"
      class="backpropagation-backward__item"
      content="$w_{22} = w_{22} - \eta \cdot \delta \cdot f_{12}$" />
    <VMarkdown
      v-if="steps >= BACKPROP_STEPS['DELTA_1']"
      class="backpropagation-backward__item"
      content="$\delta_{11} = \delta \cdot w_{21}(f_{11}(1-f_{11}))$" />
    <VMarkdown
      v-if="steps >= BACKPROP_STEPS['DELTA_2']"
      class="backpropagation-backward__item"
      content="$\delta_{12} = \delta*w_{22}(f_{12}(1-f_{12}))$" />
    <div v-if="steps >= BACKPROP_STEPS['WEIGHT_UPDATE_W11']" class="backpropagation-backward__item --group">
      <div class="backpropagation-backward__group --title">Корректировка весовых коэффициентов</div>
      <VMarkdown
        v-if="steps >= BACKPROP_STEPS['WEIGHT_UPDATE_W11']"
        class="backpropagation-backward__group --value"
        content="$w_{11} = w_{11} - \eta \cdot \delta_{11} \cdot x_1$" />
    </div>
    <VMarkdown
      v-if="steps >= BACKPROP_STEPS['WEIGHT_UPDATE_W12']"
      class="backpropagation-backward__item"
      content="$w_{12} = w_{12} - \eta \cdot \delta_{11} \cdot x_2$" />
    <VMarkdown
      v-if="steps >= BACKPROP_STEPS['WEIGHT_UPDATE_W13']"
      class="backpropagation-backward__item"
      content="$w_{13} = w_{13} - \eta \cdot \delta_{12} \cdot x_1$" />
    <VMarkdown
      v-if="steps >= BACKPROP_STEPS['WEIGHT_UPDATE_W14']"
      class="backpropagation-backward__item"
      content="$w_{14} = w_{14} - \eta \cdot \delta_{12} \cdot x_2$" />
  </div>
</template>

<style scoped lang="scss">
.backpropagation-backward {
  margin-top: rem(12);
  padding: 0 rem(6);
  display: flex;
  flex-direction: column;
  row-gap: rem(8);
  overflow-y: auto;
  height: rem(148);

  &__item {
    &.--group {
      display: flex;
      flex-direction: column;
      row-gap: rem(6);

      &:deep(p) {
        margin-top: 0;
      }
    }

    &:deep(p) {
      margin-top: 0;
    }
  }
}
</style>
