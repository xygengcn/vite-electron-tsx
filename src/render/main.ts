import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@/style/index.scss';

window.$store = store;

createApp(App).use(router).use(store).mount('#app');
