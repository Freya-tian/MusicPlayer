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
```js
    declare module '*/index.js'{ //这里引入的是/service/index.js
    export const recommendList:sring|object //将index.js中暴露的recommondList 设置返回类型
    }
```
2. 网上查到还有一种方式：
使用require引入：
```js
    require('./service/index.js')
```
但是我使用报错

## React-Router 
官方发布三个库
- react-router 核心库，提供组件，钩子函数
- react-router-dom 包含react-router 所有内容，同时添加了用于DOM的组件
- react-router-native 添加了用于react native 的API 
1. 与v5区别
 -  内置组件的变化：移除了<switch/> 新增<Routes>
 -  语法的变化： component = {About} 变为 element ={<About/}
 -  新增hook useParams,useNavigate,useMatch
2. 懒加载：
 - reat.lazy() 使用：
    const About = react.lazy(()=>import('../About'))
3. 路由文件编写：详见：src/routes/index.tsx
4. useRoutes - 将创建的路由表一一映射为路由对象。等同于<Routes> 标签
5. useLocation - 返回当前路由
6. useNavigate - 可跳转 usenavigate(path)

## Redux
1. 在createSlice中的reducer中更新state值
  不可使用
  ```js
      state.user ='123'
  ```
  要用
  ```js
    {
      ...state,user:'123'
    }
  ```