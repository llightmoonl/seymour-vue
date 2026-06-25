export const ContainerSizes = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

type ContainerSize = (typeof ContainerSizes)[keyof typeof ContainerSizes];

export interface ContainerProps {
  size?: ContainerSize;
}
