import Vue from "vue";
import Router from "vue-router";

const notFound = () =>
  import(//404页面
  "../page/404.vue");

const login = () =>
  import(//登录页
  "../page/loan_login.vue");

const forget = () =>
  import(//忘记密码
  "../page/loan_forget.vue");

const account = () =>
  import(//我的帐户
  "../page/loan_account.vue");

const recharge = () =>
  import(//网银充值
  "../page/loan_recharge.vue");

const pdf = () =>
  import(//预览协议
  "../page/pdf.vue");

const pdf2 = () =>
  import(//借款委托书协议
  "../page/pdf2.vue");

const rechargeJump = () =>
  import(//充值成功或失败结算页
  "../page/loan_recharge_jump.vue");

const withdrawJump = () =>
  import(//提现成功或失败结算页
  "../page/loan_withdraw_jump.vue");
  
const authJump = () =>
import(//开通授权成功或失败结算页
"../page/loan_auth_jump.vue");
  
const changepassJump = () =>
import(//修改交易密码成功或失败结算页
"../page/loan_changepass_jump.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: login,
      meta: {
        title: "小鸽理财",
        needLogin: false
      }
    },
    {
      path: "/forget",
      component: forget,
      meta: {
        title: "忘记密码",
        needLogin: false
      }
    },
    {
      path: "/account",
      component: account,
      meta: {
        title: "我的帐户",
        needLogin: true
      }
    },
    {
      path: "/recharge",
      component: recharge,
      meta: {
        title: "网银充值",
        needLogin: true
      }
    },
    {
      path: "/pdf/:id",
      component: pdf,
      meta: {
        title: "小鸽理财借款协议"
      }
    },
    {
      path: "/pdf2/:id",
      component: pdf2,
      meta: {
        title: "借款人授权委托书"
      }
    },
    {
      path: "/rechargeJump",
      component: rechargeJump,
      meta: {}
    },
    {
      path: "/withdrawJump",
      component: withdrawJump,
      meta: {}
    },
    {
      path: "/authJump",
      component: authJump,
      meta: {}
    },
    {
      path: "/changepassJump",
      component: changepassJump,
      meta: {}
    },
    {
      path: "/", //默认根域名跳到登录
      redirect: "login"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
