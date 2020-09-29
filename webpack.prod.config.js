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
            chunks: 'all', //This indicates which chunks will be selected for optimization. When a string is provided, valid values are all, async, and initial. Providing all can be particularly powerful, because it means that chunks can be shared even between async and non-async chunks
            minSize: 30000, //Minimum size, in bytes, for a chunk to be generated.
            maxSize: 80000,
            minChunks: 2, //Minimum number of chunks that must share a module before splitting.
            maxAsyncRequests: 5, //Maximum number of parallel requests when on-demand loading.
            maxInitialRequests: 3, //Maximum number of parallel requests at an entry point.
            automaticNameDelimiter: '-', //This option lets you specify the delimiter to use for the generated names.
            automaticNameMaxLength: 30, //Allows setting a maximum character count for chunk names that are generated by the SplitChunksPlugin
            name: true, //Providing true will automatically generate a name based on chunks and cache group key.
            cacheGroups: {
                vendors: {
                    // test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 10
                },
                default: {
                    minChunks: 2,
                    priority: -20, //A module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority. The default groups have a negative priority to allow custom groups to take higher priority (default value is 0 for custom groups).
                    reuseExistingChunk: true //If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated. This can impact the resulting file name of the chunk.
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