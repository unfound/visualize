<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data () {
        return {
            list: [
                {
                    num: 90
                }
            ]
        }
    },
    methods: {
        increaseTo (num: number, next: (num: number) => void, duration = 1000) {
            let current = 0
            let delta = num / duration
            let startTime = Date.now()
            ;(function increase () {
                next(current)
                const passTime = Date.now() - startTime
                current = passTime * delta
                if (passTime < duration) {
                    requestAnimationFrame(increase)
                } else {
                    next(num)
                }
            })()
        }
    },
    mounted () {
        this.list.forEach(item => {
            this.increaseTo(item.num, (val) => {
                console.log(val)
                item.num = val
            })
        })
    }
})
</script>

<template>
    <ul v-for="(item, i) in list">
        <li :key="i" style="width: 200px; background: rgba(66,66,66,0.3);">
            <div :style="{ width: item.num + '%' }"></div>
        </li>
    </ul>
</template>

<style>
li {
    height: 6px;
}

li > div {
    background: red;
    height: 100%;
}

ul {
    list-style: none;
}
</style>