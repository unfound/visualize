<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const vertex = `
  attribute vec2 position;
  varying vec3 color;

  void main () {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position * 0.5, 0.0);
    gl_Position = vec4(position * 0.6, 1.0, 1.0);
  }
`
const fragment = `
  precision mediump float;
  varying vec3 color;

  void main () {
    gl_FragColor = vec4(color, 1.0);
  }
`
const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const gl = canvas.value?.getContext('webgl')
  if (gl) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (vertexShader) {
      gl.shaderSource(vertexShader, vertex)
      gl.compileShader(vertexShader)
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragmentShader) {
      gl.shaderSource(fragmentShader, fragment)
      gl.compileShader(fragmentShader)
    }

    const program = gl.createProgram()
    if (program && vertexShader && fragmentShader) {
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program)
      gl.useProgram(program)
    }

    const points = new Float32Array([
      -1, -1,
      0, 1,
      1, -1
    ])

    const bufferId = gl.createBuffer()
    if (bufferId) {
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
      gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
    }

    if (program) {
      const vPosition = gl.getAttribLocation(program, 'position')
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(vPosition)
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 2)
  }
})

</script>

<template>
  <p>WebGL尝鲜</p>
  <canvas ref="canvas" width="300" height="300"></canvas>
</template>
