<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery, useMutation } from '@pinia/colada';
import type { ColumnDef } from '@tanstack/vue-table';
import { getAdminDocs, getAdminDocStats, patchAdminDoc, deleteAdminDoc, postAdminDoc } from '../../../api/admin.api';
import type { AdminDocFull, AdminDocFilters } from '../../../types/admin.types';
import VContainer from '@common/components/VContainer/VContainer.vue';
import VTable from '@common/components/VTable/VTable.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VInput from '@common/components/VInput/VInput.vue';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';
import EyeIcon from '~icons/custom/eye';
import PublishIcon from '~icons/custom/publish';
import EditIcon from '~icons/custom/edit';
import TrashIcon from '~icons/custom/trash';

const { t, locale } = useI18n();

const searchInput = ref('');
const filters = ref<AdminDocFilters>({ page: 1, limit: 20 });
const editingDoc = ref<AdminDocFull | null>(null);
const editTitle = ref('');
const editContent = ref('');
const deletingDoc = ref<AdminDocFull | null>(null);
const showCreateModal = ref(false);
const createTitle = ref('');
const createContent = ref('');

let searchTimer: ReturnType<typeof setTimeout> | null = null;
const onSearch = (val: string) => {
  searchInput.value = val;
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    filters.value = { ...filters.value, search: val || undefined, page: 1 };
  }, 350);
};

const { data: statsData, status: statsStatus } = useQuery({
  key: ['admin-doc-stats'],
  query: getAdminDocStats,
});

const {
  data: docsData,
  status: docsStatus,
  refetch,
} = useQuery({
  key: computed(() => ['admin-docs', filters.value]),
  query: () => getAdminDocs(filters.value),
});

const { mutate: updateDoc, isLoading: updateLoading } = useMutation({
  mutation: ({ id, dto }: { id: string; dto: Parameters<typeof patchAdminDoc>[1] }) => patchAdminDoc(id, dto),
  onSuccess: () => {
    refetch();
    editingDoc.value = null;
  },
});

const { mutate: removeDoc } = useMutation({
  mutation: (id: string) => deleteAdminDoc(id),
  onSuccess: () => {
    refetch();
    deletingDoc.value = null;
  },
});

const { mutate: createDoc, isLoading: createLoading } = useMutation({
  mutation: (dto: { title: string; content: string }) => postAdminDoc(dto),
  onSuccess: () => {
    refetch();
    showCreateModal.value = false;
    createTitle.value = '';
    createContent.value = '';
  },
});

const openCreate = () => {
  createTitle.value = '';
  createContent.value = '';
  showCreateModal.value = true;
};

const saveCreate = () => {
  if (!createTitle.value.trim()) return;
  createDoc({ title: createTitle.value, content: createContent.value });
};

const openEdit = (doc: AdminDocFull) => {
  editingDoc.value = doc;
  editTitle.value = doc.title;
  editContent.value = doc.content ?? '';
};

const saveEdit = () => {
  if (!editingDoc.value) return;
  updateDoc({ id: editingDoc.value.id, dto: { title: editTitle.value, content: editContent.value } });
};

const togglePublish = (doc: AdminDocFull) => {
  updateDoc({ id: doc.id, dto: { published: !doc.published } });
};

