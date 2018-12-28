import Vue from 'vue'
import App from './App'
import router from './router'
import loading from './components/loading/index';
import Tips from './components/tips/index';
import axios from 'axios';
import Vconsole from 'vconsole';
import vuex from 'vuex';
if(location.href.indexOf('192.168') > 0) {
    //本地开发环境显示调试器
    new Vconsole();
}
// 全局引入公共js
import Base from '../static/base';
var Promise = require('es6-promise').Promise;
Promise.polyfill();
Vue.prototype.$ajax = axios;
// 全局引入公共样式
require('../static/base.css');
Vue.prototype.Base = Base;
//全屏加载中gif
Vue.use(loading).use(Tips).use(vuex);
//axios请求数据格式化成java服务器能识别的组件
import qs from 'qs'; 
Vue.prototype.$qs = qs;
//引入图片预览模块;<!--刘思奇-2018/10/24-->
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview);
//引入vuex
var store = new vuex.Store({
  state:{
    //是否显示带有app桥接方法的页面入口
    isShowAppPage:false,
  }
})
//引入下拉框模块;<!--刘思奇-2018/10/24-->
import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);
// Vue.config.productionTip = false

//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:require('./assets/lazy_default.png'),
    loading:require('./assets/lazy_error.png')
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
