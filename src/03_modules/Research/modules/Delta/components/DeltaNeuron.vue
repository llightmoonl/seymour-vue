<script lang="ts" setup>
withDefaults(
  defineProps<{
    w?: number[];
    s?: number[];
    y?: number[];
  }>(),
  {
    w: () => Array.from({ length: 16 }, () => 0),
    y: () => [0, 0, 0],
    s: () => [0, 0, 0],
  },
);
</script>

<template>
  <div class="perceptron">
    <svg width="560" height="400" viewBox="0 0 560 400">
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="var(--foreground)" opacity="0.5" />
        </marker>
      </defs>

      <!-- input nodes -->
      <circle cx="60" cy="30" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="30"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="13"
        font-family="monospace">
        x₀
      </text>

      <circle cx="60" cy="100" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="100"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="13"
        font-family="monospace">
        x₁
      </text>

      <circle cx="60" cy="170" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="170"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="13"
        font-family="monospace">
        x₂
      </text>

      <circle cx="60" cy="240" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="240"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="13"
        font-family="monospace">
        x₃
      </text>

      <circle cx="60" cy="285" r="2" fill="var(--foreground)" opacity="0.5" />
      <circle cx="60" cy="300" r="2" fill="var(--foreground)" opacity="0.5" />
      <circle cx="60" cy="315" r="2" fill="var(--foreground)" opacity="0.5" />

      <circle cx="60" cy="360" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.2" />
      <text
        x="60"
        y="360"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--foreground)"
        font-size="13"
        font-family="monospace">
        x₁₅
      </text>

      <!-- lines to neuron 1 (S1 at cy=80) -->
      <line
        x1="86"
        y1="30"
        x2="208"
        y2="76"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="100"
        x2="208"
        y2="79"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="170"
        x2="208"
        y2="82"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="240"
        x2="208"
        y2="85"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="360"
        x2="208"
        y2="88"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />

      <!-- lines to neuron 2 (S2 at cy=200) -->
      <line
        x1="86"
        y1="30"
        x2="208"
        y2="196"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="100"
        x2="208"
        y2="198"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="170"
        x2="208"
        y2="200"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="240"
        x2="208"
        y2="202"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="360"
        x2="208"
        y2="204"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />

      <!-- lines to neuron 3 (S3 at cy=320) -->
      <line
        x1="86"
        y1="30"
        x2="208"
        y2="316"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="100"
        x2="208"
        y2="318"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="170"
        x2="208"
        y2="320"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="240"
        x2="208"
        y2="322"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="86"
        y1="360"
        x2="208"
        y2="324"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />

      <!-- Neuron 1 -->
      <circle
        cx="248"
        cy="82"
        r="40"
        fill="transparent"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.2" />
      <circle cx="248" cy="82" r="32" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="248" y="82" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="14">
        S₁={{ (s[0] ?? 0).toFixed(2) }}
      </text>

      <!-- Neuron 2 -->
      <circle
        cx="248"
        cy="200"
        r="40"
        fill="transparent"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.2" />
      <circle cx="248" cy="200" r="32" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="248" y="200" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="14">
        S₂={{ (s[1] ?? 0).toFixed(2) }}
      </text>

      <!-- Neuron 3 -->
      <circle
        cx="248"
        cy="320"
        r="40"
        fill="transparent"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.2" />
      <circle cx="248" cy="320" r="32" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="248" y="320" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="14">
        S₃={{ (s[2] ?? 0).toFixed(2) }}
      </text>

      <!-- arrows neuron -> output -->
      <line
        x1="280"
        y1="82"
        x2="368"
        y2="82"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="280"
        y1="200"
        x2="368"
        y2="200"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />
      <line
        x1="280"
        y1="320"
        x2="368"
        y2="320"
        stroke="var(--foreground)"
        stroke-width="1"
        stroke-opacity="0.4"
        marker-end="url(#arrow)" />

      <!-- output y1 -->
      <circle cx="400" cy="82" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="400" y="82" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="13">
        y₁={{ y[0] }}
      </text>

      <!-- output y2 -->
      <circle cx="400" cy="200" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="400" y="200" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="13">
        y₂={{ y[1] }}
      </text>

      <!-- output y3 -->
      <circle cx="400" cy="320" r="26" fill="transparent" stroke="var(--foreground)" stroke-width="1.5" />
      <text x="400" y="320" text-anchor="middle" dominant-baseline="middle" fill="var(--foreground)" font-size="13">
        y₃={{ y[2] }}
      </text>

      <!-- letter labels -->
      <text x="440" y="82" dominant-baseline="middle" fill="var(--foreground)" font-size="13" opacity="0.5">(A)</text>
      <text x="440" y="200" dominant-baseline="middle" fill="var(--foreground)" font-size="13" opacity="0.5">(B)</text>
      <text x="440" y="320" dominant-baseline="middle" fill="var(--foreground)" font-size="13" opacity="0.5">(C)</text>
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
