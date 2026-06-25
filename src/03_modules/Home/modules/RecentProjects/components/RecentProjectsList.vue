<script setup lang="ts">
import RecentProjectsItem from './RecentProjectsItem.vue';
import type { RecentProjectsListProps } from '../types/RecentProjectsList.types';

defineProps<RecentProjectsListProps>();
</script>

<template>
  <ul class="recent-projects-list">
    <recent-projects-item
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :type-name="item.typeName"
      :url="item.url"
      :updated-at="item.updatedAt" />
  </ul>
</template>

<style scoped lang="scss"></style>
