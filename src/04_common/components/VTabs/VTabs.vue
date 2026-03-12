<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';
import type { VTabsProps } from './VTabs';

defineProps<VTabsProps>();
const model = defineModel<number | string | undefined>();
</script>

<template>
  <TabsRoot
    class="tabs"
    :orientation="orientation"
    v-model:value="model">
    <TabsList class="list">
      <TabsTrigger v-for="item in items" :key="item.id" :value="item.value" :disabled="item.disabled" class="trigger">
        {{ item.title }}
      </TabsTrigger>
    </TabsList>
    <TabsContent class="content" v-for="item in items" :key="item.id" :value="item.value">
      <Component :is="item.component" />
    </TabsContent>
  </TabsRoot>
</template>

<style scoped lang="scss">
.tabs {
  display: flex;
  flex-direction: column;
  align-items: start;

  & .content {
    width: 100%;
  }

  & .list {
    background-color: #303030;
    border-radius: 0.9rem;
    padding: 0.3rem 0.3rem;
    display: flex;
    margin-top: rem(20);
  }

  & .trigger {
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    background-color: transparent;
    color: currentColor;
    border: none;
    border-radius: 0.725rem;
    font-size: 1rem;

    &:hover {
      background-color: #ffffff26;
    }

    &:focus-visible {
      outline: none;
    }

    &[data-state='active'] {
      background-color: #ffffff26;
    }

    &[data-disabled] {
      opacity: 0.3;
      cursor: not-allowed;

      &:hover {
        background: none;
      }
    }
  }
}
</style>
