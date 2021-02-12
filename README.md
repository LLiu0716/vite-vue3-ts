# vite-vue 3.0 + ts

## 介绍

重构一下以前学的项目

## 运行命令

```js
// 开发
npm run dev

// 生产
npm run build

// 本地运行生产环境
npm run dev-b
```

## 使用技术栈

1.  vite
2.  vue 3 , vue-router , vueX
3.  vant

## 注意 

>- `moment` 自身在 `TS` 上导出有问题 , 在使用前先修改 `moment` 源码里的导出方式为默认导出
>- 或者不使用本`dome`中的`is_moment`函数 , 重新封装一个时间格式化函数
