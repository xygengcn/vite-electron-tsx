/**
 * 窗口管理
 */

import AppWindow, { IAppWindowOptions } from './app-window';

export default class WindowManager {
  // 所有窗口
  private static windows: Map<string, AppWindow> = new Map();

  /**
   * 创建接口
   * @param name
   * @param url
   * @returns
   */
  public static createAppWindow(name: string, url: string, options: IAppWindowOptions) {
    let appWindow = this.windows.get(name);
    if (!appWindow) {
      appWindow = new AppWindow(options);
      this.windows.set(name, appWindow);
    }
    appWindow.browserWindow.loadURL(url);
    return appWindow;
  }
}
