import { createRouter, createWebHistory } from 'vue-router'
import BingoView from '../views/BingoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bingo',
      component: BingoView
    }
  ]
})

export default router
