<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import { useThemeStore } from '@modules/themes';

const { initTheme } = useThemeStore();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <RouterView />
</template>
