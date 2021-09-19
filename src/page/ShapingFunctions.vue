<script setup lang="ts">
import { reactive } from 'vue'
import RenderFunction from '../components/RenderFunction.vue'

const sinExp = 'sin(st.x * 2.0 * PI) * 0.5 + 0.25'

const list = reactive([
  'float y = mod(st.x, 0.5)',
  'float y = fract(st.x * 2.0)',
  `float y = ${sinExp}`,
  `float y = ceil(${sinExp})`,
  `float y = floor(${sinExp}) + 1.0`,
  `float y = sign(st.x - 0.5) * 0.5 + 0.5`,
  `float y = abs(${sinExp})`,
  'float y = clamp(st.x, 0.0, 1.0)',
  'float y = min(0.2, st.x)',
  'float y = max(0.8, st.x)',
  'float y = st.x',
  'float y = pow(st.x,5.0)',
  'float y = step(0.5,st.x)',
  'float y = smoothstep(0.1,0.9,st.x)',
  'float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x)',
  'float y = sin(st.x * 2.0 * PI + u_time * 2.0) * 0.25 + 0.5'
])
</script>

<template>
  <ul class="flex items-top flex-wrap p-6">
    <li v-for="(item, i) in list" :key="i" class="mr-4">
      <RenderFunction :exp="item"/>
    </li>
  </ul>
</template>