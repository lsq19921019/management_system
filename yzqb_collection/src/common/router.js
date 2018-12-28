/**
 * Created by alan on 17-4-30.
 */
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'

const routes = [{
  path:'/login',
  component:Login
},{
  name:'管理后台',
  path:'/',
  redirect:'/home',
  component:Main,
  children:[{
    name:'首页',
    path:'/home',
    component:resolve => require(['../pages/Home.vue'], resolve),
  },{
    name:'逾期订单(催收公司)',
    path:'/OverDueEightThirty',
    component:resolve => require(['../pages/order/OverDueEightThirty.vue'],resolve),
  },{
    name:'催收订单详情',
    path:'/OrderInfoControl',
    component:resolve => require(['../pages/order/OrderInfoControl.vue'], resolve),
  },{
    name:'手机号查询',
    path:'/SearchOrderByMobile',
    component:resolve => require(['../pages/order/SearchOrderByMobile.vue'],resolve),
  },{
    name:'催收公司订单分配',
    path:'/ThirdCompanyDistributeOrder',
    component:resolve => require(['../pages/order/ThirdCompanyDistributeOrder.vue'],resolve),
  },{
    name:'已还款订单',
    path:'/ThirdCompanyRepaymentOrder',
    component:resolve => require(['../pages/order/ThirdCompanyRepaymentOrder.vue'],resolve),
  },{
    name:'day0委外订单',
    path:'/Day0OrderListOut',
    component:resolve => require(['../pages/order/Day0OrderListOut.vue'],resolve),
  },{
	name:'D0委外分单',
	path:'/Day0DistributeOrder',
	component:resolve => require(['../pages/order/Day0DistributeOrder.vue'],resolve),
	},{
    name:'业绩汇总统计',
    path:'/performanceCount',
    component:resolve =>require(['../pages/order/performanceCount.vue'],resolve)
  }
/*,{
    name:'微贷已放款订单',
    path:'/WeidaiPayMoney',
    component:resolve => require(['../pages/order/WeidaiPayMoney.vue'],resolve),
  },{
    name:'敏感数据修改',
    path:'SensitiveDataEdit',
    component:resolve => require(['../pages/system/SensitiveDataEdit.vue'], resolve)
  },{
    name:'现金券规则管理',
    path:'CashCouponRule',
    component:resolve => require(['../pages/cashticket/CashCouponRule.vue'], resolve)
  },{
    name:'',
    path:'OrderSearch',
    component:resolve => require(['../pages/order/OrderSearch.vue'], resolve)
  }*/]
},{
  path:'/404',
  component:resolve => require(['../pages/404.vue'], resolve)
},{
  path:'*',
  redirect:{path:'/404'}
}];

export default routes


