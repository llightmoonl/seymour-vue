<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Graph } from '@antv/g6';

const props = defineProps({
  x1:  { type: Number, default: 1.0 },
  x2:  { type: Number, default: 1.0 },
  x3:  { type: Number, default: 1.0 },
  x15: { type: Number, default: 1.0 },
  w1:  { type: Number, default: 0.5 },
  w2:  { type: Number, default: 0.5 },
  w3:  { type: Number, default: 0.5 },
  w15: { type: Number, default: 0.5 },
});

const container = ref<HTMLDivElement>();

const inputs = ['x₁','x₂','x₃','x₁₅'];
const colors = ['#4488ff','#44ccaa','#ff88aa','#ffcc44'];

function buildData() {
  const xs = [props.x1, props.x2, props.x3, props.x15];
  const ws = [props.w1, props.w2, props.w3, props.w15];
  const sumS = xs.reduce((acc, xi, i) => acc + xi * ws[i], 0);
  const output = sumS >= 0 ? 1 : 0;
  const outColor = output === 1 ? '#44ffaa' : '#ff4466';

  const nodes = [
    // Входы
    ...inputs.map((label, i) => ({
      id: `x${i}`,
      x: 80,
      y: 80 + i * 90,
      label: `${label}\n${xs[i].toFixed(2)}`,
      style: { fill: '#0a0b1a', stroke: colors[i], lineWidth: 2 },
      labelCfg: { style: { fill: colors[i], fontSize: 12, fontFamily: 'JetBrains Mono' } },
    })),
    // Нейрон
    {
      id: 'S',
      x: 300,
      y: 170,
      size: 80,
      label: `S\n${sumS.toFixed(3)}`,
      style: { fill: '#1a2a88', stroke: '#4466ff', lineWidth: 2 },
      labelCfg: { style: { fill: '#fff', fontSize: 14, fontFamily: 'JetBrains Mono' } },
    },
    // Выход
    {
      id: 'y',
      x: 460,
      y: 170,
      size: 56,
      label: `${output}`,
      style: { fill: output === 1 ? '#114433' : '#441111', stroke: outColor, lineWidth: 2 },
      labelCfg: { style: { fill: '#fff', fontSize: 18, fontFamily: 'JetBrains Mono', fontWeight: 700 } },
    },
  ];

  const edges = [
    // Входы → S
    ...ws.map((wi, i) => ({
      id: `e${i}`,
      source: `x${i}`,
      target: 'S',
      label: `w${['₁','₂','₃','₁₅'][i]}=${wi.toFixed(2)}`,
      style: { stroke: colors[i], lineWidth: 1 + Math.abs(wi) * 3, opacity: 0.6, endArrow: true },
      labelCfg: {
        style: { fill: colors[i], fontSize: 10, fontFamily: 'JetBrains Mono' },
        autoRotate: true,
      },
    })),
    // S → выход
    {
      id: 'eOut',
      source: 'S',
      target: 'y',
      label: 'y →',
      style: { stroke: outColor, lineWidth: 3, endArrow: true },
      labelCfg: { style: { fill: outColor, fontSize: 11, fontFamily: 'JetBrains Mono' } },
    },
  ];

  return { nodes, edges };
}

onMounted(() => {
  const graph = new Graph({
    container: container.value!,
    width: 560,
    height: 360,
    data: {
      nodes: buildData().nodes,
      edges: buildData().edges,
    }
  });

  graph.render();
});
</script>

<template>
  <div class="perceptron">
    <div ref="container" />
  </div>
</template>

<style scoped>
.perceptron {
  border-radius: 16px;
  padding: 16px;
  display: inline-block;
}
</style>
