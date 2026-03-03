<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Graph } from '@antv/g6';

const props = defineProps({
  x1: { type: Number, default: 1.0 },
  x2: { type: Number, default: 1.0 },
  x3: { type: Number, default: 1.0 },
  x15: { type: Number, default: 1.0 },
  w1: { type: Number, default: 0.5 },
  w2: { type: Number, default: 0.5 },
  w3: { type: Number, default: 0.5 },
  w15: { type: Number, default: 0.5 },
});

const container = ref<HTMLDivElement>();

onMounted(() => {
  const graph = new Graph({
    container: container.value!,
    width: container.value!.offsetWidth || 560,
    height: 400,
    autoFit: 'view',
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 0, labelText: 'x_1', labelPlacement: 'center' } },
        { id: 'node-2', style: { x: 50, y: 50, labelText: 'x_2', labelPlacement: 'center' } },
        { id: 'node-3', style: { x: 50, y: 100, labelText: 'x_3', labelPlacement: 'center' } },
        { id: 'node-4', style: { x: 150, y: 50, labelText: 'S=1', labelPlacement: 'center' } },
        { id: 'node-5', style: { x: 225, y: 50, labelText: 'y=1', labelPlacement: 'center' } },
      ],
      edges: [
        { source: 'node-1', target: 'node-4' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-3', target: 'node-4' },
        { source: 'node-4', target: 'node-5' },
      ],
    },
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
