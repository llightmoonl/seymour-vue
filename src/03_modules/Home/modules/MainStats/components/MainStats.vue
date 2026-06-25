<script setup lang="ts">
import MainStatsItem from '@modules/Home/modules/MainStats/components/MainStatsItem.vue';

const stats = [
  {
    id: 1,
    title: 'Всего проектов',
    value: 10,
  },
  {
    id: 2,
    title: 'Обучено',
    value: 7,
  },
  {
    id: 3,
    title: 'В процессе',
    value: 3,
  },
];
</script>

<template>
  <div class="main-stats">
    <main-stats-item v-for="item in stats" :key="item.id" :title="item.title" :value="item.value" />
  </div>
</template>

<style scoped lang="scss">
.main-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: rem(12);
}
</style>
