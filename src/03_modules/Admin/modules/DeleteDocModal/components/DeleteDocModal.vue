<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMutation } from '@pinia/colada';
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle } from 'reka-ui';
import { deleteAdminDoc } from '../../../api/admin.api';
import VButton from '@common/components/VButton/VButton.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';

const props = defineProps<{ docId: string; docTitle: string; wordsCount?: number }>();
const emit = defineEmits<{ close: []; deleted: [] }>();

const { t } = useI18n();
const serverError = ref('');

const { mutate, status } = useMutation({
  mutation: () => deleteAdminDoc(props.docId),
  onSuccess: () => {
    emit('deleted');
    emit('close');
  },
  onError: () => {
    serverError.value = t('shared.error');
  },
});
</script>

<template>
  <dialog-root :open="true">
    <dialog-portal>
      <dialog-overlay class="modal-overlay" @click="emit('close')" />
      <dialog-content class="delete-doc-modal">
        <dialog-title class="delete-doc-modal__title">{{ $t('admin.delete-doc.title') }}</dialog-title>
        <p class="delete-doc-modal__description">
          {{ $t('admin.delete-doc.description', { title: docTitle, words: wordsCount ?? '?' }) }}
        </p>

        <p v-if="serverError" class="delete-doc-modal__error">{{ serverError }}</p>

        <div class="delete-doc-modal__actions">
          <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD" @click="emit('close')">
            {{ $t('admin.delete-doc.cancel') }}
          </v-button>
          <v-button
            :variant="ButtonVariants.DESTRUCTIVE"
            :size="ButtonSizes.MD"
            :is-loading="status === 'pending'"
            @click="mutate()">
            {{ $t('admin.delete-doc.confirm') }}
          </v-button>
        </div>

        <button class="delete-doc-modal__close" @click="emit('close')">×</button>
      </dialog-content>
    </dialog-portal>
  </dialog-root>
</template>

<style scoped lang="scss">
.modal-overlay {
  background-color: var(--overlay);
  position: fixed;
  inset: 0;
  z-index: 100;
}

.delete-doc-modal {
  border: 1px solid var(--destructive);
  background-color: var(--popover);
  border-radius: rem(8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: rem(420);
  padding: rem(24);
  z-index: 101;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  gap: rem(16);

  &:focus {
    outline: none;
  }

  &__title {
    font-size: rem(18);
    font-weight: 600;
    padding-inline-end: rem(32);
  }

  &__description {
    font-size: rem(14);
    color: var(--muted-foreground);
    line-height: 1.5;
  }

  &__error {
    font-size: rem(13);
    color: var(--destructive);
    font-weight: 600;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: rem(8);
  }

  &__close {
    @include reset-btn;
    position: absolute;
    top: rem(12);
    right: rem(12);
    font-size: rem(20);
    line-height: 1;
    color: var(--muted-foreground);
    cursor: pointer;
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
