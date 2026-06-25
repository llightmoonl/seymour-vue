export const SpinnerSizes = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

type SpinnerSize = (typeof SpinnerSizes)[keyof typeof SpinnerSizes];

export interface SpinnerProps {
  size: SpinnerSize;
}
