<script setup lang="ts">
import { ref, computed, h, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery, useMutation } from '@pinia/colada';
import type { ColumnDef } from '@tanstack/vue-table';
import { getAdminUsers, getAdminUserStats, exportAdminUsers, deleteAdminUser } from '../api/admin.api';
import type { AdminUser, AdminUserFilters, UserRole, UserStatus } from '../types/admin.types';
import type { SelectOptions } from '@common/components/VSelect/VSelect.types';
import VContainer from '@common/components/VContainer/VContainer.vue';
import VTable from '@common/components/VTable/VTable.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VInput from '@common/components/VInput/VInput.vue';
import VSelect from '@common/components/VSelect/VSelect.vue';
import VAvatar from '@common/components/VAvatar/VAvatar.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { AvatarSizes } from '@common/components/VAvatar/VAvatar.types';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';
import { SelectSizes, SelectVariants } from '@common/components/VSelect/VSelect.types';
import AdminUserProjectsModal from '../modules/UserProjectsModal/components/UserProjectsModal.vue';
import AdminEditUserModal from '../modules/EditUserModal/components/EditUserModal.vue';
import AdminCreateUserModal from '../modules/CreateUserModal/components/CreateUserModal.vue';
import { debounce } from '@common/utils/debounce';
import FolderIcon from '~icons/custom/folder';
import EditIcon from '~icons/custom/edit';
import TrashIcon from '~icons/custom/trash';

const { t, locale } = useI18n();

const filters = ref<AdminUserFilters>({ page: 1, limit: 20, sort: 'createdAt:desc' });
const searchInput = ref('');

const debouncedSearch = debounce((value: string) => {
  filters.value = { ...filters.value, search: value || undefined, page: 1 };
}, 350);

const onSearch = (value: string) => {
  searchInput.value = value;
  debouncedSearch(value);
};

// Role select
const roleSelectOptions: SelectOptions[] = [
  { id: 0, name: t('admin.users.all-roles') },
  { id: 1, name: t('roles.STUDENT') },
  { id: 2, name: t('roles.TEACHER') },
  { id: 3, name: t('roles.ADMIN') },
];
const roleValueMap: Record<number, UserRole | undefined> = { 0: undefined, 1: 'STUDENT', 2: 'TEACHER', 3: 'ADMIN' };
const selectedRoleOption = ref<SelectOptions | undefined>(roleSelectOptions[0]);
watch(selectedRoleOption, (opt) => {
  const id = (opt as SelectOptions | undefined)?.id as number | undefined;
  filters.value = { ...filters.value, role: id !== undefined ? roleValueMap[id] : undefined, page: 1 };
});

// Status select
const statusSelectOptions: SelectOptions[] = [
  { id: 0, name: t('admin.users.all-statuses') },
  { id: 1, name: t('admin.status.ACTIVE') },
  { id: 2, name: t('admin.status.INACTIVE') },
  { id: 3, name: t('admin.status.BLOCKED') },
];
const statusValueMap: Record<number, UserStatus | undefined> = {
  0: undefined,
  1: 'ACTIVE',
  2: 'INACTIVE',
  3: 'BLOCKED',
};
const selectedStatusOption = ref<SelectOptions | undefined>(statusSelectOptions[0]);
watch(selectedStatusOption, (opt) => {
  const id = (opt as SelectOptions | undefined)?.id as number | undefined;
  filters.value = { ...filters.value, status: id !== undefined ? statusValueMap[id] : undefined, page: 1 };
});

const { data: statsData, status: statsStatus } = useQuery({
  key: ['admin-user-stats'],
  query: getAdminUserStats,
});

const {
  data: usersData,
  isLoading: usersDataLoading,
  refetch,
} = useQuery({
  key: computed(() => ['admin-users', filters.value]),
  query: () => getAdminUsers(filters.value),
});

const { mutate: deleteUser } = useMutation({
  mutation: (id: string) => deleteAdminUser(id),
  onSuccess: () => refetch(),
});

