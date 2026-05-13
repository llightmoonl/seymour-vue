<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { DocsPage } from '@modules/Docs';

useHead({
  title: 'Docs',
});
</script>

<template><docs-page /></template>
