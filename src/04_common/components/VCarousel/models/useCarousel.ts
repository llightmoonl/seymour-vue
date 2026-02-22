import { computed } from 'vue';
import { type EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-vue';


export function useCarousel(options: EmblaOptionsType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const slidesToScroll = Number(options.slidesToScroll ?? 1);
  const countVisibleSlides = computed(() => `flex: 0 0 ${100 / slidesToScroll}%`);

  const goToPrev = () => emblaApi.value?.scrollPrev();
  const goToNext = () => emblaApi.value?.scrollNext();

  return {
    carouselRef: emblaRef,
    countVisibleSlides,
    goToPrev,
    goToNext,
  }
}
