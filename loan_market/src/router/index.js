import Vue from 'vue'
import Router from 'vue-router'
import mainRouters from './main.js';
import myRouters from './my.js';
import activityRouters from './activity.js';
import authRouters from './authentication.js';
import order from './order.js';
import bridgapp from './bridgapp';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [ ...mainRouters, ...myRouters, ...activityRouters, ...authRouters, ...order ,...bridgapp]
});


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
})
export default router;
