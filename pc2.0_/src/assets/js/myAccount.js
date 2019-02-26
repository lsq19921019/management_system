import { Base, $ } from "./pub/packages";
require("../css/pages/myAccount.scss");
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
    },
    requestNetDataFunc() {
      if (Base.isLogin()) {
        console.log(Base.initAjaxHeader(1, {}));
        $.ajax({
          type: "POST",
          headers: Base.initAjaxHeader(1, {}),
          dataType: "json",
          async: false,
          url: "/api/assets/index",
          success: function(data) {
            if (data.status == 0) {
              $("div#balanceMoney").html(data.result.usableSum);
              sessionStorage.setItem("userInfos", JSON.stringify(data.result));
            } else {
              if (data.msg.indexOf("已失效") > -1) {
                if (confirm(data.msg)) {
                  Base.signOut(function() {
                    Base.go("index_login.html");
                  });
                }
              } else {
                if (data.msg.indexOf("未开通") > -1) {
                  if (confirm(data.msg)) {
                    Base.go("index_displayPage.html?notOpenOlineBank=1");
                  } else {
                    Base.go("index_displayPage.html?notOpenOlineBank=1");
                  }
                } else {
                  alert(data.msg);
                }
              }
            }
          },
          error: function(err) {
            console.error(err);
          }
        });
      }
    },
    onclick() {
      $(".myacc3").click(function() {
        window.location.href = "myAccount_payPage.html";
      });
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    this.fncs.requestNetDataFunc();
    this.fncs.onclick();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
  }
};
main.init();