const onExport = async () => {
  const blob = await exportAdminUsers();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users.csv';
  a.click();
  URL.revokeObjectURL(url);
};

const selectedUserId = ref<string | null>(null);
const editingUser = ref<AdminUser | null>(null);
const showCreateModal = ref(false);
const showProjectsModal = ref(false);
const showEditModal = ref(false);
const deletingUser = ref<AdminUser | null>(null);

const openProjects = (user: AdminUser) => {
  selectedUserId.value = user.id;
  showProjectsModal.value = true;
};

const openEdit = (user: AdminUser) => {
  editingUser.value = user;
  showEditModal.value = true;
};

const confirmDelete = (user: AdminUser) => {
  deletingUser.value = user;
};

const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(locale.value);
};

const columns: ColumnDef<AdminUser>[] = [
  {
    id: 'user',
    header: t('admin.users.columns.user'),
    cell: ({ row }) =>
      h('div', { class: 'admin-users__user-cell' }, [
        h(VAvatar, {
          class: 'admin-users__user-avatar',
          src: '',
          size: AvatarSizes['3XS'],
          alt: (row.original.name ?? '?').charAt(0).toUpperCase(),
        }),
        h('div', { class: 'admin-users__user-info' }, [
          h('div', { class: 'admin-users__user-name' }, row.original.name),
          h('div', { class: 'admin-users__user-email' }, row.original.email),
        ]),
      ]),
  },
  {
    id: 'role',
    header: t('admin.users.columns.role'),
    cell: ({ row }) =>
      h(
        'span',
        { class: `admin-users__badge admin-users__badge--role-${row.original.role.toLowerCase()}` },
        t(`roles.${row.original.role}`),
      ),
  },
  {
    id: 'group',
    header: t('admin.users.columns.group'),
    cell: ({ row }) => row.original.group ?? '—',
  },
  {
    id: 'status',
    header: t('admin.users.columns.status'),
    cell: ({ row }) =>
      h(
        'span',
        { class: `admin-users__badge admin-users__badge--status-${row.original.status.toLowerCase()}` },
        t(`admin.status.${row.original.status}`),
      ),
  },
  {
    id: 'projects',
    header: t('admin.users.columns.projects'),
    cell: ({ row }) => row.original.projectsCount,
  },
  {
    id: 'created',
    header: t('admin.users.columns.created'),
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      h('div', { class: 'admin-users__actions' }, [
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            iconOnly: true,
            class: 'admin-users__action-btn',
            onClick: () => openProjects(row.original),
            title: t('admin.user-projects.title'),
          },
          () => h(FolderIcon),
        ),
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            iconOnly: true,
            class: 'admin-users__action-btn',
            onClick: () => openEdit(row.original),
            title: t('admin.edit-user.title'),
          },
          () => h(EditIcon),
        ),
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            iconOnly: true,
            class: 'admin-users__action-btn admin-users__action-btn--danger',
            onClick: () => confirmDelete(row.original),
            title: t('admin.users.delete-confirm', { name: row.original.name }),
          },
          () => h(TrashIcon),
        ),
      ]),
  },
];

const statCards = computed(() => [
  { title: t('admin.users.total'), value: statsData.value?.total ?? 0 },
  { title: t('admin.users.active'), value: statsData.value?.active ?? 0 },
  { title: t('admin.users.students'), value: statsData.value?.students ?? 0 },
  { title: t('admin.users.teachers'), value: statsData.value?.teachers ?? 0 },
]);
</script>