const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(locale.value, { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatNum = (n?: number): string => {
  if (n === undefined || n === null) return '—';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const filteredDocs = computed(() => docsData.value?.data ?? []);

const columns: ColumnDef<AdminDocFull>[] = [
  {
    id: 'num',
    header: t('admin.docs.columns.num'),
    cell: ({ row }) => h('span', { class: 'admin-docs__num' }, String(row.index + 1).padStart(2, '0')),
  },
  {
    id: 'title',
    header: t('admin.docs.columns.title'),
    cell: ({ row }) =>
      h('div', { class: 'admin-docs__title-cell' }, [h('div', { class: 'admin-docs__doc-title' }, row.original.title)]),
  },
  {
    id: 'section',
    header: t('admin.docs.columns.section'),
    cell: ({ row }) => row.original.section ?? '—',
  },
  {
    id: 'author',
    header: t('admin.docs.columns.author'),
    cell: ({ row }) => row.original.author ?? '—',
  },
  {
    id: 'status',
    header: t('admin.docs.columns.status'),
    cell: ({ row }) => {
      const status = row.original.published ? 'published' : (row.original.status ?? 'draft');
      return h('span', { class: `admin-docs__badge admin-docs__badge--${status}` }, t(`admin.docs.status.${status}`));
    },
  },
  {
    id: 'updated',
    header: t('admin.docs.columns.updated'),
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    id: 'views',
    header: t('admin.docs.columns.views'),
    cell: ({ row }) => formatNum(row.original.viewsCount),
  },
  {
    id: 'words',
    header: t('admin.docs.columns.words'),
    cell: ({ row }) => formatNum(row.original.wordsCount),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      h('div', { class: 'admin-docs__actions' }, [
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            iconOnly: true,
            class: 'admin-docs__action-btn',
            title: row.original.published ? t('admin.docs.unpublish') : t('admin.docs.publish'),
            onClick: () => togglePublish(row.original),
          },
          () => h(row.original.published ? EyeIcon : PublishIcon),
        ),
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            iconOnly: true,
            class: 'admin-docs__action-btn',
            title: t('admin.docs.edit-title'),
            onClick: () => openEdit(row.original),
          },
          () => h(EditIcon),
        ),
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            iconOnly: true,
            class: 'admin-docs__action-btn admin-docs__action-btn--danger',
            title: t('admin.docs.delete'),
            onClick: () => (deletingDoc.value = row.original),
          },
          () => h(TrashIcon),
        ),
      ]),
  },
];

const statCards = computed(() => [
  {
    title: t('admin.docs.total'),
    value: statsData.value?.total ?? docsData.value?.pagination.totalCount ?? 0,
    unit: '',
  },
  { title: t('admin.docs.published'), value: statsData.value?.published ?? 0, unit: '' },
  {
    title: t('admin.docs.total-views'),
    value: formatNum(statsData.value?.totalViews),
    unit: '',
  },
  {
    title: t('admin.docs.total-words'),
    value: formatNum(statsData.value?.totalWords),
    unit: t('admin.docs.words-unit'),
  },
]);
</script>

