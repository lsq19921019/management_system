import { Base, $ } from "./pub/packages";
require("../css/about.scss");
require("../css/pagination.scss");
require("./pub/pagination");
Base.showPage();
let main = {
  data: {
    userInfo: {
      nickName: null
    }
  },
  doms: {
    noticeList: $(".notice_list")
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
      var that = this;

      let pageNum = Base.getQueryParameter("pageNum")
        ? Base.getQueryParameter("pageNum")
        : 1;
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {
          pageNum: pageNum
        }),
        dataType: "json",
        async: true,
        data: { pageNum: pageNum },
        url: "/api/index/noticeList",
        success: function(data) {
          if (data.status == 0) {
            let res = data.result.mobileNoticeList;
            let pageEntity = data.result.pageEntity;
            if (pageEntity.totalPage <= 1) {
              $(".M-box").hide();
            }
            $(".M-box").pagination({
              pageCount: pageEntity.totalPage, //总页数
              current: pageEntity.currentPage, //当前页
              callback: function(api) {
                window.location.href =
                  "./noticePop_list.html?pageNum=" + api.getCurrent();
              }
            });
            for (let i = 0; i < res.length; i++) {
              main.doms.noticeList.find("ul").append(`<li>
                            <a href="/noticePopDetail.html?noticeId=${
                              res[i].noticeId
                            }" target="_blank">
                                <span>${res[i].title}</span><span>${
                res[i].time
              }</span>
                                </li>
                            </a>`);
            }
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
    Base.initModules(
      ["footer", "header", "goToTop", "aboutNav"],
      this.data.userInfo,
      "notice"
    );
  }
};
main.init();
