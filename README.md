# vite + React 开发音乐播放器 
## 本地开发阶段解决跨域问题：
在vite.config.ts 添加代码：
```js
export default defineConfig({
  plugins: [react()],//原有的设置
  server:{
    host:'localhost',
    port:5173,
    open:false,
    proxy:{
      '/api':    {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path)=>path.replace(/^\/api/,'')
      }
    }  
  }
})
```

*************

## 在ts文件中引入js模块：
1. 创建xxx.d.ts vite 自带vite-env.d.ts 所以我在这里添加了
    declare module '*/index.js'{ //这里引入的是/service/index.js
    export const recommendList:sring|object //将index.js中暴露的recommondList 设置返回类型
    }
2. 网上查到还有一种方式：
使用require引入：
    require('./service/index.js')
但是我使用报错
