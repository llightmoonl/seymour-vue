<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import katex from 'markdown-it-katex';
import 'katex/dist/katex.min.css';

import { computed } from 'vue';

const md = new MarkdownIt({ html: false, linkify: false, typographer: true }).use(katex);

const props = defineProps<{
  content?: string
}>()

const renderedMarkdown = computed(() => {
  return props.content ? md.render(String(props.content)) : '';
});
</script>

<template>
  <div class="markdown" v-html="renderedMarkdown" />
</template>
