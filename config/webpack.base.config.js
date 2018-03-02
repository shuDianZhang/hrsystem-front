const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PORT = '3001';

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

module.exports = {
    entry: {
        index: resolve('../src/index.js')
    },
    output: {
        filename: '[name].[hash:4].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader", // 编译后用什么loader来提取css文件
                    use: "css-loader" // 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:4].[ext]'
                }
            }
        ]
    },
    devServer: {
        contentBase: resolve('../src'),
        // hot: true,
        host: '0.0.0.0',
        port: PORT
    },
    plugins: [
        // 该插件将为生成一个HTML5文件，将webpack打包生成的资源文件注入其中
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        // 自动打开浏览器
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/#`,
        }),
        // 提取 css
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css'
        }),
        // 分析打包结果
        new BundleAnalyzerPlugin({
            analyzerPort: 3011
        })
    ]
}