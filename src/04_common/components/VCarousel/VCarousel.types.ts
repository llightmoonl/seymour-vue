import { type EmblaOptionsType } from 'embla-carousel';

export interface VCarouselProps<T> {
  options: EmblaOptionsType;
  items: T[];
}
