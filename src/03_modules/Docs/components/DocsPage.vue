<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useIntersectionObserver } from '@vueuse/core';

import { VContainer, VMarkdown, VSpinner } from '@common/components';

import { useGetUniqueDocs } from '@modules/Docs/composables/useGetUniqueDocs.ts';
import { useGetAllDocs } from '@modules/Docs/composables/useGetAllDocs.ts';

const contentEl = useTemplateRef('content');
const headings = ref<Element[]>([]);
const currentHeadingId = ref('');

const route = useRoute();

const slug = computed(() => (Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug));
const { data: currentDoc, isLoading: loadingCurrentDoc } = useGetUniqueDocs(slug);
const { data: allDocs, isLoading: loadingAllDocs } = useGetAllDocs();

const isLoading = computed(() => loadingAllDocs.value || loadingCurrentDoc.value);

useIntersectionObserver(
  headings,
  (entries) => {
    const visible = entries.find((e) => e.isIntersecting);
    if (visible) currentHeadingId.value = visible.target.id;
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -70% 0px',
  },
);

watch(
  [isLoading, () => currentDoc.value?.content],
  async ([val]) => {
    if (val) {
      headings.value = [];
      currentHeadingId.value = '';
      return;
    }
    await nextTick();

    const root = contentEl.value?.$el;

    if (!root) return;
    headings.value = Array.from(root.querySelectorAll('h2[id], h3[id]'));

    window.scrollTo({
      top: 0,
    });
  },
  { immediate: true },
);
</script>

<template>
  <div class="docs">
    <v-spinner v-if="isLoading" />
    <v-container v-else size="lg">
      <div class="docs__content">
        <aside class="docs__sections">
          <div class="docs__sections-title">Разделы</div>
          <div class="docs__sections-list">
            <RouterLink v-for="doc in allDocs" :key="doc?.slug" class="docs__sections-item" :to="`/docs/${doc?.slug}`">
              {{ doc?.title }}
            </RouterLink>
          </div>
        </aside>
        <v-markdown ref="content" class="docs__main" :content="currentDoc?.content" />
        <aside class="docs__navigation">
          <div class="docs__navigation-title">На этой странице</div>
          <ul class="docs__navigation-list">
            <li v-for="heading in headings" :key="heading.id">
              <a
                class="docs__navigation-item"
                :class="{ '--active': heading.id === currentHeadingId }"
                :href="`#${heading.id}`">
                {{ heading.textContent }}
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.docs {
  margin-bottom: rem(32);
  position: relative;

  &__content {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    column-gap: rem(64);
  }

  &__main {
    padding-top: rem(64);
  }

  &__sections {
    padding-top: rem(64);
    position: sticky;
    max-height: 100vh;
    top: 0;
    left: 0;

    &-title {
      color: var(--muted-foreground);
      padding-inline: rem(8);
    }

    &-list {
      display: flex;
      flex-direction: column;
      row-gap: rem(4);
      margin-top: rem(24);
    }

    &-item {
      padding: rem(8);
      border-radius: rem(8);
      font-size: rem(15);

      @include hover {
        background-color: var(--sidebar-accent);
      }

      &.router-link-active {
        background-color: var(--sidebar-accent);
      }
    }
  }

  &__navigation {
    padding-top: rem(64);
    position: sticky;
    max-height: 100vh;
    top: 0;
    right: 0;
    color: var(--muted-foreground);

    &-list {
      display: flex;
      flex-direction: column;
      row-gap: rem(8);
      margin-top: rem(24);
    }

    &-item {
      &.--active {
        color: var(--foreground);
      }
    }
  }
}
</style>
