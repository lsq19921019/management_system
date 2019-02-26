import { Base, $ } from "./pub/packages";
require("../css/about.scss");
require("../css/pages/rechargejump.scss");
Base.showPage();
let main = {
  data: {
    userInfo: {
      nickName: null
    }
  },
  doms: {
    success: $("#success"),
    failure: $("#failure"),
    failMsg: $("#failMsg"),
    close: $(".close")
  },
  fncs: {
    switch() {
      let flag = Base.getQueryParameter("serviceFlag");
      if (flag === "true") {
        main.doms.success.show();
        $("title").html("充值成功");
      } else {
        main.doms.failure.show();
        Base.getQueryParameter("respMsg")
          ? main.doms.failMsg.text(
              decodeURIComponent(Base.getQueryParameter("respMsg"))
            )
          : main.doms.failMsg.text("");
        $("title").html("充值失败");
      }
    }
  },
  bind() {
    this.doms.close.on("click", function() {
      window.opener = null;
      window.open("", "_self");
      window.close();
    });
  },
  init() {
    this.bind();
    this.fncs.switch();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
  }
};
main.init();
