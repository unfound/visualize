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
  },
  {
    path: '/gl-renderer',
    component: () => import('../page/GlRenderer.vue')
  }, {
    path: '/shaping-functions',
    component: () => import('../page/ShapingFunctions.vue')
  }
]

export default routes
