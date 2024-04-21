import { MakeDirectoryOptions, existsSync, mkdirSync, statSync, readdirSync, unlinkSync, createReadStream, createWriteStream, rmdirSync } from 'fs';
import path from 'path';

/**
 * 创建多级目录，默认递归
 * @param fullPath 路径
 * @param option 属性
 * @returns
 */
export function ensureDir(fullPath: string, option: MakeDirectoryOptions & { recursive: true } = { recursive: true }) {
  try {
    if (existsSync(fullPath)) return true;
    return mkdirSync(fullPath, option);
  } catch (error) {
    return false;
  }
}

/**
 * 删除文件夹
 * @param fullPath
 */
export function rmdir(fullPath: string) {
  let files: string[] = [];
  /**
   * 判断给定的路径是否存在
   */
  if (existsSync(fullPath)) {
    /**
     * 返回文件和子目录的数组
     */
    files = readdirSync(fullPath);
    files.forEach(function (file) {
      const curPath = path.join(fullPath, file);
      /**
       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
       */
      if (statSync(curPath).isDirectory()) {
        // recurse
        rmdir(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    /**
     * 清除文件夹
     */
    rmdirSync(fullPath);
  } else {
    throw new Error('给定的路径不存在，请给出正确的路径');
  }
}

/**
 * 文件
 * @param path
 * @returns
 */
export function isFile(path: string): boolean {
  if (existsSync(path)) {
    const stat = statSync(path);
    return stat?.isFile();
  }
  return false;
}

/**
 * 文件夹
 * @param path
 * @returns
 */
export function isDirectory(path: string): boolean {
  if (existsSync(path)) {
    const stat = statSync(path);
    return stat?.isDirectory();
  }
  return false;
}

/**
 * 文件夹复制
 * @param from
 * @param to
 */
export function copyDir(from: string, to: string, options?: { filter?: (file: string) => boolean }) {
  ensureDir(to);
  if (isDirectory(from)) {
    const files = readdirSync(from);
    files.forEach((file) => {
      const fromFile = path.join(from, file);
      const toFile = path.join(to, file);
      if (isDirectory(fromFile)) {
        return copyDir(fromFile, toFile);
      } else {
        // 过滤掉
        if (options?.filter) {
          if (options.filter(fromFile)) {
            return true;
          }
        } else {
          createReadStream(fromFile).pipe(createWriteStream(toFile));
        }
      }
    });
  }
}

/**
 * 文件复制
 * @param from
 * @param to
 */
export function copyFile(from: string, to: string) {
  if (isFile(from)) {
    if (!isDirectory(path.dirname(to))) {
      ensureDir(path.dirname(to));
    }
    createReadStream(from).pipe(createWriteStream(to));
  }
}
