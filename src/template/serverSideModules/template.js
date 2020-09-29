import VserRouter from 'vser-router';
import Vser from 'vser';
import RouterConfig from './router.config';
// import xxx from 'xxx'; //入口组件
Vser.use(VserRouter);
const router = new VserRouter({
    routes: RouterConfig
});

const el = document.getElementById('app');
el.innerHTML = '';
// new xxx({
//     el: el,
//     router
// });