<template>
  <div class="admin-docs">
    <v-container size="lg">
      <div class="admin-docs__header">
        <h1 class="admin-docs__page-title">{{ $t('admin.docs.title') }}</h1>
        <v-button :size="ButtonSizes.LG" @click="openCreate">{{ $t('admin.docs.add') }}</v-button>
      </div>

      <div class="admin-docs__stats">
        <template v-if="statsStatus === 'pending'">
          <v-skeleton v-for="i in 4" :key="i" class="admin-docs__stat-skeleton" />
        </template>
        <template v-else>
          <div v-for="card in statCards" :key="card.title" class="admin-docs__stat-card">
            <div class="admin-docs__stat-label">{{ card.title }}</div>
            <div class="admin-docs__stat-value">
              {{ card.value }}
              <span v-if="card.unit" class="admin-docs__stat-unit">{{ card.unit }}</span>
            </div>
          </div>
        </template>
      </div>

      <div class="admin-docs__filters">
        <v-input
          :model-value="searchInput"
          variant="soft"
          size="xl"
          name="search"
          :placeholder="$t('admin.docs.search-placeholder')"
          @update:model-value="onSearch($event as string)" />
      </div>

      <template v-if="docsStatus === 'pending'">
        <v-skeleton class="admin-docs__table-skeleton" />
      </template>
      <v-table v-else :data="filteredDocs" :columns="columns" class="admin-docs__table" />

      <div v-if="docsData && docsData.pagination.totalPages > 1" class="admin-docs__pagination">
        <v-button
          :variant="ButtonVariants.OUTLINE"
          :size="ButtonSizes.SM"
          :disabled="!docsData.pagination.hasPreviousPage"
          @click="filters.page = (filters.page ?? 1) - 1">
          ←
        </v-button>
        <span class="admin-docs__pagination-info">{{ filters.page }} / {{ docsData.pagination.totalPages }}</span>
        <v-button
          :variant="ButtonVariants.OUTLINE"
          :size="ButtonSizes.SM"
          :disabled="!docsData.pagination.hasNextPage"
          @click="filters.page = (filters.page ?? 1) + 1">
          →
        </v-button>
      </div>
    </v-container>

    <!-- Create modal -->
    <Teleport to="body">
      <template v-if="showCreateModal">
        <div class="admin-doc-overlay" @click="showCreateModal = false" />
        <div class="admin-doc-modal">
          <h2 class="admin-doc-modal__title">{{ $t('admin.docs.create-title') }}</h2>
          <div class="admin-doc-modal__fields">
            <v-form-field :title="$t('admin.docs.edit-title-label')">
              <input v-model="createTitle" class="admin-doc-modal__input" type="text" />
            </v-form-field>
            <v-form-field :title="$t('admin.docs.edit-content-label')">
              <textarea v-model="createContent" class="admin-doc-modal__textarea" rows="16" />
            </v-form-field>
          </div>
          <div class="admin-doc-modal__actions">
            <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD" @click="showCreateModal = false">
              {{ $t('shared.cancel') }}
            </v-button>
            <v-button :size="ButtonSizes.MD" :is-loading="createLoading" @click="saveCreate">
              {{ $t('admin.docs.create-btn') }}
            </v-button>
          </div>
          <button class="admin-doc-modal__close" @click="showCreateModal = false">×</button>
        </div>
      </template>
    </Teleport>

    <!-- Edit modal -->
    <Teleport to="body">
      <template v-if="editingDoc">
        <div class="admin-doc-overlay" @click="editingDoc = null" />
        <div class="admin-doc-modal">
          <h2 class="admin-doc-modal__title">{{ $t('admin.docs.edit-title') }}</h2>
          <div class="admin-doc-modal__fields">
            <v-form-field :title="$t('admin.docs.edit-title-label')">
              <input v-model="editTitle" class="admin-doc-modal__input" type="text" />
            </v-form-field>
            <v-form-field :title="$t('admin.docs.edit-content-label')">
              <textarea v-model="editContent" class="admin-doc-modal__textarea" rows="16" />
            </v-form-field>
          </div>
          <div class="admin-doc-modal__actions">
            <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD" @click="editingDoc = null">
              {{ $t('shared.cancel') }}
            </v-button>
            <v-button :size="ButtonSizes.MD" :is-loading="updateLoading" @click="saveEdit">
              {{ $t('admin.docs.save') }}
            </v-button>
          </div>
          <button class="admin-doc-modal__close" @click="editingDoc = null">×</button>
        </div>
      </template>

      <!-- Delete modal -->
      <template v-if="deletingDoc">
        <div class="admin-doc-overlay" @click="deletingDoc = null" />
        <div class="admin-doc-modal admin-doc-modal--delete">
          <h2 class="admin-doc-modal__title">
            {{ $t('admin.docs.delete-confirm', { title: deletingDoc.title }) }}
          </h2>
          <p class="admin-doc-modal__description">{{ $t('admin.docs.delete-description') }}</p>
          <div class="admin-doc-modal__actions">
            <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD" @click="deletingDoc = null">
              {{ $t('shared.cancel') }}
            </v-button>
            <v-button :variant="ButtonVariants.DESTRUCTIVE" :size="ButtonSizes.MD" @click="removeDoc(deletingDoc!.id)">
              {{ $t('admin.docs.delete-confirm-btn') }}
            </v-button>
          </div>
          <button class="admin-doc-modal__close" @click="deletingDoc = null">×</button>
        </div>
      </template>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.admin-docs {
  margin-block-start: rem(64);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: rem(24);
  }

  &__page-title {
    font-size: rem(28);
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: rem(12);
    margin-block-end: rem(24);
  }

  &__stat-skeleton {
    block-size: rem(80);
    border-radius: rem(8);
  }

  &__stat-card {
    border: 1px solid var(--border);
    border-radius: rem(8);
    padding: rem(16);
    display: flex;
    flex-direction: column;
    gap: rem(4);
  }

  &__stat-value {
    font-size: rem(28);
    font-weight: 700;
  }

  &__stat-unit {
    font-size: rem(14);
    font-weight: 400;
    color: var(--muted-foreground);
  }

  &__stat-label {
    font-size: rem(13);
    color: var(--muted-foreground);
  }

  &__filters {
    margin-block-end: rem(16);
  }

  &__table-skeleton {
    block-size: rem(400);
    border-radius: rem(8);
  }

  &__table {
    width: 100%;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: rem(12);
    margin-block-start: rem(16);
  }

  &__pagination-info {
    font-size: rem(14);
    color: var(--muted-foreground);
  }

  :deep(.table) {
    width: 100%;
  }

  :deep(.column) {
    text-align: left;
    vertical-align: middle;
  }

  :deep(.admin-docs__num) {
    font-size: rem(12);
    color: var(--muted-foreground);
    font-variant-numeric: tabular-nums;
  }

  :deep(.admin-docs__doc-title) {
    font-weight: 600;
    font-size: rem(14);
  }

  :deep(.admin-docs__badge) {
    display: inline-flex;
    align-items: center;
    gap: rem(4);
    padding: rem(3) rem(10);
    border-radius: rem(12);
    font-size: rem(12);
    font-weight: 500;
    white-space: nowrap;
  }

  :deep(.admin-docs__badge--published) {
    background-color: color-mix(in srgb, #7bc47f 15%, transparent);
    color: #7bc47f;
  }

  :deep(.admin-docs__badge--draft) {
    background-color: color-mix(in srgb, var(--muted-foreground) 15%, transparent);
    color: var(--muted-foreground);
  }

  :deep(.admin-docs__badge--review) {
    background-color: color-mix(in srgb, #c9a96e 15%, transparent);
    color: #c9a96e;
  }

  :deep(.admin-docs__actions) {
    display: flex;
    gap: rem(4);
    justify-content: flex-end;
  }

  :deep(.admin-docs__action-btn) {
    padding: rem(6);
    width: rem(32);
    height: rem(32);

    svg {
      width: rem(14);
      height: rem(14);
    }
  }

  :deep(.admin-docs__action-btn--danger) {
    color: var(--destructive);
  }

  :deep(.admin-docs__action-btn--danger:hover) {
    background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
  }
}

.admin-doc-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--overlay);
  z-index: 100;
}

