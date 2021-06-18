/**
 * electron 主文件
 */
import { join } from 'path';
import { app, BrowserWindow } from 'electron';
import dotenv from 'dotenv';
import { isDev } from '../utils';
dotenv.config();
class createWin {
  private mainWindow: BrowserWindow;
  // 创建浏览器窗口
  constructor() {
    this.mainWindow = new BrowserWindow({
      width: 1080,
      height: 700,
      webPreferences: {
        allowRunningInsecureContent: false,
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true,
        webSecurity: false,
        devTools: true,
        plugins: true,
        scrollBounce: true,
        experimentalFeatures: true,
        enableRemoteModule: true,
        nodeIntegrationInSubFrames: true,
        preload: join(__dirname, '../../dist/preload/index.js')
      }
    });
    const DEV_URL = `http://localhost:${process.env.VITE_APP_PORT}`; // vite 启动的服务器地址
    const PRD_URL = `file://${join(__dirname, '../../dist/render/index.html')}`; // vite 构建后的静态文件地址
    const URL = isDev() ? DEV_URL : PRD_URL;
    this.mainWindow.loadURL(URL);
    isDev() && this.mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  return new createWin();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    return new createWin();
  }
  return null;
});
