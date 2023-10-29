import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'
import type { CustomAxiosRequestConfig } from 'axios-auth-refresh/dist/utils';
import store from '../store';

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

export async function isAuthenticated(to) {
  const customAxiosRequestConfig: CustomAxiosRequestConfig = { skipAuthRefresh: true };

  return await axios.get('/whoami', customAxiosRequestConfig)
    .then(resp => {
    const username = resp.data.username
    const videos = resp.data.videos
    return [resp.status == 200 ,username, videos]
    })
    .catch(err => false)
}

router.beforeEach(async (to, from, next) => {
  const condition = await isAuthenticated(to)
  if (to.meta.requiresAuth)
  {
    // const token = localStorage.getItem('token');
    if (condition[0]) {
      // User is authenticated, proceed to the route
      store.commit('login')

      if (to.name == 'profile') {
        const username = condition[1]
        const videos = condition[2]
        if (!(videos.length == 0)) {
          store.commit('get_user_data', {username, videos}) 
        }
      }
      next();

    } else {
      // User is not authenticated, redirect to login
      store.commit('logout')
      next('/login');
      
    }
  }
  else if (to.meta.checkAuth)
  {
    if (condition[0]){
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
