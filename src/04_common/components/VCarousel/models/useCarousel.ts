import { computed, ref, watchEffect } from 'vue';
import { type EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-vue';


export function useCarousel(options: EmblaOptionsType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const slidesToScroll = Number(options.slidesToScroll ?? 1);
  const countVisibleSlides = computed(() => `flex: 0 0 ${100 / slidesToScroll}%`);
  const canScrollPrev = ref(false);
  const canScrollNext = ref(false);

  const goToPrev = () => emblaApi.value?.scrollPrev();
  const goToNext = () => emblaApi.value?.scrollNext();

  const updateScrollState = () => {
    canScrollPrev.value = emblaApi.value?.canScrollPrev() ?? false;
    canScrollNext.value = emblaApi.value?.canScrollNext() ?? false;
  };

  watchEffect(() => {
    if (!emblaApi.value) return;

    emblaApi.value.on('init', updateScrollState);
    emblaApi.value.on('select', updateScrollState);
    emblaApi.value.on('reInit', updateScrollState);
  });

  return {
    carouselRef: emblaRef,
    countVisibleSlides,
    canScrollPrev,
    canScrollNext,
    goToPrev,
    goToNext,
  }
}
