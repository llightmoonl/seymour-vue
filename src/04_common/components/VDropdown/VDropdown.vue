<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui';
import type { DropdownProps } from '@common/components/VDropdown/VDropdown.types';
import { computed } from 'vue';

const props = defineProps<DropdownProps>();
const open = defineModel<boolean>('open');

const modifiersContent = computed(() => [props.matchTriggerWidth && `--match-width`]);
</script>

<template>
  <dropdown-menu-root class="dropdown" v-model:open="open">
    <dropdown-menu-trigger class="dropdown__trigger" aria-label="Customise options">
      <slot name="trigger" :open="open"><i-custom-ellipsis class="dropdown__trigger-icon" /></slot>
    </dropdown-menu-trigger>
    <dropdown-menu-portal class="dropdown__portal">
      <dropdown-menu-content class="dropdown__menu-content" :class="modifiersContent" :side-offset="5">
        <template v-for="item in items" :key="item.id">
          <dropdown-menu-item
            v-if="item.type === 'item' && !item.hidden"
            :value="item.label"
            class="dropdown__menu-item"
            :class="{ '--danger': item.danger }"
            @click="item.onClick?.()">
            <component v-if="item.icon" class="dropdown__menu-icon" :is="item.icon" />
            <span class="dropdown__menu-label">{{ item.label }}</span>
            <span v-if="item.meta" class="dropdown__menu-meta">{{ item.meta }}</span>
          </dropdown-menu-item>
          <dropdown-menu-separator v-if="item.type === 'separator'" class="dropdown__menu-separator" />
        </template>
      </dropdown-menu-content>
    </dropdown-menu-portal>
  </dropdown-menu-root>
</template>

<style scoped lang="scss">
[data-reka-popper-content-wrapper] {
  z-index: 1000 !important;
  border: 1px solid var(--border);

  border-radius: rem(6);
  padding: rem(8);
}

.dropdown {
  &__trigger {
    @include reset-btn;
  }
  &__menu {
    &-content {
      min-width: rem(220);
      background-color: var(--background);
      box-shadow:
        0 10px 38px -10px rgba(22, 23, 24, 0.35),
        0 10px 20px -15px rgba(22, 23, 24, 0.2);
      animation-duration: 400ms;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;

      &.--match-width {
        width: var(--reka-dropdown-menu-trigger-width);
      }

      &[data-side='top'] {
        animation-name: slideDownAndFade;
      }

      &[data-side='right'] {
        animation-name: slideLeftAndFade;
      }

      &[data-side='bottom'] {
        animation-name: slideUpAndFade;
      }

      &[data-side='left'] {
        animation-name: slideRightAndFade;
      }
    }
    &-item {
      font-size: 13px;
      line-height: 1;
      color: var(--grass-11);
      border-radius: 3px;
      display: flex;
      align-items: center;
      height: 25px;
      padding: 0 5px;
      position: relative;
      user-select: none;
      outline: none;

      &[data-disabled] {
        color: var(--mauve-8);
        pointer-events: none;
      }

      &.--danger {
        color: var(--destructive);

        &:hover {
          background-color: color-mix(in srgb, var(--destructive) 15%, transparent);
        }
      }
    }

    &-label {
      flex: 1;
    }

    &-meta {
      font-size: rem(11);
      color: var(--muted-foreground);
      margin-inline-start: rem(8);
    }

    &-separator {
      height: rem(1);
      background-color: var(--border);
      margin: rem(5) 0;
    }
  }
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
