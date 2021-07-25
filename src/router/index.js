import { createRouter, createWebHistory } from 'vue-router'
import MovementView from '../views/MovementView.vue'
import ConceptView from "../views/ConceptView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MovementView
  },
  {
    path: '/concepts',
    name: 'Concept',
    component: ConceptView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
