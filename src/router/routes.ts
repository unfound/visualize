import type { RouteRecordRaw } from 'vue-router'
import HelloWorld from '../page/HelloWorld.vue'

const routes: RouteRecordRaw[] = [
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
  }, {
    path: '/animator',
    component: () => import('../page/Animator.vue')
  }, {
    path: '/webgl-cookbook',
    component: () => import('../page/webgl-cookbook/index.vue'),
    redirect: '/webgl-cookbook/clicked-points',
    children: [
      {
        path: 'clicked-points',
        component: () => import('../page/webgl-cookbook/ch02/ClickedPoints.vue')
      }
    ]
  }
]

export default routes
