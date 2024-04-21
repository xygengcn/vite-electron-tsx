/**
 * ipc注入
 */
export interface IElectronPreload {
  invoke: (channel: string, ...args: any[]) => Promise<any>;
  onHandler: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void;
}

/**
 * 类型
 */
export type * from '../src/transport/type.d.ts';
