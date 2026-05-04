<script setup lang="ts">
import ProjectsItem from './ProjectsItem.vue';
import type { ProjectsListProps } from '../types/ProjectsList.types';

defineProps<ProjectsListProps>();
</script>

<template>
  <ul class="projects-list">
    <projects-item
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :type-name="item.typeName"
      :url="item.url"
      :updated-at="item.updatedAt" />
  </ul>
</template>
