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
  },/*{
    name: 'APP版本管理',
    path: '/AppVersion',
    component:resolve => require(['../pages/system/AppVersion.vue'], resolve)
  },*/{
    name: '权限列表',
    path: '/Permission',
    component:resolve => require(['../pages/system/Permission.vue'], resolve)
  },{
    name: '角色管理',
    path: '/Role',
    component:resolve => require(['../pages/system/Role.vue'], resolve)
  },{
    name:'用户管理',
    path:'Manager',
    component:resolve => require(['../pages/system/Manager.vue'], resolve)
  },{
    name:'敏感数据修改',
    path:'SensitiveDataEdit',
    component:resolve => require(['../pages/system/SensitiveDataEdit.vue'], resolve)
  },{
    name:'字典列表',
    path:'/DictionaryManage',
    component:resolve => require(['../pages/system/DictionaryManage.vue'],resolve),
  },{
    name: '自动审核配置',
    path: '/AuditConf',
    component:resolve => require(['../pages/review/auditConf.vue'], resolve),
  },{
    name:'客户管理',
    path:'/UserList',
    component:resolve => require(['../pages/operate/UserList.vue'],resolve),
  },{
    name: '客户详情',
    path: '/UserDetail',
    component:resolve => require(['../pages/operate/UserDetail.vue'], resolve),
  },{
    name:'用户反馈列表',
    path:'/UserFeedBack',
    component:resolve => require(['../pages/operate/UserFeedBack.vue'], resolve),
  },{
    name: '贷款数据统计',
    path: '/DataInsight',
    component:resolve => require(['../pages/data/DataInsight.vue'], resolve),
  },{
    name: '放款数据详情',
    path: '/DetailLoanData',
    component:resolve => require(['../pages/data/DetailLoanData.vue'], resolve),
  },{
    name:'每日订单数据',
    path:'/OrderInsight',
    component:resolve => require(['../pages/data/OrderInsight.vue'], resolve),
  },{
    name:'订单管理',
    path:'/OrderListAll',
    component:resolve => require(['../pages/order/OrderListAll.vue'], resolve),
  },{
    name:'订单详情',
    path:'/OrderDetail',
    component:resolve => require(['../pages/order/OrderDetail.vue'], resolve),
  },{
    name:'秒扣失败订单',
    path:'/SecondBuckleOrder',
    component:resolve => require(['../pages/order/SecondBuckleOrder.vue'], resolve),
  },{
    name:'秒扣失败订单详情',
    path:'/SecondBuckleOrderDetail',
    component:resolve => require(['../pages/order/SecondBuckleOrderDetail.vue'], resolve),
  },{
    name:'催收订单详情',
    path:'/OrderInfoControl',
    component:resolve => require(['../pages/order/OrderInfoControl.vue'], resolve),
  },{
    name:'每日用户数据',
    path:'/UserInsight',
    component:resolve => require(['../pages/data/UserInsight.vue'], resolve),
  },{
    name:'逾期订单',
    path:'/OverDueOrderList',
    component:resolve => require(['../pages/order/OverDueOrderList.vue'],resolve),
  },{
    name:'逾期订单(5-30)',
    path:'/OverDueEightThirty',
    component:resolve => require(['../pages/order/OverDueEightThirty.vue'],resolve),
  },{
    name:'已还款订单',
    path:'/RepaymentOrderList',
    component:resolve => require(['../pages/order/RepaymentOrderList.vue'],resolve),
  },{
    name:'D0应还款订单',
    path:'/WillOverDueOrderList',
    component:resolve => require(['../pages/order/WillOverDueOrderList.vue'],resolve),
  },{
    name:'逾期已还款订单',
    path:'/OverDueOrderFind',
    component:resolve => require(['../pages/order/OverDueOrderFind.vue'],resolve),
  },{
    name:'订单列表(普)',
    path:'/OrderListNormal',
    component:resolve => require(['../pages/collection/OrderListNormal.vue'],resolve),
  },{
    name:'逾期订单(催收)',
    path:'/OverDueOrderListCollection',
    component:resolve => require(['../pages/collection/OverDueOrderListCollection.vue'],resolve),
  },{
    name:'业绩汇总统计',
    path:'/performanceCount',
    component:resolve =>require(['../pages/collection/performanceCount.vue'],resolve)
  },{
    name:'已还款订单(催收)',
    path:'/RepaymentOrderListCollection',
    component:resolve => require(['../pages/collection/RepaymentOrderListCollection.vue'],resolve),
  },{
    name:'D0应还订单(催收)',
    path:'/WillOverDueOrderListCollection',
    component:resolve => require(['../pages/collection/WillOverDueOrderListCollection.vue'],resolve),
  },{
    name:'委外订单分配',
    path:'/OrderDistributeThirdCompany',
    component:resolve => require(['../pages/collection/OrderDistributeThirdCompany.vue'],resolve),
  },/*{
    name:'自动分单配置',
    path:'/PersonProportionConf',
    component:resolve => require(['../pages/collection/PersonProportionConf.vue'],resolve),
  },*/{
    name:'D0委外订单分配',
    path:'/TodayShouldPayment',
    component:resolve => require(['../pages/collection/TodayShouldPayment.vue'],resolve),
  },{
    name:'内催人员管理',
    path:'/OurPersonManage',
    component:resolve => require(['../pages/collection/OurPersonManage.vue'],resolve),
  },{
    name:'逾期委外订单分配',
    path:'/OrderDistributeOverDate',
    component:resolve => require(['../pages/collection/OrderDistributeOverDate.vue'],resolve),
  },{
    name:'Do完成业绩统计',
    path:'/D0AchievementsCount',
    component:resolve => require(['../pages/collection/D0AchievementsCount.vue'],resolve),
  }/*,{
    name:'现金券规则管理',
    path:'/CashCouponRule',
    component:resolve => require(['../pages/cashticket/CashCouponRule.vue'],resolve),
  },{
    name:'现金券使用统计',
    path:'/CashCoupon',
    component:resolve => require(['../pages/cashticket/CashCoupon.vue'],resolve),
  }*/,{
    name:'验证码管理',
    path:'/getUserLastSmsCode',
    component:resolve => require(['../pages/operate/getUserLastSmsCode.vue'],resolve),
  }/*,{
    name:'邀请好友管理',
    path:'/InvitePersonManage',
    component:resolve => require(['../pages/operate/InvitePersonManage.vue'],resolve),
  }*/,{
    name:'查询银行卡列表',
    path:'/GetUserBankList',
    component:resolve => require(['../pages/operate/GetUserBankList.vue'],resolve),
  },{
    name:'查询催收人员',
    path:'/GetCollectionPersonList',
    component:resolve => require(['../pages/operate/GetCollectionPersonList.vue'],resolve),
  },{
    name:'更改用户姓名',
    path:'/EditUserName',
    component:resolve => require(['../pages/operate/EditUserName.vue'],resolve),
  },{
    name:'资金方已放款订单',
    path:'/TheMoneySideLendOrder',
    component:resolve => require(['../pages/data/TheMoneySideLendOrder.vue'],resolve),
  },{
    name:'第三方支付对账',
    path:'/TheThirdSidePayCheck',
    component:resolve => require(['../pages/finance/TheThirdSidePayCheck.vue'],resolve),
  },/*{
    name:'测试订单列表',
    path:'/TestOrderList',
    component:resolve => require(['../pages/collection/TestOrderList.vue'],resolve),
  },*/{
    name:'委外业绩汇总统计',
    path:'/TheThirdCompanyAchieveCount',
    component:resolve => require(['../pages/data/TheThirdCompanyAchieveCount.vue'],resolve),
  },{
    name:'委外业绩明细统计',
    path:'/TheThirdCompanyAchieveDetailCount',
    component:resolve => require(['../pages/data/TheThirdCompanyAchieveDetailCount.vue'],resolve),
  },{
    name:'线下还款用户订单',
    path:'/OfflineOrderRepay',
    component:resolve => require(['../pages/order/OfflineOrderRepay.vue'],resolve),
  },{
    name:'线下还款详情',
    path:'/OfflineOrderRepayDetail',
    component:resolve => require(['../pages/order/OfflineOrderRepayDetail.vue'],resolve),
  },{
    name:'sql执行页面',
    path:'/SqlSearchTable',
    component:resolve => require(['../pages/system/SqlSearchTable.vue'],resolve),
  },{
    name:'redis开关控制',
    path:'/SysSwitchControl',
    component:resolve => require(['../pages/system/SysSwitchControl.vue'],resolve),
  },{
    name:'交易流水',
    path:'/payRecordList',
    component:resolve => require(['../pages/data/payRecordList.vue'],resolve),
  },{
    name:'手动结清订单',
    path:'/ManualSetOrder',
    component:resolve => require(['../pages/order/ManualSetOrder.vue'],resolve),
  },
  /*{
    name:'现金白卡审核配置',
    path:'/XjbkAuditConf',
    component:resolve => require(['../pages/review/XjbkAuditConf.vue'],resolve),
  }*/,{
    name:'催收掩码管理',
    path:'/Day0InfoControl',
    component:resolve => require(['../pages/collection/Day0InfoControl.vue'],resolve),
  }]
  },{
  path:'/404',
  component:resolve => require(['../pages/404.vue'], resolve)
},{
  path:'*',
  redirect:{path:'/404'}
}];

export default routes