.admin-doc-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: rem(680);
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--popover);
  border: 1px solid var(--border);
  border-radius: rem(12);
  padding: rem(28);
  z-index: 101;
  animation: modalIn 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &--delete {
    max-width: rem(440);
  }

  &__title {
    font-size: rem(20);
    font-weight: 600;
    margin-block-end: rem(20);
    padding-inline-end: rem(32);
  }

  &__description {
    font-size: rem(14);
    color: var(--muted-foreground);
    margin-block-end: rem(20);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: rem(16);
    margin-block-end: rem(20);
  }

  &__input {
    width: 100%;
    padding: rem(10) rem(12);
    background-color: color-mix(in srgb, var(--foreground) 6%, transparent);
    border: 2px solid var(--input);
    border-radius: rem(8);
    color: var(--foreground);
    font-size: rem(14);

    &:focus {
      outline: none;
      border-color: var(--primary);
    }
  }

  &__textarea {
    width: 100%;
    padding: rem(10) rem(12);
    background-color: color-mix(in srgb, var(--foreground) 6%, transparent);
    border: 2px solid var(--input);
    border-radius: rem(8);
    color: var(--foreground);
    font-size: rem(13);
    font-family: 'Courier New', monospace;
    resize: vertical;
    line-height: 1.6;

    &:focus {
      outline: none;
      border-color: var(--primary);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: rem(8);
  }

  &__close {
    @include reset-btn;
    position: absolute;
    top: rem(16);
    right: rem(18);
    font-size: rem(20);
    color: var(--muted-foreground);
    cursor: pointer;
    line-height: 1;

    @include hover {
      color: var(--foreground);
    }
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