<template>
  <div class="admin-users">
    <v-container size="lg">
      <div class="admin-users__header">
        <h1 class="admin-users__title">{{ $t('admin.users.title') }}</h1>
        <div class="admin-users__header-actions">
          <v-button :variant="ButtonVariants.SOFT" :size="ButtonSizes.LG" @click="onExport">
            {{ $t('admin.users.export') }}
          </v-button>
          <v-button :size="ButtonSizes.LG" @click="showCreateModal = true">
            {{ $t('admin.users.add') }}
          </v-button>
        </div>
      </div>

      <div class="admin-users__stats">
        <template v-if="statsStatus === 'pending'">
          <v-skeleton v-for="i in 4" :key="i" class="admin-users__stat-skeleton" />
        </template>
        <template v-else>
          <div v-for="card in statCards" :key="card.title" class="admin-users__stat-card">
            <div class="admin-users__stat-label">{{ card.title }}</div>
            <div class="admin-users__stat-value">{{ card.value }}</div>
          </div>
        </template>
      </div>

      <div class="admin-users__filters">
        <v-input
          :model-value="searchInput"
          variant="soft"
          size="xl"
          name="search"
          :placeholder="$t('admin.users.search-placeholder')"
          @update:model-value="onSearch($event as string)" />
        <div class="admin-users__filter-selects">
          <v-select
            class="admin-users__filter-select"
            v-model:value="selectedRoleOption"
            :options="roleSelectOptions"
            :variant="SelectVariants.SOFT"
            :size="SelectSizes.LG" />
          <v-select
            class="admin-users__filter-select"
            v-model:value="selectedStatusOption"
            :options="statusSelectOptions"
            :variant="SelectVariants.SOFT"
            :size="SelectSizes.LG" />
        </div>
      </div>

      <template v-if="usersDataLoading">
        <v-skeleton class="admin-users__table-skeleton" />
      </template>
      <v-table v-else :data="usersData?.items ?? []" :columns="columns" class="admin-users__table" />

      <div v-if="usersData && usersData.meta.hasMore" class="admin-users__pagination">
        <v-button
          :variant="ButtonVariants.OUTLINE"
          :size="ButtonSizes.SM"
          :disabled="!usersData.pagination.hasPreviousPage"
          @click="filters.page = (filters.page ?? 1) - 1">
          ←
        </v-button>
        <span class="admin-users__pagination-info">{{ filters.page }} / {{ usersData.pagination.totalPages }}</span>
        <v-button
          :variant="ButtonVariants.OUTLINE"
          :size="ButtonSizes.SM"
          :disabled="!usersData.pagination.hasNextPage"
          @click="filters.page = (filters.page ?? 1) + 1">
          →
        </v-button>
      </div>
    </v-container>

    <!-- Delete confirmation modal -->
    <Teleport to="body">
      <template v-if="deletingUser">
        <div class="admin-delete-overlay" @click="deletingUser = null" />
        <div class="admin-delete-modal">
          <h2 class="admin-delete-modal__title">{{ $t('admin.users.delete-title') }}</h2>
          <p class="admin-delete-modal__description">
            {{ $t('admin.users.delete-description', { name: deletingUser.name, email: deletingUser.email }) }}
          </p>
          <div class="admin-delete-modal__warning">
            <i-custom-info class="admin-delete-modal__warning-icon" />
            {{ $t('admin.users.delete-irreversible') }}
          </div>
          <div class="admin-delete-modal__actions">
            <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD" @click="deletingUser = null">
              {{ $t('shared.cancel') }}
            </v-button>
            <v-button
              :variant="ButtonVariants.DESTRUCTIVE"
              :size="ButtonSizes.MD"
              @click="
                () => {
                  deleteUser(deletingUser!.id);
                  deletingUser = null;
                }
              ">
              {{ $t('admin.users.delete-confirm-btn') }}
            </v-button>
          </div>
          <button class="admin-delete-modal__close" @click="deletingUser = null">×</button>
        </div>
      </template>
    </Teleport>

    <admin-user-projects-modal
      v-if="showProjectsModal && selectedUserId"
      :user-id="selectedUserId"
      @close="showProjectsModal = false" />

    <admin-edit-user-modal
      v-if="showEditModal && editingUser"
      :user="editingUser"
      @close="showEditModal = false"
      @saved="refetch()" />

    <admin-create-user-modal v-if="showCreateModal" @close="showCreateModal = false" @created="refetch()" />
  </div>
