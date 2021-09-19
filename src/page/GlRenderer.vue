<script setup lang="ts">
import GlRenderer from 'gl-renderer'
import { ref, onMounted } from 'vue'
import gridVert from '../shaders/grid/grid.vert?raw'
import gridFrag from '../shaders/grid/grid.frag?raw'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (canvas.value) {
    // 创建并启用webgl程序
    const renderer = new GlRenderer(canvas.value)
    const program = renderer.compileSync(gridFrag, gridVert)
    renderer.useProgram(program)
    // 设置uniform变量
    renderer.uniforms.rows = 64
    // 将顶点数据送入缓冲区
    renderer.setMeshData([{
      positions: [
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ],
      attributes: {
        uv: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0]
        ]
      },
      cells: [[0, 1, 2], [2, 0, 3]]
    }])

    renderer.render()
  }
})
</script>

<template>
  <canvas ref="canvas" height="512" width="512"></canvas>
</template>