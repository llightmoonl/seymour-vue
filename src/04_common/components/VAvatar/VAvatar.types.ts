export const AvatarSizes = {
  '3XS': '3xs',
  '2XS': '2xs',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
};

type AvatarSize = (typeof AvatarSizes)[keyof typeof AvatarSizes];

export interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
}
