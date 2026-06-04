<script setup lang="ts">
import VContainer from '@common/components/VContainer/VContainer.vue';
import { ActivityFeed } from '../modules/ActivityFeed';
</script>

<template>
  <div class="home">
    <v-container size="lg">
      <h1 class="home__title">Добро пожаловать, Олег</h1>
      <activity-feed />
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.home {
}
</style>
