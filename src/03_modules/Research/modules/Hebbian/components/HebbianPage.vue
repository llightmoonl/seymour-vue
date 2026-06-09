<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// common
import VContainer from '@common/components/VContainer/VContainer.vue';
import VMarkdown from '@common/components/VMarkdown/VMarkdown.vue';

// components
import HebbianTabs from './HebbianTabs.vue';

// composables
import { useHebbianData } from '../composables/useHebbianData';

const route = useRoute();
const pageId = String(route.params.id ?? '');

const { state } = useHebbianData(pageId);
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
  <div class="hebbian">
    <v-container class="hebbian__container" size="lg">
      <div class="hebbian__content">
        <h1 class="hebbian__title">{{ $t('hebbian.shared.title') }}</h1>
        <p class="hebbian__subtitle">
          <v-markdown class="hebbian__subtitle-markdown" :content="$t('hebbian.shared.subtitle')" />
        </p>
        <hebbian-tabs v-model="activeTab" />
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.hebbian {
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
