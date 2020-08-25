vser (mvvm server side render)

1、可以兼容到ie7的前端mvvm框架；
2、可以使用后端模板语法编写服务端模板，构建时自动生成服务端渲染模板文件，通过服务端模板引擎进行渲染，性能更高；

一、环境搭建

1、准备环境

（1）下载node.js 网址：http://nodejs.cn/ 

（2）指向淘宝镜像 运行命令 npm install -g cnpm --registry=https://registry.npm.taobao.org

（3）下载项目代码 git地址：http://192.168.6.10:3000/caojianyu/front-end-comp-proj

（4）建议安装vscode开发工具 网址：https://code.visualstudio.com/


2、打开工程，运行项目

 （1）安装依赖包 
        cnpm install 或 npm install

 （2）开启本地服务 
        npm run dev

 （4）创建组件(path可以任意指定,默认为src/components)
        npm run create component name path

        例如：npm run create component test     
        在src/components目录下创建名为test的组件

        例如：npm run create component test modules/test/test/index/_components    
        在src/modules/test/test/index/_components目录下创建名为test的组件

 （5）创建页面(path可以任意指定,默认为src/modules)
        npm run create module name path            //创建前端渲染页面

        例如：npm run create module test modules/test/test/test/test/here   
        在src/modules/test/.../test/here  目录下创建名为test的前端渲染页面
        
        npm run create module name path serverSide //创建后端渲染页面（前后端混合渲染页面属于此类）

        例如：npm run create module test modules/test/test/test/test/here serverSide  
        在src/modules/test/.../test/here  目录下创建名为test的后端渲染的页面

二、代码发布

  构建线上代码  npm run build


三、注意事项

  1、由于此项目主要针对c端，力求减小代码尺寸，避免引入过多的polyfill兼容代码，建议大家可以使用es6的语法，但是尽量不要使用ES6新的API方法。

  比如let 、 const 、class、 箭头函数等语法可以使用，而 Object.assign、Array.from、Promise、Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol等新的API最好不要使用。

  2、单个组件可以嵌套（参照src/components/ad组件），但是嵌套后的组件调用的时候不能再设置子组件
 

四、使用说明

    1、项目源码src内目录结构为

        assets:     js css image等静态资源目录
        components: 所有的组件目录
        modules:    所有的模块目录，一个模块为一个单页应用，编译的时候会根据modules内的目录名生成对应的name.html文件
        template:   项目模板文件，这主要是用来创建新的module页面或者component组件时使用
        vendors.js  源码里面代码为空，编译过程中会自动添加项目的环境依赖脚本
        common.js   存放一些公共的脚本或者文件，编译时会自动将源码添加到该文件中
        build.config.js  当前项目的配置文件（必须）
        page.config.js   当前项目的页面配置文件（必须）
        property.json    项目的部署配置文件（如版本号）

    2、新建组件component

        通过在src/components目录下新建对应的组件文件目录结构如：
        images/ 
        scripts/ 
        styles/ 
        index.html    前端渲染模板 构建时会预编译
        server.html   服务端渲染模板 采用后端模板语法编写
        index.js
        组件内部图片放在组件内部的images/目录，公用图片放src/assets/images/目录；

        组件内部样式文件，放在styles/目录,公共样式放src/assets/styles/目录

        index.js为组件的初始化脚本，此脚本导出为一个组件类（继承于src/assets/scripts/classes/component.js类）
        

        组件生命周期方法为：

            beforeMounted(){},  组件挂载前，组件html尚未挂载到页面上，可以执行一些组件初始化的准备工作。

            mounted(){},        组件已挂载，组件html已经挂载到页面上，可以执行一些事件绑定和数据请求等操作。

            beforeUpdated(){},  组件参数发生改变，更新渲染前

            updated(){},         组件更新渲染后

            beforeDestroyed(){},组件销毁前，可以执行一些组件销毁前的操作，比如移除事件，关闭定时器等。

            destroyed(){}       组件已销毁，可以执行一些组件销毁后的逻辑操作。


五、组件通信
    1、子组件发  ->   父组件收
        子组件：
        this.$emit(name,value0,value1,....valueN)
        
        父组件：
        <xxx @on:name="callback"></xxx>
        <xxx v-on:name="callback"></xxx>






六、未完事项
    1、js规范
        
        a.数组遍历不能用 for in

七、z-index 属性规范

    1、弹出层 1000-2000
    2、loading 2000-3000
    3、toast 3000-4000
    4、页内元素 0-1000
