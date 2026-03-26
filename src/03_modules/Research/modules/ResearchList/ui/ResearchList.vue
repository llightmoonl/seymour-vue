<script setup lang="ts">
import type { ResearchListProps } from '../ResearchList';
import { ResearchListItem, ResearchListSkeleton } from '../';
import { VButton } from '@common/components';
import { useInfiniteQuery } from '@pinia/colada';
import { getAllResearch } from '@modules/Research/api/getAllResearch.ts';
import { computed, onWatcherCleanup, useTemplateRef, watch } from 'vue';

defineProps<ResearchListProps>();
const {
  data: research,
  isPending,
  isLoading,
  loadNextPage,
  hasNextPage,
} = useInfiniteQuery({
  key: ['research-list'],
  query: ({ pageParam }) => getAllResearch(pageParam, 20),
  initialPageParam: 1,
  getNextPageParam: (lastPage) =>
    lastPage?.data?.pagination.hasNextPage ? lastPage?.data?.pagination.currentPage + 1 : null,
});

const researchData = computed(() => {
  return research?.value?.pages.flatMap((value) => value.data.data) ?? [];
});

const loadMoreTrigger = useTemplateRef<HTMLElement>('loadMoreTrigger');

watch(loadMoreTrigger, (el) => {
  if (!el) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        loadNextPage();
      }
    },
    {
      rootMargin: '10px',
      threshold: 0,
    },
  );
  observer.observe(el);

  onWatcherCleanup(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <research-list-skeleton v-if="isLoading || isPending" />
  <ul class="research__list">
    <research-list-item
      v-for="(item, key) in researchData"
      :key="key"
      :id="item.id ?? 0"
      :title="item.title ?? ''"
      :type="item.type ?? ''"
      :url="item.url ?? ''"
      :datetime="item.updatedAt ?? ''" />
    <div v-if="hasNextPage" ref="loadMoreTrigger">
      <v-button @click="loadNextPage" class="research__list-more" variant="outline" size="md">
        {{ $t('shared.show-more') }}
      </v-button>
    </div>
  </ul>
</template>

<style scoped lang="scss">
.research__list {
  overflow-y: auto;
  height: calc(100vh - 224px);
  padding-bottom: rem(64);

  &-more {
    margin-top: rem(16);
    width: 100%;
  }
}
</style>
