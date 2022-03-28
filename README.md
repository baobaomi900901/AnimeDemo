# AnimeDemo

GSAP, AnimeJS
Online-Tutorials

## 1.初始化项目(忽略掉)

```
yarn init
```

## 2.安装依赖(从这里开始)

```
yarn
```

## 3.安装 GSAP

文档地址 https://greensock.com/docs/v3

```
npm install -D gsap
```

## 4.1 安装 tailwindcss

文档地址: https://tailwindcss.com/docs/installation
中文文档: https://www.tailwindcss.cn/

```
npm install -D tailwindcss
```

## 4.2 初始化 tailwindcss 配置

```
npx tailwind init tailwind.config.js
```

## 4.3 引入 tailwindcss 指令

在 src/input.css 中引入

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4.4 启动 Tailwind CLI

```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```
