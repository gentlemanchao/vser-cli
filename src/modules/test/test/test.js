import VserRouter from 'vser-router';
import Vser from 'vser';
import Entry from './_components/layout/index';
import 'components/install';
import RouterConfig from './router.config';
Vser.use(VserRouter);
const router = new VserRouter({
    routes: RouterConfig
});

const el = document.getElementById('app');
el.innerHTML = '';
new Entry({
    el: el,
    router
});