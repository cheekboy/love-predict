import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/Home.vue'
import Analysis from '../pages/analysis/Analysis.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/analysis',
      name: 'Analysis', 
      component: Analysis
    }
  ]
})

export default router 