import { createRouter, createWebHistory } from 'vue-router'
import MovementView from '../views/MovementView.vue'
import ConceptView from "../views/ConceptView.vue";
import CategoryChartView from "../views/CategoryChartView.vue";
import CategoryByMonth from "../components/charts/CategoryByMonth.vue";

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
  },
  {
    path: '/chart',
    name: 'Charts',
    component: CategoryChartView
  },
  {
    path: '/chart/byMonth',
    name: 'Category by month',
    component: CategoryByMonth
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
