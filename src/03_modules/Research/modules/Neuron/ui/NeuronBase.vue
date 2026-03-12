<script lang="ts" setup>
import type { NeuronBaseProps } from '../Neuron';

withDefaults(defineProps<NeuronBaseProps>(), {
  x: () => Array.from({ length: 4 }, () => 0),
  w: () => Array.from({ length: 4 }, () => 0),
});
</script>

<template>
  <div class="perceptron">
    <svg width="560" height="360" viewBox="0 0 560 360">
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="var(--foreground)" opacity="0.5" />
        </marker>
      </defs>

      <line
        x1="84"
        y1="45"
        x2="218"
        y2="130"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="87"
        y1="117"
        x2="210"
        y2="150"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="88"
        y1="187"
        x2="210"
        y2="174"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="84"
        y1="295"
        x2="218"
        y2="212"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="350"
        y1="170"
        x2="428"
        y2="170"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />

      <rect x="120" y="76" width="62" height="22" rx="4" fill="var(--background)" stroke="var(--foreground)" stroke-width="1" />
      <text
        x="151"
        y="87"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="11"
      >
        w₁=1.04
      </text>

      <!-- w2 mx=149 my=134 -->
      <rect x="118" y="122" width="62" height="22" rx="4" fill="var(--background)" stroke="var(--foreground)" stroke-width="1" />
      <text
        x="149"
        y="133"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="11"
      >
        w₂=1.04
      </text>

      <rect x="118" y="169" width="62" height="22" rx="4" fill="var(--background)" stroke="var(--foreground)" stroke-width="1" />
      <text
        x="149"
        y="180"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="11"
      >
        w₃=1.04
      </text>

      <!-- w15 mx=151 my=254 -->
      <rect x="117" y="242" width="70" height="22" rx="4" fill="var(--background)" stroke="var(--foreground)" stroke-width="1" />
      <text
        x="152"
        y="253"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="11">
        w₁₅=1.04
      </text>

      <!-- input nodes -->
      <circle cx="60" cy="30" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="30"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="15"
        font-family="monospace">
        x₁
      </text>

      <circle cx="60" cy="110" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="110"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="15"
        font-family="monospace">
        x₂
      </text>

      <circle cx="60" cy="190" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="190"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="15"
        font-family="monospace">
        x₃
      </text>

      <circle cx="60" cy="235" r="2" fill="var(--foreground)" opacity="0.5" />
      <circle cx="60" cy="250" r="2" fill="var(--foreground)" opacity="0.5" />
      <circle cx="60" cy="265" r="2" fill="var(--foreground)" opacity="0.5" />

      <circle cx="60" cy="310" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="310"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="15"
      >
        x₁₅
      </text>

      <!-- S node -->
      <circle cx="280" cy="170" r="72" fill="transparent" stroke="var(--foreground)" stroke-width="1" stroke-opacity="0.2" />
      <circle cx="280" cy="170" r="62" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text
        x="280"
        y="170"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="17"
      >
        S=1
      </text>

      <circle cx="460" cy="170" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text
        x="460"
        y="170"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="15"
      >
        y=1
      </text>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.perceptron {
  border-radius: rem(16);
  padding: rem(16);
  display: inline-block;
}
</style>
