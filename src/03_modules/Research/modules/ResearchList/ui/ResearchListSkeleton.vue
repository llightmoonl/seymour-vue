<script setup lang="ts">
import { ResearchListSkeletonItem } from '../';
</script>

<template>
  <ul class="research__list">
    <research-list-skeleton-item v-for="n in 10" :key="n" />
  </ul>
</template>

<style scoped lang="scss">
.research__list {
  position: relative;
}
</style>
