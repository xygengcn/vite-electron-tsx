# vite-electron-tsx

主要使用vite构建项目，vue3的tsx语法写界面，electron构建桌面程序的解决方案


## 源码地址

[【Github地址】](https://github.com/xygengcn/vite-electron-tsx)

[【博客地址】](https://xygeng.cn/post/303.html)



## 涉及到的主要依赖

1. `vite@2.2.1`
2. `vue@3.0.11`
3. `vuex@4.0.0`
4. `vue-router@4.0.6`
5. `typescript@4.2.2`
6. `electron@13.1.0`

- vite：[https://github.com/vitejs/vite](https://github.com/vitejs/vite)
- vue3：[https://v3.cn.vuejs.org/](https://v3.cn.vuejs.org/)
- electron：[https://www.electronjs.org/](https://www.electronjs.org/)

## 实例

![](./screenshot.png)

## 目录结构

- src
  - main 主进程
  - preload 注入代码
  - render 渲染进程，vue主要地方
  - typings 类型
  - utils 工具类
- script
  - dev 开发运行脚本
  - build 打包脚本
- dist 主进程和注入打包输出目录
- release 程序打包输出目录

## 使用 (推荐yarn)

- ### 安装依赖

```sh
yarn
```

- ### 运行

```sh
yarn run dev
```

- ### 打包
```sh
yarn run build
```


## 安装vue devtools

https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en

1、下载插件放在本地项目的拓展上，mac地址在/Users/用户名/Library/Application Support/项目名/extensions

2、如果id文件夹有版本号文件夹套着，需要把文件夹里面的文件放在第一级目录

3、安装依赖

```
yarn add electron-devtools-installer -D
```

```ts
// main.ts
import Extension from 'electron-devtools-installer'

app.whenReady().then(() => {
  const vue_devtools_beta = { id: "ljjemllljcmogpfapbkkighbhhppjdbg", electron: ">=1.2.1" }
  Extension(vue_devtools_beta)
    .then(() => { console.log('Vue-tools安装成功 \n') })
    .catch(err => {
      console.log('Vue-tools安装失败: \n', err)
    }).finally(() => {
      new createWin()
    })
});

```

