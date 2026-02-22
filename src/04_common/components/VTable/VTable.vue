<script setup lang="ts" generic="T">
import type { VTableProps } from './VTable';
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type SortingState,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { computed, h, ref } from 'vue';
import { faker } from '@faker-js/faker';

defineProps<VTableProps>();

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    createdAt: faker.date.anytime(),
    status: faker.helpers.shuffle<Person['status']>(['relationship', 'complicated', 'single'])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = ref(makeData(10));

const sorting = ref<SortingState>([]);

const columns = computed(() => [
  {
    accessorKey: 'lastName',
    header: () => h('span', 'Last Name'),
  },
  {
    accessorKey: 'age',
    header: () => h('span', 'Age'),
  },
  {
    accessorKey: 'visits',
    header: () => h('span', 'Visits'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
  }
]);

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns: columns.value,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  debugTable: false,
});
</script>

<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr class="row" v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            class="column"
            :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
            @click="header.column.getToggleSortingHandler()?.($event)">
            <template v-if="!header.isPlaceholder">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />

              {{ { asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] }}
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="row" v-for="row in table.getRowModel().rows.slice(0, 10)" :key="row.id">
          <td class="column" v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
          <th v-for="header in footerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.footer"
              :props="header.getContext()" />
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.table-container {
  border-radius: rem(4);
  border: 1px solid var(--ring);
  overflow: hidden;
}

.table {
  .row {
    border-bottom: 1px solid var(--ring);

    @include hover {
      background: color-mix(in srgb, var(--muted) 15%, transparent);
    }

    &:last-child {
      border-bottom: none;
    }

    & th {
      border-bottom: 1px solid var(--ring);
    }
  }

  .column {
    text-align: center;
    padding: rem(8);
    min-width: rem(60);
    min-height: rem(60);
  }
}
</style>
