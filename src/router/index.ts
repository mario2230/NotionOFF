import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pages/home'
  },
  {
    path: '/pages/login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/pages/cadastro',
    component: () => import('@/views/CadastroPage.vue')
  },
  {
    path: '/pages/',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'perfil',
        component: () => import('@/views/PerfilPage.vue')
      },
      {
        path: 'documentos',
        component: () => import('@/views/DocumentosPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
