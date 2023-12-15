import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AddClientView from '../views/AddClientView.vue';
import AddCommandView from '../views/AddCommandView.vue';
import AddLivreurView from '../views/AddLivreurView.vue';
import StockCamion from '../views/StockCamionView.vue';
import LivraisonClient from '../views/LivraisonClientView.vue';
import TourneeDetail from '../views/TourneeDetail.vue'

import AllDeliver from '../views/AllDeliversView.vue';
import AllClient from '../views/AllClientView.vue';
import Tournee from '../views/AllTournesView.vue';
import StockCamionSuppl from '../views/StockCamionSuppl.vue'



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
      path: '/addCommand/:clientId',
      name: 'addCommand',
      component: AddCommandView
    },
    {
      path: '/addLivreur',
      name: 'addLivreur',
      component: AddLivreurView
    },
    {
      path: '/stockcamion',
      name: 'stockcamion',
      component: StockCamion
    },
    {
      name: 'livraisonClient',
      path: '/livraisonclient',
      component: LivraisonClient,
    },
    {
      path: '/allclients',
      name: 'allclients',
      component: AllClient
    },
    {
      path: '/alldelivers',
      name: 'alldelivers',
      component: AllDeliver
    },
    {
      path: '/tournees',
      name: 'tournees',
      component: Tournee
    },
    {
      path: '/stockCamionSupp',
      name: 'stockCamionSupp',
      component: StockCamionSuppl
    },
    {
      path: '/creches/:id',
      name: 'creche-details',
      component: LivraisonClient 
    },
    {
      path: '/tournee/:id',
      name: 'tournee-details',
      component: TourneeDetail 
    },
    {
      path: '/stockCamionSupp/:id',
      name: 'stockCamionSuppForDeliver',
      component: StockCamionSuppl
    },
  ]
});

export default router;
