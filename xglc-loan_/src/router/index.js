import Vue from "vue";
import Router from "vue-router";

// 懒加载
const notFound = () =>
  import(//404页面
  "@/page/404.vue");

const loanRegIndex = () =>
  import(//开户第二步 选择开户种类
  "@/page/loan_reg_index.vue");

const loannoCg = () =>
  import(//开户第二步 选择开户种类
  "@/page/loan_noCg.vue");

const loanLogin = () =>
  import(//个人登陆
  "@/page/loan_login.vue");

const loanRegFir = () =>
  import(//开户第一步
  "@/page/loan_reg_first.vue");

const loanRegSec = () =>
  import(//开户第三步
  "@/page/loan_reg_second.vue");

const loanComReg = () =>
  import(//企业开户
  "@/page/loan_company_reg.vue");

const loanInfo = () =>
  import(//个人账户信息
  "@/page/loan_info.vue");
const loanComInfo = () =>
  import(//企业账户信息
  "@/page/loan_company_info.vue");

const loanBank = () =>
  import(//支持银行
  "@/page/loan_bank.vue");

const loanBind = () =>
  import(//绑定银行卡
  "@/page/loan_bind.vue");

const loanOk = () =>
  import(//开户成功
  "@/page/loan_ok.vue");

const loanFa = () =>
  import(//开户失败
  "@/page/loan_fail.vue");

const agreeBook = () =>
  import(//借款人委托书
  "@/page/vest_bag/vest_register_book.vue");

const agreeRiskBook = () =>
  import(//风险告知书
  "@/page/vest_bag/vest_register_riskBook.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      component: notFound,
      meta: {
        title: "页面失踪啦"
      }
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/404", //选择开户
      component: notFound,
      meta: {
        title: "页面失踪啦"
      }
    },
    {
      path: "/loan_reg_index", //选择开户
      component: loanRegIndex,
      meta: {
        title: "选择开户",
        params: true
      }
    },
    {
      path: "/loan_nocg", //选择开户
      component: loannoCg,
      meta: {
        title: "存管账户基本信息",
        params: true
      }
    },
    {
      path: "/login", //个人登录
      component: loanLogin,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/register_fir", //开户第一步
      component: loanRegFir,
      meta: {
        title: "开通存管账户"
      }
    },
    {
      path: "/register_sec", //个人开户第二步
      component: loanRegSec,
      meta: {
        title: "开通存管账户",
        params: true
      }
    },
    {
      path: "/loan_com_reg", //企业开户
      component: loanComReg,
      meta: {
        title: "开通存管账户",
        params: true
      }
    },
    {
      path: "/info", //个人基本信息
      component: loanInfo,
      meta: {
        title: "存管账户基本信息",
        params: true
      }
    },
    {
      path: "/loan_com_info", //企业基本信息
      component: loanComInfo,
      meta: {
        title: "存管账户基本信息",
        params: true
      }
    },
    {
      path: "/bind", //个人绑定银行卡
      component: loanBind,
      meta: {
        title: "银行卡",
        params: true
      }
    },
    {
      path: "/bank", //支持绑定的银行
      component: loanBank,
      meta: {
        title: "银行列表"
      }
    },
    {
      path: "/re_suc/:tip", //开户成功
      component: loanOk,
      meta: {}
    },
    {
      path: "/re_fail/:tip", //开户失败
      component: loanFa,
      meta: {}
    },
    {
      path: "/agree_book", //借款人委托书
      component: agreeBook,
      meta: {
        title: "借款人授权委托书"
      }
    },
    {
      path: "/agree_riskbook", //收费标准及风险告知书
      component: agreeRiskBook,
      meta: {
        title: "借款人收费标准及风险告知书"
      }
    }
  ]
});
