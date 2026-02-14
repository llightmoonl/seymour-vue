<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';
import type { TabsBaseProps } from './VTabs';

defineProps<TabsBaseProps>();
</script>

<template>
  <TabsRoot class="tabs" :default-value="defaultValue" :orientation="orientation">
    <TabsList class="list">
      <TabsTrigger
        v-for="element in data"
        :key="element.id"
        :value="element.value"
        :disabled="element.disabled"
        class="trigger">
        {{ element.title }}
      </TabsTrigger>
    </TabsList>
    <TabsContent class="content" v-for="element in data" :key="element.id" :value="element.value">
      <Component :is="element.component" />
    </TabsContent>
  </TabsRoot>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

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
