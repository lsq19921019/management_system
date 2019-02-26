import Vue from "vue";
import Router from "vue-router";

// 懒加载
const index = () =>
  import(//快讯首页
  "@/page/newsletter_index.vue");

const platDetails = () =>
  import(//平台详情
  "@/page/platform_details.vue");

const problemPlat = () =>
  import(//平台详情
  "@/page/problem_platform.vue");

const followUs = () =>
  import(//关注我们
  "@/page/follow_us.vue");

const followUsMini = () =>
  import(//关注我们 小程序特供
  "@/page/follow_us_mini.vue");

const selectedNews = () =>
  import(//好文列表页面
  "@/page/selected_news.vue");

const newDetail = () =>
  import(//动态详情
  "@/page/new_detail.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "index"
    },
    {
      path: "*",
      component: index,
      meta: {
        title: "互金凤凰社"
      }
    },
    {
      path: "/index", //快讯首页
      component: index,
      meta: {
        title: "互金凤凰社"
      },
      /*beforeEnter: (to, from, next) => { //小程序审核用
        if (sessionStorage.getItem("miniPrograms")) {
          next({ path: "/problem_plat" });
        } else {
          next();
        }
      }*/
    },
    {
      path: "/plat_details", //平台详情
      component: platDetails,
      meta: {
        title: "互金凤凰社"
      }
    },
    {
      path: "/problem_plat", //问题平台
      component: problemPlat,
      meta: {
        title: "互金凤凰社"
      }
    },
    {
      path: "/follow_us", //关注我们
      component: followUs,
      meta: {
        title: "互金凤凰社"
      },
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem("miniPrograms")) {
          next({ path: "/follow_us_mini" });
        } else {
          next();
        }
      }
    },
    {
      path: "/follow_us_mini", //关注我们 小程序特供 
      component: followUsMini,
      meta: {
        title: "互金凤凰社"
      }
    },
    {
      path: "/selected_news", //好文列表 newDetail
      component: selectedNews,
      meta: {
        title: "火凤凰快讯"
      }
    },
    {
      path: "/new_detail/:detail", //动态详情 
      component: newDetail,
      meta: {
        title: "火凤凰快讯"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.query.view == "miniP") {
    to.meta.title = "P2P闪讯";
    sessionStorage.setItem("miniPrograms", "1");
    next();
  } else if (sessionStorage.getItem("miniPrograms")) {
    to.meta.title = "P2P闪讯";
    next();
  } else {
    next();
  }
});

export default router;
