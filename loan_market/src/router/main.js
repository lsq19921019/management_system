
import index from '../pages/index';
import login from '../pages/login';
import iframe from '../pages/iframe';
import loan from '../pages/main/loan';
import platformDetail from '../pages/main/platform_detail';
import platformDetail2 from '../pages/main/platform_detail2';
import classification from '../pages/main/classification';
import undertake from '../pages/undertake';
import distribute from '../pages/main/distribute';

export default [
    {
        path: '/index/:sourceCode?',
        name: 'Index',      
        component: index,
        meta : {
            title : '首页',
            //keepAlive: true,  //返回不刷新
        }
    },{
        path: '/loan/:sourceCode?',
        name: 'Loan',      
        component: loan,
        meta : {
            title : '贷款',
            keepAlive: false,  //返回不刷新
        }
    },{
        path : '/platformDetail/:id/:sourceCode?',
        name : 'PlatformDetail',
        component : platformDetail,
        meta : {
            title : ''
        }
    },{
        path : '/platformDetail2/:id/:sourceCode?',
        name : 'PlatformDetail2',
        component : platformDetail2,
        meta : {
            title : ''
        }
    },{
        path: '/login/:sourceCode?',
        name : 'Login',
        component: login,
        meta : {
            title : '登录'
        }
    },{
        path: '/classification/:class/:sourceCode?',  
        name : 'Classification',
        component: classification,
        meta : {
            title : '平台分类'
        }
    },{
        path: '/iframe',
        name : 'Iframe',
        component: iframe,
        meta : {
            title : '平台分类'
        }
    },{
        path: '/undertake/:type?',
        name : 'Undertake',
        component: undertake,
        meta : {
            title : '跳转中'
        }
    },{
        path: '/distribute/:type?',
        name : 'Distribute',
        component: distribute,
        meta : {
            title : '跳转中'
        }
    }
];
