import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AddClientView from '../views/AddClientView.vue'
import AddCommandView from '../views/AddCommandView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/addClient',
      name: 'addClient',
      component: AddClientView
    },
    {
      path: '/addCommand',
      name: 'addCommand',
      component: AddCommandView
    },
  ]
});

export default router
