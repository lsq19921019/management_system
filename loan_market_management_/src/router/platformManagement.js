/**
 * create : 田鹏伟 2018-11-21
 * 平台管理路由
 */
//平台列表
import list from '@/pages/platformManagement/list';
//平台专区
import area from '@/pages/platformManagement/area';
//平台配置
import configuration from '@/pages/platformManagement/configuration';
//轮播广告
import broadcastAd from '@/pages/platformManagement/broadcastAd';
//平台Banner
import banner from '@/pages/platformManagement/banner';
//平台管理
import manage from '@/pages/platformManagement/manage';


export default [
    {
        path : '/platformManagement/list',
        component : list,
        name : 'PlatformManagementList',
        meta : {
            title : '平台列表',
            paths : ['PlatformManagementList-平台信息管理','nopath-平台列表'],
            currentMenu : '1-1'
        }
    },
    {
        path : '/platformManagement/area',
        component : area,
        name : 'PlatformManagementArea',
        meta : {
            title : '平台专区',
            paths : ['PlatformManagementList-平台管理','nopath-平台专区'],
            currentMenu : '1-2'
        }
    },
    {
        path : '/platformManagement/configuration',
        component : configuration,
        name : 'PlatformManagementConfiguration',
        meta : {
            title : '平台配置',
            paths : ['PlatformManagementList-平台管理','nopath-平台配置'],
            currentMenu : '1-3'
        }
    },
    {
        path : '/platformManagement/broadcastAd',
        component : broadcastAd,
        name : 'PlatformManagementBroadcastAd',
        meta : {
            title : '轮播广告',
            paths : ['PlatformManagementList-平台管理','nopath-轮播广告'],
            currentMenu : '1-4'
        }
    },
    {
        path : '/platformManagement/banner',
        component : banner,
        name : 'PlatformManagementBanner',
        meta : {
            title : 'Banner',
            paths : ['PlatformManagementList-平台管理','nopath-Banner'],
            currentMenu : '1-5'
        }
    },
    {
        path : '/platformManagement/manage',
        component : manage,
        name : 'PlatformManagementManage',
        meta : {
            title : '平台管理',
            paths : ['PlatformManagementList-平台管理','nopath-平台管理'],
            currentMenu : '1-6'
        }
    },
    {
        path : '*',
        component : list,
        name : 'PlatformManagementList',
        meta : {
            title : '平台列表',
            paths : ['PlatformManagementList-平台信息管理','nopath-平台列表'],
            currentMenu : '1-1'
        }
    },
];