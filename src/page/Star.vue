<script setup lang="ts">
import GlRenderer from 'gl-renderer'
import { ref, onMounted } from 'vue'
import vertex from '../shaders/star/star.vert?raw'
import fragment from '../shaders/star/star.frag?raw'

const canvas = ref<HTMLCanvasElement | null>(null)

function randomTriangle() {
  const u_color = [Math.random(), Math.random(), Math.random(), 1.0]
  const u_rotation = Math.random() * Math.PI
  const u_scale = Math.random() * 0.05 + 0.03
  const u_time = 0
  const u_duration = 300.0
  const rad = Math.random() * Math.PI * 2
  const u_dir = [Math.cos(rad), Math.sin(rad)]
  const startTime = performance.now()

  return { u_color, u_rotation, u_scale, u_time, u_duration, u_dir, startTime}
}

function setUniform (renderer: any, { u_color, u_rotation, u_scale, u_time, u_duration, u_dir} : any) {
  renderer.uniforms.u_color = u_color
  renderer.uniforms.u_rotation = u_rotation
  renderer.uniforms.u_scale = u_scale
  renderer.uniforms.u_time = u_time
  renderer.uniforms.u_duration = u_duration
  renderer.uniforms.u_dir = u_dir
}

let triangles: any = []
function update (renderer: any) {
  for (let i = 0; i < 100 * Math.random(); i++) {
    triangles.push(randomTriangle());
  }

  triangles.forEach((triangle: any) => {
    triangle.u_time = performance.now() - triangle.startTime
    setUniform(renderer, triangle);
  })

  triangles = triangles.filter((triangle: any) => {
    return triangle.u_time <= triangle.u_duration
  })

  requestAnimationFrame(() => update(renderer))
}

onMounted(() => {
  if (canvas.value) {
    // 创建并启用webgl程序
    const renderer = new GlRenderer(canvas.value)
    const program = renderer.compileSync(fragment, vertex)
    renderer.useProgram(program)
    // 设置uniform变量
    update(renderer)
    // 将顶点数据送入缓冲区
    renderer.setMeshData([{
      positions: [
        [1, 0],
        [0, 1],
        [-1, 0],
      ],
      cells: [[0, 1, 2]]
    }])

    renderer.render()
  }
})
</script>

<template>
  <div>
    <canvas class="mx-auto" ref="canvas" height="520" width="520"></canvas>
  </div>
</template>