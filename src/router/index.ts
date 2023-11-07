import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'
import type { CustomAxiosRequestConfig } from 'axios-auth-refresh/dist/utils';
import store from '../store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      // meta: { checkAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/Logout.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue')
    },
    {
      path: '/test-socket',
      name: 'test-socket',
      component: () => import('@/views/Test3.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('@/views/Test2.vue')
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
      meta: { requiresAuth: true, hideNavbar: false }
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
    .then(resp => { return resp.status == 200})
    .catch(err => false)
}
export async function getData() {
  await axios.get('/whoami')
    .then(resp => {
      const username = resp.data.username
      const videos: Array<string> = resp.data.videos
      store.commit('get_user_data', {username, videos})
    })
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth)
  {
    // const token = localStorage.getItem('token');
    if (await isAuthenticated()) {
      // User is authenticated, proceed to the route
      getData();
      store.commit('login')
      next();

    } else {
      // User is not authenticated, redirect to login
      store.commit('logout')
      next('/login');

    }
  }
  else if (to.meta.checkAuth)
  {
    if (await isAuthenticated()){
      store.commit('login')
      next('/');

    } else {
      store.commit('logout')
      next()

    }
  }
  else {
    // Non-protected route, allow access
    store.commit('logout')
    next();

  }
});

export default router
