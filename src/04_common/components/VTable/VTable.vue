<script setup lang="ts" generic="T">
import { computed, h, ref } from 'vue';
import type { VTableProps } from './VTable';
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { faker } from '@faker-js/faker';
import { VCheckbox } from '@common/components';

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

const columns = computed(() => [
  {
    accessorKey: 'select',
    header: ({ table }: { table: any }) => {
      return h(VCheckbox, {
        modelValue: table.getIsSomeRowsSelected() ? 'indeterminate' : table.getIsAllRowsSelected(),
        'onUpdate:modelValue': (value) => table.toggleAllRowsSelected(value),
      })
    },
    cell: ({ row }: { row: any }) => {
      return h(VCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value) => row.toggleSelected(value),
      })
    },
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '1')],
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '2')],
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '3')],
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '4')],
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '5')],
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '6')],
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '7')],
  },
  {
    accessorKey: 'lastName',
    header: () => [h('span', 'x'), h('sub', '8')],
  },
  {
    accessorKey: 'actions',
    header: () => '',
    cell: ({ row }: { row }) => {
      return h(VCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value) => row.toggleSelected(value),
      })
    },
  },
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
          >
            <template v-if="!header.isPlaceholder">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
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
