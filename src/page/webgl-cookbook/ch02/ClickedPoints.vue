<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getWebGLContext, initShaders } from '../../../utils/webglUtils'
import {} from '../../../utils/matrix'
import MyWorker from './worker?worker'

const canvas = ref<HTMLCanvasElement | null>(null)
const Vshader_source = `
    attribute vec4 a_Position;
    void main () {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`
const Fshader_source = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main () {
        gl_FragColor = u_FragColor;
    }
`
onMounted(() => {
    const canvasDom = canvas.value
    if (!canvasDom) {
        console.error("获取不到canvas")
        return
    }
    // canvas.value.addEventListener('click')
    const gl = getWebGLContext(canvasDom)
    if (!gl) {
        console.error("获取不到webgl绘制上下文")
        return
    }
    if (!initShaders(gl, Vshader_source, Fshader_source)) {
        console.error("初始化着色器")
        return
    }
    canvasDom.addEventListener('click', evt => {
        handleClick(evt, gl, canvasDom)
    })
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // gl.drawArrays(gl.POINTS, 0, 1)
})

const g_points: number[][] = []
const g_colors: number[][] = []
function handleClick (evt: MouseEvent, gl: WebGLRenderingContext, canvas: HTMLCanvasElement) {
    let x = evt.clientX
    let y = evt.clientY
    const rect = (evt.target as HTMLElement).getBoundingClientRect()

    x = ((x- rect.left) - canvas.width/2) / (canvas.width/2)
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height/2)
    g_points.push([x, y])

    if (x > 0 && y > 0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0])
    } else if (x < 0 && y > 0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0])
    } else if (x < 0 && y < 0) {
        g_colors.push([0.0, 0.0, 1.0, 1.0])
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT)

    const a_Position = gl.getAttribLocation(gl.program!, 'a_Position')
    const u_FragColor = gl.getUniformLocation(gl.program!, 'u_FragColor')
    
    g_points.forEach((point, i) => {
        gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0)
        gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3])
        gl.drawArrays(gl.POINTS, 0, 1)
    })

}

function openIndexedDB (databaseName: string, version?: number) {
    const request = window.indexedDB.open(databaseName, version)
    let db
    request.onsuccess = function (event) {
        db = this.result
        console.info('IndexedDB opened')
        console.log(event.target === request)
    }

    request.onerror = function (err) {
        console.error('IndexedDB error', err)
    }

    request.onupgradeneeded = function (event) {
        console.info('IndexedDB upgrade');
        const db = this.result
        if (db.objectStoreNames.contains('animals')) return;
        const store = db.createObjectStore('animals', { keyPath: 'id' })
        store.createIndex('name', 'name', { unique: false })
        store.transaction.oncomplete = function (event) {
            const animalsStore = db.transaction('animals', 'readwrite').objectStore('animals')
            animalsStore.add({
                id: 0,
                name: 'Monkey'
            })
        }
    }
}
openIndexedDB('zoom')

const myWorker = new MyWorker()
myWorker.postMessage(1)
myWorker.onmessage = function (e) {
    console.log('主线程')
    console.log(e.data)
}
</script>

<template>
    <canvas ref="canvas" width="600" height="500">
        你的浏览器不支持canvas请使用chrome最新版
    </canvas>
</template>