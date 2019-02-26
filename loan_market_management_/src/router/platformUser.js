/**
 * create : 田鹏伟 2018-11-21
 * 用户信息
 */
//用户信息概况
import infoProfile from '@/pages/platformUser/infoProfile';
//用户列表
import list from '@/pages/platformUser/list';


let title = '用户信息';

export default [
    {
        path : '/platformUser/infoProfile',
        component : infoProfile,
        name : 'PlatformUserInfoProfile',
        meta : {
            title : '用户信息概况',
            paths : ['PlatformUserInfoProfile-用户信息','nopath-用户信息概况'],
            currentMenu : '2-1'
        }
    },
    {
        path : '/platformUser/list',
        component : list,
        name : 'PlatformUserList',
        meta : {
            title : '用户列表',
            paths : ['PlatformUserInfoProfile-用户信息','nopath-用户列表'],
            currentMenu : '2-2'
        }
    }
];