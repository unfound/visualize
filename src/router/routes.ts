import HelloWorld from '../page/HelloWorld.vue'

const routes = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: '/webgl',
    component: () => import('../page/WebGL.vue')
  },
  {
    path: '/process',
    component: () => import('../page/Process.vue')
  },
  {
    path: '/glsl-canvas',
    component: () => import('../page/GlslCanvas.vue')
  }
]

export default routes
