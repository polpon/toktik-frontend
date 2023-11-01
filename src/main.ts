/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import VueSmoothScroll from 'vue3-smooth-scroll'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Plugins
import { registerPlugins } from '@/plugins'

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import router from './router';
import store from './store';
import VueVideoPlayer from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import VueObserveVisibility from 'vue-observe-visibility'

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


const originalXHROpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function (
  method: string,
  url: string
) {
  // Add your logic here to capture or intercept the XHR requests.

  if (url.includes("/api/")) {
    console.log('XHR request intercepted. Method:', method, 'URL:', url);
    // If it matches, read the `access_token` from cookies and add it to the request headers
    // Ensure that credentials are sent with the XHR request
    this.withCredentials = true;
  }
  // @ts-ignore
  return originalXHROpen.apply(this, arguments);
};



// Instantiate the interceptor
createAuthRefreshInterceptor(
  axios,
  refreshAuthLogic
  );


const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)

app.use(vuetify)
app.use(VueVideoPlayer)
app.use(LoadingPlugin)
app.use(VueSmoothScroll)
app.use(store)
app.use(VueObserveVisibility)
app.component("infinite-loading", InfiniteLoading);
registerPlugins(app)

app.mount('#app')
