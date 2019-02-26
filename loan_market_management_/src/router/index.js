import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import ChannelCalculate from '@/pages/channelCalculate'
//用户信息
import routesPlatformUser from './platformUser';
//平台管理
import routesPlatformManagement from './platformManagement';
//运营管理
import routesOperationManagement from './operationManagement';

Vue.use(Router)

const router = new Router({
    mode : 'history',
    routes : [
        {
            path: '/login',
            name: 'Login',      
            component: Login,
            meta : {
                isShowMenus : 'no',
                isShowTopBar : 'no',
                isShowLabels : 'no'
            }
        },
        {
            path: '/channelCalculate/:channelName?',
            name: 'ChannelCalculate',      
            component: ChannelCalculate,
            meta : {
                isShowMenus : 'no',
                isShowTopBar : 'no',
                isShowLabels : 'no'
            }
        },
        ...routesPlatformUser,
        ...routesPlatformManagement,
        ...routesOperationManagement
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
})

export default router;
