/*按照app使用顺序整理*/

/*首页*/
const underUs = () =>
  import(//了解我们
  "../page/mobile/index/mobile_understand_us.vue");

const bankDep = () =>
  import(//银行存管
  "../page/mobile/index/mobile_bank_dep.vue");

const riskCtr = () =>
  import(//风控体系
  "../page/mobile/index/mobile_risk_control.vue");

const secAss = () =>
  import(//安全保障
  "../page/mobile/index/mobile_security_assurance.vue");

const disclosure = () =>
  import(//信息披露（备案信息、承诺函、其他信息、重大事项、组织信息）
  "../page/mobile/index/mobile_information_disclosure.vue");

const comQua = () =>
  import(//公司资质
  "../page/mobile/index/mobile_company_qualification.vue");

const novGui = () =>
  import(//新手投资指南
  "../page/mobile/index/mobile_novice_guide.vue");

const upAndr = () =>
  import(//更新安卓app
  "../page/mobile/index/mobile_update_android.vue");

const debtActiv = () =>
  import(//债权转让活动
  "../page/mobile/index/mobile_debt_activity.vue");

const debtGuide = () =>
  import(//债权转让活动指南
  "../page/mobile/index/mobile_debt_guide.vue");

const aboutXg = () =>
  import(//关于小鸽
  "../page/mobile/index/mobile_about_xg.vue");

const lenderEducation = () =>
  import(//出借人教育
  "../page/mobile/index/mobile_lender_education.vue");

const lawsRegulations = () =>
  import(//法律法规
  "../page/mobile/index/mobile_laws_regulations.vue");

const regulaAuthority = () =>
  import(//监管机构
  "../page/mobile/index/mobile_regula_authority.vue");

/*产品*/
const invAgr = () =>
  import(//定存宝投资协议
  "../page/mobile/product/mobile_investment_agreement.vue");

const invAgrX = () =>
  import(//定存宝x投资协议
  "../page/mobile/product/mobile_investment_agreement_x.vue");

const invAgrG = () =>
  import(//G自动服务投资协议
  "../page/mobile/product/mobile_investment_agreement_g.vue");

const invAuthG = () =>
  import(//G自动服务授权委托书
  "../page/mobile/product/mobile_investment_authorization_x.vue");

const loanAgr = () =>
  import(//借款协议
  "../page/mobile/product/mobile_loan_agreement.vue");

const assignClause = () =>
  import(//债权转让协议
  "../page/mobile/product/mobile_assignment_clause.vue");

const proDet = () =>
  import(//项目详情
  "../page/mobile/product/mobile_project_details.vue");

const proDetImg = () =>
  import(//项目资料图片展示
  "../page/mobile/product/mobile_project_details_images.vue");

/*资产*/
const unProcess = () =>
  import(//银行卡解绑进度
  "../page/mobile/assets/mobile_unblock_process.vue");

const bankLimit = () =>
  import(//银行限额
  "../page/mobile/assets/mobile_bank_limit.vue");

const openUnionpay = () =>
  import(//银行限额
  "../page/mobile/assets/mobile_open_unionpay.vue");

const riskWarn = () =>
  import(//风险提示
  "../page/mobile/assets/mobile_risk_warning.vue");

const repayCalend = () =>
  import(//汇款日历
  "../page/mobile/assets/mobile_repay_calend.vue");

/*我的*/
const riskAss = () =>
  import(//风险测评
  "../page/mobile/mine/mobile_risk_ass.vue");

const riskOk = () =>
  import(//风险测评完成
  "../page/mobile/mine/mobile_risk_ok.vue");

const allSuc = () =>
  import(//各种成功
  "../page/mobile/mine/mobile_all_success.vue");

const allFail = () =>
  import(//各种失败
  "../page/mobile/mine/mobile_all_failure.vue");

const couponDes = () =>
  import(//优惠券说明
  "../page/mobile/mine/mobile_coupon_descrip.vue");

const help = () =>
  import(//帮助中心
  "../page/mobile/mine/mobile_help.vue");

const regAgree = () =>
  import(//注册服务协议
  "../page/mobile/mine/mobile_register_agreement.vue");

const extInv = () =>
  import(//外部活动
  "../page/mobile/mine/mobile_external_invite.vue");

const intInv = () =>
  import(//内部活动
  "../page/mobile/mine/mobile_interior_invite.vue");

const finPlan = () =>
  import(//理财师活动
  "../page/mobile/mine/mobile_financial_planner.vue");

const intRec = () =>
  import(//我的邀请好友
  "../page/mobile/mine/mobile_invitation_record.vue");

const privacyPol = () =>
  import(//隐私条款
  "../page/mobile/mine/mobile_privacy_policy.vue");

const newbankOnline = () =>
  import(//众邦银行存管全新上线
  "../page/mobile/index/mobile_newbank_online.vue");

const newbanGuide = () =>
  import(//众邦银行存管开户指引
  "../page/mobile/index/mobile_newbank_guide.vue");

/*马甲包*/
const vestAboutUs = () =>
  import(//我的邀请好友
  "../page/mobile/vest_bag/vest_bag_about_us.vue");

const vestRegAgree = () =>
  import(//注册协议
  "../page/mobile/vest_bag/vest_register_agreement.vue");

const test = () =>
  import(//test
  "../page/mobile/index/test.vue");

