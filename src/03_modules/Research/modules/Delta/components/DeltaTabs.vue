<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import VTabs from '@common/components/VTabs/VTabs.vue';

import DeltaGeneration from './DeltaGeneration.vue';
import DeltaQuality from './DeltaQuality.vue';
import DeltaRecognition from './DeltaRecognition.vue';
import DeltaTraining from './DeltaTraining.vue';

import type { Stage } from '../api/types';

const { t } = useI18n();

const ALL_TABS = [
  { id: 1, title: t('delta.tabs.dataGeneration'), value: 'generation', component: DeltaGeneration },
  { id: 2, title: t('delta.tabs.training'), value: 'training', component: DeltaTraining },
  { id: 3, title: t('delta.tabs.qualityAssessment'), value: 'quality', component: DeltaQuality },
  { id: 4, title: t('delta.tabs.recognition'), value: 'recognition', component: DeltaRecognition },
];

const activeTab = defineModel<Stage>();

const tabItems = computed(() =>
  ALL_TABS.map((tab) => ({
    ...tab,
    disabled: tab.value !== String(activeTab.value ?? 'generation'),
  })),
);
</script>

<template>
  <v-tabs class="delta__tabs" :items="tabItems" v-model="activeTab" />
</template>

<style scoped lang="scss"></style>
