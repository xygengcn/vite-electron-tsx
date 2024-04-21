import { ipcMain } from 'electron';
import { randomUUID } from 'crypto';
import TransportSender from './sender';
import { Action, Message, NodeAction } from './type.d';

export type Callback = (error: Error, result: any) => void;

/**
 * main进程消息
 */

export default class MainTransport {
  /**
   * 主进程的动作
   */
  private mainActionsMap: Map<string, Action> = new Map();

  /**
   * 渲染进程的动作
   */
  private renderActionsMap: Map<string, TransportSender> = new Map();

  constructor() {
    this.start();
  }

  /**
   * 需要启动
   */
  private start() {
    /**
     * 接受客户端的初始化事件
     */
    ipcMain.handle('message-center-render-init', (event, actionKeys: string[]) => {
      console.log('[main] 客户端的初始化事件', actionKeys);
      actionKeys.forEach((key) => {
        this.renderActionsMap.set(key, new TransportSender(event.sender));
      });
    });
    /**
     * 注册事件
     */
    ipcMain.handle('message-center-render-request', async (event: Electron.IpcMainInvokeEvent, name: string, ...args: any[]) => {
      let result: any = null;
      let error: unknown | null = null;
      try {
        // 服务端
        if (this.mainActionsMap.has(name)) {
          const callback = this.mainActionsMap.get(name) as Action;
          result = await callback(new TransportSender(event.sender), ...args);
        } else if (this.renderActionsMap.has(name)) {
          // 渲染进程注册
          result = await this.request(name, args);
        } else {
          error = Error(`${name}未注册`);
        }
      } catch (e) {
        error = e;
      }
      return { result, error };
    });
  }

  /**
   * 主进程发起请求
   * @param action
   * @param args
   * @param callback
   */
  public async request(action: string, args: any[]) {
    const message: Message = {
      id: randomUUID({ disableEntropyCache: true }),
      action,
      args
    };
    const sender = this.renderActionsMap.get(action);
    return new Promise((resolve, reject) => {
      sender?.send(message);
      ipcMain.once(message.id, (_event, data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.result);
        }
      });
    }).catch((e) => {
      throw e;
    });
  }

  /**
   * 注册
   * @param action
   * @param callback
   */
  public handle(action: string, callback: Action) {
    this.mainActionsMap.set(action, callback);
  }

  /**
   * 注册方法
   * @param action
   */
  public registerActions(action: NodeAction) {
    Object.entries(action).forEach(([key, value]) => {
      this.handle(key, value);
    });
  }

  /**
   * 移除
   * @param webContents
   */
  public removeAction(webContents: Electron.WebContents) {
    this.renderActionsMap.forEach((item, key) => {
      if (item.sender === webContents || item.sender.id === webContents.id) {
        this.renderActionsMap.delete(key);
      }
    });
  }
}
