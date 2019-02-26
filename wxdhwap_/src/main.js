// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import rrComponents from './index'
import './router/permission.js'
import {Utils} from './config/mUtils.js';



Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(rrComponents);
Vue.use(Utils);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
