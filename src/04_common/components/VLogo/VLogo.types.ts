export const LogoSizes = {
  '3XS': '3xs',
  '2XS': '2xs',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
} as const;

type LogoSize = (typeof LogoSizes)[keyof typeof LogoSizes];

export interface LogoProps {
  size: LogoSize;
}
