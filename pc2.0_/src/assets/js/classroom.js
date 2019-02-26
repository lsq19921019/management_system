import { Base, $ } from "./pub/packages";
require("../css/about.scss");
require("../css/pagination.scss");
require("../js/pub/pagination");
let main = {
  data: {
    userInfo: {
      nickName: null
    }
  },
  doms: {
    classromm: $(".xg_lesson")
  },
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    },
    classroom() {
      var that = this;
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {
          belongstype: 2,
          pageNum: Base.getQueryParameter("pageNum")
        }),
        dataType: "json",
        async: true,
        data: { belongstype: 2, pageNum: Base.getQueryParameter("pageNum") },
        url: "/api/index/articleForNewsList",
        success: function(data) {
          if (data.status == 0) {
            var resData = data.result;
            var pageNub = resData.pageEntity;
            if (pageNub.totalPage <= 1) {
              $(".M-box").hide();
            }
            $(".M-box").pagination({
              //totalData:pageNub.totalCount, //数据总条数
              //showData:pageNub.pageSize,   //每页显示的条数
              pageCount: pageNub.totalPage, //总页数
              current: pageNub.currentPage, //当前页
              callback: function(api) {
                window.location.href =
                  "./classroom.html?pageNum=" + api.getCurrent();
              }
            });
            for (var i = 0; i < resData.mobileNewsList.length; i++) {
              main.doms.classromm.append(`<div class="les-item">
                            <div class="img-bg"><img src="${
                              resData.mobileNewsList[i].coverurl
                            }" alt=""></div>
                            <div class="les-right">
                                <a href="newDetail.html?newsId=${
                                  resData.mobileNewsList[i].id
                                }&type=2" target="_blank"><p class="les-r-title">${
                resData.mobileNewsList[i].title
              }</p></a>
                                <div class="les-r-con">
                                    ${resData.mobileNewsList[i].summary}
                                </div>
                                <div class="source">
                                    <span class="s-add">${
                                      resData.mobileNewsList[i].source
                                    }</span>
                                    <span class="s-time">${
                                      resData.mobileNewsList[i].time
                                    }</span>
                                </div>
                            </div>
                        </div> `);
            }
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    this.fncs.classroom();
    //渲染公共头部
    Base.initModules(
      ["footer", "header", "goToTop", "aboutNav"],
      this.data.userInfo,
      "news"
    );
    Base.showPage();
  }
};
main.init();
