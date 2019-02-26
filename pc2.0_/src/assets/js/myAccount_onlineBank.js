import { Base, $ } from "./pub/packages";
require("../css/about.scss");
require("../css/pages/myAccount_onlineBank.scss");
Base.showPage();
let main = {
  data: {
    userInfo: {
      nickName: null
    },
    content: []
  },
  doms: {
    rechargeInfo: {
      amount: 0,
      bankCode: ""
      //expectPayCompany: ''
    }
  },
  fncs: {
    //重置userInfo
    initUserInfo() {
      if (sessionStorage.getItem("userInfo")) {
        main.data.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
    },
    clickFunc() {
      //银行列表点击事件
      $("div#bank_iconList>span")
        .not("span#moreBank")
        .on("click", function() {
          var self = this;
          //console.log($(self).data("bankcode"))
          main.doms.rechargeInfo.bankCode = $(self).attr("data-bankCode");
          //main.doms.rechargeInfo.expectPayCompany = $(self).attr('data-companyCode');
          if (
            $(self).data("bankcode") != "QYBK" &&
            !$(self).hasClass("active")
          ) {
            var spanIndex = $("div#bank_iconList>span").index(this);
            $(self).addClass("active");
            $(self)
              .siblings()
              .removeClass("active");
            $(".limit .title").text(
              $(self)
                .children("font")
                .text()
            );
            $(".limit .table").html(main.data.content[spanIndex]);
          } else if (
            $(self).data("bankcode") == "QYBK" &&
            !$(self).hasClass("active")
          ) {
            $(self).addClass("active");
            $(self)
              .siblings()
              .removeClass("active");
            $(".limit .title").text("");
            $(".limit .table").html("");
          }
        });

      //更多银行 点击
      $("#moreBank").on("click", function() {
        $(this).hide();
        $("#comBank").show();
      });

      //立即充值按钮点击效果
      $("button#rechargeBtn").on("click", function() {
        var self = this;
        if (!main.doms.rechargeInfo) {
          alert("请先选择银行");
          return;
        }
        if (
          $("input#rechargeMoney").val() < 10 ||
          !$("input#rechargeMoney").val()
        ) {
          alert("充值额度最低10元");
          return;
        }
        main.doms.rechargeInfo.amount = $("input#rechargeMoney").val();
        if (Base.isLogin()) {
          $.ajax({
            type: "POST",
            headers: Base.initAjaxHeader(1, main.doms.rechargeInfo),
            dataType: "json",
            async: false,
            data: main.doms.rechargeInfo,
            url: "/api/assets/recharge",
            success: function(data) {
              if (data.status == 0) {
                //sessionStorage.setItem("rechargeInfo", data.result.cgtData);
                window.open(data.result.cgtData, "_blank", "");
              } else {
                if (data.msg.indexOf("已失效") > -1) {
                  if (confirm(data.msg)) {
                    Base.signOut(function() {
                      Base.go("index_login.html");
                    });
                  }
                } else {
                  alert(data.msg);
                }
              }
            }
          });
        }
      });
    },
    addBankIconFunc(blankInfoList) {
      for (let i in blankInfoList) {
        main.fncs.appendCellFunc(blankInfoList[i]);
      }
      main.fncs.clickFunc();
      $("span#moreBank")
        .prev()
        .attr({
          id: "comBank"
        });
      $("#bank_iconList span:first").trigger("click");
    },
    appendCellFunc(data) {
      var cell = `<span data-bankCode= ${data.bankCode} data-companyCode= ${
        data.companyCode
      }><font>${data.bankName}</font><img src="${data.logoUrl}"></span>`;
      $("span#moreBank").before(cell);
    },
    requestNetDataFunc() {
      if (Base.isLogin()) {
        $.ajax({
          type: "POST",
          headers: Base.initAjaxHeader(1, {}),
          dataType: "json",
          async: false,
          url: "/api/assets/bankOnlineList",
          success: function(data) {
            if (data.status == 0) {
              for (
                var i = 0;
                i < data.result.bankOnlineResultList.length;
                i++
              ) {
                main.data.content.push(
                  data.result.bankOnlineResultList[i].content
                );
              }
              main.fncs.addBankIconFunc(data.result.bankOnlineResultList);
              $("font#balanceMoney").html(data.result.balance.slice(0, -1));
            } else {
              if (data.msg.indexOf("已失效") > -1) {
                if (confirm(data.msg)) {
                  Base.signOut(function() {
                    Base.go("index.html");
                  });
                }
              } else {
                alert(data.msg);
              }
            }
          }
        });
      }
    }
  },
  bind() {},
  init() {
    this.fncs.initUserInfo();
    this.fncs.requestNetDataFunc();
    //渲染公共头部
    Base.initModules(["footer", "header", "goToTop"], this.data.userInfo);
  }
};
main.init();
