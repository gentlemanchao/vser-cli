export default [{
        path: '/home',
        name: 'home',
        cache: false,
        meta: {
            title: '测试'
        },
        component: resolve => require(['./_components/main/index'], resolve),
        children: [{
                path: 'second/:id',
                name: 'second',
                cache: true,
                meta: {
                    title: '测试2',
                },
                component: resolve => require(['./_components/second/'], resolve)
            },
            {
                path: ':id/third',
                name: 'third',
                meta: {
                    title: '测试3'
                },
                component: resolve => require(['./_components/third/'], resolve)
            },

        ]
    },

    {
        path: '/404/:id/four/:id',
        meta: {
            title: '测试4'
        },
        component: resolve => require(['./_components/third/'], resolve),
        children: [{
                path: 'second/:id',
                name: 'four',
                cache: true,
                meta: {
                    title: '测试2',
                },
                component: resolve => require(['./_components/second/'], resolve)
            },
            {
                path: ':id/third',
                name: 'five',
                meta: {
                    title: '测试3'
                },
                component: resolve => require(['./_components/third/'], resolve)
            },

        ]
    }
];