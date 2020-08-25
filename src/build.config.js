/**
 * 注意：此文件为node打包配置文件，请不要在页面内添加项目逻辑代码

 */
const config = {
    staticDomain: ``,
    buildPath: "dist",
    assetsPath: "assets",
    imgPath: "images",
    stylesPath: "styles",
    scriptsPath: "scripts",
    defaultPageTitle: '测试项目',
    jsLibs: [{ //js库文件
            name: 'vendors',
            src: 'src/vendors.js'
        },
        {
            name: 'common',
            src: 'src/common.js'
        },
        {
            name: 'base',
            src: 'src/base.js'
        }
    ],
    //调试服务器
    devServer: {
        port: "7156",
        //反向代理
        proxy: [{
            //反向代理规则
            rule: '/_api/*',
            to: {
                //反向代理目标服务地址
                target: 'http://192.168.6.251:6066', //dev
                //移除反向代理规则字符串
                pathRewrite: {
                    '^/_api': ''
                },
                cookieDomainRewrite: {
                    "*": "" //移除返回cookie里域名
                },
                secure: false,
                changeOrigin: true
            }
        }]

    }
};
module.exports = config;