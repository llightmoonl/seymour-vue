<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui';

import VButton from '../VButton/VButton.vue';
import type { ModalProps } from './VModal.types';
import CloseIcon from '~icons/custom/close';

const props = defineProps<ModalProps>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const localOpen = ref(props.open ?? false);

watch(
  () => props.open,
  (val) => {
    if (val !== undefined) localOpen.value = val;
  },
);

function onOpenChange(val: boolean) {
  localOpen.value = val;
  if (props.open !== undefined) emit('update:open', val);
}
</script>

<template>
  <dialog-root :open="localOpen" @update:open="onOpenChange" v-slot="{ close, open: dialogOpen }">
    <dialog-trigger class="modal__trigger" as-child>
      <slot>
        <v-button variant="solid" size="md"></v-button>
      </slot>
    </dialog-trigger>
    <dialog-portal>
      <dialog-overlay class="modal__overlay" />
      <dialog-content class="modal__content">
        <dialog-title v-if="title" class="modal__title">{{ title }}</dialog-title>
        <dialog-description v-if="description" class="modal__description">{{ description }}</dialog-description>
        <slot name="content"></slot>
        <dialog-close class="modal__close" as-child>
          <v-button variant="ghost" :icon-only="true" size="sm"><CloseIcon /></v-button>
        </dialog-close>
        <slot name="footer" :close="close" :open="dialogOpen"></slot>
      </dialog-content>
    </dialog-portal>
  </dialog-root>
</template>

<style scoped lang="scss">
.modal {
  &__overlay {
    background-color: var(--overlay);
    position: fixed;
    inset: 0;
    z-index: 100;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &__content {
    border: 1px solid var(--border);
    background-color: var(--popover);
    border-radius: rem(6);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: rem(450);
    max-height: 85vh;
    padding: rem(24);
    z-index: 101;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    &:focus {
      outline: none;
    }
  }

  &__title {
    margin: 0;
    font-weight: 500;
    color: var(--foreground);
    font-size: rem(20);
    padding-inline-end: rem(32);
  }

  &__description {
    margin: rem(10) 0 rem(20);
    color: var(--muted-foreground);
    font-size: rem(14);
    line-height: 1.5;
  }

  &__close {
    position: absolute;
    top: rem(12);
    right: rem(12);
  }
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
