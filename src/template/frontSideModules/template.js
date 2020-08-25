/**
 * 页面逻辑控制文件
 */
import 'jQuery';
import './styles/index.style';
import Router from 'utils/router';
import RouterConfig from './route.config';
Router(RouterConfig, {
    $wraper: $('#app'), //组件插槽
    defaultRoute: '/home', //默认跳转路由
    // 实例化新页面组件前
    before: function (route) {
        route.title && route.title !== '' && (document.title = route.title);
    },
    //离开当前路由时的回调
    after: function (route) {},
    //路由未找到时的回调
    notfound: function () {
        console.log('--路由未找到', this);
    }
});