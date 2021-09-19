<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import GlslCanvas from 'glslCanvas'
import fragment from '../shaders/render-functions.frag?raw'

const canvas = ref<HTMLCanvasElement | null>(null)
const props = defineProps({
  exp: {
    type: String,
    default: "float y = st.x"
  }
})

onMounted(() => {
  const funcPatt = /float y = st.x/gm
  let finalFragment = fragment.replace(funcPatt, props.exp)
  console.log(finalFragment)
  if (canvas.value) {
    const sandox = new GlslCanvas(canvas.value)
    sandox.load(finalFragment)
  }
})
</script>

<template>
  <div class="w-56 flex flex-col items-center">
    <canvas ref="canvas" height="200" width="200"></canvas>
    <h3 class="text-center">{{ exp }}</h3>
  </div>
</template>