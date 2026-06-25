import type { AcceptableValue } from 'reka-ui';

export const SelectVariants = {
  OUTLINE: 'outline',
  SOFT: 'soft',
  SUBTLE: 'subtle',
  GHOST: 'ghost',
} as const;

export const SelectSizes = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export const SelectColors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEUTRAL: 'neutral',
  DESTRUCTIVE: 'destructive',
} as const;

export const SelectAligns = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
} as const;

export const SelectSides = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
} as const;

type SelectVariant = (typeof SelectVariants)[keyof typeof SelectVariants];
type SelectSize = (typeof SelectSizes)[keyof typeof SelectSizes];
type SelectColor = (typeof SelectColors)[keyof typeof SelectColors];
type SelectAlign = (typeof SelectAligns)[keyof typeof SelectAligns];
type SelectSide = (typeof SelectSides)[keyof typeof SelectSides];

export interface SelectOptions {
  id: number;
  name: string;
}

export interface SelectProps {
  options: SelectOptions[];
  placeholder?: string;
  align?: SelectAlign;
  side?: SelectSide;
  variant?: SelectVariant;
  color?: SelectColor;
  size?: SelectSize;
  error?: string;
  required?: boolean;
}

export type SelectModel = AcceptableValue | undefined;
