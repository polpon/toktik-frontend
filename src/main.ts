/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// Plugins
import { registerPlugins } from '@/plugins'

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import router from './router';

axios.defaults.baseURL = '/api';

// Function that will be called to refresh authorization
const refreshAuthLogic = async () => {
    await axios.get('/refresh').then(() => {
        console.log("Token refreshed")
    });
    return Promise.resolve();
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.config.url == "/refresh" && error.response.status == 401)
    {
    router.go(0)
    }
    return Promise.reject(error);
  });


// Instantiate the interceptor
createAuthRefreshInterceptor(
    axios,
    refreshAuthLogic
    );


const app = createApp(App)
app.use(LoadingPlugin);
app.use(VueVideoPlayer);

registerPlugins(app)

app.mount('#app')
