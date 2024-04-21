import MainTransport from '../../transport/main';

/**
 * 创建主进程函数
 */
export function createMainTransport() {
  const mainTransport = new MainTransport();
  mainTransport.handle('test', () => {
    return '111';
  });
}
