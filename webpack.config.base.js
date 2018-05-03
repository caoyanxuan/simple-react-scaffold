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
        // vendor: ['react', 'react-dom'] // 供应商库
    },
    output: {
        path: path.join(__dirname, 'dist'), // 出口目录，dist文件
        filename: '[name].[hash].js' // 这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less'] // 不需要加载扩展名
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'src'),
                exclude: path.join(__dirname, 'src/fonts'),
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                include: path.join(__dirname, 'src'),
                use: [
                    { loader: 'style-loader' },
                    {
                        loader:
                            // 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]' // 启用css-modules
                            'css-loader' // 不启用css-modules
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    grid: true,
                                    browsers: ['last 99 version']
                                })
                            ]
                        }
                    },
                    {
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
                                // 阈值 单位byte
                                limit: '10',
                                name: 'images/[name]_[hash:7].[ext]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
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
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, './dist/dll', 'manifest.json')
        })
        // new webpack.LoaderOptionsPlugin({
        //     // minimize: true, // 压缩loader读取的文件
        //     options: {
        //         postcss: function() {
        //             return [precss, autoprefixer];
        //         }
        //     }
        // })
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
