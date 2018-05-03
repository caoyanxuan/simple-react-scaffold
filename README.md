## react + react-router4 + axios + webpack4.x 脚手架
---------------------------------------
### 一、安装/启动
1. 下载依赖：npm i
2. 先运行：npm run dll（预先打包verdor包）
3. 开发：npm run dev
4. 打包：npm run build （prd）

---------------------------------------
### 二、说明（只是做了较为常用的基础的封装，以适应更多的应用场景）
1. 没有提供mock服务，可根据情况自己加上，或者自启一个node服务器（推荐）；
2. 对axios只做了常用封装，可根据业务自行扩展；
3. 未引入UI组件库，推荐antd3.x；
4. 未引入状态管理，这个需根据业务选择（可加可不加）；
5. 未做登录权限控制，可根据业务场景DIY（如：结合状态管理）。