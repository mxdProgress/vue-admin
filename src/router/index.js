import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            txt: "主页"
        }
    },
    {
        path: "/login",
        name: "Login",
        hidden: true,
        meta: {
            txt: '登录'
        },
        component: () =>
            import ("../views/login/Login")
    },
    {
        path: "/console",
        name: "Console",
        redirect: 'index',
        meta: {
            txt: '控制台',
            icon: 'console'
        },
        component: () =>
            import ("../views/layout/index"),
        children: [{
            path: '/index',
            name: 'Index',
            meta: {
                txt: '首页'
            },
            component: () =>
                import ("../views/console/index"),
        }]
    },
    {
        path: "/info",
        name: "Info",
        meta: {
            txt: '信息管理',
            icon: 'infomanage'
        },
        component: () =>
            import ("../views/layout/index"),
        children: [{
                path: '/infoIndex',
                name: 'InfoIndex',
                meta: {
                    txt: '信息列表'
                },
                component: () =>
                    import ("../views/info/index"),
            },
            {
                path: '/infoCategory',
                name: 'InfoTCategory',
                meta: {
                    txt: '信息分类'
                },
                component: () =>
                    import ("../views/info/category"),
            },
            {
                path: '/editDetailed/:id/:title',
                name: 'editDetailed',
                hidden: true,
                meta: {
                    txt: '编辑详情'
                },
                component: () =>
                    import ("../views/info/editDetailed"),
            }
        ]
    },
    {
        path: "/user",
        name: "User",
        meta: {
            txt: '用户管理',
            icon: 'user'
        },
        component: () =>
            import ("../views/layout/index"),
        children: [{
            path: '/userIndex',
            name: 'UserIndex',
            meta: {
                txt: '信息列表'
            },
            component: () =>
                import ("../views/user/userList"),
        }]
    },





    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ "../views/About.vue")
    // }
];

const router = new VueRouter({
    routes
});

export default router;