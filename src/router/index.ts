import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'
import type { CustomAxiosRequestConfig } from 'axios-auth-refresh/dist/utils';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { checkAuth: true }
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
      meta: { checkAuth: true }
    },

    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/SingleVideoViewPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/Upload.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

export async function isAuthenticated() {
  const customAxiosRequestConfig: CustomAxiosRequestConfig = { skipAuthRefresh: true };

  return await axios.get('/whoami', customAxiosRequestConfig)
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
