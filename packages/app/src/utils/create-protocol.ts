import { protocol, net } from 'electron';
import { join } from 'path';

/**
 * 自定义注册协议
 * @param scheme
 */
export function createProtocol(scheme: string) {
  const isProtocolHandled = protocol.isProtocolHandled(scheme);
  console.log('[quark] %s isProtocolHandled', scheme);
  if (!isProtocolHandled) {
    protocol.handle(scheme, (request) => {
      const url = join(__dirname, request.url.slice(`${scheme}://`.length));
      return net.fetch('file://' + url);
    });
  } else {
    console.log('[quark] %s isProtocolHandled', scheme);
  }
}
