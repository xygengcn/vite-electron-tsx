/**
 * 是不是开发环境
 * @returns
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}
