<script setup lang="ts">
import { ProjectsListSkeletonItem } from '../';
</script>

<template>
  <ul class="projects__list">
    <projects-list-skeleton-item v-for="n in 10" :key="n" />
  </ul>
</template>

<style scoped lang="scss">
.projects__list {
  position: relative;
}
</style>
