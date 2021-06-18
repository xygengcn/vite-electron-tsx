import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { join } from 'path';
export default defineConfig(() => {
  return {
    plugins: [
      vue(), // 开启 Vue 支持
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': join(__dirname, './src/render')
      }
    },
    root: join(__dirname, './src/render'), // 指向渲染进程目录
    base: './', // index.html 中静态资源加载位置
    assetsDir: 'assets',
    server: {
      port: +process.env.VITE_APP_PORT
    },
    build: {
      outDir: join(__dirname, './dist/render'),
      assetsDir: './assets', // 相对路径 加载问题
      emptyOutDir: true
    }
    // 其他配置略...
  };
});
