const wechatLogin = () =>
  import(//登录
  "../page/wap/wechat_login.vue");

const startLogin = () =>
  import(//登录
  "../page/wap/start/wap_start_login.vue");

const startReg = () =>
  import(//注册
  "../page/wap/start/wap_start_reg.vue");

const startForget = () =>
  import(//忘记密码
  "../page/wap/start/wap_start_forget.vue");

const download = () =>
  import(//下载app
  "../page/wap/wap_download.vue");

const downloadAuto = () =>
  import(//自动下载app
  "../page/wap/wap_auto_download.vue");

const invIndex = () =>
  import(//首页-理财首页
  "../page/wap/index/wap_invest_index.vue");

const invTenIndex = () =>
  import(//首页-标的首页
  "../page/wap/index/wap_invest_tenindex.vue");

const waitBor = () =>
  import(//首页-待出借项目
  "../page/wap/index/wap_invest_waitBorrowList.vue");

  const introInfo = () =>
  import(//待出借-查看详情
  "../page/wap/index/wap_invest_intro.vue");

const confirTransfer = () =>
  import(//首页-确认投资
  "../page/wap/index/wap_invest_confir_transfer.vue");

const myCoupon = () =>
  import(//首页-选择优惠券
  "../page/wap/index/wap_invest_my_coupon.vue");

const successTransfer = () =>
  import(//首页-投资成功
  "../page/wap/index/wap_invest_success_transfer.vue");

const matchDetail = () =>
  import(//首页-投资详情
  "../page/wap/index/wap_invest_match_details.vue");

const invTenDet = () =>
  import(//首页-标的详情
  "../page/wap/index/wap_invest_tendetail.vue");

const productList = () =>
  import(//产品-模块首页
  "../page/wap/product/wap_product.vue");

const tenderXList = () =>
  import(//产品-G自动服务列表模块
  "../page/wap/product/wap_product_x_list.vue");

const assetsCenter = () =>
  import(//资产-资产中心
  "../page/wap/assets/wap_assets_center.vue");

const assetsIncome = () =>
  import(//资产-累计收益
  "../page/wap/assets/wap_assets_income.vue");

const withdrawalpage = () =>
  import(//提现页面
  "../page/wap/assets/wap_withdrawal.vue");

const withDrawal = () =>
  import(//提现申请成功
  "../page/wap/assets/wap_withdrawal_application.vue");

const withrecord = () =>
  import(//提现记录
  "../page/wap/assets/wap_withdrawal_record.vue");

const withplay = () =>
  import(//提现进度
  "../page/wap/assets/wap_withdrawal_play.vue");

const assetsRecharge = () =>
  import(//资产-充值
  "../page/wap/assets/wap_assets_recharge.vue");

const assetsReRecord = () =>
  import(//资产-充值记录
  "../page/wap/assets/wap_assets_recharge_record.vue");

const recDetail = () =>
  import(//资产-充值详情
  "../page/wap/assets/wap_assets_rechargeDetail.vue");

const assetsBigRecharge = () =>
  import(//资产-大额充值
  "../page/wap/assets/wap_assets_big_recharge.vue");

const assetsFundsRecords = () =>
  import(//资产-资金记录
  "../page/wap/assets/wap_assets_funds_records.vue");

const assetsFundsRecordsDetail = () =>
  import(//资产-资金记录详情
  "../page/wap/assets/wap_assets_funds_records_detail.vue");

const assetsDetail = () =>
  import(//资产-资产详情
  "../page/wap/assets/wap_assets_detail.vue");

const assetsRecordG = () =>
  import(//资产-G自动服务投资记录
  "../page/wap/assets/wap_assets_invest_record_g.vue");

const assetsOverList = () =>
  import(//资产-已结束记录列表
  "../page/wap/assets/wap_assets_over_list.vue");

const assetsAddDetailsG = () =>
  import(//资产-G自动服务加入详情
  "../page/wap/assets/wap_assets_add_details_g.vue");

const agreeList = () =>
  import(//协议列表
  "../page/wap/assets/wap_assets_agreeList.vue");

const assetsLoanProjectList = () =>
  import(//资产-借款项目列表
  "../page/wap/assets/wap_assets_loan_project_list.vue");

const assetsLoanDetailsSb = () =>
  import(//资产-借款项目出借详情
  "../page/wap/assets/wap_assets_loan_details_sb.vue");

const assetsAutoContinue = () =>
  import(//资产-开启续投
  "../page/wap/assets/wap_assets_auto_continue.vue");

