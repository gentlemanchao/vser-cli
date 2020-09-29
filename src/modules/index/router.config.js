export default [{
    path: '/home',
    name: 'home',
    cache: false,
    meta: {
        title: '测试'
    },
    component: resolve => require(['./_components/second/'], resolve)

}];