export const ButtonVariants = {
  SOLID: 'solid',
  OUTLINE: 'outline',
  SOFT: 'soft',
  SUBTLE: 'subtle',
  GHOST: 'ghost',
  LINK: 'link',
  DESTRUCTIVE: 'destructive',
} as const;

export const ButtonTypes = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
};

export const ButtonSizes = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

export const ButtonColors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEUTRAL: 'neutral',
  DESTRUCTIVE: 'destructive',
};

type ButtonVariant = (typeof ButtonVariants)[keyof typeof ButtonVariants];
type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];
type ButtonColor = (typeof ButtonColors)[keyof typeof ButtonColors];
type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

export interface ButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconOnly?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}
