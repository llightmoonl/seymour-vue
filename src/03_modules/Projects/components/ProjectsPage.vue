<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ProjectCreateModal, ProjectsList } from '@modules/Projects';
import { VButton, VContainer, VSearchInput, VTabs } from '@common/components';

import { useProjects } from '../composables/useProjects';
import ProjectsListSkeleton from '../modules/ProjectList/components/ProjectsListSkeleton.vue';
import { ButtonVariants } from '@common/components/VButton/VButton.types.ts';

const { t } = useI18n();
const search = ref('');
const activeTab = ref<string>('all');

const { projects, isLoading, isPending, loadNextPage, hasNextPage } = useProjects(search, activeTab);

const ALL_TABS = [
  { id: 1, title: 'Все', value: 'all' },
  { id: 2, title: 'Правило Хебба', value: 'hebbian' },
  { id: 3, title: 'Дельта-правило', value: 'delta' },
  { id: 4, title: 'Обратное распространение', value: 'backpropagation' },
];
</script>

<template>
  <div class="projects">
    <VContainer size="md">
      <header class="projects__header">
        <div class="projects__header-top">
          <h1 class="projects__title">{{ $t('research.title') }}</h1>
          <project-create-modal />
        </div>
        <div class="projects__header-bottom">
          <form class="projects__search">
            <v-search-input
              variant="soft"
              size="xl"
              name="search"
              v-model="search"
              :placeholder="t('research.search')" />
          </form>
          <VTabs class="projects__tabs" variant="chips" :items="ALL_TABS" v-model="activeTab" />
        </div>
      </header>
      <div class="projects__body">
        <projects-list-skeleton v-if="isLoading || isPending" />
        <projects-list v-else :items="projects" />
        <v-button
          v-if="hasNextPage"
          class="projects__more"
          :variant="ButtonVariants.SOFT"
          size="md"
          @click="loadNextPage">
          {{ $t('shared.show-more') }}
        </v-button>
      </div>
    </VContainer>
  </div>
</template>

<style scoped lang="scss">
.projects {
  &__header {
    padding-top: rem(64);
    padding-bottom: rem(8);
    display: flex;
    flex-direction: column;
    row-gap: rem(16);
    position: sticky;
    top: 0;
    background-color: var(--background);

    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__body {
    padding-bottom: rem(32);
  }

  &__tabs {
    margin-top: rem(16);
  }

  &__more {
    margin-top: rem(16);
    width: 100%;
  }
}
</style>
