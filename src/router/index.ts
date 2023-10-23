import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      // meta: { checkAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUp.vue'),
      // meta: { checkAuth: true }
    },

    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/SignalVideoViewPage.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/Upload.vue')
    },
  ]
})

export async function isAuthenticated() {
  return await axios.get(`/whoami`)
    .then(resp => resp.status == 200)
    .catch(err => false)
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth)
  {
    // const token = localStorage.getItem('token');
    if (await isAuthenticated()) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  }
  else if (to.meta.checkAuth)
  {
    if (await isAuthenticated()){
      next('/');
    } else { next() }
  }
  else {
    // Non-protected route, allow access
    next();
  }
});

export default router
