<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ProjectCreateModal, ProjectsList } from '@modules/Projects';
import { VButton, VContainer, VSearchInput } from '@common/components';

import { useProjects } from '../composables/useProjects';
import ProjectsListSkeleton from '../modules/ProjectList/components/ProjectsListSkeleton.vue';

const { t } = useI18n();
const search = ref('');

const { projects, isLoading, isPending, loadNextPage, hasNextPage } = useProjects(search);
</script>

<template>
  <div class="projects">
    <VContainer size="md">
      <header class="projects__header">
        <div class="projects__header-top">
          <h2 class="projects__title">{{ $t('research.title') }}</h2>
          <project-create-modal />
        </div>
        <div class="projects__header-bottom">
          <form>
            <v-search-input
              variant="subtle"
              size="lg"
              name="search"
              v-model="search"
              :placeholder="t('research.search')" />
          </form>
        </div>
      </header>
      <div class="projects__body">
        <projects-list-skeleton v-if="isLoading || isPending" />
        <projects-list v-else :items="projects" />
        <v-button v-if="hasNextPage" class="projects__more" variant="outline" size="md" @click="loadNextPage">
          {{ $t('shared.show-more') }}
        </v-button>
      </div>
    </VContainer>
  </div>
</template>

<style scoped lang="scss">
.projects {
  &__header {
    margin-top: rem(64);
    display: flex;
    flex-direction: column;
    row-gap: rem(16);

    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__body {
    margin-top: rem(32);
    overflow-y: auto;
    height: calc(100vh - 224px);
    padding-bottom: rem(64);
  }

  &__more {
    margin-top: rem(16);
    width: 100%;
  }
}
</style>
