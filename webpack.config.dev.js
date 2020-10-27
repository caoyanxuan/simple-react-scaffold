/**
 * @author caoyx
 * @desc 开发模式单独配置
 */
// webpack.config文件，为了兼容低版本node，禁止使用 import，统一使用 require
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = require('./webpack.config.base.js');

const LOCAL_HOST = process.env.npm_package_server_local_host;
const LOCAL_PORT = process.env.npm_package_server_local_port;
const PROXY_HOST = process.env.npm_package_server_proxy_host;
const PROXY_PORT = process.env.npm_package_server_proxy_port;

// 合并到base配置
module.exports = webpackMerge(baseConfig, {
  // devtool：根据不同的环境，构建不同的打包方式（开发环境：需要方便调试；生产环境：需要简洁）
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        // eslint代码规范校验
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc.json'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: LOCAL_HOST,
    port: LOCAL_PORT, // 端口
    historyApiFallback: true, // 任意的跳转或404响应可以指向 index.html页面
    contentBase: path.join(__dirname, 'dist'), // 静态文件根目录
    overlay: true, // 如果出错，则在浏览器中显示出错误
    compress: true, // 服务器返回浏览器的时候是否启动gzip压缩
    open: false, //  打包完成自动打开浏览器
    inline: true, // 实时构建
    hot: true, // 热替换
    progress: true, // 显示打包进度
    proxy: {
      '/proxy': {
        // matches paths starting with '/proxy'
        target: `http://${PROXY_HOST}:${PROXY_PORT}`,
        pathRewrite: { '^/proxy': '' }
      }
    }
  },
  plugins: [
    // 配置全局变量
    new webpack.DefinePlugin({
      _ROOTPATH_: JSON.stringify('proxy')
    }),
    new webpack.HotModuleReplacementPlugin(), // 模块热替换
    new webpack.NamedModulesPlugin() // 显示模块的相对路径
  ]
});
