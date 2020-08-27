const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ServerTemplatePlugin = require('server-template-vser-plugin');
const GetModulesList = require('./build/getModulesList');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ENV = 'product';
const Fs = require('fs');
const Rules = require('./webpack.rules.config.js');
var ModulesList = GetModulesList(ENV);
const BuildConfig = require('./src/build.config.js');
var Template = ModulesList.template;

//创建版本号 格式为yyyymmddhh
var createVersion = function () {
    var now = new Date();
    return '' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + now.getHours();
}
// 插件
var pluginsConfig = [
    // 设置环境变量信息
    new Webpack.DefinePlugin({
        SCRIPT_VERSION: JSON.stringify(createVersion()),
        ENVIRONMENT: JSON.stringify(ENV)
    }),
    new CleanWebpackPlugin(["dist"]),
    new MiniCssExtractPlugin({
        filename: "styles/[name].[chunkhash:8].css"
    })
]
if (Fs.existsSync('src/static')) {
    pluginsConfig.push(new CopyWebpackPlugin([{
        from: 'src/static',
        to: '../static'
    }]));
}
// 编译模板页面
var len = Template.length;
for (var i = 0; i < len; i++) {
    pluginsConfig.push(new HtmlWebpackPlugin(Template[i]));
}
//添加自定义模板插件
pluginsConfig.push(new ServerTemplatePlugin());

module.exports = {
    mode: 'production',
    entry: ModulesList.entry,
    output: {
        path: Path.join(__dirname, './' + BuildConfig.buildPath + '/' + BuildConfig.assetsPath),
        publicPath: BuildConfig.staticDomain + "/" + BuildConfig.assetsPath + '/',
        filename: BuildConfig.scriptsPath + '/[name].[hash].js',
        chunkFilename: BuildConfig.scriptsPath + '/[name].[hash].chunk.js'
    },
    module: {
        rules: Rules(true)
    },
    plugins: pluginsConfig,
    optimization: {
        splitChunks: {
            // chunks: 'initial', // 只对入口文件处理
            cacheGroups: {
                // styles: {
                //     name: 'styles',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true
                // },
                // default: false,
                vendors: {
                    name: "vendors",
                    chunks: "initial",
                    minChunks: 2
                },
                common: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2
                },
                base: {
                    name: "base",
                    chunks: "initial",
                    minChunks: 2
                },
                default: {
                    minChunks: 2,
                    reuseExistingChunk: false
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false, // set to true if you want JS source maps
                uglifyOptions: {
                    ie8: true
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    resolve: {
        alias: {
            src: Path.resolve(__dirname, 'src'),
            assets: Path.resolve(__dirname, 'src/assets'),
            libs: Path.resolve(__dirname, 'src/assets/scripts/libs'),
            utils: Path.resolve(__dirname, 'src/assets/scripts/utils'),
            classes: Path.resolve(__dirname, 'src/assets/scripts/classes'),
            components: Path.resolve(__dirname, 'src/components'),
            modules: Path.resolve(__dirname, 'src/modules'),
            config: Path.resolve(__dirname, 'src/assets/scripts/config/config.js'),
            data: Path.resolve(__dirname, 'src/assets/scripts/data'),
        }
    }

}