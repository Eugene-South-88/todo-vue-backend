import { createApp } from 'vue'
import './style.css'
import './assets/scss/style.scss';
import App from './App.vue'
import router from "./router/router.js";

createApp(App)
  .use(router)
  .mount('#app')
