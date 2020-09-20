import Vue from 'vue'
import VueRouter from 'vue-router'
import dataPicker from '../views/dataPicker'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'dataPicker',
    component: dataPicker
  },
//   {
//     path: '/dataPicker',
//     name: 'dataPicker',
//     component: () => import('../components/dataPicker')
//   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
