<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// common
import VContainer from '@common/components/VContainer/VContainer.vue';
import VMarkdown from '@common/components/VMarkdown/VMarkdown.vue';

// common-value
import { ContainerSizes } from '@common/components/VContainer/VContainer.types';

// components
import DeltaTabs from './DeltaTabs.vue';

// queries
import { useDeltaData } from '../queries/useDeltaData';

const route = useRoute();
const pageId = String(route.params.id ?? '');

const { state } = useDeltaData(pageId);
const activeTab = ref('generation');

watch(
  () => state.value.data?.activeStage,
  (newStage) => {
    if (newStage) {
      activeTab.value = newStage;
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="delta">
    <v-container :size="ContainerSizes.LG" class="delta__container">
      <div class="delta__content">
        <h1 class="delta__title">{{ $t('delta.shared.title') }}</h1>
        <p class="delta__subtitle">
          <v-markdown class="markdown" :content="$t('delta.shared.subtitle')" />
        </p>
        <delta-tabs v-model="activeTab" />
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.delta {
  margin-top: rem(32);
  margin-bottom: rem(32);

  &__subtitle {
    margin-top: rem(8);

    &:deep(.markdown p) {
      margin-top: 0;
    }
  }

  &__tabs {
    margin-top: rem(24);
  }
}
</style>
