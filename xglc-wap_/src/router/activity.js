const midAutumn = () => import("../page/activity/midAutumn.vue");

const invi = () => import("../page/activity/invite.vue");
const thirdAnnualM = () => import("../page/activity/third_annual_master.vue");
const thirdAnnualA = () => import("../page/activity/third_annual_assist.vue");
const activityJump = () => import("../page/activity/activity_jump.vue");
const thirdAnnualNew = () =>
  import("../page/activity/third_annual_newuser.vue");
//三周年宣传
const pubs = () => import("../page/activity/pubs.vue");
export default [
  {
    path: "/activity/midAutumn",
    component: midAutumn,
    meta: {
      title: "中秋节活动",
      needLogin: false
    }
  },
  {
    path: "/activity/invite",
    component: invi,
    meta: {
      title: "中秋邀请",
      needLogin: false
    }
  },
  {
    path: "/third_annual_m",
    component: thirdAnnualM,
    meta: {
      title: "3周年狂欢趴",
      needLogin: true
    }
  },
  {
    path: "/third_annual_a",
    component: thirdAnnualA,
    meta: {
      title: "邀好友，拿现金",
      needLogin: false
    }
  },
  {
    path: "/third_annual_new",
    component: thirdAnnualNew,
    meta: {
      title: "邀好友，拿现金",
      needLogin: false
    }
  },
  {
    path: "/activity_jump",
    component: activityJump,
    meta: {
      title: "加载中...",
      needLogin: false
    }
  },
  {
    //三周年宣传
    path: "/activity/pubs",
    name: "Pubs",
    component: pubs,
    meta: {
      title: "积小成大 鸽声正好",
      needLogin: false
    }
  }
];
