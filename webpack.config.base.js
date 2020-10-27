/**
 * @author caoyx
 * @desc 开发和生产模式的公共配置
 */
// webpack.config文件，为了兼容低版本node，禁止使用 import，统一使用 require
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.jsx' // 入口文件，src下的index.jsx
    // vendor: ['react', 'react-dom'] // 使用commonChunkPlugin，将第三方库提取到vendor.js (缺点：每次打包都会执行一次)
  },
  output: {
    path: path.join(__dirname, 'dist'), // 出口目录，dist文件
    filename: '[name].[hash].js' // 这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
  },
  resolve: {
    extensions: ['.js', '.jsx', 'ts', 'tsx', '.css', '.scss', '.less'] // 不需要加载扩展名
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, 'src/fonts'),
        use: ['babel-loader']  // jsx => js; es6 => es5 等；
      },
      {
        test: /\.(css|scss)$/,
        include: path.join(__dirname, 'src'),
        use: [
          /* 创建<style></style>标签，插入head标签 */
          { loader: 'style-loader' },
          {
            loader:
            /**
             * 配合style-loader使用，作用是分析各个css文件之前的关系，处理@import和url()并合并未一个css
             * css-module：以hash命名className的方式，实现局部作用域，防止全局污染。
             */
            'css-loader' // 不启用css-modules
            // 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]' // 启用css-modules
          },
          {
            // postcss的作用：可以看做是css的babel，通过解析-转换-生成 AST的方式，在转换时调用插件（一般为autoprefixer）做处理。
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // autoprefixer： 添加各浏览器前缀
                require('autoprefixer')({
                  grid: true,
                  browsers: ['last 99 version']
                })
              ]
            }
          },
          {
            // sass => css
            loader: 'sass-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              query: {
                // 不超过阈值的图片转换为base64，超过的打包到publicPath目录下
                limit: '100', // 阈值 单位byte, 
                name: 'images/[name]_[hash:7].[ext]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 作用：拷贝html文件；动态（每次编译后的hash）添加外部资源，如：srcipt和link；添加favicon
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: path.resolve('./favicon.ico'),
      hash: true,
      minify: {
        removeAttributeQuotes: true // 去掉引号，减少文件大小
      }
    }),
    // 把所有的模块放到一个函数里，减少了函数声明，文件体积变小，函数作用域变少。
    new webpack.optimize.ModuleConcatenationPlugin(),
    // DllReferencePlugin：配合webpack.DllPlugin，将第三方库（稳定，避免每次都打包）单独打包，独立于bundle
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, './dist/dll', 'manifest.json')
    })
  ],
  // webpack4中废弃了webpack.optimize.CommonsChunkPlugin插件，用新的配置项optimization替代:把多次import的文件打包成一个单独的common.js
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 2,
          name: 'common'
        }
      }
    }
  }
};
