<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery, useMutation } from '@pinia/colada';
import type { ColumnDef } from '@tanstack/vue-table';
import { getAdminUsers, getAdminUserStats, exportAdminUsers, deleteAdminUser } from '../api/admin.api';
import type { AdminUser, AdminUserFilters, UserRole, UserStatus } from '../types/admin.types';
import VContainer from '@common/components/VContainer/VContainer.vue';
import VTable from '@common/components/VTable/VTable.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VInput from '@common/components/VInput/VInput.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';
import AdminUserProjectsModal from '../modules/UserProjectsModal/components/UserProjectsModal.vue';
import AdminEditUserModal from '../modules/EditUserModal/components/EditUserModal.vue';
import AdminCreateUserModal from '../modules/CreateUserModal/components/CreateUserModal.vue';
import { debounce } from '@common/utils/debounce';

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

const roleOptions: Array<{ id: UserRole | ''; name: string }> = [
  { id: '', name: t('admin.users.all-roles') },
  { id: 'STUDENT', name: t('roles.STUDENT') },
  { id: 'TEACHER', name: t('roles.TEACHER') },
  { id: 'ADMIN', name: t('roles.ADMIN') },
];

const statusOptions: Array<{ id: UserStatus | ''; name: string }> = [
  { id: '', name: t('admin.users.all-statuses') },
  { id: 'ACTIVE', name: t('admin.status.ACTIVE') },
  { id: 'INACTIVE', name: t('admin.status.INACTIVE') },
  { id: 'BLOCKED', name: t('admin.status.BLOCKED') },
];

const selectedRole = ref<UserRole | ''>('');
const selectedStatus = ref<UserStatus | ''>('');

const onRoleChange = (role: UserRole | '') => {
  selectedRole.value = role;
  filters.value = { ...filters.value, role: role || undefined, page: 1 };
};

const onStatusChange = (status: UserStatus | '') => {
  selectedStatus.value = status;
  filters.value = { ...filters.value, status: status || undefined, page: 1 };
};

const { data: statsData, status: statsStatus } = useQuery({
  key: ['admin-user-stats'],
  query: getAdminUserStats,
});

const {
  data: usersData,
  loading: usersDataLoading,
  refetch,
} = useQuery({
  key: computed(() => ['admin-users', filters.value]),
  query: () => getAdminUsers(filters.value),
});

console.log(usersData);

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

const openProjects = (user: AdminUser) => {
  selectedUserId.value = user.id;
  showProjectsModal.value = true;
};

const openEdit = (user: AdminUser) => {
  editingUser.value = user;
  showEditModal.value = true;
};

const onDeleteUser = (user: AdminUser) => {
  if (confirm(t('admin.users.delete-confirm', { name: user.name }))) {
    deleteUser(user.id);
  }
};

const columns: ColumnDef<AdminUser>[] = [
  {
    id: 'user',
    header: t('admin.users.columns.user'),
    cell: ({ row }) =>
      h('div', { class: 'admin-users__user-cell' }, [
        h('div', { class: 'admin-users__user-name' }, row.original.name),
        h('div', { class: 'admin-users__user-email' }, row.original.email),
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
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(locale.value),
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
            class: 'admin-users__action-btn',
            onClick: () => openProjects(row.original),
            title: t('admin.user-projects.title'),
          },
          () => h('i-custom-folder'),
        ),
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            class: 'admin-users__action-btn',
            onClick: () => openEdit(row.original),
          },
          () => h('i-custom-edit'),
        ),
        h(
          VButton,
          {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SM,
            class: 'admin-users__action-btn admin-users__action-btn--danger',
            onClick: () => onDeleteUser(row.original),
          },
          () => h('i-custom-trash'),
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
          <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.SM" @click="onExport">
            {{ $t('admin.users.export') }}
          </v-button>
          <v-button :size="ButtonSizes.SM" @click="showCreateModal = true">
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
            <div class="admin-users__stat-value">{{ card.value }}</div>
            <div class="admin-users__stat-label">{{ card.title }}</div>
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
          <select
            class="admin-users__select"
            :value="selectedRole"
            @change="onRoleChange(($event.target as HTMLSelectElement).value as UserRole | '')">
            <option v-for="opt in roleOptions" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
          </select>
          <select
            class="admin-users__select"
            :value="selectedStatus"
            @change="onStatusChange(($event.target as HTMLSelectElement).value as UserStatus | '')">
            <option v-for="opt in statusOptions" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
          </select>
        </div>
      </div>

      <template v-if="usersDataLoading">
        <v-skeleton class="admin-users__table-skeleton" />
      </template>
      <v-table v-else :data="usersData?.items ?? []" :columns="columns" />
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

    &-value {
      font-size: rem(24);
      font-weight: 700;
    }

    &-label {
      font-size: rem(13);
      color: var(--muted-foreground);
    }
  }

  &__stat-value {
    font-size: rem(24);
    font-weight: 700;
    font-family: 'Times New Roman', serif;
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
  }

  &__select {
    padding: rem(9) rem(12);
    border: 2px solid var(--input);
    border-radius: rem(8);
    background-color: color-mix(in srgb, var(--foreground) 5%, transparent);
    color: var(--foreground);
    font-size: rem(14);
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  &__table-skeleton {
    block-size: rem(400);
    border-radius: rem(8);
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

  :deep(.admin-users__user-cell) {
    text-align: left;
  }

  :deep(.admin-users__user-name) {
    font-weight: 600;
    font-size: rem(14);
  }

  :deep(.admin-users__user-email) {
    font-size: rem(12);
    color: var(--muted-foreground);
  }

  :deep(.admin-users__badge) {
    display: inline-block;
    padding: rem(2) rem(8);
    border-radius: rem(12);
    font-size: rem(11);
    font-weight: 600;
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
    justify-content: center;
  }

  :deep(.admin-users__action-btn) {
    padding: rem(4);
    font-size: rem(14);
  }

  :deep(.admin-users__action-btn--danger) {
    color: var(--destructive);
  }
}
</style>
