import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue' 
import ContactUs from '../views/ContactForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/email',
      name: 'ContactUs',
      component: ContactUs,
    },
    {
      path: '/addNews',
      name: 'addNews',
      component: () => import('../views/AddNews.vue'),
    },
    {
      path: '/editNews/:id',
      name: 'EditNews',
      component: () => import('../views/EditNews.vue'),
    },
  ],
})

export default router
