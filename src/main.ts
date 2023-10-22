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

axios.defaults.baseURL = '/api';

const app = createApp(App)
app.use(LoadingPlugin);
app.use(VueVideoPlayer);

registerPlugins(app)

app.mount('#app')
