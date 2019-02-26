import { Base, $ } from "./pub/packages";
require("../css/pages/c.scss");
Base.showPage();
let main = {
  data: {
    userInfo: {
      nickName: null
    },
    scanCode: "",
    timer: null
  },
  doms: {},
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    },
    initFunc() {
      main.fncs.requestNetCodeFunc();
    },
    requestNetCodeFunc() {
      var self = this;
      //二维码
      if (!Base.isLogin()) {
        $.ajax({
          type: "POST",
          headers: Base.initAjaxHeader(0, {}),
          dataType: "json",
          async: false,
          url: "/api/encode",
          success: function(data) {
            if (data.status == 0) {
              $("img#imgCode").attr(
                "src",
                "data:image/png;base64," + data.result.base64Str
              );
              main.data.timer = setInterval(function() {
                main.fncs.loopCheckFunc(data.result.code);
              }, 2000);
            }
          }
        });
      }
    },
    //循环查询手机扫码状态
    loopCheckFunc: function(code) {
      if (!Base.isLogin()) {
        var userInfo = {};
        $.ajax({
          type: "POST",
          headers: Base.initAjaxHeader(0, { code: code }),
          data: {
            code: code
          },
          dataType: "json",
          async: false,
          url: "/api/checkEncodeStatus",
          success: function(data) {
            if (data.status == 0) {
              clearInterval(Scan.timer);
              userInfo = {
                headImg: data.result.headImg,
                nickName: data.result.nickName,
                phone: data.result.phone,
                userName: data.result.userName
              };
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              localStorage.setItem("token", data.result.token);
              localStorage.setItem("IMEI", Utils.creatImeiNumber());
              setTimeout(function() {
                Base.go("myAccount_onlineBank.html");
              }, 2000);
            } else if (data.status != "2743") {
              alert(data.msg);
              clearInterval(Scan.timer);
            }
          }
        });
      }
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
    main.fncs.initFunc();
  }
};
main.init();
