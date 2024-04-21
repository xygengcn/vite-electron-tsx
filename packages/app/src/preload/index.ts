import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('__ELECTRON__', {
  // 请求主进程
  invoke: async (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args);
  },
  // 请求主进程
  onHandler: async (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
    return ipcRenderer.on(channel, listener);
  }
});
