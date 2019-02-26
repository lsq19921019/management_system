import { Base, $ } from "./pub/packages";
require("../css/about.scss");
Base.showPage();
let main = {
  data: {
    userInfo: {
      nickName: null
    }
  },
  doms: {
    newDetail: $(".newDetail")
  },
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    },
    newDetail() {
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {
          newsId: Base.getQueryParameter("newsId")
        }),
        dataType: "json",
        async: true,
        data: { newsId: Base.getQueryParameter("newsId") },
        url: "/api/index/newsDetails",
        success: function(data) {
          if (data.status == 0) {
            var resData = data.result;
            main.doms.newDetail.find(".news_tit").html(resData.title);
            main.doms.newDetail
              .find(".news_top_su .source")
              .html(
                resData.source +
                  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                  resData.time
              );
            main.doms.newDetail.find(".new_con_txt").html(resData.content);
          }
        }
      });
    },
    newstit: function() {
      var newsTit = Base.getQueryParameter("type");
      if (newsTit == 1) {
        document.title = "新闻动态详情";
      } else {
        document.title = "小鸽课堂详情";
      }
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    this.fncs.newDetail();
    this.fncs.newstit();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
  }
};
main.init();
