import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// v1.0.0
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const wxk = r => require.ensure([], () => r(require('@/page/work/wxk')), 'wxk');
const wxkManager = r => require.ensure([], () => r(require('@/page/settingManager/wxkManager')), 'wxkManager');
const wxkManager_Add = r => require.ensure([], () => r(require('@/page/settingManager/wxkManager/add')), 'wxkManager_Add');
const wxDetail = r => require.ensure([], () => r(require('@/page/wxDetail')), 'wxDetail');
const trackDetail = r => require.ensure([], () => r(require('@/page/wxDetail/trackDetail')), 'trackDetail');
const consultWith = r => require.ensure([], () => r(require('@/page/wxDetail/consultWith'), 'consultWith'));

// v1.0.1
const myInto = r => require.ensure([], () => r(require('@/page/work/myInto/')), 'myInto'); //我的投放
const myIntoDetail = r => require.ensure([], () => r(require('@/page/work/myInto/detail')), 'detail'); //投放详情
const favorite = r => require.ensure([], () => r(require('@/page/work/favorite/')), 'favorite'); //收藏夹
const msgManager = r => require.ensure([], () => r(require('@/page/settingManager/msgManager/index.vue')), 'msgManager'); //用户管理
const secret = r => require.ensure([], () => r(require('@/page/settingManager/secret/index.vue')), 'secret'); //账号管理
const login = r => require.ensure([], () => r(require('@/page/login/')), 'login'); //登录


// v1.0.2
const roleManager = r => require.ensure([], () => r(require('@/page/settingManager/roleManager/index.vue')), 'roleManager'); //角色管理
const assignPermissions = r => require.ensure([], () => r(require('@/page/settingManager/roleManager/permissions/index.vue')), 'assignPermissions'); //权限分配


// v1.0.3
const supplierManager = r => require.ensure([], () => r(require('@/page/settingManager/supplierManager/index.vue')), 'supplierManager'); //供应商管理列表页
const supplierEdit = r => require.ensure([], () => r(require('@/page/settingManager/supplierManager/edit.vue')), 'supplierEdit'); //供应商管编辑页
const contact = r => require.ensure([], () => r(require('@/page/myTask/contact/index.vue')), 'contact'); //接洽任务
const taskData = r => require.ensure([], () => r(require('@/page/statistics/taskData/index.vue')), 'taskData'); //任务数据
const supplier = r => require.ensure([], () => r(require('@/page/work/supplier/index.vue')), 'supplier'); //供应商
const supplierDetail = r => require.ensure([], () => r(require('@/page/work/supplier/detail.vue')), 'supplierDetail'); //供应商详情页
const supplierAdd_list = r => require.ensure([], () => r(require('@/page/settingManager/supplierManager/list_add.vue')), 'supplierAdd_list');
const import_list = r => require.ensure([], () => r(require('@/page/settingManager/supplierManager/import_list.vue')), 'import_list'); //供应商详情页
const supplierAdd = r => require.ensure([], () => r(require('@/page/settingManager/supplierManager/add.vue')), 'supplierAdd'); //供应商新增页

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/manage'
        },
		{
			path: '*',
			redirect: '/'
		},
        {
            path: '/login',
            name: '登录',
            component: login
        },
        {
            path: '/manage',
            component: manage,
            children: [{
                path: '/wxk',
                component: wxk,
                name: '微信库',
                meta: { nav: ['工作台', '微信库'] },
            }, {
                path: '/myInto',
                component: myInto,
                name: '我的投放',
                meta: { nav: ['工作台', '我的投放'] },
            }, {
                path: '/myIntoDetail',
                component: myIntoDetail,
                name: '投放详情',
                meta: { nav: ['工作台', '投放详情'] },
            }, {
                path: '/favorite',
                component: favorite,
                name: '收藏夹',
                meta: { nav: ['工作台', '收藏夹'] },
            }, {
                path: '/supplier',
                component: supplier,
                name: '供应商',
                meta: { nav: ['工作台', '供应商'] },
            }, {
                path: '/supplierDetail',
                component: supplierDetail,
                name: '供应商详情'
            }, {
                path: '/wxkManager',
                component: wxkManager,
                name: '微信库管理',
                meta: { nav: ['设备管理', '微信库管理'] },
            }, {
                path: '/wxkManager_add',
                component: wxkManager_Add,
                name: '新增',
                meta: { nav: ['设备管理', '微信库管理'] }
            }, {
                path: '/msgManager',
                component: msgManager,
                name: '用户管理',
                meta: { nav: ['设置管理', '用户管理'] },
            }, {
                path: '/roleManager',
                component: roleManager,
                name: '角色管理',
            }, , {
                path: '/assignPermissions',
                component: assignPermissions,
                name: '权限分配',
            }, {
                path: '/secret',
                component: secret,
                name: '账号管理',
                meta: { nav: ['设置管理', '账号管理'] },
            }, {
                path: '/supplierManager',
                component: supplierManager,
                name: '供应商管理',
                meta: { nav: ['设置管理', '供应商管理'] },
            }, {
                path: '/supplierEdit',
                component: supplierEdit,
                name: '供应商编辑'
            }, {
                path: '/supplierAdd',
                component: supplierAdd,
                name: '供应商新增'
            }, {
                path: '/supplierAdd_list',
                component: supplierAdd_list,
                name: '资源列表添加'
            }, {
                path: '/import_list',
                component: import_list,
                name: '资源新增'
            }, {
                path: '/trackDetail',
                component: trackDetail
            }, {
                path: '/wxDetail',
                component: wxDetail,
                name: '公众号详情',
                meta: { nav: ['公众号详情', '公众号详情页'] },
            }, {
                path: '/consultWith',
                component: consultWith,
                name: '历史',
                meta: { nav: ['公众号详情', '历史'] },
            }, {
                path: '/contact',
                component: contact,
                name: '接洽任务',
                meta: { nav: ['我的任务', '接洽任务'] },
            }, {
                path: '/taskData',
                component: taskData,
                name: '任务数据',
                meta: { nav: ['数据统计', '任务数据'] },
            }]
        }
    ]
})
