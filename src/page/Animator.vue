<script lang="ts" setup>
import { ref, reactive, onBeforeUpdate, onMounted } from 'vue'
import Animator from '../utils/Animator'

const animator = new Animator(2000, 1, p =>  p ** 2)
const list = reactive([
    {
        color: 'blue'
    }, {
        color: 'red'
    }, {
        color: 'green'
    }, {
        color: 'orange'
    }
])
const divs = ref<HTMLDivElement[]>([])
onMounted(() => {
    (async function () {
        let i = 0
        while (i < Number.MAX_SAFE_INTEGER) {
            await animator.animate(
                divs.value[i++ % 4],
                (target: HTMLDivElement, frameIndex, timing) => {
                    const radius = 0 * (1 - timing.p) + 360 * timing.p
                    target.style.transform = `rotate(${radius}deg)`
                }
            )
        }
    })()
})

onBeforeUpdate(() => {
    divs.value = []
})

function getRefs (el: any, index: number) {
    if (el instanceof HTMLDivElement) {
        divs.value[index] = el
    }
}
</script>

<template>
  <div class="flex w-80 flex-wrap space-between">
      <div
        v-for="(item, i) in list"
        :ref="(el) => getRefs(el, i)"
        class="h-28 w-28 m-5"
        :style="{ background: item.color }"
    ></div>
  </div>
</template>