import { Carouse, Base, $, CryptoJS } from "./pub/packages";
require("../css/base.less");
require("../css/pages/index.scss");
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
Base.showPage();

let main = {
  data: {
    userInfo: {
      nickName: null
    }
  },
  doms: {
    divSwiper: $("#J_swiper"), //swiper容器
    divLoginCon: $("#J_loginCon"), //banner登录状态容器
    btnAccount: $("#J_account"), //我的账户按钮
    newstype: $(".new_item_news"),
    xgclasstype: $(".new_item_xgclass"),
    nowjoin: $(".new_r,.lend_btn")
  },
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    },
    //swiper
    initSwiper() {
      var mySwiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination"
        },
        clickable: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      });
    },
    //获取banner&初始化swiper
    getBannerList() {
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {}),
        dataType: "json",
        async: true,
        url: "/api/find/banner",
        success: function(data) {
          if (data.status == 0) {
            for (var i = 0; i < data.result.bannerList.length; i++) {
              main.doms.divSwiper.append(
                `<div class='swiper-slide' style='background: url(${
                  data.result.bannerList[i].imagePath
                }) top center no-repeat;background-size: auto 100%;'><a target='_blank' href='${
                  data.result.bannerList[i].bannerLink
                }'></a></div>`
              );
              if (i == data.result.bannerList.length - 1) {
                main.fncs.initSwiper();
              }
            }
          }
        }
      });
    },
    //登录or未登录banner UI
    initLoginCon() {
      if (main.data.userInfo.nickName == null || !Base.isLogin()) {
        main.doms.divLoginCon.html(`
                <div class="new tac">
                    <span class="f20">新手专享</span>
                    <strong>15</strong>
                    <span>%</span>
                </div>
                <p class="sy f14 fc999">往期年化收益</p>
                <a href="./index_register.html" class="btn dsb tac">注册立领888元红包</a>
                <p class="tips tac f14"><a class="fc999" href="./index_login.html">已有账户? 立即登录</a></p>
                `);
      } else {
        main.doms.divLoginCon.html(`
                <dl>
                    <dt>${
                      main.data.userInfo.headImg.length > 0
                        ? `<img src="${main.data.userInfo.headImg}"/>`
                        : ""
                    }</dt>
                    <dd>${main.data.userInfo.nickName}</dd>
                </dl>
                <a href="/myAccount.html" class="btn dsb tac">进入我的账户</a>
                `);
      }
    },
    //获取最新公告
    getNoticeList() {
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {}),
        dataType: "json",
        async: true,
        url: "/api/index/noticeList",
        success: function(data) {
          if (data.status == 0) {
            let resData = data.result.mobileNoticeList;
            //最新的前3条公告
            $(".notice_top")
              .find(".notice")
              .eq(0)
              .text(resData[0].title)
              .attr(
                "href",
                "/noticePopDetail.html?noticeId=" + resData[0].noticeId
              );
            $(".notice_top")
              .find(".notice")
              .eq(1)
              .text(resData[1].title)
              .attr(
                "href",
                "/noticePopDetail.html?noticeId=" + resData[1].noticeId
              );
            $(".notice_top")
              .find(".notice")
              .eq(2)
              .text(resData[2].title)
              .attr(
                "href",
                "/noticePopDetail.html?noticeId=" + resData[2].noticeId
              );
          }
        }
      });
    },

    //新闻报道和小鸽课堂
    getNewsList() {
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {
          belongstype: 1,
          pageNum: 1,
          recommendStatus: 2
        }),
        dataType: "json",
        async: true,
        data: { belongstype: 1, pageNum: 1, recommendStatus: 2 },
        url: "/api/index/articleForNewsList",
        success: function(data) {
          console.log(data);
          if (data.status == 0) {
            main.doms.newstype.append(`<div class="new_item_l">
                        <img onclick="window.open('newDetail.html?newsId=${
                          data.result.mobileNewsList[0].id
                        }')" src="${
              data.result.mobileNewsList[0].coverurl
            }" alt="">
                        <a href="./newDetail.html?newsId=${
                          data.result.mobileNewsList[0].id
                        }&type=1" target="_blank"><p>${Base.cutString(
              data.result.mobileNewsList[0].title,
              38
            )}</p><a>
                    </div>
                    <div class="new_item_r">
                        <div class="new_item_r_tit">
                            <span>新闻动态</span>
                            <span><a href="./news.html" target="_blank">更多></a></span>
                        </div>
                        <div class="new_item_r_con">
                            <ul>

                            </ul>
                        </div>
                    </div>`);
            for (var i = 1; i <= 5; i++) {
              main.doms.newstype
                .find(".new_item_r_con ul")
                .append(
                  `<li><a href="./newDetail.html?newsId=${
                    data.result.mobileNewsList[i].id
                  }&type=1" target="_blank">${Base.cutString(
                    data.result.mobileNewsList[i].title,
                    44
                  )}<a></li>`
                );
            }
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, {
          belongstype: 2,
          pageNum: 1,
          recommendStatus: 2
        }),
        dataType: "json",
        async: true,
        data: { belongstype: 2, pageNum: 1, recommendStatus: 2 },
        url: "/api/index/articleForNewsList",
        success: function(data) {
          console.log(data);
          if (data.status == 0) {
            main.doms.xgclasstype.append(`<div class="new_item_l">
                        <img onclick="window.open('newDetail.html?newsId=${
                          data.result.mobileNewsList[0].id
                        }')" src="${
              data.result.mobileNewsList[0].coverurl
            }" alt="">
                        <a href="./newDetail.html?newsId=${
                          data.result.mobileNewsList[0].id
                        }&type=2" target="_blank"><p>${Base.cutString(
              data.result.mobileNewsList[0].title,
              38
            )}</p><a>
                    </div>
                    <div class="new_item_r">
                        <div class="new_item_r_tit">
                            <span>小鸽课堂</span>
                            <span><a href="./classroom.html" target="_blank">更多></a></span>
                        </div>
                        <div class="new_item_r_con">
                            <ul>
                                
                            </ul>
                        </div>
                    </div>`);
            for (var i = 1; i <= 5; i++) {
              main.doms.xgclasstype
                .find(".new_item_r_con ul")
                .append(
                  `<li><a href="./newDetail.html?newsId=${
                    data.result.mobileNewsList[i].id
                  }&type=2" target="_blank">${Base.cutString(
                    data.result.mobileNewsList[i].title,
                    44
                  )}<a></li>`
                );
            }
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    //立即加入
    nowjoin() {
      main.doms.nowjoin.on("click", function() {
        if (!Base.isLogin()) {
          window.location.href = "index_register.html";
        } else {
          window.location.href = "index_displayPage.html";
        }
      });
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
    this.fncs.getBannerList();
    this.fncs.initLoginCon();
    this.fncs.getNoticeList();
    this.fncs.getNewsList(); //新闻报道和小鸽课堂
    this.fncs.nowjoin(); //立即加入
    this.bind();
    return main;
  }
};
main.init().bind();