const assetsOnAutoContinue = () =>
  import(//资产-已开启续投
  "../page/wap/assets/wap_assets_on_auto_continue.vue");

const mineCenter = () =>
  import(//我的-我的中心
  "../page/wap/mine/wap_mine_center.vue");

const mineUserInfo = () =>
  import(//我的-个人信息
  "../page/wap/mine/wap_mine_user_info.vue");

const mineUserAuth = () =>
  import(//我的-个人信息
  "../page/wap/mine/wap_mine_user_authorize.vue");

const mineBankCard = () =>
  import(//我的-银行卡
  "../page/wap/mine/wap_mine_bankcard.vue");

const mineBindBankCard = () =>
  import(//我的-绑定银行卡
  "../page/wap/mine/wap_mine_bind_bankcard.vue");

const mineInfoRealname = () =>
  import(//我的-实名认证
  "../page/wap/mine/wap_mine_info_realname.vue");

const mineOpenAccount = () =>
  import(//我的-存管开户
  "../page/wap/mine/wap_mine_open_account.vue");

const mineCoupon = () =>
  import(//我的-我的优惠券
  "../page/wap/mine/wap_mine_coupon.vue");

const mineCouponFail = () =>
  import(//我的-我的优惠券已失效
  "../page/wap/mine/wap_mine_coupon_fail.vue");

const cashBackDetail = () =>
  import(//我的-我的返现券明细
  "../page/wap/mine/wap_mine_cashback_detail.vue");

const newPri = () =>
  import(//我的-开通权益标
  "../page/wap/mine/wap_novice_privilege.vue");

const mineOpenJump = () =>
  import(//我的-存管开户跳转
  "../page/wap/mine/wap_mine_open_jump.vue");

const mineSetting = () =>
  import(//我的-设置
  "../page/wap/mine/wap_mine_setting.vue");

const mineChangePass = () =>
  import(//我的-修改登录密码
  "../page/wap/mine/wap_mine_change_pass.vue");

//ico专用
const icoLoadTransfer = () =>
  import(//ico-已绑定跳转
  "../page/wap/ico/ico_load_transfer.vue");

const icoLoadLogin = () =>
  import(//ico-登录绑定
  "../page/wap/ico/ico_load_login.vue");

const icoLoadReg = () =>
  import(//ico-登录绑定
  "../page/wap/ico/ico_load_register.vue");

const oneQuestionList = () =>
  import(//客服中心一级名称
  "../page/wap/service/oneQuestionList.vue");

const question = () =>
  import(//客服中心-问题列表
  "../page/wap/service/question.vue");

const serviceIndex = () =>
  import(//客服中心-首页
  "../page/wap/service/serviceIndex.vue");

