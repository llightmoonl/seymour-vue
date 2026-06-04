<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import VButton from '@common/components/VButton/VButton.vue';
import VContainer from '@common/components/VContainer/VContainer.vue';
import VSearchInput from '@common/components/VInput/VSearchInput.vue';
import ProjectsTabs from './ProjectsTabs.vue';

import { ProjectCreateModal } from '../modules/ProjectCreateModal';
import { ProjectsList, ProjectsListSkeleton } from '../modules/ProjectList';

import { useProjects } from '../composables/useProjects';

import { ButtonVariants } from '@common/components/VButton/VButton.types.ts';

const { t } = useI18n();
const search = ref('');
const activeTab = ref<string>('all');

const { projects, isLoading, isPending, loadNextPage, hasNextPage } = useProjects(search, activeTab);
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
          <projects-tabs class="projects__tabs" v-model="activeTab" />
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
