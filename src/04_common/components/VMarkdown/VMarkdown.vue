<script setup lang="ts">
import { computed } from 'vue';
import Typograf from 'typograf';

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

import katex from '@traptitech/markdown-it-katex';
import 'katex/dist/katex.min.css';

import MarkdownIt from 'markdown-it';
import figures from 'markdown-it-image-figures';
import attrs from 'markdown-it-attrs';

const md = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: true,
  highlight(str, lang) {
    let highlighted = '';

    if (lang && hljs.getLanguage(lang)) {
      try {
        highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
      } catch {
        highlighted = md.utils.escapeHtml(str);
      }
    } else {
      highlighted = md.utils.escapeHtml(str);
    }

    const langLabel = lang || 'text';
    const encoded = encodeURIComponent(str);

    return `
      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__lang">${langLabel}</span>
          <button class="code-block__copy" data-code="${encoded}" type="button">
            Copy
          </button>
        </div>
        <pre class="hljs"><code>${highlighted}</code></pre>
      </div>
    `;
  },
})
  .use(katex)
  .use(figures, {
    figcaption: true,
  })
  .use(attrs);

const props = defineProps<{
  content?: string;
}>();

const tp = new Typograf({ locale: ['ru', 'en-US'] });

const renderedMarkdown = computed(() => {
  return props.content ? tp.execute(md.render(String(props.content))) : '';
});
</script>

<template>
  <div class="markdown" v-html="renderedMarkdown" />
</template>

<style lang="scss" scoped>
.markdown {
  & :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    margin-top: rem(64);
  }

  & :deep(h1):first-child {
    margin-top: 0;
  }

  & :deep(p) {
    margin-top: rem(24);

    & code {
      background-color: var(--muted);
      padding: rem(4);
      border-radius: rem(8);
    }
  }
  & :deep(ul),
  :deep(ol) {
    margin: rem(24) 0 rem(24) rem(24);
  }

  & :deep(li) {
    margin-top: rem(8);
  }

  & :deep(strong) {
    font-weight: 800;
  }

  & :deep(ul) {
    list-style-type: disc;
  }

  & :deep(table) {
    border-radius: rem(4);
    border: 1px solid var(--border);
    margin: rem(24) 0;
    width: 100%;
  }

  & :deep(tr) {
    border-bottom: 1px solid var(--border);

    &:last-child {
      border-bottom: none;
    }
  }

  & :deep(th) {
    border-bottom: 1px solid var(--border);
  }

  & :deep(td),
  :deep(th) {
    text-align: center;
    padding: rem(8);
    min-width: rem(60);
    min-height: rem(60);
  }

  & :deep(a) {
    text-decoration: underline;
    text-underline-offset: rem(4);
  }

  & :deep(blockquote) {
    margin-top: rem(24);
    padding-block: rem(12);
    padding-inline-start: rem(24);
    position: relative;

    & p {
      margin-top: 0;
    }

    &:before {
      content: '';
      background-color: var(--border);
      width: rem(4);
      inset-inline-start: 0;
      border-radius: rem(2);
      position: absolute;
      top: 0.5rem;
      bottom: 0.5rem;
    }
  }
  & :deep(figure) {
    margin-top: rem(24);
  }

  & :deep(pre) {
    margin-top: rem(24);
  }
}
</style>
