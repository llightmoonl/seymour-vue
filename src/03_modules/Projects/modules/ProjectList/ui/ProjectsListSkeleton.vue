<script setup lang="ts">
import { ProjectsItemSkeleton } from '../';
</script>

<template>
  <ul class="projects__list">
    <projects-item-skeleton v-for="n in 10" :key="n" />
  </ul>
</template>

<style scoped lang="scss">
.projects__list {
  position: relative;
}
</style>
