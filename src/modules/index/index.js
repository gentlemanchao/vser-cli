import 'src/base';
import VserRouter from 'vser-router';
import Vser from 'vser';
import RouterConfig from './router.config';
import Main from './_components/main/index'; //入口组件
Vser.use(VserRouter);
const router = new VserRouter({
    routes: RouterConfig
});

const el = document.getElementById('app');
el.innerHTML = '';
new Main({
    el: el,
    router
});
console.log('---started')