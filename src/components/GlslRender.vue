<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GlslCanvas from 'glslCanvas'

const canvas = ref<HTMLCanvasElement| null>(null)
const props = defineProps({
    width: {
        type: [Number, String],
        default: '500'
    },
    height: {
        type: [Number, String],
        default: '500'
    },
    shader: {
      type: String,
      required: true,
    }
})

onMounted(() => {
    if (canvas.value) {
        const sandox = new GlslCanvas(canvas.value)
        sandox.load(props.shader)
    }
})
</script>

<template>
    <canvas ref="canvas" :height="height" :width="width" class="mr-4 mb-4"></canvas>
</template>