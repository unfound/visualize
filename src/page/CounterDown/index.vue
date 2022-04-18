<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import logoSrc from '../../assets/logo.png'

interface Card {
    id: number,
    imgSrc: string,
    name: string,
    loading: boolean
}

let cardList = reactive<Card[]>([
    {
        id: 888,
        imgSrc: logoSrc,
        name: '买买买',
        loading: false
    }, {
        id: 666,
        imgSrc: logoSrc,
        name: '快点买',
        loading: false
    }
])

const number = ref(1)
function getCard (card: Card) {
    if (time.value > 0 || card.loading) return
    card.loading = true
    setTimeout(() => {
        card.loading = false
        cardList.push({
            id: number.value,
            imgSrc: logoSrc,
            name: `已经买了${number.value}`,
            loading: false
        })
        number.value++
    }, 1000)
}

const time = ref(10)
let timeoutkey: number
function timeDown () {
    timeoutkey = setTimeout(() => {
        time.value--
        if (time.value > 0) {
            timeDown()
        }
    }, 1000)
}

onMounted(() => {
    timeDown()
})

onBeforeUnmount(() => {
    timeoutkey && clearTimeout(timeoutkey)
})
</script>

<template>
    <div v-for="card in cardList" class="flex bg-pink-300 w-84 h-18 rounded-md mb-2" :key="card.id">
        <div class="flex items-center border-r border-dashed border-r-gray-500 w-64 px-2">
            <img :src="card.imgSrc" class="h-9 w-9">
            <div class="ml-3 text-sm">
                <p>{{ card.name }}</p>
                <p>{{ card.name }}</p>
                <p>{{ card.name }}</p>
            </div>
        </div>
        <div class="flex-auto flex items-center justify-center">
            <button
                class="bg-blue-500 text-white w-14 py-1 text-center rounded-sm focus:outline-none active:bg-blue-600"
                :class="{'bg-gray-400 active:bg-gray-400 cursor-not-allowed': time > 0 || card.loading}"
                @click="getCard(card)"
            >{{ time > 0 ? `${time}s` : card.loading ? '购买中' : '抢购' }}</button>
        </div>
    </div>
</template>
