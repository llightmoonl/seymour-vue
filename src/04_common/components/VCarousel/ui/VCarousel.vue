<script setup lang="ts">
import { type EmblaOptionsType } from 'embla-carousel';

import { VButton } from '@common/components';
import { useCarousel } from '../models/useCarousel';

const props = defineProps<{
  options: EmblaOptionsType;
  items: any;
}>();

const { carouselRef, goToNext, goToPrev, countVisibleSlides } = useCarousel(props.options);
</script>

<template>
  <div class="carousel">
    <div class="carousel__viewport" ref="carouselRef">
      <div class="carousel__container">
        <div :key="index" v-for="(item, index) in items" class="carousel__slide" :style="countVisibleSlides">
          <slot name="slide" :item="item"></slot>
        </div>
      </div>
    </div>
    <VButton class="carousel__prev" @click="goToPrev">Scroll to prev</VButton>
    <VButton class="carousel__next" @click="goToNext">Scroll to next</VButton>
  </div>
</template>

<style scoped lang="scss">
.carousel {
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
}
</style>
