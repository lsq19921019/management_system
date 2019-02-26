// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router' //路由组件
import $ from 'jquery' //加个jq

Vue.use(ElementUI) //饿了吗ui组件

//import VConsole from 'vconsole' //手机端控制台调试神器
//var vConsole = new VConsole()

require('../static/js/593616de15330c0fb2d55e55410bf994.js?ver=1') //base文件
//js文件修改记得改版本号防止缓存

import promise from 'es6-promise' //es6转译组件
promise.polyfill()

import axios from 'axios' //axios请求组件
Vue.prototype.$http = axios

import qs from 'qs' //axios请求数据格式化成java服务器能识别的组件
Vue.prototype.$qs = qs

import VueWechatTitle from 'vue-wechat-title' //根据路由meta.title或者页面内数据变换页面title内容的组件
Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App),
})
