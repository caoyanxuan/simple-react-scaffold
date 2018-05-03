/**
 * @author caoyx
 * @desc 将不常更新的，或稳定版本的库单独打包
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'dll/[name]_dll.js',
        library: '_dll_[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './dist/dll', 'manifest.json'),
            name: '_dll_[name]'
        })
    ]
};
