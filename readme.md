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

        对于使用vser-router的单页应用，还具有如下方法：

            routerUpdate(param)  路由参数更新；

            routerLeave(nextRoute, route) 路由离开；
            
            routerRecover(route, prevRoute) 路由从缓存恢复；


五、组件通信

    1、子组件发  ->   父组件收
        子组件：
        this.$emit(name,value0,value1,....valueN)
        
        父组件：
        <xxx @on:name="callback"></xxx>
        <xxx v-on:name="callback"></xxx>

六、模板语法

    vser和vue不同，vue所有data数据和props数据都是挂载到组件根实例上；

    vser的data数据挂载在this.data上，props数据挂载在this.props上，这样代码维护者会清晰的明白数据的来源;

    vser采用和vue一样的模板语法，如：

    条件语句：

        v-if="xxx" 

        v-else-if="xxx"

        v-else

    循环语句：

        v-for="(item,index) in xxx"
        
        v-for="item in xxx"

    v-html="xxx"

    数据绑定：

        {{xxx}}

        v-bind:xxx="xxx"

        :xxx="xxx"

    事件监听：（可监听dom事件，和子组件自定义消息）

        v-on:xxx="xxx"

        @xxx="xxx" 

    样式绑定：（不支持vue的数组模式）
        
        :class="{'xxx': true}"

        :style="{'color':'#f00'}"




七、服务端渲染
    1、服务端渲染，和目前流行的ssr有所不同，是通过项目编译时，自动解析组件依赖，并生成服务端模板，通过服务端模板引擎来实现；
    
    2、服务端渲染结果前端渲染时没有做反解，只是为了seo和首屏优化；

    3、实现：
        通过npm命令创建服务端渲染页面，如（/test.html）：
        npm run create module test modules serverSide 
        页面创建成功，会在src/page.config.js文件新增一条当前页面的配置，用于生成多页应用；
        同时自动在src/modules/目录下生成test目录（test.html目录空间）；
        src/modules/test/目录下会自动生成一个test.ejs文件，此文件是test.html页面的模板；


        服务端渲染需要在组件根目录新建server.html文件，（在此文件内使用服务端模板语法编写服务端渲染模板）如：
        <Page>
            <Header slot="header">
                <div style="color:#fff;" slot="left">我才是左侧按钮</div>
            </Header>
            <div>
                我在这里
            </div>
            <Second></Second>
            <Third>
                <p>我是老三，我要引入小四</p>
            </Third>
        </Page>
        

        对于全局组件，需要在项目src目录下新建.srglcp（服务端渲染全局组件配置）文件如：
        module.exports = {
            "Page": "components/page/index",
            "Footer": "components/footer/index",
            "Header": "components/header/index"
        }

        对于自定义局部子组件，需要在组件根目录config.js内增加子组件定义，如：
        import Second from '../second/index';
        import Third from '../third/index';
        import Four from '../four/index';
        export default {
            components: {
                Second: Second,
                Third,
                Four
            }
        }

        最后在test.ejs文件引入页面根组件模板：
        <div id="app">
            <%= require('server-template-vser-loader!./_components/layout/server.html') %>
        </div>

        通过npm run build 指令编译结束后，输出目录 /dist/ 下会自动生成完整的服务端渲染模板 test.html 文件如：

        <div id="app">
            <div class="c-page" __comp__="Page">
                <div class="c-header" __comp__="Header" slot="header">
                    <div class="c-header-left">
                        <div style="color:#fff" slot="left">我才是左侧按钮</div>
                    </div>
                    <div class="c-header-center">
                        <slot name="center">我是标题</slot>
                    </div>
                    <div class="c-header-right">
                        <slot name="right">我是右侧</slot>
                    </div>
                </div>
                <div class="c-page-body">
                    <div>我在这里</div>
                    <div class="c-second-test" __comp__="Second">
                        <h2>我是 second,我的值是：123</h2>
                        <p>我下面是老三</p>
                        <div class="c-third-test" __comp__="Third">
                            <h2>我是 third</h2>
                            <p>大家都叫我老三，谁都可以引入我，我也可以引入别人</p>
                            <slot name="slot1"></slot>
                            <slot name="slot2"></slot>
                            <p v-html="data.text"></p>
                            <slot name="slot3"></slot>
                        </div>
                        <p>{{text}}</p>
                        <ul>
                            <li v-for="item in props.list">item of list: {{item}}</li>
                        </ul><button @click="clickButton">点击我</button>
                    </div>
                    <div class="c-third-test" __comp__="Third">
                        <h2>我是 third</h2>
                        <p>大家都叫我老三，谁都可以引入我，我也可以引入别人</p>
                        <p>我是老三，我要引入小四</p>
                        <slot name="slot1"></slot>
                        <slot name="slot2"></slot>
                        <p v-html="data.text"></p>
                        <slot name="slot3"></slot>
                    </div>
                </div>
                <slot name="footer"></slot>
            </div>
        </div>

        

未完事项
    1、js规范
        
        a.数组遍历不能用 for in

    2、目前不支持数据双向绑定