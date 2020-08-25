/**
 * 注意：此文件为node打包配置文件，请不要在页面内添加项目逻辑代码
 *
 * 定义每个module页面的自定义属性
 * name:生成的html页面文件名
 * title:页面标题
 * serverSide:是否是服务端渲染页面
 * path:页面路径，./src/modules/xxx 对应生成后路径 ./dist/xxx.html
 * entryName:生成后每个页面逻辑js文件名，当有多个同名html页面时，通过entryName进行区分
 * ...未完
 */
const config = [{
    name: 'test',
    title: 'test',
    serverSide: true,
    designWidth: 750,
    designFontSize: 24,
    checkRatio: false,
    isWX: false,
    path: './src/modules/test/test',
    entryName: 'test'
  }
  /**这是为node脚本自动添加配置信息预留占位符，请勿删除和编辑此行*/
];

module.exports = config;