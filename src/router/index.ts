import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'
import type { CustomAxiosRequestConfig } from 'axios-auth-refresh/dist/utils';
import store from '../store';
import { socket } from "@/socket";
import { globals } from '@/main';

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
      path: '/test2',
      name: 'test2',
      component: () => import('@/views/Test2.vue')
    },
    {
      path: '/test3',
      name: 'test3',
      component: () => import('@/views/Test3.vue')
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
  // const customAxiosRequestConfig: CustomAxiosRequestConfig = { skipAuthRefresh: true };

  return await axios.get('/whoami')
    .then(resp => {
        const username = resp.data.username;
        console.log("INSIDE WHOAM I", username)

        // fresh = store username and username none. username none and store username has = logout

        if (username && !store.state.username) {
          const text = "getNewNotification";

          axios.post("/get_all_notification_by_owner_id")
          .then(res => {
            console.log(res);
            for (const each in res.data) {
              globals.$myNotifications.push(res.data[each])
            }
            globals.$myNotifications.sort((a: any, b: any) => b.id - a.id);
          })

          socket.on(text.concat(username), (notification) => {
            console.log("Recieved Noti.")
            globals.$myNotifications.push(notification);
            globals.$myNotifications.sort((a: any, b: any) => b.id - a.id);
          })
        }

        console.log("Right now I am: ", username);
        const videos: Array<string> = resp.data.videos;
        store.commit('get_user_data', {username, videos});
        return resp.status == 200;
      })
    .catch(err => {
      return false;
    })
}

// export async function getData() {
//   const customAxiosRequestConfig: CustomAxiosRequestConfig = { skipAuthRefresh: true };
//   await axios.get('/whoami', customAxiosRequestConfig)
//     .then(resp => {
//       const username = resp.data.username
//       const videos: Array<string> = resp.data.videos
//       store.commit('get_user_data', {username, videos})
//     })
// }

router.beforeEach(async (to, from, next) => {
  console.log(from.path)
  // console.log("\n\n\n\ntriggered\n\n\n", store.state.username);
  const text = "getNewNotification";
  if (to.meta.requiresAuth)
  {
    const auth = await isAuthenticated()

    if (auth) {
      // User is authenticated, proceed to the route
      store.commit('login')
      next();

    } else {
      // User is not authenticated, redirect to login
      next('/login');
      socket.off(text.concat(store.state.username));
      store.commit('logout');

    }
  }
  else {
    // Non-protected route, allow access
    socket.off(text.concat(store.state.username));
    store.commit('logout')
    next();

  }
});

export default router
