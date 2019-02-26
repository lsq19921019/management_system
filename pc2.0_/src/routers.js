const entries = {
  jquery: "jquery",
  //base : './src/assets/js/pub/base',
  index: "./src/assets/js/index",
  index_login: "./src/assets/js/index_login",
  about_xg_company: "./src/assets/js/about_xg_company", //关于我们-公司简介
  about_xg_basicInfo: "./src/assets/js/about_xg_basicInfo", //关于我们-组织信息
  about_xg_team: "./src/assets/js/about_xg_team", //关于我们-管理团队
  about_xg_major: "./src/assets/js/about_xg_major", //对外公告-重大事项
  about_xg_toll: "./src/assets/js/about_xg_toll", //关于我们-收费标准
  about_xg_contact: "./src/assets/js/about_xg_contact", //关于我们-联系我们
  record_info: "./src/assets/js/record_info", //对外公告-备案信息
  bank_dep: "./src/assets/js/bank_dep", //安全保障-银行存管
  security: "./src/assets/js/security", //安全保障-安全保障
  risk_management: "./src/assets/js/risk_management", //安全保障-风险管理
  supervision: "./src/assets/js/supervision", //出借人教育-监管机构
  laws_page: "./src/assets/js/laws_page", //出借人教育-法律法规
  risk: "./src/assets/js/risk", //出借人教育-风险提示
  noticePop_list: "./src/assets/js/noticePop_list", //对外公告-平台公告
  noticePopDetail: "./src/assets/js/noticePopDetail",
  iper: "./src/assets/js/iper", //对外公告-审查报告
  myAccount: "./src/assets/js/myAccount", //我的账户
  classroom: "./src/assets/js/classroom", //对外公告-小鸽课堂
  commitment_letter: "./src/assets/js/commitment_letter", //承诺函
  platform_data: "./src/assets/js/platform_data", //平台数据
  index_register: "./src/assets/js/index_register", //注册
  news: "./src/assets/js/news", //新闻动态,
  newDetail: "./src/assets/js/newDetail", //新闻详情
  june_promotion: "./src/assets/js/june_promotion", //新注册页面
  c: "./src/assets/js/c", //扫一扫页面
  index_displayPage: "./src/assets/js/index_displayPage", //app展示页
  myAccount_payPage: "./src/assets/js/myAccount_payPage", //支付页面
  myAccount_onlineBank: "./src/assets/js/myAccount_onlineBank", //我的账户_网银
  recharge: "./src/assets/js/recharge", //充值跳转
  newPeopleGuide: "./src/assets/js/newPeopleGuide", //新人引导
  platformProtocol_register: "./src/assets/js/platformProtocol_register", //注册服务协议
  privacy_policy: "./src/assets/js/privacy_policy", //隐私条款
  platformProtocol_list: "./src/assets/js/platformProtocol_list", //小鸽理财相关协议列表
  platformProtocol_loan: "./src/assets/js/platformProtocol_loan", //小鸽理财借款协议
  platformProtocol_investment: "./src/assets/js/platformProtocol_investment", //小鸽理财G自动服务服务协议
  platformProtocol_transfer: "./src/assets/js/platformProtocol_transfer", //小鸽理财债权转让协议
  activity: "./src/assets/js/activity", //三周年活动
  rechargejump: "./src/assets/js/rechargejump", //充值结果调转页
  university_lottery: "./src/assets/js/university_lottery" //大学抽奖
};
const pages = [
  {
    //首页
    path: "./src/pages/index.html"
  },
  {
    //去登陆
    path: "./src/pages/index_login.html"
  },
  {
    //关于我们-公司简介
    path: "./src/pages/about_xg_company.html"
  },
  {
    //我的账户
    path: "./src/pages/myAccount.html"
  },
  {
    //关于我们-组织信息
    path: "./src/pages/about_xg_basicInfo.html"
  },
  {
    //关于我们-管理团队
    path: "./src/pages/about_xg_team.html"
  },
  {
    //对外公告-重大事项
    path: "./src/pages/about_xg_major.html"
  },
  {
    //关于我们-收费标准
    path: "./src/pages/about_xg_toll.html"
  },
  {
    //关于我们-联系我们
    path: "./src/pages/about_xg_contact.html"
  },
  {
    //对外公告-备案信息
    path: "./src/pages/record_info.html"
  },
  {
    //安全保障-银行存管
    path: "./src/pages/bank_dep.html"
  },
  {
    //安全保障-安全保障
    path: "./src/pages/security.html"
  },
  {
    //出借人教育-监管机构
    path: "./src/pages/supervision.html"
  },
  {
    //出借人教育-法律法规
    path: "./src/pages/laws_page.html"
  },
  {
    //出借人教育-风险提示
    path: "./src/pages/risk.html"
  },
  {
    //对外公告-平台公告
    path: "./src/pages/noticePop_list.html"
  },
  {
    //对外公告-公告详情
    path: "./src/pages/noticePopDetail.html"
  },
  {
    //对外公告-审查报告
    path: "./src/pages/iper.html"
  },
  {
    //安全保障-风险管理
    path: "./src/pages/risk_management.html"
  },
  {
    //新闻报道-小鸽课堂
    path: "./src/pages/classroom.html"
  },
  {
    //新闻报道-新闻动态
    path: "./src/pages/news.html"
  },
  {
    //新闻报道-新闻详情
    path: "./src/pages/newDetail.html"
  },
  {
    //承诺函
    path: "./src/pages/commitment_letter.html"
  },
  {
    //平台数据
    path: "./src/pages/platform_data.html"
  },
  {
    //注册
    path: "./src/pages/index_register.html"
  },
  {
    //新注册页面
    path: "./src/pages/june_promotion.html"
  },
  {
    //扫一扫页面
    path: "./src/pages/c.html"
  },
  {
    //app展示页
    path: "./src/pages/index_displayPage.html"
  },
  {
    //支付页面
    path: "./src/pages/myAccount_payPage.html"
  },
  {
    //我的账户_网银
    path: "./src/pages/myAccount_onlineBank.html"
  },
  {
    //充值跳转
    path: "./src/pages/recharge.html"
  },
  {
    //新人引导
    path: "./src/pages/newPeopleGuide.html"
  },
  {
    //注册服务协议
    path: "./src/pages/platformProtocol_register.html"
  },
  {
    //隐私条款
    path: "./src/pages/privacy_policy.html"
  },
  {
    //小鸽理财相关协议列表
    path: "./src/pages/platformProtocol_list.html"
  },
  {
    //小鸽理财借款协议
    path: "./src/pages/platformProtocol_loan.html"
  },
  {
    //小鸽理财G自动服务服务协议
    path: "./src/pages/platformProtocol_investment.html"
  },
  {
    //小鸽理财债权转让协议
    path: "./src/pages/platformProtocol_transfer.html"
  },
  {
    //三周年活动
    path: "./src/pages/activity.html"
  },
  {
    //充值结果调转页
    path: "./src/pages/rechargejump.html"
  },
  {
    //大学抽奖
    path: "./src/pages/university_lottery.html"
  }
];

module.exports = {
  entries: entries,
  pages: pages
};
