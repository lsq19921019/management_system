/**
 * create : 田鹏伟 2018-11-21
 * 运营管理路由
 */
//平台点击数据信息
import pv from '@/pages/operationManagement/pv';
//联登平台推荐数据
import unionPlatform from '@/pages/operationManagement/unionPlatform';
//banner管理
import banner from '@/pages/operationManagement/banner';
//专区管理
import zone from '@/pages/operationManagement/zone';
//banner统计
import bannerStatistics from '@/pages/operationManagement/bannerStatistics';
//条款管理
import clauses from '@/pages/operationManagement/clauses';
//轮播公告
import broadcastNotice from '@/pages/operationManagement/broadcastNotice';
//意见反馈
import feedback from '@/pages/operationManagement/feedback';
//清除缓存
import clearCache from '@/pages/operationManagement/clearCache';
//清除白名单账号
import clearWhiteList from '@/pages/operationManagement/clearWhiteList';
//平台公告
import notices from '@/pages/operationManagement/notices';
//对接平台统计
import dockingPlatform from '@/pages/operationManagement/dockingPlatform';
//订单状态
import orderStatus from '@/pages/operationManagement/orderStatus';
//联登平台推荐数据
import ulCalculate from '@/pages/operationManagement/ulCalculate';
//推广渠道管理
import promotionChannel from '@/pages/operationManagement/promotionChannel';

// //浏览足迹
// import footprints from '@/pages/operationManagement/footprints';
// //网站信息列表
// import inforList from '@/pages/operationManagement/inforList';


let title = '运营管理';

export default [
    {
        path : '/operationManagement/pv',
        component : pv,
        name : 'OperationMangementPv',
        meta : {
            title : '平台点击数据',
            paths : ['OperationMangementPv-运营管理','nopath-平台点击数据信息'],
            currentMenu : '3-1'
        }
    },
    {
        path : '/operationManagement/unionPlatform',
        component : unionPlatform,
        name : 'OperationMangementUnionPlatform',
        meta : {
            title : '联登平台推荐数据',
            paths : ['OperationMangementPv-运营管理','nopath-联登平台推荐数据'],
            currentMenu : '3-2'
        }
    },
    {
        path : '/operationManagement/banner',
        component : banner,
        name : 'OperationMangementBanner',
        meta : {
            title : 'banner管理',
            paths : ['OperationMangementPv-运营管理','nopath-banner管理'],
            currentMenu : '3-3'
        }
    },
    {
        path : '/operationManagement/zone',
        component : zone,
        name : 'OperationMangementZone',
        meta : {
            title : '专区管理',
            paths : ['OperationMangementPv-运营管理','nopath-专区管理'],
            currentMenu : '3-4'
        }
    },
    {
        path : '/operationManagement/bannerStatistics',
        component : bannerStatistics,
        name : 'OperationMangementBannerStatistics',
        meta : {
            title : 'banner统计',
            paths : ['OperationMangementPv-运营管理','nopath-banner统计'],
            currentMenu : '3-5'
        }
    },
    {
        path : '/operationManagement/clauses',
        component : clauses,
        name : 'OperationMangementClauses',
        meta : {
            title : '条款管理',
            paths : ['OperationMangementPv-运营管理','nopath-条款管理'],
            currentMenu : '3-6'
        }
    },
    {
        path : '/operationManagement/notices',
        component : notices,
        name : 'OperationMangementNotices',
        meta : {
            title : '平台公告',
            paths : ['OperationMangementPv-运营管理','nopath-平台公告'],
            currentMenu : '3-7'
        }
    },
    {
        path : '/operationManagement/broadcastNotice',
        component : broadcastNotice,
        name : 'OperationMangementBroadcastNotice',
        meta : {
            title : '轮播公告',
            paths : ['OperationMangementPv-运营管理','nopath-轮播公告'],
            currentMenu : '3-8'
        }
    },
    {
        path : '/operationManagement/feedback',
        component : feedback,
        name : 'OperationMangementFeedback',
        meta : {
            title : '意见反馈',
            paths : ['OperationMangementPv-运营管理','nopath-意见反馈'],
            currentMenu : '3-9'
        }
    },
    {
        path : '/operationManagement/clearCache',
        component : clearCache,
        name : 'OperationMangementClearCache',
        meta : {
            title : '清除缓存',
            paths : ['OperationMangementPv-运营管理','nopath-清除缓存'],
            currentMenu : '3-10'
        }
    },
    {
        path : '/operationManagement/clearWhiteList',
        component : clearWhiteList,
        name : 'OperationMangementClearWhiteList',
        meta : {
            title : '清除白名单账号',
            paths : ['OperationMangementPv-运营管理','nopath-清除白名单账号'],
            currentMenu : '3-11'
        }
    },
    {
        path : '/operationManagement/dockingPlatform',
        component : dockingPlatform,
        name : 'OperationMangementDockingPlatform',
        meta : {
            title : '对接平台统计',
            paths : ['OperationMangementPv-运营管理','nopath-对接平台统计'],
            currentMenu : '3-12'
        }
    },
    {
        path : '/operationManagement/orderStatus',
        component : orderStatus,
        name : 'OperationMangementOrderStatus',
        meta : {
            title : '订单状态',
            paths : ['OperationMangementPv-运营管理','nopath-订单状态'],
            currentMenu : '3-13'
        }
    },
    {  
        path : '/systemManagement/ulCalculate',  
        component : ulCalculate,
        name : 'OperationMangementUlCalculate',
        meta : {
            title : '运营管理-联登平台推荐数据',
            paths : ['OperationMangementPv-运营管理','nopath-联登平台推荐数据'],
            currentMenu : '3-14'
        }
    },
    {  
        path : '/systemManagement/promotionChannel',  
        component : promotionChannel,
        name : 'OperationPromotionChannel',
        meta : {
            title : '运营管理-推广渠道管理',
            paths : ['OperationMangementPv-运营管理','nopath-推广渠道管理'],
            currentMenu : '3-15'
        }
    },
    //promotionChannel
    // {
    //     path : '/systemManagement/notices',
    //     component : notices,
    //     name : 'OperationMangementNotices',
    //     meta : {
    //         title : '平台公告',
    //         paths : ['OperationMangementNotices-运营管理','nopath-平台公告'],
    //         currentMenu : '3-7'
    //     }
    // },
    // {
    //     path : '/systemManagement/footprints',
    //     component : footprints,
    //     name : 'OperationMangementFootprints',
    //     meta : {
    //         title : '浏览足迹',
    //         paths : ['OperationMangementChannelStatistics-运营管理','nopath-浏览足迹'],
    //         currentMenu : '3-5'
    //     }
    // },
    // {
    //     path : '/systemManagement/inforList',
    //     component : inforList,
    //     name : 'OperationMangementInforList',
    //     meta : {
    //         title : '网站信息列表',
    //         paths : ['OperationMangementChannelStatistics-运营管理','nopath-网站信息列表'],
    //         currentMenu : '3-6'            
    //     }
    // }
];