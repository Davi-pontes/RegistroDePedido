import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Produtos from '../views/Produto.vue'
import Delivery from '../views/Entrega.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/produto',
    name: 'produto',
    component: Produtos,
  },
  {
    path: '/delivery',
    name: 'entrega',
    component: Delivery
  },
  {
    path: '/pedido',
    name: 'Pedidos',
    component: () => import(/* webpackChunkName: "Pedidos" */ '../views/Pedidos.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