export default [
  {
    path: "/riskass", //风险测评
    component: riskAss,
    meta: {
      title: "风险测评"
    }
  },
  {
    path: "/riskok/:level", //测评结果
    component: riskOk,
    meta: {
      title: "风险测评"
    }
  },
  {
    path: "/risk_warning", //风险提示
    component: riskWarn,
    meta: {
      title: "《风险提示书》"
    }
  },
  {
    path: "/bank_dep", //银行存管
    component: bankDep,
    meta: {
      title: "银行存管"
    }
  },
  {
    path: "/risk_ctr", //风控体系
    component: riskCtr,
    meta: {
      title: "风控体系"
    }
  },
  {
    path: "/sec_ass", //安全保障
    component: secAss,
    meta: {
      title: "安全保障"
    }
  },
  {
    path: "/com_qua", //公司资质
    component: comQua,
    meta: {
      title: "公司资质"
    }
  },
  {
    path: "/debt_activity", //债权转让活动
    component: debtActiv,
    meta: {
      title: "债权转让活动"
    }
  },
  {
    path: "/debt_guide", //债权转让指南
    component: debtGuide,
    meta: {
      title: "债权转让指南"
    }
  },
  {
    path: "/about_xg", //关于小鸽
    component: aboutXg,
    meta: {
      title: "关于小鸽"
    }
  },
  {
    path: "/lender_education", //出借人教育
    component: lenderEducation,
    meta: {
      title: "出借人教育"
    }
  },
  {
    path: "/laws_regula", //法律法规
    component: lawsRegulations,
    meta: {
      title: "法律法规"
    }
  },
  {
    path: "/regula_auth", //监管机构
    component: regulaAuthority,
    meta: {
      title: "监管机构"
    }
  },
  {
    path: "/re_suc/:tip", //各种成功
    component: allSuc,
    meta: {}
  },
  {
    path: "/re_fail/:tip", //各种失败
    component: allFail,
    meta: {}
  },
  {
    path: "/bank_limit", //银行限额
    component: bankLimit,
    meta: {
      title: "银行限额"
    }
  },
  {
    path: "/open_unionpay", //银联在线支付开通
    component: openUnionpay,
    meta: {
      title: "银联在线支付开通"
    }
  },
  {
    path: "/inv_agr_x", //定存宝X投资协议
    component: invAgrX,
    meta: {
      title: "定存宝X投资协议"
    }
  },
  {
    path: "/inv_agr_g", //G自动服务投资协议
    component: invAgrG,
    meta: {
      title: "G自动服务协议"
    }
  },
  {
    path: "/inv_auth_g", //授权委托书
    component: invAuthG,
    meta: {
      title: "授权委托书"
    }
  },
  {
    path: "/inv_agr", //定存宝投资协议
    component: invAgr,
    meta: {
      title: "定存宝投资协议"
    }
  },
  {
    path: "/loan_agr", //借款协议
    component: loanAgr,
    meta: {
      title: "小鸽理财借款协议"
    }
  },
  {
    path: "/assign_clause", //债权转让协议
    component: assignClause,
    meta: {
      title: "小鸽理财债权转让协议"
    }
  },
  {
    path: "/repay_calend", //回款日历
    component: repayCalend,
    meta: {
      title: "回款日历"
    }
  },
  {
    path: "/reg_agree", //注册服务协议
    component: regAgree,
    meta: {
      title: "注册使用条款"
    }
  },
  {
    path: "/ext_inv", //外部邀新活动
    component: extInv,
    meta: {
      title: "邀请壕友-享1%提成"
    }
  },
  {
    path: "/int_inv", //内部邀新活动
    component: intInv,
    meta: {
      title: "邀请壕友-享2%提成"
    }
  },
  {
    path: "/fin_plan", //理财师养成
    component: finPlan,
    meta: {}
  },
  {
    path: "/int_rec", //我的邀请好友
    component: intRec,
    meta: {
      title: "我的邀请记录"
    }
  },
  {
    path: "/nov_gui", //新手投资指南
    component: novGui,
    meta: {
      title: "新手投资指南"
    }
  },
  {
    path: "/under_us", //了解我们
    component: underUs,
    meta: {
      title: "了解我们"
    }
  },
  {
    path: "/pro_det", //项目详情
    component: proDet,
    meta: {
      title: "项目详情"
    }
  },
  {
    path: "/pro_det_img", //资料展示
    component: proDetImg,
    meta: {
      title: "资料展示"
    }
  },
  {
    path: "/un_process", //银行卡解绑进度
    component: unProcess,
    meta: {
      title: "解绑审核进度"
    }
  },
  {
    path: "/mobile_help", //帮助中心
    component: help,
    meta: {
      title: "常见问题"
    }
  },
  {
    path: "/coupon_descrip", //优惠券说明
    component: couponDes,
    meta: {
      title: "规则说明"
    }
  },
  {
    path: "/vest_about_us", //马甲包-关于我们
    component: vestAboutUs,
    meta: {
      title: "关于我们"
    }
  },
  {
    path: "/up_andr", //更新安卓app
    component: upAndr,
    meta: {
      title: "APP 1.3.9上线啦"
    }
  },
  {
    path: "/vest_reg_agree", //注册协议
    component: vestRegAgree,
    meta: {
      title: "注册使用条款"
    }
  },
  {
    path: "/privacy_pol", //隐私条款
    component: privacyPol,
    meta: {
      title: "隐私条款"
    }
  },
  {
    path: "/newbank_onl", //众邦银行存管全新上线
    component: newbankOnline,
    meta: {
      title: "众邦银行存管全新上线"
    }
  },
  {
    path: "/newban_gui/:type", //众邦银行存管开户指引
    component: newbanGuide,
    meta: {}
  },
  {
    path: "/disclosure", //信息披露
    component: disclosure,
    meta: {
      title: "信息披露"
    }
  },
  {
    path: "/test", //测试
    component: test,
    meta: {
      title: "测试"
    }
  }
];
