import type { AcceptableValue } from 'reka-ui';

export interface SelectOptions {
  id: number;
  name: string;
}

export interface SelectProps {
  title?: string | undefined | null;
  options: SelectOptions[];
  placeholder?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost';
  color?: 'primary' | 'secondary' | 'neutral' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  error?: string;
  required?: boolean;
}

export type SelectModel = AcceptableValue | undefined;
