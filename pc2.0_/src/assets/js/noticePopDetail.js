import { Base, $ } from "./pub/packages";
require("../css/about.scss");
let main = {
  data: {
    userInfo: {
      nickName: null
    }
  },
  doms: {
    aboutCon: $(".about_con")
  },
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    },
    //平台公告
    noticePop() {
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {
          noticeId: Base.getQueryParameter("noticeId")
        }),
        dataType: "json",
        async: true,
        data: { noticeId: Base.getQueryParameter("noticeId") },
        url: "/api/index/noticeDetail",
        success: function(data) {
          if (data.status == 0) {
            var resData = data.result;
            main.doms.aboutCon.find(".news_tit").text(resData.title);
            $(".end_time").text(resData.time);
            main.doms.aboutCon.find(".new_con_txt").html(resData.content);
          }
        }
      });
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    this.fncs.noticePop();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
    Base.showPage();
  }
};
main.init();
