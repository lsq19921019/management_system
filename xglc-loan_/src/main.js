// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import $ from "jquery"; //加个jq
import VConsole from "vconsole"; //手机端控制台调试神器
if (
  location.href.indexOf("https://loan.xiaogelicai.com") <= -1 &&
  location.href.indexOf("http://loan.xiaogelicai.com") <= -1
) {
  new VConsole();
}

import promise from "es6-promise";
promise.polyfill();

import { Field } from "vant";
Vue.use(Field);

import axios from "axios";
Vue.prototype.$http = axios;

import qs from "qs";
Vue.prototype.$qs = qs;

router.beforeEach((to, from, next) => {
  if (to.meta.params) {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

import VueWechatTitle from "vue-wechat-title";
Vue.use(VueWechatTitle);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
