import { createApp } from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import '@/assets/css/reset.css';
import { router } from "./router";
import '@/tailwind.css';

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
