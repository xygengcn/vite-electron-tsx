/**
 * electron 主文件
 */
import { app } from 'electron';
import { createMainTransport } from './apis';
import { createMainWindow } from './windows';

// 注册伪协议
app.setAsDefaultProtocolClient('quark');

/**
 * 程序启动
 */
app.whenReady().then(() => {
  // 创建主窗口
  createMainWindow();
  // 创建通信
  createMainTransport();
});

/**
 * 窗口关闭
 */
app.on('window-all-closed', () => {
  app.quit();
});

/**
 * 窗口激活
 */
app.on('activate', () => {
  return null;
});
