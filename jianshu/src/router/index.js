import Vue from 'vue';
import Router from 'vue-router';
import { baseUrl } from '../common/js/config.js';
import axios from 'axios';
// import Login from '@/components/Login';
// import Main from '@/components/Main';
Vue.use(Router);
// 把路由对应的组件定义成异步组件
const Login = resolve => {
    require.ensure(['@/components/Login.vue'], () => {
        resolve(require('@/components/Login.vue'));
    })
};
const Main = resolve => {
    require.ensure(['@/components/Main.vue'], () => {
        resolve(require('@/components/Main.vue'))
    })
};
const router = new Router({
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/main',
        name: 'Main',
        component: Main
    }]
});
// router.beforeEach((to, from, next) => {
//     if (to.name.toLocaleUpperCase() !== 'LOGIN') {
//         axios.get(baseUrl + '/user/signinRequired').then((res) => {
//             console.log(res.data)
//             if (res.data.code != 200) {
//                 console.log('login');
//                 next('/login');
//             } else {
//                 next();
//             }

//         });
//     } else {
//         next();
//     }
// });
export default router;