import { createApp } from 'vue';
import App from './App';
import router from './router';
import '@/style/index.scss';
import Transport from './transport';

// 注册通信工具
if (window.__ELECTRON__) {
  const transport = new Transport();
  window.$transport = transport;
} else {
  console.warn('[Quark] 不在Electron环境');
}

createApp(App).use(router).mount('#app');
