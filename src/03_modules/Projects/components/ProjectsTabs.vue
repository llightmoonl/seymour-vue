<script setup lang="ts">
import VTabs from '@common/components/VTabs/VTabs.vue';
import type { AcceptableValue } from 'reka-ui';

const ALL_TABS = [
  { id: 1, title: 'Все', value: 'all' },
  { id: 2, title: 'Правило Хебба', value: 'hebbian' },
  { id: 3, title: 'Дельта-правило', value: 'delta' },
  { id: 4, title: 'Обратное распространение', value: 'backpropagation' },
];

const activeTab = defineModel<AcceptableValue>();
</script>

<template>
  <v-tabs class="projects__tabs" variant="chips" :items="ALL_TABS" v-model="activeTab" />
</template>

<style scoped lang="scss"></style>
