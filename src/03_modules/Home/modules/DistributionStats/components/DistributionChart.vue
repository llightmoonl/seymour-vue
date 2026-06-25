<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  segments: {
    key: number;
    value: number;
    color: string;
    title: string;
  }[];
}>();

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const total = computed(() => props.segments.reduce((s, i) => s + i.value, 0));
const arcs = computed(() => {
  let offset = 0;
  return props.segments.map((seg) => {
    const dash = (seg.value / total.value) * CIRCUMFERENCE;
    const arc = { dash, gap: CIRCUMFERENCE - dash, offset, color: seg.color };
    offset += dash;
    return arc;
  });
});
</script>

<template>
  <div class="distribution-charts">
    <div class="distribution-charts__content">
      <div class="distribution-charts__donut">
        <svg viewBox="0 0 120 120" width="140" height="140">
          <circle
            v-for="arc in arcs"
            :key="arc.color"
            cx="60"
            cy="60"
            :r="RADIUS"
            fill="none"
            :stroke="arc.color"
            stroke-width="12"
            :stroke-dasharray="`${arc.dash} ${arc.gap}`"
            :stroke-dashoffset="CIRCUMFERENCE / 4 - arc.offset" />
        </svg>
        <div class="distribution-charts__total">
          <div class="distribution-charts__total-num">{{ total }}</div>
          <div class="distribution-charts__total-text">Всего</div>
        </div>
      </div>
      <ul class="distribution-charts__legend">
        <li v-for="segment in segments" :key="segment.id" class="distribution-charts__legend-item">
          <div class="distribution-charts__legend-left">
            <div
              class="distribution-charts__legend-color"
              :style="{
                backgroundColor: segment.color,
              }"></div>
            <div class="distribution-charts__legend-title">{{ segment.title }}</div>
          </div>
          <div class="distribution-charts__legend-value">{{ segment.value }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.distribution-charts {
  &__content {
    display: flex;
    align-items: center;
    column-gap: rem(12);
  }

  &__donut {
    max-inline-size: rem(140);
    max-block-size: rem(140);
    block-size: 100%;
    inline-size: 100%;
    position: relative;
  }

  &__total {
    @include abs-center;
    text-align: center;

    &-num {
      font-family: 'Times New Roman', serif;
      font-weight: 400;
      font-size: rem(30);
      letter-spacing: -0.01em;
    }
    &-text {
      color: var(--muted-foreground);
      font-size: rem(12);
    }
  }

  &__legend {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: rem(8);

    &-left {
      display: flex;
      column-gap: rem(6);
    }

    &-color {
      display: block;
      margin-block-start: rem(5);
      border-radius: rem(2);
      block-size: rem(8);
      inline-size: rem(8);
    }

    &-item {
      font-size: rem(14);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
