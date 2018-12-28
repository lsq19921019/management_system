
import test from '../pages/activity/test';
import landing from '../pages/activity/landing';
import newReg from '../pages/activity/newReg';
import regSuc from '../pages/activity/newReg_suc';
import newReg1 from '../pages/activity/newReg_a';
import newRegSuca from '../pages/activity/newReg_a_suc';
import newReg2 from '../pages/activity/newReg_b';
import newReg3 from '../pages/activity/newReg_c';
import newReg4 from '../pages/activity/newReg_d';
import newRegSucb from '../pages/activity/newReg_b_suc';
import detailPagea from '../pages/activity/detailPage';

export default [
    {
        path: '/test',
        name: 'Test',      
        component: test,
        meta : {
            title : '联调'
        }
    },
    {
        path: '/landing/:sourceCode?',
        name: 'Landing',      
        component: landing,
        meta : {
            title : '快银-您的随身信用钱包'
        }
    },
    {
        path: '/landing2/:sourceCode?',
        name: 'Landing',      
        component: landing,
        meta : {
            title : '快银-您的随身信用钱包'
        }
    },
    {
        path: '/newReg/:sourceCode?',
        name: 'newReg',
        component: newReg,
        meta: {
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/regSuc',
        name: 'regSuc',
        component: regSuc,
        meta: {
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/newRegA/:sourceCode?',
        name: 'newRegA',
        component: newReg1,
        meta: {
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/newRegB/:sourceCode?',
        name: 'newRegB',
        component: newReg2,
        meta: {
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/newRegC/:sourceCode?',
        name: 'newRegC',
        component: newReg3,
        meta: {
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/newRegD/:sourceCode?',
        name: 'newRegD',
        component: newReg4,
        meta: {
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/newRegB2/:sourceCode?',
        name: 'newRegB',
        component: newReg2,
        meta: {
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/detailPagea/:pfNo',
        name: 'DetailPagea',
        component: detailPagea,
        meta: {
            title: '产品详情'
        }
    },
    {
        path: '/newRegSuca',
        name: 'NewRegSuca',
        component: newRegSuca,
        meta :{
            title: '快银-您的随身信用钱包'
        }
    },
    {
        path: '/newRegSucb',
        name: 'NewRegSucb',
        component: newRegSucb,
        meta :{
            title: '快银-您的随身信用钱包'
        }
    }
];
