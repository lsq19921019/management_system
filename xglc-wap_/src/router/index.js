import Vue from "vue";
import Router from "vue-router";
import dec from "./dec_router"; //宣传注册页
import mobile from "./mobile_router"; //手机APP端页面
import activityRouter from "./activity"; //手机APP端页面
import wap from "./wap"; //小鸽理财wap

const notFound = () =>
  import(//404页面
  "../page/404.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    ...dec,
    ...mobile,
    ...wap,
    ...activityRouter,
    {
      path: "*",
      component: notFound,
      meta: {
        title: "404错误"
      }
    },
    {
      path: "/", //默认根域名跳到wap首页
      redirect: "invest_index"
    }
  ]
});

/* let isBack
Router.prototype.go = function() {
  this.isBack = true;
  window.history.go(-1);
}; */

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (!base.isAndroid && !base.isiOS) {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next({ path: "/start_login" + to.path });
      }
    } else {
      next();
    }
  } else if (!to.meta.needLogin) {
    //console.log(to)
    //console.log(from)
    if (to.path == "/start_login") {
      if (
        from.path != "/start_login" &&
        from.path != "/start_reg" &&
        from.path != "/start_forget"
      ) {
        next({ path: "/start_login" + from.path });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
