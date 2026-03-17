<script setup lang="ts">
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
import type { ModalProps } from './VModal';
import { VButton } from '@common/components';

import CloseIcon from '~icons/custom/close';

defineProps<ModalProps>();
</script>

<template>
  <DialogRoot class="modal">
    <DialogTrigger class="modal__trigger" as-child>
      <slot>
        <v-button variant="solid" size="md"></v-button>
      </slot>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="modal__overlay" />
      <DialogContent class="modal__content">
        <DialogTitle v-if="title" class="modal__title">
          {{ title }}
        </DialogTitle>
        <DialogDescription v-if="description" class="modal__description">
          {{ description }}
        </DialogDescription>
        <slot name="content"></slot>
        <DialogClose class="modal__close" as-child>
          <v-button variant="ghost" size="icon-sm"><CloseIcon /></v-button>
        </DialogClose>
        <slot name="footer"></slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped lang="scss">
.modal {
  &__overlay {
    background-color: color-mix(in srgb, var(--color-black) 60%, transparent);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &__content {
    background-color: var(--background);
    border-radius: 6px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    &:focus {
      outline: none;
    }
  }

  &__title {
    margin: 0;
    font-weight: 500;
    color: var(--foreground);
    font-family: Geologica, sans-serif;
    font-size: 17px;
  }

  &__description {
    margin: 10px 0 20px;
    color: var(--mauve-11);
    font-size: 15px;
    line-height: 1.5;
  }

  &__close {
    position: absolute;
    top: rem(10);
    right: rem(10);
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
