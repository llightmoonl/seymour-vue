<script setup lang="ts">
import { computed } from 'vue';
import { TabsContent, TabsList, TabsRoot, TabsTrigger, type AcceptableValue } from 'reka-ui';

// types
import { TabsVariants, type TabsProps, TabsOrientations } from './VTabs.types';

const props = withDefaults(defineProps<TabsProps>(), {
  variant: TabsVariants.PILLS,
  orientation: TabsOrientations.HORIZONTAL,
});
const model = defineModel<AcceptableValue>();

const modifiers = computed(() => [props.variant && `--${props.variant}`]);
</script>

<template>
  <tabs-root class="tabs" v-model="model" :class="modifiers" :orientation="orientation" :default-value="defaultValue">
    <tabs-list class="tabs__list">
      <tabs-trigger
        v-for="item in items"
        :key="`trigger-${item.id}`"
        :value="item.value"
        :disabled="item.disabled"
        class="tabs__trigger">
        {{ item.title }}
      </tabs-trigger>
    </tabs-list>
    <template v-for="item in items" :key="`content-${item.id}`">
      <tabs-content v-if="item.component" class="tabs__content" :value="item.value">
        <component :is="item.component" />
      </tabs-content>
    </template>
  </tabs-root>
</template>

<style scoped lang="scss">
.tabs {
  $item: &;
  display: flex;
  flex-direction: column;
  align-items: start;

  &__content {
    inline-size: 100%;
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
        background-color: color-mix(in srgb, var(--foreground) 8%, transparent);
      }

      &__trigger {
        background-color: transparent;
        padding: rem(4) rem(8);
        border-radius: rem(12);
        color: var(--muted-foreground);

        &:hover {
          background-color: color-mix(in srgb, var(--foreground) 8%, transparent);
          color: var(--foreground);
        }

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
