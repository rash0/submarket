import { createRouter, createWebHashHistory } from 'vue-router'
import StockView from '../views/StockView.vue'
import FxView from '../views/FxView.vue'

const routes = [
  {
    path: '/',
    name: 'Stock',
    component: StockView
  },
  {
    path: '/fx',
    name: 'FxView',
    component: FxView,
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
