<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui';
import { ref } from 'vue';

const toggleState = ref(false);

function handleSelect() {
  alert('hello!');
}

const dropdownData = [
  { id: 1, icon: '', label: 'Переименовать', type: 'item', action: handleSelect },
  { id: 2, type: 'separator' },
  { id: 3, label: 'Удалить', type: 'item', action: handleSelect, danger: true },
];
</script>

<template>
  <DropdownMenuRoot class="dropdown" v-model:open="toggleState">
    <DropdownMenuTrigger class="dropdown__trigger" aria-label="Customise options">
      <slot name="trigger"><i-custom-ellipsis class="dropdown__trigger-icon" /></slot>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="dropdown__menu-content" :side-offset="5">
        <template v-for="item in dropdownData" :key="item.id">
          <DropdownMenuItem
            v-if="item.type === 'item'"
            :value="item.label"
            class="dropdown__menu-item"
            :class="{ '--danger': item.danger }">
            {{ item.label }}
          </DropdownMenuItem>
          <DropdownMenuSeparator v-if="item.type === 'separator'" class="dropdown__menu-separator" />
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style scoped lang="scss">
[data-reka-popper-content-wrapper] {
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: rem(6);
  padding: rem(8);
}

.dropdown {
  &__menu {
    &-content {
      min-width: rem(220);
      background-color: white;
      border-radius: 6px;
      padding: 5px;
      box-shadow:
        0 10px 38px -10px rgba(22, 23, 24, 0.35),
        0 10px 20px -15px rgba(22, 23, 24, 0.2);
      animation-duration: 400ms;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;

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
