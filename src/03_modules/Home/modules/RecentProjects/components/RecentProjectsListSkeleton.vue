<script setup lang="ts">
import RecentProjectsItemSkeleton from './RecentProjectsItemSkeleton.vue';
</script>

<template>
  <ul class="recent-projects__list">
    <recent-projects-item-skeleton v-for="n in 5" :key="n" />
  </ul>
</template>

<style scoped lang="scss">
.recent-projects__list {
  position: relative;
}
</style>
