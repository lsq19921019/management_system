import { Base, $ } from "./pub/packages";
require("../css/about.scss");
require("../css/pages/june_promotion.scss");
let DES3 = require("./pub/3DES");
let main = {
  data: {
    userInfo: {
      nickName: null
    },
    infoComplate: false,
    sourceType: Base.getQueryParameter("type")
  },
  doms: {},
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    },
    //获取图片验证码
    requestImgFunc(number) {
      var phoneNumber = number || "15888888888";
      if (!Base.isLogin()) {
        $.ajax({
          type: "POST",
          headers: Base.initAjaxHeader(0, { cellphone: phoneNumber }),
          dataType: "json",
          async: true,
          data: { cellphone: phoneNumber },
          url: "/api/img/code",
          success: function(data) {
            if (data.status == 0) {
              $("img#imgCode").attr(
                "src",
                "data:image/png;base64," + data.result
              );
            }
          },
          error: function(err) {
            console.log(err);
          }
        });
      }
    },
    //获取短信验证码
    requestSmsFunc: function(photoCode, phoneNumber) {
      if (!photoCode) return;
      if (!phoneNumber) return;
      var timer;
      var jsonData = {
        imgCode: photoCode,
        cellphone: phoneNumber,
        type: 1
      };
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, jsonData),
        data: jsonData,
        dataType: "json",
        async: false,
        url: "/api/sms/register",
        success: function(data) {
          if (data.status == 0) {
            $("#registerTips").html("");
            main.data.infoComplate = true;
            $("#validateCodeBth").css("pointer-events", "none");
            $("#validateCodeBth").css("background", "#999");
            var i = 60;
            var timer = setInterval(function() {
              $("#validateCodeBth").attr("disabled", true);
              $("#validateCodeBth").html(i + "s");
              if (i == 0) {
                clearInterval(timer);
                $("#validateCodeBth").css("pointer-events", "auto");
                $("#validateCodeBth").css(
                  "background",
                  "linear-gradient(to right, #ff865f , #ff7050)"
                );
                $("#validateCodeBth").attr("disabled", false);
                $("#validateCodeBth").html("重新发送");
              }
              i--;
            }, 1000);
          } else {
            $("#registerTips").html(data.msg);
            main.fncs.requestImgFunc($("input#phoneNumber").val());
          }
        }
      });
    },
    //注册
    registerFunc: function(cellphone, messageCode, password, referrer) {
      var dataJson = {
        cellphone: cellphone,
        code: messageCode,
        password: password,
        sourceType: Base.data.sourceType
      };
      if (referrer) {
        dataJson.referrer = referrer;
      }
      var register = DES3.encrypt(Base.desKey, JSON.stringify(dataJson));

      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(0, { register: register }),
        dataType: "json",
        async: false,
        data: {
          register: register
        },
        url: "/api/user/register",
        success: function(data) {
          if (data.status == "0") {
            var userInfo = {
              headImg: data.result.headImg,
              nickName: data.result.nickName,
              phone: data.result.phone,
              userName: data.result.userName
            };
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            localStorage.setItem("_token", data.result.token);
            Base.go("index_displayPage.html");
          } else {
            alert(data.msg);
            main.fncs.requestImgFunc($("input#phoneNumber").val());
          }
        }
      });
    }
  },
  //单击事件
  clickup() {
    //短信验证码按钮点击
    $("#validateCodeBth").on("click", function() {
      var self = this;
      var errorPart;
      if (
        Base.checkPhone($("input#phoneNumber").val()) &&
        Base.checkPassword($("input#password").val()) &&
        $("input#photoCode").val().length == 4
      ) {
        //输入正确
        main.data.infoComplate = true;
        if (!Base.isLogin()) {
          main.fncs.requestSmsFunc(
            $("input#photoCode").val(),
            $("input#phoneNumber").val()
          );
        }
      } else {
        //输入错误
        main.data.infoComplate = false;
        errorPart = "* 上面信息填写错误,请重新输入";
        $("#registerTips").html(errorPart);
        main.fncs.requestImgFunc($("input#phoneNumber").val());
      }
    });
    //注册按钮点击事件
    $("#registerBtn").on("click", function() {
      if (!Base.isLogin() && main.data.infoComplate) {
        main.fncs.registerFunc(
          $("input#phoneNumber").val(),
          $("input#validateCode").val(),
          $("input#password").val(),
          ""
        );
      } else {
        $("#registerTips").html("请完整填写注册信息");
      }
    });
  },
  bind() {
    $("input#phoneNumber").blur(_ => {
      this.fncs.requestImgFunc($("input#phoneNumber").val());
    });
  },
  init() {
    this.bind();
    this.fncs.initUserInfo();
    this.fncs.requestImgFunc();
    this.clickup();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
    Base.showPage();
    $(function() {
      $(".goReg").on("click", function(event) {
        $("html , body").animate({ scrollTop: 0 }, "slow");
      });
    });
    //点击图片获取新验证码
    $("img#imgCode").on("click", function() {
      main.fncs.requestImgFunc();
    });
  }
};
main.init();
