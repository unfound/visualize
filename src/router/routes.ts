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
  }, {
    path: '/render-colors',
    component: () => import('../page/RenderColors.vue')
  }, {
    path: '/star',
    component: () => import('../page/Star.vue')
  }
]

export default routes
