/// <reference types="vite/client" />

import type Transport from '@/transport';
import type { IElectronPreload } from '@quark/app';
// 全局
declare global {
  interface Window {
    __ELECTRON__: IElectronPreload;
    $transport: Transport;
  }
}

export default global;
