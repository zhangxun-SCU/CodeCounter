import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/reset.css'
import { router } from "./router";
import setting from "./setting.json"

console.log(setting);
createApp(App).use(router).mount('#app')
