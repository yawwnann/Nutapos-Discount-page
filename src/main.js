import { createApp } from 'vue'
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
import App from './App.vue'
import router from './router'
import './index.css'

createApp(App).use(router).mount('#app')
