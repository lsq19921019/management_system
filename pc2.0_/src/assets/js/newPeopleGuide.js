import { Base, $ } from "./pub/packages";
require("../css/about.scss");
require("../css/pages/newPeopleGuide.scss");
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
Base.showPage();
let main = {
  data: {
    userInfo: {
      nickName: null
    }
  },
  doms: {},
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
    var mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      centeredSlides: false,
      allowTouchMove: false
    });
    $(".left").click(function() {
      mySwiper.slidePrev();
    });
    $(".right").click(function() {
      mySwiper.slideNext();
    });
    $(".reg").click(function() {
      location.href = "/index_register.html";
    });
  }
};
main.init();
