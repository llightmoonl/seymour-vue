import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';

export interface CheckboxProps extends CheckboxRootProps {
  color?: 'primary' | 'secondary' | 'neutral' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export type CheckboxEmits = CheckboxRootEmits;
