import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';

export const CheckboxColors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEUTRAL: 'neutral',
  DESTRUCTIVE: 'destructive',
};

export const CheckboxSizes = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

type CheckboxColor = (typeof CheckboxColors)[keyof typeof CheckboxColors];
type CheckboxSize = (typeof CheckboxSizes)[keyof typeof CheckboxSizes];

export interface CheckboxProps extends CheckboxRootProps {
  color?: CheckboxColor;
  size?: CheckboxSize;
  modelValue?: boolean | 'indeterminate' | null;
}

export type CheckboxEmits = CheckboxRootEmits;
