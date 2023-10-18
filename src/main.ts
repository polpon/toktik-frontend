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

// Plugins
import { registerPlugins } from '@/plugins'

import axios from 'axios';

axios.defaults.baseURL = '/api';

const app = createApp(App)
app.use(LoadingPlugin);

registerPlugins(app)

app.mount('#app')
