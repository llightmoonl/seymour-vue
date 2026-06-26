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
      <dropdown-menu-content
        class="dropdown__menu-content"
        :class="modifiersContent"
        :side="side ?? 'bottom'"
        :align="align ?? 'start'"
        :side-offset="5">
        <template v-for="item in items" :key="item.id">
          <div v-if="item.type === 'header' && !item.hidden" class="dropdown__menu-header">
            {{ item.label }}
          </div>
          <dropdown-menu-item
            v-else-if="item.type === 'item' && !item.hidden"
            :value="item.label"
            class="dropdown__menu-item"
            :class="{ '--danger': item.danger }"
            @click="item.onClick?.()">
            <component v-if="item.icon" class="dropdown__menu-icon" :is="item.icon" />
            <span class="dropdown__menu-label">{{ item.label }}</span>
            <span v-if="item.meta" class="dropdown__menu-meta">{{ item.meta }}</span>
          </dropdown-menu-item>
          <dropdown-menu-separator v-if="item.type === 'separator' && !item.hidden" class="dropdown__menu-separator" />
        </template>
      </dropdown-menu-content>
    </dropdown-menu-portal>
  </dropdown-menu-root>
</template>

<style scoped lang="scss">
[data-reka-popper-content-wrapper] {
  z-index: 1000 !important;
  border: 1px solid var(--border);
  border-radius: rem(8);
  background-color: var(--popover);
  overflow: hidden;
  box-shadow:
    0 10px 38px -10px rgba(22, 23, 24, 0.35),
    0 10px 20px -15px rgba(22, 23, 24, 0.2);
}

.dropdown {
  &__trigger {
    @include reset-btn;
  }

  &__menu {
    &-content {
      min-width: rem(220);
      padding: rem(8) 0;
      animation-duration: 200ms;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;

      &.--match-width {
        width: var(--reka-dropdown-menu-trigger-width);
      }

      &[data-side='top'] {
        animation-name: slideUpAndFade;
      }

      &[data-side='right'] {
        animation-name: slideLeftAndFade;
      }

      &[data-side='bottom'] {
        animation-name: slideDownAndFade;
      }

      &[data-side='left'] {
        animation-name: slideRightAndFade;
      }
    }

    &-header {
      font-size: rem(12);
      color: var(--muted-foreground);
      padding: rem(6) rem(12) rem(4);
      user-select: none;
    }

    &-item {
      font-size: rem(13);
      line-height: 1;
      color: var(--foreground);
      border-radius: 0;
      display: flex;
      align-items: center;
      gap: rem(8);
      height: rem(34);
      padding: 0 rem(12);
      position: relative;
      user-select: none;
      outline: none;
      cursor: pointer;

      @include hover {
        background-color: var(--accent);
      }

      &[data-disabled] {
        color: var(--muted-foreground);
        pointer-events: none;
      }

      &.--danger {
        color: var(--destructive);

        @include hover {
          background-color: color-mix(in srgb, var(--destructive) 12%, transparent);
        }
      }
    }

    &-icon {
      width: rem(16);
      height: rem(16);
      flex-shrink: 0;
    }

    &-label {
      flex: 1;
    }

    &-meta {
      font-size: rem(11);
      color: var(--muted-foreground);
    }

    &-separator {
      height: rem(1);
      background-color: var(--border);
      margin: rem(4) 0;
    }
  }
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
