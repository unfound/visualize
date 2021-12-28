import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

const resolve = (dir: string) => {
  return path.join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [vue(), WindiCSS()]
})
