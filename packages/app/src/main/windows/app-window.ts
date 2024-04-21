import { isDevelopment } from '../../utils/index';
import { BrowserWindow } from 'electron';
import { join } from 'path';

export type IAppWindowOptions = Omit<Electron.BrowserWindowConstructorOptions, 'webPreferences'>;

export default class AppWindow {
  // 窗口句柄
  public browserWindow: BrowserWindow;
  // 创建窗口
  constructor(options: IAppWindowOptions) {
    this.browserWindow = new BrowserWindow({
      ...options,
      webPreferences: {
        allowRunningInsecureContent: false,
        nodeIntegration: true,
        contextIsolation: true,
        webviewTag: true,
        webSecurity: true,
        devTools: true,
        plugins: true,
        scrollBounce: true,
        experimentalFeatures: false,
        nodeIntegrationInSubFrames: true,
        preload: join(__dirname, '../preload/index.js')
      }
    });
    // 开发环境打开控制台
    isDevelopment() && this.browserWindow.webContents.openDevTools();
  }
}
