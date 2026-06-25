import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import type { Composer } from 'vue-i18n';
import { computed } from 'vue';

export const useAuthSchema = (t: Composer['t']) => {
  const loginSchema = computed(() =>
    toTypedSchema(
      z.object({
        email: z
          .string({ message: t('auth.sign-in.validation.email.empty') })
          .email({ message: t('auth.sign-in.validation.email.correct') }),
        password: z
          .string({ message: t('auth.sign-in.validation.password.empty') })
          .nonempty({ message: t('auth.sign-in.validation.password.empty') }),
        remember: z.boolean().optional().default(false),
      }),
    ),
  );

  const registerSchema = computed(() =>
    toTypedSchema(
      z.object({
        name: z
          .string({ message: t('auth.sign-up.validation.name.empty') })
          .trim()
          .nonempty({ message: t('auth.sign-up.validation.name.empty') })
          .refine((val) => val.split(/\s+/).filter(Boolean).length >= 2, {
            message: t('auth.sign-up.validation.name.empty'),
          }),
        email: z
          .string({ message: t('auth.sign-up.validation.email.empty') })
          .email({ message: t('auth.sign-up.validation.email.correct') }),
        password: z
          .string({ message: t('auth.sign-up.validation.password.empty') })
          .nonempty({ message: t('auth.sign-up.validation.password.empty') }),
        agreement: z.boolean(),
      }),
    ),
  );

  return { loginSchema, registerSchema };
};
