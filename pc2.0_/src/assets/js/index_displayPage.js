import { Base, $ } from "./pub/packages";
require("../css/about.scss");
require("../css/pages/index_displayPage.scss");
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
    $(function() {
      if (Base.getQueryParameter("notOpenOlineBank")) {
        $(".top_banner").addClass("nocg")
      }
    });
    $(".top").click(function() {
      $("html , body").animate({ scrollTop: 450 }, "slow");
    });
  }
};
main.init();
