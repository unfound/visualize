import HelloWorld from '../page/HelloWorld.vue'

const routes = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: '/webgl',
    component: () => import('../page/WebGL.vue')
  }
]

export default routes