</template>

<style scoped lang="scss">
.admin-users {
  margin-block-start: rem(64);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: rem(24);

    &-actions {
      display: flex;
      gap: rem(8);
    }
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

  &__stat-label {
    font-size: rem(13);
    color: var(--muted-foreground);
  }

  &__filters {
    display: flex;
    gap: rem(12);
    margin-block-end: rem(16);
    align-items: center;
  }

  &__filter-selects {
    display: flex;
    gap: rem(8);
    flex-shrink: 0;
  }

  &__filter-select {
    width: rem(250);
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
  }

  :deep(.admin-users__user-cell) {
    text-align: left;
    display: flex;
    align-items: center;
    gap: rem(10);
  }

  :deep(.admin-users__user-avatar) {
    flex-shrink: 0;
  }

  :deep(.admin-users__user-info) {
    min-width: 0;
  }

  :deep(.admin-users__user-name) {
    font-weight: 600;
    font-size: rem(14);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :deep(.admin-users__user-email) {
    font-size: rem(12);
    color: var(--muted-foreground);
    margin-top: rem(2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :deep(.admin-users__badge) {
    display: inline-block;
    padding: rem(2) rem(8);
    border-radius: rem(12);
    font-size: rem(11);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  :deep(.admin-users__badge--role-admin) {
    background-color: color-mix(in srgb, var(--primary) 15%, transparent);
    color: var(--primary);
  }

  :deep(.admin-users__badge--role-teacher) {
    background-color: color-mix(in srgb, #c9a96e 15%, transparent);
    color: #c9a96e;
  }

  :deep(.admin-users__badge--role-student) {
    background-color: color-mix(in srgb, var(--muted-foreground) 15%, transparent);
    color: var(--muted-foreground);
  }

  :deep(.admin-users__badge--status-active) {
    background-color: color-mix(in srgb, #7bc47f 15%, transparent);
    color: #7bc47f;
  }

  :deep(.admin-users__badge--status-inactive) {
    background-color: color-mix(in srgb, var(--muted-foreground) 15%, transparent);
    color: var(--muted-foreground);
  }

  :deep(.admin-users__badge--status-blocked) {
    background-color: color-mix(in srgb, var(--destructive) 15%, transparent);
    color: var(--destructive);
  }

  :deep(.admin-users__actions) {
    display: flex;
    gap: rem(4);
    justify-content: flex-end;
  }

  :deep(.admin-users__action-btn) {
    padding: rem(6);
    width: rem(32);
    height: rem(32);

    svg {
      width: rem(14);
      height: rem(14);
    }
  }

  :deep(.admin-users__action-btn--danger) {
    color: var(--destructive);

    &:hover {
      color: var(--destructive);
      background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
    }
  }
}

// Delete confirmation modal
.admin-delete-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--overlay);
  z-index: 100;
}

.admin-delete-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: rem(440);
  background-color: var(--popover);
  border: 1px solid var(--border);
  border-radius: rem(12);
  padding: rem(28) rem(28) rem(24);
  z-index: 101;
  animation: modalIn 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &__title {
    font-size: rem(20);
    font-weight: 600;
    margin-block-end: rem(10);
    padding-inline-end: rem(32);
  }

  &__description {
    font-size: rem(14);
    color: var(--muted-foreground);
    line-height: 1.6;
    margin-block-end: rem(16);
  }

  &__warning {
    display: flex;
    align-items: center;
    gap: rem(8);
    padding: rem(10) rem(12);
    border-radius: rem(8);
    background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
    color: var(--destructive);
    font-size: rem(13);
    margin-block-end: rem(20);

    &-icon {
      width: rem(16);
      height: rem(16);
      flex-shrink: 0;
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
    top: rem(14);
    right: rem(16);
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
