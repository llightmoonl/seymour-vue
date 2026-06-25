<script setup lang="ts" generic="T">
import { useCarousel } from './useCarousel';
import type { VCarouselProps } from './VCarousel.types';
import VButton from '@common/components/VButton/VButton.vue';

const props = defineProps<VCarouselProps<T>>();

const { goToNext, goToPrev, countVisibleSlides, canScrollNext, canScrollPrev } = useCarousel(props.options);
</script>

<template>
  <div class="carousel">
    <div class="carousel__viewport" ref="carouselRef">
      <div class="carousel__container">
        <div :key="index" v-for="(item, index) in items" class="carousel__slide" :style="countVisibleSlides">
          <slot name="slide" :item="item" :index="index"></slot>
        </div>
      </div>
    </div>
    <div class="carousel__navigation">
      <v-button v-if="canScrollPrev" class="carousel__prev" size="icon-xs" @click="goToPrev">
        <i-custom-arrow-left />
      </v-button>
      <v-button v-if="canScrollNext" class="carousel__next" size="icon-xs" @click="goToNext">
        <i-custom-arrow-right />
      </v-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  position: relative;

  &__viewport {
    overflow: hidden;
  }

  &__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
  }

  &__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &__prev {
    left: 0;
  }

  &__next {
    right: 0;
  }
}
</style>
