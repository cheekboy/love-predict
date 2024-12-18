import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// 导入路由组件
import Home from './pages/home/Home.vue'
import Analysis from './pages/analysis/Analysis.vue'

// 创建路由实例
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

// 创建并挂载应用
const app = createApp(App)
app.use(router)
app.mount('#app')
