/**
 * create : 田鹏伟 2018-10-23
 * desc : 个人中心
 */
import my from '../pages/my/index';
import set from '../pages/my/set';
import set2 from '../pages/my/set2';
import perfectInfo from '../pages/my/perfect_info';
import about from '../pages/my/about';
import feedback from '../pages/my/feedback';
import agreement from '../pages/my/agreement';
import footprint from '../pages/my/footprint';
import message from '../pages/my/message';
import msgDetail from '../pages/my/msgDetail';
import customerCenter from '../pages/my/customerCenter';
import service from '../pages/my/service';
//认证信息
import authInfor from '../pages/my/authInfor';
import calendar from '../pages/my/calendar';
//关注公众号
import pubno from '../pages/my/pubno';
export default [
    {
        path: '/my/:sourceCode?',
        name: 'My',      
        component: my,
        meta : {
            title : '我的'
        }
    },
    {
        path: '/setAccount/:sourceCode?',
        name: 'Set',      
        component: set,
        meta : {
            title : '账户设置'
        }
    },
    {
        path: '/setAccount2/:sourceCode?',
        name: 'Set2',      
        component: set2,
        meta : {
            title : '账户设置'
        }
    },
    {
        path: '/perfectInfo',
        name: 'PerfectInfo',      
        component: perfectInfo,
        meta : {
            title : '完善信息'
        }
    },
    {
        path: '/feedback',
        name: 'Feedback',      
        component: feedback,
        meta : {
            title : '意见反馈'
        }
    },
    {
        path: '/about',
        name: 'About',      
        component: about,
        meta : {
            title : '关于我们'
        }
    },
    {
        path: '/agreement',
        name: 'Agreement',      
        component: agreement,
        meta : {
            title : '服务协议'
        }
    },
    {
        path: '/footprint',
        name: 'Footprint',      
        component: footprint,
        meta : {
            title : '浏览足迹'
        }
    },
    {
        path: '/message',
        name: 'Message',      
        component: message,
        meta : {
            title : '我的消息'
        }
    },
    {
        path: '/msgDetail',
        name: 'MsgDetail',      
        component: msgDetail,
        meta : {
            title : '消息详情'
        }
    },
    {
        path: '/customerCenter',
        name: 'CustomerCenter',      
        component: customerCenter,
        meta : {
            title : '客户中心'
        }
    },
    {
        path: '/service',
        name: 'Service',      
        component: service,
        meta : {
            title : '在线客服'
        }
    },
    {
        path: '/authInfor',
        name: 'AuthInfor',      
        component: authInfor,
        meta : {
            title : '认证信息'
        }
    },
    {
        path: '/calendar',
        name: 'Calendar',      
        component: calendar,
        meta : {
            title : '回款日历'
        }
    },
    {   
        path: '/pubno',
        name: 'Pubno',
        component: pubno,
        meta: {
            title : '关注公众号'
        }
    }
];