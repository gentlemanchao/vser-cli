import VserRouter from 'vser-router';
import Entry from './_components/layout/index';
import 'components/install';
import RouterConfig from './router.config';
const router = new VserRouter({
    routes: RouterConfig
});

const el = document.getElementById('app');
el.innerHTML = '';
new Entry({
    el: el,
    router
});