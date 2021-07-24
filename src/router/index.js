import { createRouter, createWebHistory } from 'vue-router'
import MovementView from '@/views/MovementView.vue'
import ChartView from "@/views/ChartView";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MovementView
  },
  {
    path: '/charts',
    name: 'ChartView',
    component: ChartView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
