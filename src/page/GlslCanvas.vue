<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GlslCanvas from 'glslCanvas'
import mouseShader from '../shaders/mouse.frag?raw'

const canvas = ref<HTMLCanvasElement| null>(null)

onMounted(() => {
    if (canvas.value) {
        const sandox = new GlslCanvas(canvas.value)
        sandox.load(mouseShader)
    }
})

</script>

<template>
    <canvas ref="canvas" height="500" width="500"></canvas>
</template>