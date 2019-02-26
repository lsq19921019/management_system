// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router"; //路由组件
import $ from "jquery"; //加个jq
import VConsole from "vconsole"; //手机端控制台调试神器
if (
  location.href.indexOf("https://wap.xiaogelicai.com") <= -1 &&
  location.href.indexOf("http://wap.xiaogelicai.com") <= -1
) {
  new VConsole();
}

import {
  Switch,
  PullRefresh,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  List,
  Field
} from "vant"; //加个vant按需引入
Vue.use(Switch)
  .use(PullRefresh)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Field);

import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
Vue.use(preview, {
  fullscreenEl: false
});

import promise from "es6-promise"; //es6转译组件
promise.polyfill();

require("../static/js/base.js"); //base文件
//js文件修改记得改版本号防止缓存

import withApp from "../static/js/interactiveWithApp.js";
Vue.prototype.$withApp = withApp;

import axios from "axios"; //axios请求组件
Vue.prototype.$http = axios;

import qs from "qs"; //axios请求数据格式化成java服务器能识别的组件
Vue.prototype.$qs = qs;

import VueWechatTitle from "vue-wechat-title"; //根据路由meta.title或者页面内数据变换页面title内容的组件
if (navigator.userAgent.indexOf("MQQBrowser") < 1) {
  Vue.use(require("vue-wechat-title"));
}

//百度统计
router.afterEach((to, from, next) => {
  if (
    location.href.indexOf("https://wap.xiaogelicai.com") <= -1 &&
    location.href.indexOf("http://wap.xiaogelicai.com") <= -1
  ) {
    console.log(to);
  }
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function() {
      //每次执行前，先移除上次插入的代码
      document.getElementById("baidu_tj") &&
        document.getElementById("baidu_tj").remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?a19a85400f677c74f8e175be283afff5";
      hm.id = "baidu_tj";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }, 0);
});

import App from "./App";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
