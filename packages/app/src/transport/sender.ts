import { Message } from './type';

export default class TransportSender {
  public sender: Electron.WebContents;

  constructor(sender: Electron.WebContents) {
    this.sender = sender;
  }

  /**
   * 发布
   * @param action
   * @param message
   */
  public publishRender(subject: string, ...args: any[]) {
    this.sender.send('message-center-main', { subject, args });
  }

  /**
   * 发送
   * @param message
   */
  public send(message: Message) {
    this.sender.send('message-center-main', message);
  }
}
