import { createProtocol } from '../../utils/create-protocol';
import { isDevelopment } from '../../utils/index';
import WindowManager from './window-manager';

/**
 * 创建主窗口
 * @returns
 */
export function createMainWindow() {
  //  注册伪协议
  createProtocol('quark');
  //  启动的服务器地址
  const DEV_URL = 'http://localhost:8080';
  //  构建后的静态文件地址
  const PRD_URL = `quark://../render/index.html`;
  // 创建主主窗口
  return WindowManager.createAppWindow('MainWindow', isDevelopment() ? DEV_URL : PRD_URL, {
    width: 600,
    height: 556,
    // 是否保留三个系统按钮
    frame: true,
    // 透明度
    transparent: false,
    // 是否可以调节大小
    resizable: true,
    // Electron Mac窗口添加透明度，会出现水印
    hasShadow: false
  });
}
