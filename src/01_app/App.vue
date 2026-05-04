<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import { useThemeStore } from '@modules/themes';
import { PiniaColadaDevtools } from '@pinia/colada-devtools';

const { initTheme } = useThemeStore();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <RouterView />
  <PiniaColadaDevtools />
</template>
