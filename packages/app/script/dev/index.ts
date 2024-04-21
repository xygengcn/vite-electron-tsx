import { green, red } from 'chalk'; // 打印字体颜色
import { watch } from 'rollup';
import ElectronConnent from 'electron-connect';
import rollupTasks from '../rollupTasks';
import { Socket } from 'net';
import waitOn from 'wait-on';

/**
 *
 */
let electronConnentServer;

/**
 * 监听函数
 */
const watchFunc = function () {
  const watcher = watch(rollupTasks);
  watcher.on('change', (filename) => {
    console.info(green('监听文件改变：'), `change -- ${filename}`);
  });
  watcher.on('event', (ev) => {
    if (ev.code === 'END') {
      if (electronConnentServer) {
        electronConnentServer.restart();
        console.log(green('Electron项目重新启动'));
        return;
      }
      electronConnentServer = ElectronConnent.server.create({ stopOnClose: true });
      electronConnentServer.start();
      console.log(green('Electron项目启动\n'));
    } else if (ev.code === 'ERROR') {
      console.log(red('Electron项目构建失败：'), ev.error);
    }
  });
};
waitOn(
  {
    resources: ['http://localhost:8080'],
    timeout: 5000
  },
  (err) => {
    if (err) {
      const { port, hostname } = new URL('http://localhost:8080');
      const serverSocket = new Socket().connect(Number(port) || 80, hostname, () => {
        watchFunc();
      });
      serverSocket.on('error', (e) => {
        console.log(red('Electron项目构建失败: '), e);
        process.exit(1);
      });
    } else {
      watchFunc();
    }
  }
);
