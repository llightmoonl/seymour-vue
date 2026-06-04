export const InputVariants = {
  OUTLINE: 'outline',
  SOFT: 'soft',
  SUBTLE: 'subtle',
  GHOST: 'ghost',
} as const;

export const InputColors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEUTRAL: 'neutral',
  DESTRUCTIVE: 'destructive',
} as const;

export const InputSizes = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export const InputTypes = {
  TEXT: 'text',
  EMAIL: 'email',
  SEARCH: 'search',
  TEL: 'tel',
  URL: 'url',
  PASSWORD: 'password',
  NUMBER: 'number',
} as const;

export const InputModes = {
  TEXT: 'text',
  DECIMAL: 'decimal',
  NUMERIC: 'numeric',
  TEL: 'tel',
  SEARCH: 'search',
  EMAIL: 'email',
  URL: 'url',
} as const;

type InputVariant = (typeof InputVariants)[keyof typeof InputVariants];
type InputColor = (typeof InputColors)[keyof typeof InputColors];
type InputSize = (typeof InputSizes)[keyof typeof InputSizes];
type InputType = (typeof InputTypes)[keyof typeof InputTypes];
type InputMode = (typeof InputModes)[keyof typeof InputModes];

export interface InputProps {
  required?: boolean;
  icon?: string;
  name: string;
  placeholder?: string;
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  type?: InputType;
  inputmode?: InputMode;
  error?: string;
}

export type SearchInputProps = Omit<InputProps, 'required' | 'type' | 'inputmode' | 'error'> & {
  type?: Extract<InputType, 'text' | 'search'>;
  inputmode?: Extract<InputMode, 'text' | 'search'>;
};

export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
}
