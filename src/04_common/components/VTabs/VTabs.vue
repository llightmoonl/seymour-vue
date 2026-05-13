<script setup lang="ts">
import { computed } from 'vue';
import { TabsContent, TabsList, TabsRoot, TabsTrigger, type AcceptableValue } from 'reka-ui';

// types
import { TabsVariants, type VTabsProps } from './VTabs.types';

const props = withDefaults(defineProps<VTabsProps>(), {
  variant: TabsVariants.PILLS,
});

const model = defineModel<AcceptableValue>();

const modifiers = computed(() => [props.variant && `--${props.variant}`]);
</script>

<template>
  <TabsRoot class="tabs" v-model="model" :class="modifiers" :orientation="orientation" :default-value="defaultValue">
    <TabsList class="tabs__list">
      <TabsTrigger
        v-for="item in items"
        :key="`trigger-${item.id}`"
        :value="item.value"
        :disabled="item.disabled"
        class="tabs__trigger">
        {{ item.title }}
      </TabsTrigger>
    </TabsList>
    <template v-for="item in items" :key="`content-${item.id}`">
      <TabsContent v-if="item.component" class="tabs__content" :value="item.value">
        <Component :is="item.component" />
      </TabsContent>
    </template>
  </TabsRoot>
</template>

<style scoped lang="scss">
.tabs {
  $item: &;
  display: flex;
  flex-direction: column;
  align-items: start;

  &__content {
    width: 100%;
  }

  &__list {
    display: flex;
  }

  &__trigger {
    cursor: pointer;
    color: currentColor;
    border: none;
  }

  &.--pills {
    & #{$item} {
      &__list {
        border-radius: rem(14);
        padding: rem(4);
        background-color: var(--muted);
      }

      &__trigger {
        background-color: transparent;
        padding: rem(4) rem(8);
        border-radius: rem(12);

        &:hover,
        &[data-state='active'] {
          background-color: var(--primary);
          color: var(--primary-foreground);
        }

        &:focus-visible {
          outline: none;
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
  }

  &.--chips {
    & #{$item} {
      &__list {
        column-gap: rem(8);
      }

      &__trigger {
        background-color: transparent;
        border: 1px solid var(--border);
        padding: rem(8) rem(14);
        border-radius: rem(16);
        font-size: rem(13);

        &:hover {
          background-color: var(--accent);
          color: var(--accent-foreground);
        }

        &[data-state='active'] {
          background-color: var(--primary);
          color: var(--primary-foreground);
        }
      }
    }
  }
}
</style>
