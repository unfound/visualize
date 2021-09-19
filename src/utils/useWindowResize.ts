import { onBeforeUnmount, onMounted } from 'vue'

export default function useWindowResize (cb: (...arg: any[]) => any, delay: number = 0): void {
  let timer: number | undefined

  let onResize = () => {
    if (delay <= 0) {
      cb()
    } else {
      clearTimeout(timer)
      timer = setTimeout(cb, delay)
    }
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
}
