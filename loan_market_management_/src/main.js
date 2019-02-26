import Vue from 'vue'
import App from './App'
import router from './router'
import Base from '../static/base';
import vuex from 'vuex';
import axios from '../static/http';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI).use(vuex);
Vue.prototype.http = axios;
var store = new vuex.Store({
    state : {
        currentMenu : '1-1',  //定位当前菜单导航
        formAddKeys : [],
        formModifyKeys : [],
        formKeys : {},  //当前表单用到的字段
        formSearchKeys : {},  //搜索字段
    }
});

Vue.config.productionTip = false;
Vue.prototype.Base = Base;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
