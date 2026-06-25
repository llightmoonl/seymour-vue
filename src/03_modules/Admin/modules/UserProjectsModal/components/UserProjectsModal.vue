<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@pinia/colada';
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle } from 'reka-ui';
import { getAdminUserProjects, getAdminUserProjectsReport } from '../../../api/admin.api';
import type { ProjectRule } from '../../../types/admin.types';
import VButton from '@common/components/VButton/VButton.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';
import { timeAgo } from '@common/utils/timeAgo';

const props = defineProps<{ userId: string }>();
const emit = defineEmits<{ close: [] }>();

const { locale } = useI18n();

const { data, status } = useQuery({
  key: computed(() => ['admin-user-projects', props.userId]),
  query: () => getAdminUserProjects(props.userId),
});

const RULE_COLORS: Record<ProjectRule, string> = {
  HEBB: '#7bc47f',
  DELTA: '#c9a96e',
  BACKPROP: '#90b8c8',
};

const RULE_LABELS: Record<ProjectRule, string> = {
  HEBB: 'dashboard.distribution.hebb',
  DELTA: 'dashboard.distribution.delta',
  BACKPROP: 'dashboard.distribution.backprop',
};

const onDownloadReport = async () => {
  const blob = await getAdminUserProjectsReport(props.userId);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `user-${props.userId}-projects.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <dialog-root :open="true">
    <dialog-portal>
      <dialog-overlay class="modal-overlay" @click="emit('close')" />
      <dialog-content class="projects-modal">
        <dialog-title class="projects-modal__title">{{ $t('admin.user-projects.title') }}</dialog-title>

        <template v-if="status === 'pending'">
          <v-skeleton v-for="i in 4" :key="i" class="projects-modal__skeleton" />
        </template>

        <template v-else-if="status === 'success' && data?.length">
          <p class="projects-modal__total">{{ $t('admin.user-projects.total', { n: data.length }) }}</p>
          <div class="projects-modal__list">
            <div v-for="project in data" :key="project.id" class="projects-modal__item">
              <div class="projects-modal__item-rule" :style="{ backgroundColor: RULE_COLORS[project.rule] }"></div>
              <div class="projects-modal__item-info">
                <div class="projects-modal__item-name">{{ project.title }}</div>
                <div class="projects-modal__item-meta">
                  <span class="projects-modal__badge" :style="{ color: RULE_COLORS[project.rule] }">
                    {{ $t(RULE_LABELS[project.rule]) }}
                  </span>
                  · {{ timeAgo(project.updatedAt, locale as string) }}
                  <template v-if="project.examplesCount">· {{ project.examplesCount }} примеров</template>
                  <template v-if="project.epochsCount">· {{ project.epochsCount }} эпох</template>
                </div>
              </div>
              <div v-if="project.accuracy" class="projects-modal__item-accuracy">
                {{ Math.round(project.accuracy * 100) }}%
              </div>
            </div>
          </div>
        </template>

        <p v-else-if="status === 'success'" class="projects-modal__empty">{{ $t('admin.user-projects.empty') }}</p>

        <div class="projects-modal__footer">
          <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.SM" @click="onDownloadReport">
            {{ $t('admin.user-projects.download-report') }}
          </v-button>
          <v-button :size="ButtonSizes.SM" @click="emit('close')">{{ $t('shared.close') }}</v-button>
        </div>

        <button class="projects-modal__close" @click="emit('close')">×</button>
      </dialog-content>
    </dialog-portal>
  </dialog-root>
</template>

<style scoped lang="scss">
.modal-overlay {
  background-color: var(--overlay);
  position: fixed;
  inset: 0;
  z-index: 100;
}

.projects-modal {
  border: 1px solid var(--border);
  background-color: var(--popover);
  border-radius: rem(8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: rem(560);
  max-height: 80vh;
  overflow-y: auto;
  padding: rem(24);
  z-index: 101;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }

  &__title {
    font-size: rem(18);
    font-weight: 600;
    margin-block-end: rem(16);
    padding-inline-end: rem(32);
  }

  &__total {
    font-size: rem(13);
    color: var(--muted-foreground);
    margin-block-end: rem(12);
  }

  &__skeleton {
    block-size: rem(56);
    border-radius: rem(8);
    margin-block-end: rem(8);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: rem(8);
    margin-block-end: rem(16);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: rem(12);
    padding: rem(10) rem(12);
    border: 1px solid var(--border);
    border-radius: rem(8);

    &-rule {
      inline-size: rem(8);
      block-size: rem(8);
      border-radius: 50%;
      flex-shrink: 0;
    }

    &-info {
      flex: 1;
    }

    &-name {
      font-size: rem(14);
      font-weight: 600;
    }

    &-meta {
      font-size: rem(12);
      color: var(--muted-foreground);
    }

    &-accuracy {
      font-size: rem(13);
      font-weight: 600;
    }
  }

  &__badge {
    font-weight: 600;
    font-size: rem(12);
  }

  &__empty {
    font-size: rem(14);
    color: var(--muted-foreground);
    margin-block-end: rem(16);
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-start: rem(8);
    padding-block-start: rem(16);
    border-block-start: 1px solid var(--border);
  }

  &__close {
    @include reset-btn;
    position: absolute;
    top: rem(12);
    right: rem(12);
    font-size: rem(20);
    line-height: 1;
    color: var(--muted-foreground);
    cursor: pointer;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
