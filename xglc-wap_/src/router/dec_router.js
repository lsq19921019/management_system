const decActS = () =>
  import(//落地宣传页
  "@/page/dec/dec_act_s");
const decActL = () => import("@/page/dec/dec_act_l");
const regSuccess = () => import("@/page/dec/dec_reg_success");
const decLottery = () => import("@/page/dec/dec_lottery");
const lotteryReg = () => import("@/page/dec/dec_lottery_reg");
const decInvite = () => import("@/page/dec/dec_invite");
const mayActL = () => import("@/page/dec/may_act_l");
const julyActL = () => import("@/page/dec/july_act_l");
const feedbackLottery = () => import("@/page/dec/user_feedback_lottery");
const augInvite = () => import("@/page/dec/aug_invite");

export default [
  {
    path: "/dec_act_s/", //下面都是宣传注册页
    component: decActS,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/dec_act_l/",
    component: decActL,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/reg_success/",
    component: regSuccess,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/dec_lottery/",
    component: decLottery,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/dec_lottery_reg/",
    component: lotteryReg,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/dec_invite/",
    component: decInvite,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/may_act_l/:chid",
    component: mayActL,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/july_act_l/",
    component: julyActL,
    meta: {
      title: "小鸽理财"
    }
  },
  {
    path: "/feedback_lottery/",
    component: feedbackLottery,
    meta: {
      title: "用户回馈月"
    }
  },
  {
    path: "/aug_invite/",
    component: augInvite,
    meta: {
      title: "小鸽理财"
    }
  }
];
