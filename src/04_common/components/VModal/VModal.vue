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
  <DialogRoot class="modal" v-slot="{ close, open }">
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
        <slot name="footer" :close="close" :open="open"></slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped lang="scss">
.modal {
  &__overlay {
    background-color: var(--overlay);
    position: fixed;
    inset: 0;
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
    max-width: 450px;
    max-height: 85vh;
    padding: rem(25);
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
  }

  &__description {
    margin: rem(10) 0 rem(20);
    color: var(--foreground);
    font-size: rem(15);
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
