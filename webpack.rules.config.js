const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @param [Boolean] isProd 是否是线上打包
 */
module.exports = function (isProd) {
    var rules = [{
            test: /\.js$/,
            exclude: "/node_modules/",
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015-loose']
                }
            }
        },
        {
            test: /\.style$/,
            use: ['css-loader', 'less-loader',
                //  {
                //     loader: 'postcss-loader',
                //     options: {
                //         parser: 'postcss-js',
                //         exec: true
                //     }
                // }
            ]
        },
        {
            test: /\.less$/,
            use: [ 'css-loader', 'less-loader']
        },
        {
            test: /\.(scss|sass)$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        },

        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: 'url-loader?limit=700&name=fonts/[hash].[ext]'
        },
        {
            test: /index\.html$/,
            // use: ['html-loader']
            use: ['template-vser-loader']
        },
        {
            test: /\.ejs$/,
            loader: 'ejs-loader',
            options: {
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g,
                evaluate: /<%([\s\S]+?)%>/g
            }
        }

    ]

    if (isProd) {
        rules.push({
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, 'css-loader']
        }, {
            test: /\.(gif|jpg|jpeg|png|svg)\??.*$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]",
                    publicPath: "/assets/images/",
                    outputPath: "/images/"
                }
            }]
        }, )

    } else {
        rules.push({
            test: /\.css$/,
            use: ['css-loader']
        }, {
            test: /\.(gif|jpg|jpeg|png|svg)\??.*$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]"
                }
            }]
        }, )

    }
    return rules;
}