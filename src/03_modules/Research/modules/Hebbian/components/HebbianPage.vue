<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import VTabs from '@common/components/VTabs/VTabs.vue';
import VContainer from '@common/components/VContainer/VContainer.vue';
import VMarkdown from '@common/components/VMarkdown/VMarkdown.vue';

import { HebbianGeneration, HebbianTraining, HebbianRecognition, HebbianQuality } from '../';
import { useTabs, useProgressTabs } from '../../../';

const { t } = useI18n();
const route = useRoute();

const ALL_TABS = [
  { id: 1, title: t('hebbian.tabs.dataGeneration'), value: 'generation', component: HebbianGeneration },
  { id: 2, title: t('hebbian.tabs.training'), value: 'training', component: HebbianTraining },
  { id: 3, title: t('hebbian.tabs.qualityAssessment'), value: 'quality', component: HebbianQuality },
  { id: 4, title: t('hebbian.tabs.recognition'), value: 'recognition', component: HebbianRecognition },
];

const { activeTab } = storeToRefs(useTabs());
const completedTabs = ref<string[]>([]);

const tabsPages = computed(() =>
  ALL_TABS.map((tab) => ({
    ...tab,
    disabled: tab.value !== activeTab.value || completedTabs.value.includes(tab.value),
  })),
);

const id = String(route.params.id);
const { state } = useProgressTabs(id);

watch(
  state,
  (val) => {
    if (val.status !== 'success') return;
    const data = val.data ?? [];

    completedTabs.value = data.filter((t) => t.completed).map((t) => t.key);

    const firstAvailable = ALL_TABS.find((tab) => !completedTabs.value.includes(tab.value));
    if (firstAvailable) {
      activeTab.value = firstAvailable.value;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="hebbian">
    <v-container class="hebbian__container" size="lg">
      <div class="hebbian__content">
        <h1 class="hebbian__title">Правило Хебба: классификация цифр по четности/нечетности</h1>
        <p class="hebbian__subtitle">
          <v-markdown
            class="markdown"
            :content="`Пояснение к задаче: Обучить персептрон по правилу Хебба: настроить синаптические веса $w_j$ так, чтобы на входе счётным числом нейрон выдавал 0, на нечётном — 1.`" />
        </p>
        <v-tabs class="hebbian__tabs" :items="tabsPages" v-model="activeTab" />
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
