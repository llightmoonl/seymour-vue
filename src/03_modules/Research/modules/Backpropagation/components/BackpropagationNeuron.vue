<script lang="ts" setup>
import { computed } from 'vue';
import { BACKPROP_STEPS } from '../models/constants';

const props = withDefaults(
  defineProps<{
    steps: number;
  }>(),
  {
    steps: 0,
  },
);

const S = BACKPROP_STEPS;

const active = computed(() => ({
  w11: [S.FORWARD_F11, S.WEIGHT_UPDATE_W11].includes(props.steps),
  w12: [S.FORWARD_F12, S.WEIGHT_UPDATE_W12].includes(props.steps),
  w13: [S.FORWARD_F11, S.WEIGHT_UPDATE_W13].includes(props.steps),
  w14: [S.FORWARD_F12, S.WEIGHT_UPDATE_W14].includes(props.steps),

  w21: [S.OUTPUT, S.WEIGHT_UPDATE_W21, S.DELTA_1].includes(props.steps),
  w22: [S.OUTPUT, S.WEIGHT_UPDATE_W22, S.DELTA_2].includes(props.steps),

  output: [S.OUTPUT, S.WEIGHT_UPDATE_W21, S.WEIGHT_UPDATE_W22].includes(props.steps),
  gradient: [S.GRADIENT, S.DELTA_1, S.DELTA_2].includes(props.steps),

  x1: [S.FORWARD_F11, S.FORWARD_F12].includes(props.steps),

  x2: [S.FORWARD_F11, S.FORWARD_F12].includes(props.steps),

  f11: [S.FORWARD_F11, S.OUTPUT, S.WEIGHT_UPDATE_W11, S.WEIGHT_UPDATE_W13, S.DELTA_1].includes(props.steps),

  f12: [S.FORWARD_F12, S.OUTPUT, S.WEIGHT_UPDATE_W12, S.WEIGHT_UPDATE_W14, S.DELTA_2].includes(props.steps),
}));

const stroke = (state: boolean) => (state ? 'var(--destructive)' : 'var(--foreground)');

const opacity = (state: boolean) => (state ? '1' : '0.4');
</script>

<template>
  <div class="perceptron">
    <svg width="800" height="400" viewBox="0 0 560 320">
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="var(--foreground)" opacity="0.5" />
        </marker>
        <marker id="arrow-left" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L6,6 L0,3 z" fill="var(--foreground)" opacity="0.5" />
        </marker>
      </defs>

      <!-- w11 -->
      <line
        x1="86"
        y1="100"
        x2="240"
        y2="100"
        :stroke="stroke(active.w11)"
        stroke-width="1"
        :stroke-opacity="opacity(active.w11)"
        marker-end="url(#arrow)" />
      <rect x="150" y="90" width="30" height="22" rx="4" fill="var(--background)" :stroke="stroke(active.w11)" />
      <text x="165" y="101" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="11">
        w₁₁
      </text>

      <!-- w12 -->
      <line
        x1="86"
        y1="104"
        x2="240"
        y2="220"
        :stroke="stroke(active.w12)"
        stroke-width="1"
        :stroke-opacity="opacity(active.w12)"
        marker-end="url(#arrow)" />
      <rect x="185" y="180" width="30" height="22" rx="4" fill="var(--background)" :stroke="stroke(active.w12)" />
      <text x="200" y="191" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="11">
        w₁₂
      </text>

      <!-- w13 -->
      <line
        x1="86"
        y1="216"
        x2="240"
        y2="105"
        :stroke="stroke(active.w13)"
        stroke-width="1"
        :stroke-opacity="opacity(active.w13)"
        marker-end="url(#arrow)" />
      <rect x="185" y="120" width="30" height="22" rx="4" fill="var(--background)" :stroke="stroke(active.w13)" />
      <text x="200" y="131" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="11">
        w₁₃
      </text>

      <!-- w14 -->
      <line
        x1="86"
        y1="224"
        x2="240"
        y2="224"
        :stroke="stroke(active.w14)"
        stroke-width="1"
        :stroke-opacity="opacity(active.w14)"
        marker-end="url(#arrow)" />
      <rect x="150" y="215" width="30" height="22" rx="4" fill="var(--background)" :stroke="stroke(active.w14)" />
      <text x="165" y="226" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="11">
        w₁₄
      </text>

      <!-- w21 -->
      <line
        x1="295"
        y1="100"
        x2="408"
        y2="168"
        :stroke="stroke(active.w21)"
        stroke-width="1"
        :stroke-opacity="opacity(active.w21)"
        marker-end="url(#arrow)" />
      <rect x="335" y="125" width="30" height="22" rx="4" fill="var(--background)" :stroke="stroke(active.w21)" />
      <text x="350" y="137" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="11">
        w₂₁
      </text>

      <!-- w22 -->
      <line
        x1="295"
        y1="220"
        x2="408"
        y2="182"
        :stroke="stroke(active.w22)"
        stroke-width="1"
        :stroke-opacity="opacity(active.w22)"
        marker-end="url(#arrow)" />
      <rect x="335" y="196" width="30" height="22" rx="4" fill="var(--background)" :stroke="stroke(active.w22)" />
      <text x="350" y="207" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="11">
        w₂₂
      </text>

      <!-- x1 -->
      <circle
        v-if="active.x1"
        cx="60"
        cy="101"
        r="33"
        fill="transparent"
        stroke="var(--destructive)"
        stroke-width="2.5" />
      <circle cx="60" cy="100" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text x="60" y="100" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="15">
        x₁
      </text>

      <!-- x2 -->
      <circle
        v-if="active.x2"
        cx="60"
        cy="221"
        r="33"
        fill="transparent"
        stroke="var(--destructive)"
        stroke-width="2.5" />
      <circle cx="60" cy="220" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text x="60" y="220" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="15">
        x₂
      </text>

      <!-- f11 -->
      <circle
        v-if="active.f11"
        cx="268"
        cy="101"
        r="33"
        fill="transparent"
        stroke="var(--destructive)"
        stroke-width="2.5" />
      <circle cx="268" cy="100" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="268" y="60" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="15">
        {{ steps > BACKPROP_STEPS.DELTA_1 ? 'δ₁₁' : 'f₁₁' }}
      </text>

      <!-- f12 -->
      <circle
        v-if="active.f12"
        cx="268"
        cy="221"
        r="33"
        fill="transparent"
        stroke="var(--destructive)"
        stroke-width="2.5" />
      <circle cx="268" cy="220" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="268" y="180" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="15">
        {{ steps > BACKPROP_STEPS.DELTA_2 ? 'δ₁₂' : 'f₁₂' }}
      </text>

      <!-- output -->
      <circle
        cx="442"
        cy="175"
        r="42"
        fill="transparent"
        :stroke="stroke(active.output || active.gradient)"
        stroke-width="1"
        :stroke-opacity="opacity(active.output || active.gradient)" />
      <circle cx="442" cy="175" r="34" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="442" y="120" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="15">
        {{ steps > BACKPROP_STEPS.GRADIENT ? 'δ' : '' }}
      </text>
      <line
        x1="476"
        y1="175"
        x2="536"
        y2="175"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />

      <text x="505" y="160" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="15">
        y
      </text>
    </svg>
  </div>
</template>