export default [
  {
    path: "/wx_login", //微信登录
    component: wechatLogin,
    meta: {
      title: "身份验证中...",
      needLogin: false
    }
  },
  {
    path: "/wx_login/:from", //微信登录
    component: wechatLogin,
    meta: {
      title: "身份验证中...",
      needLogin: false
    }
  },
  {
    path: "/start_login", //登录
    component: startLogin,
    name: "startLogin",
    meta: {
      title: "注册登录",
      needLogin: false
    }
  },
  {
    path: "/start_login/:from", //登录
    component: startLogin,
    name: "startLogin",
    meta: {
      title: "注册登录",
      needLogin: false
    }
  },
  {
    path: "/start_login/:from/:planID", //登录
    component: startLogin,
    name: "startLogin",
    meta: {
      title: "注册登录",
      needLogin: false
    }
  },
  {
    path: "/start_reg", //注册
    component: startReg,
    name: startReg,
    meta: {
      title: "注册登录",
      needLogin: false
    }
  },
  {
    path: "/start_forget", //忘记密码
    component: startForget,
    name: startForget,
    meta: {
      title: "忘记密码",
      needLogin: false
    }
  },
  {
    path: "/invest_index", //首页-理财首页
    component: invIndex,
    meta: {
      title: "小鸽理财",
      needLogin: false
    }
  },
  {
    path: "/invest_waitBor", //首页-待出借项目
    component: waitBor,
    meta: {
      title: "待出借项目",
      needLoadin: false
    }
  },
  {
    path: "/intro_page", //出借项目-查看详情
    component: introInfo,
    meta: {
      title: "项目类型介绍",
      needLoadin: false
    }
  },
  {
    path: "/appDownload", //首页-下载app
    component: download,
    meta: {
      title: "小鸽理财",
      needLogin: false
    }
  },
  {
    path: "/appDownloadAuto", //首页-自动下载app
    component: downloadAuto,
    meta: {
      title: "小鸽理财",
      needLogin: false
    }
  },
  {
    path: "/invest_tenindex/:planId", //首页-G自动服务投资页
    component: invTenIndex,
    meta: {
      title: "",
      needLogin: false
    }
  },
  {
    path: "/invest_tenindex/:type/:planId", //首页-G自动服务投资页
    component: invTenIndex,
    meta: {
      title: "",
      needLogin: false
    }
  },
  {
    path: "/invest_conftrans", //首页-确认加入
    component: confirTransfer,
    meta: {
      title: "确认加入",
      needLogin: true
    }
  },
  {
    path: "/invest_mycoupon", //首页-选择优惠券
    component: myCoupon,
    meta: {
      title: "我的优惠券",
      needLogin: true
    }
  },
  {
    path: "/invest_suctransfer", //首页-加入成功
    component: successTransfer,
    meta: {
      title: "加入成功",
      needLogin: false
    }
  },
  /* {
    path: "/invest_matchdetail/:planRecordId", //首页-出借详情
    component: matchDetail,
    meta: {
      title: "出借详情",
      needLogin: true
    }
  }, */
  {
    path: "/invest_tendetail/:planId", //首页-产品详情
    component: invTenDet,
    meta: {
      title: "产品详情",
      needLogin: false
    }
  },
  {
    path: "/product_list", //产品-列表
    component: productList,
    meta: {
      title: "产品",
      needLogin: false
    }
  },
  {
    path: "/assets_center", //资产-资产中心
    component: assetsCenter,
    meta: {
      title: "资产",
      needLogin: false
    }
  },
  {
    path: "/assets_income", //资产-累计收益
    component: assetsIncome,
    meta: {
      title: "累计收益",
      needLogin: true
    }
  },
  {
    path: "/withdrawalpage", //提现页面
    component: withdrawalpage,
    meta: {
      title: "提现"
    }
  },
  {
    path: "/withrecord", //提现记录
    component: withrecord,
    meta: {
      title: "提现记录"
    }
  },
  {
    path: "/with_drawal", //提现申请成功
    component: withDrawal,
    meta: {
      title: "结果详情"
    }
  },
  {
    path: "/withplay", //提现进度
    component: withplay,
    meta: {
      title: "详情"
    }
  },
  {
    path: "/assets_recharge", //资产-充值
    component: assetsRecharge,
    meta: {
      title: "充值",
      needLogin: true
    }
  },
  {
    path: "/assets_re_record", //资产-充值
    component: assetsReRecord,
    meta: {
      title: "充值记录",
      needLogin: true
    }
  },
  {
    path: "/recDetail", //资产-充值详情
    component: recDetail,
    meta: {
      title: "充值详情",
      needLogin: true
    }
  },
  {
    path: "/assets_big_recharge", //资产-大额充值
    component: assetsBigRecharge,
    meta: {
      title: "大额充值",
      needLogin: true
    }
  },
  {
    path: "/assets_funds_records", //资产-资金记录
    component: assetsFundsRecords,
    meta: {
      title: "资金记录",
      needLogin: true
    }
  },
  {
    path: "/assets_funds_records_detail/:id", //资产-资金记录详情
    component: assetsFundsRecordsDetail,
    meta: {
      title: "详情",
      needLogin: true
    }
  },
  {
    path: "/assets_detail", //资产-资产记录详情
    component: assetsDetail,
    meta: {
      title: "资产详情",
      needLogin: true
    }
  },
  {
    path: "/assets_record_g", //资产-G自动服务投资记录
    component: assetsRecordG,
    meta: {
      title: "G自动服务",
      needLogin: true
    }
  },
  {
    path: "/agreeList/:id", //协议列表
    component: agreeList,
    meta: {
      title: "协议",
      needLogin: true
    }
  },
  {
    path: "/assets_over_list", //资产-已结束记录列表
    component: assetsOverList,
    meta: {
      title: "已结束记录",
      needLogin: true
    }
  },
  {
    path: "/assets_adddetails_g/:id", //资产-G自动服务加入详情
    component: assetsAddDetailsG,
    meta: {
      title: "加入详情",
      needLogin: true
    }
  },
  {
    path: "/assets_loanproject_list/:channel/:id", //资产-借款项目列表
    component: assetsLoanProjectList,
    meta: {
      title: "借款项目",
      needLogin: true
    }
  },
  {
    path: "/assets_loanproject_list/:channel/:id/:date", //资产-借款项目列表
    component: assetsLoanProjectList,
    meta: {
      title: "借款项目",
      needLogin: true
    }
  },
  {
    path: "/assets_loandetails_sb/:id/:type", //资产-散标出借详情
    component: assetsLoanDetailsSb,
    meta: {
      title: "出借详情",
      needLogin: true
    }
  },
  {
    path: "/assets_loandetails_sb/:id/:type/:recordId", //资产-散标出借详情
    component: assetsLoanDetailsSb,
    meta: {
      title: "出借详情",
      needLogin: true
    }
  },
  {
    path: "/assets_auto_continue", //资产-自动续投
    component: assetsAutoContinue,
    meta: {
      title: "开启续投",
      needLogin: true
    }
  },
  {
    path: "/assets_on_auto_continue", //资产-已开启续投
    component: assetsOnAutoContinue,
    meta: {
      title: "已开启续投",
      needLogin: true
    }
  },
  {
    path: "/mine_center", //我的-我的中心
    component: mineCenter,
    meta: {
      title: "我的",
      needLogin: false
    }
  },
  {
    path: "/mine_user_info", //我的-个人信息
    component: mineUserInfo,
    meta: {
      title: "个人信息",
      needLogin: true
    }
  },
  {
    path: "/mine_user_auth", //我的-授权服务
    component: mineUserAuth,
    meta: {
      title: "授权服务",
      needLogin: true
    }
  },
  {
    path: "/mine_bank_card", //我的-银行卡
    component: mineBankCard,
    meta: {
      title: "银行卡",
      needLogin: true
    }
  },
  {
    path: "/mine_bind_bankcard", //我的-绑定银行卡
    component: mineBindBankCard,
    meta: {
      title: "绑定银行卡",
      needLogin: true
    }
  },
  {
    path: "/mine_info_realname", //我的-实名认证
    component: mineInfoRealname,
    meta: {
      title: "实名认证",
      needLogin: true
    }
  },
  {
    path: "/mine_open_account", //我的-存管开户
    component: mineOpenAccount,
    meta: {
      title: "存管开户",
      needLogin: true
    }
  },
  {
    path: "/new_pri", //权益标特权
    component: newPri,
    meta: {
      title: "权益标特权"
    }
  },
  {
    path: "/mine_open_jump/:from", //我的-存管开户跳转
    component: mineOpenJump,
    meta: {
      title: "跳转中...",
      needLogin: true
    }
  },
  {
    path: "/mine_coupon", //我的-我的优惠券
    component: mineCoupon,
    meta: {
      title: "我的优惠券",
      needLogin: true
    }
  },
  {
    path: "/mine_coupon_fail/:tableType", //我的-我的优惠券已失效
    component: mineCouponFail,
    meta: {
      needLogin: true
    }
  },
  {
    path: "/cashback_detail", //我的-返现券详情
    component: cashBackDetail,
    meta: {
      title: "返现券明细",
      needLogin: true
    }
  },
  {
    path: "/mine_setting", //我的-设置
    component: mineSetting,
    meta: {
      title: "设置",
      needLogin: true
    }
  },
  {
    path: "/mine_change_pass", //我的-修改登录密码
    component: mineChangePass,
    meta: {
      title: "修改登录密码",
      needLogin: true
    }
  },
  {
    path: "/ico_transfer", //ico-已绑定跳转
    component: icoLoadTransfer,
    meta: {
      title: "身份验证中..."
    }
  },
  {
    path: "/ico_transfer/:from", //ico-已绑定跳转
    component: icoLoadTransfer,
    meta: {
      title: "身份验证中..."
    }
  },
  {
    path: "/ico_transfer/:from/:id", //ico-已绑定跳转
    component: icoLoadTransfer,
    meta: {
      title: "身份验证中..."
    }
  },
  {
    path: "/ico_login", //ico-未绑定登录
    component: icoLoadLogin,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/ico_login/:from", //ico-未绑定登录
    component: icoLoadLogin,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/ico_login/:from/:id", //ico-已绑定跳转
    component: icoLoadLogin,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/ico_register", //ico-未绑定注册
    component: icoLoadReg,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/service/oneQuestionList", //service-一级问题列表
    component: oneQuestionList,
    meta: {
      title: "客服中心-一级问题列表"
    }
  },
  {
    path: "/service/question",
    component: question,
    meta: {
      title: "客服中心-问题列表"
    }
  },
  {
    path: "/service/serviceIndex",
    component: serviceIndex,
    meta: {
      keepAlive: true,
      title: "客服中心-首页"
    }
  }
];
