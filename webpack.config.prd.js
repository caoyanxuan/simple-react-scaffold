/**
 * @author caoyx
 * @desc 生产模式单独配置
 */
// webpack.config文件，为了兼容低版本node，禁止使用 import，统一使用 require
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = require('./webpack.config.base.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = webpackMerge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    // 配置全局变量
    new webpack.DefinePlugin({
      _ROOTPATH_: JSON.stringify('production')
    }),
    // 打包前清空dist
    new CleanWebpackPlugin([path.join(__dirname, './dist/*.*')]),
    // 可以并行压缩代码，提升打包效率
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        mangle: false, // 是否混淆代码
        output: {
          beautify: false, // 代码压缩成一行 true:不压缩 false:压缩
          comments: false // 去掉注释
        },
        compress: {
          drop_console: true, // 删除console
          collapse_vars: true, // 把定义一次的变量，直接使用，取消定义变量
          reduce_vars: true // 合并多次用到的值，定义成变量
        }
      }
    })
  ]
});
