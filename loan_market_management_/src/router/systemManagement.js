/**
 * create : 田鹏伟 2018-11-20
 * 系统管理路由
 */
//用户管理
import users from '@/pages/systemManagement/users';
//角色管理
import roles from '@/pages/systemManagement/roles';
//菜单管理
import menus from '@/pages/systemManagement/menus';
//部门管理
import departments from '@/pages/systemManagement/departments';

export default [
    {
        path : '/systemManagement/users',
        component : users,
        name : 'SystemManagementUsers',
        // redirect : '/systemManagement/users',
        meta : {
            title : '用户管理',
            paths : ['SystemManagementUsers-系统管理','nopath-用户管理'],
            currentMenu : '1-1'
        }
    },
    {
        path : '/systemManagement/roles',
        component : roles,
        name : 'SystemManagementRoles',
        meta : {
            title : '角色管理',
            paths : ['SystemManagementUsers-系统管理','nopath-角色管理'],
            currentMenu : '1-2'
        }
    },
    {
        path : '/systemManagement/menus',
        component : menus,
        name : 'SystemManagementMenus',
        meta : {
            title : '菜单管理',
            paths : ['SystemManagementUsers-系统管理','nopath-菜单管理'],
            currentMenu : '1-3'
        }
    },
    {
        path : '/systemManagement/departments',
        component : departments,
        name : 'SystemManagementDepartments',
        meta : {
            title : '部门管理',
            paths : ['SystemManagementUsers-系统管理','nopath-部门管理'],
            currentMenu : '1-4'            
        }
    }
];