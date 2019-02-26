<template>
  <div>
    <div v-wechat-title="$route.meta.title = titleTip"></div>
    <div class="success">
      <div class="suc_box">
        <div class="suc_bg">
          <div class="suc_center"></div>
        </div>
      </div>
      <div class="suc_text">
        <p>{{tip}}</p>
      </div>
      <p class="little-text" v-show="littleT">客服会在1~2个工作日内电话审核，
        <br>请注意接听
      </p>
      <p class="little-text" v-show="littleR">请开通众邦银行存管账户，以便于进行充值、
        <br>出借等操作及账户资金安全
      </p>
      <p class="little-text" v-show="littleC">若3天内无人购买则自动取消</p>
      <div class="back">
        <button class="color" :class="{'width': littleR }" @click="back()">{{btn1}}</button>
        <button
          v-show="btn2"
          class="empty"
          :class="{'width': littleR }"
          @click="onlyBack()"
        >{{btn2}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tip: "",
      titleTip: "",
      id: [
        "recharge", //充值成功
        "withdrawal", //提现申请成功
        "password", //交易密码修改成功
        "unbind", //解绑银行卡成功
        "bind", //绑卡成功
        "telphone", //变更预留手机号码成功
        "credit_assignment", //转让申请已提交
        "authorize", //授权成功
        "activate", //开户成功
        "activation", //激活成功
        "tel_update", //修改手机号码成功
        "verfy", //特权开通成功
        "unbund_sub", //提交成功
        "register" //注册成功
      ],
      text: [
        "充值成功",
        "提现申请成功",
        "修改成功",
        "解绑银行卡成功",
        "绑卡成功",
        "变更预留手机号码成功", //无
        "转让申请已提交", //不走
        "授权成功",
        "您已开通银行资金存管账户，后续交易更安全",
        "激活成功",
        "修改手机号码成功",
        "特权开通成功",
        "提交成功",
        "注册成功"
      ],
      titleText: [
        "充值成功",
        "提现申请成功",
        "修改成功",
        "解绑银行卡成功",
        "绑卡成功",
        "变更预留手机号码成功",
        "转让申请成功",
        "授权成功",
        "开户成功",
        "激活成功",
        "修改手机号码成功",
        "特权开通成功",
        "提交成功",
        "注册成功"
      ],
      littleT: false,
      littleR: false,
      littleC: false,
      btn1: "完成",
      btn2: "",
      whatPlace: "",
      bundleID: ""
    };
  },
  beforeCreate() {
    if (
      localStorage.getItem("isActivation") &&
      this.$route.params.tip == "activate"
    ) {
      this.$router.replace({ path: "/re_suc/activation" });
      localStorage.removeItem("isActivation");
    }
  },
  created() {
    this.addText();
    this.hiddenBack();
    //this.checkAuthorize();
    //this.checkPassword();
    //this.checkVerfy();
    //this.checkRecharge();
  },
  mounted() {
    $("body").css({
      background: "#fff"
    });
  },
  beforeDestroy() {
    $("body").css({
      background: "#f2f2f2"
    });
  },
  methods: {
    hiddenBack() {
      let thatData = this;
      thatData
        .$withApp("takeAppTable", {
          status: 0,
          result: {
            transferName: "hiddenBackBarButton",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
          } else {
            this.checkVerfy();
            this.checkAccount();
            this.checkBindCard();
          }
        });
    },
    /* checkAuthorize() {
      let thatData = this;
      if (
        thatData.$route.params.tip == "authorize" &&
        !localStorage.getItem("userLoginData")
      ) {
        thatData.$withApp("hiddenBackBarButton", {
          status: 0,
          result: {},
          msg: "success"
        });
      }
    }, */
    /* checkPassword() {
      let thatData = this;
      if (
        thatData.$route.params.tip == "password" &&
        !localStorage.getItem("userLoginData")
      ) {
        thatData.$withApp("hiddenBackBarButton", {
          status: 0,
          result: {},
          msg: "success"
        });
      }
    }, */
    checkVerfy() {
      //如果ios马甲包app内 开通权益标成功 拿取数据
      let thatData = this;
      if (
        thatData.$route.params.tip == "verfy" &&
        !localStorage.getItem("userLoginData") &&
        base.getClientType().type == "iOS"
      ) {
        thatData
          .$withApp("postApp", {
            status: 0,
            result: {
              transferName: "getAppBundleID",
              transferData: {}
            },
            msg: "success"
          })
          .then(data => {
            if (data == "wap") {
            } else {
              data = JSON.parse(data);
              let dataRes = data.result;
              thatData.bundleID = dataRes.transferData.bundleID;
            }
          });
      }
    },
    /* checkRecharge() {
      //如果app内 充值成功 隐藏app左上角返回按钮
      let thatData = this;
      if (
        thatData.$route.params.tip == "recharge" &&
        !localStorage.getItem("userLoginData")
      ) {
        thatData.$withApp("hiddenBackBarButton", {
          status: 0,
          result: {},
          msg: "success"
        });
      }
    }, */
    checkAccount: function() {
      let thatData = this;
      //如果app内 开户成功 调用app方法 得到app页面来源信息
      if (
        (thatData.$route.params.tip == "activate" ||
          thatData.$route.params.tip == "activation") &&
        !localStorage.getItem("userLoginData")
      ) {
        thatData.btn1 = "立即出借";
        thatData.btn2 = "完成";
        thatData
          .$withApp("postApp", {
            status: 0,
            result: {
              transferName: "whatPlaceToHere",
              transferData: {}
            },
            msg: "success"
          })
          .then(data => {
            if (data == "wap") {
            } else {
              data = JSON.parse(data);
              let dataRes = data.result;
              thatData.whatPlace = dataRes.transferData.whatPlace;
            }
          });
      } else if (
        (thatData.$route.params.tip == "activate" ||
          thatData.$route.params.tip == "activation") &&
        localStorage.getItem("userLoginData")
      ) {
        //如果wap内 变换按钮文案显示
        thatData.btn1 = "立即出借";
        thatData.btn2 = "完成";
      }
    },
    checkBindCard: function() {
      //如果app内 绑定银行卡成功 调用app方法 隐藏app左上角返回按钮 显示app右上角完成按钮
      let thatData = this;
      if (
        thatData.$route.params.tip == "bind" &&
        !localStorage.getItem("userLoginData")
      ) {
        thatData.$withApp("takeAppTable", {
          status: 0,
          result: {
            transferName: "completeBindCard",
            transferData: {}
          },
          msg: "success"
        });
        //改变按钮文案
        thatData.btn1 = "去充值";
      }
    },
    back: function() {
      let _this = this;
      //返回按钮（橙色的按钮）点击方法
      if (
        _this.$route.params.tip == "bind" &&
        !localStorage.getItem("userLoginData")
      ) {
        //wap绑卡成功 app调用 跳转app充值页
        localStorage.setItem("from", location.href);
        _this.$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToAppRecharge",
            transferData: {
              amount: "0", //h5定存宝X加入时余额不足 弹窗 充值 带入还需充值差额
              closeWebview: "1" //是否关闭当前webview 1=是
            }
          },
          msg: "success"
        });
      } else if (
        _this.$route.params.tip == "bind" &&
        localStorage.getItem("userLoginData")
      ) {
        _this.$router.push({ path: "/mine_center" });
      } else if (
        _this.$route.params.tip == "recharge" &&
        !localStorage.getItem("userLoginData")
      ) {
        //app去充值
        localStorage.removeItem("from");
        _this.$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goBack",
            transferData: {}
          },
          msg: "success"
        });
      } else if (
        _this.$route.params.tip == "recharge" &&
        localStorage.getItem("userLoginData")
      ) {
        //app去充值
        if (
          localStorage.getItem("from") &&
          (localStorage.getItem("from").indexOf("invest_conftrans") > -1 ||
            localStorage.getItem("from").indexOf("invest_tenindex") > -1 ||
            localStorage.getItem("from").indexOf("new_pri") > -1)
        ) {
          //以上三个地址回3
          history.go(-4);
          localStorage.removeItem("from");
        } else {
          //其他地址回4
          location.href = localStorage.getItem("from");
          localStorage.removeItem("from");
        }
      } else if (
        _this.$route.params.tip == "verfy" &&
        !localStorage.getItem("userLoginData")
      ) {
        //app开通权益标成功 跳转回权益标详情
        if (
          localStorage.getItem("from") &&
          (localStorage.getItem("from").indexOf("invest_tenindex") > -1 ||
            localStorage.getItem("from").indexOf("new_pri") > -1)
        ) {
          history.go(-1);
          //location.href = document.referrer;
        } else {
          _this.$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goBack",
              transferData: {}
            },
            msg: "success"
          });
        }
        localStorage.removeItem("from");
      } else if (
        _this.$route.params.tip == "verfy" &&
        localStorage.getItem("userLoginData")
      ) {
        //app开通权益标成功 跳转回权益标详情
        history.go(-1);
        //location.href = document.referrer;
        localStorage.removeItem("from");
      } else if (
        (_this.$route.params.tip == "activate" ||
          _this.$route.params.tip == "activation") &&
        !localStorage.getItem("userLoginData")
      ) {
        //app开户成功 判断获取到的app页面来源信息进行调用跳转
        if (_this.whatPlace == "productDetail") {
          //来自app产品详情 跳转回app产品详情；
          _this.$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goBack",
              transferData: {}
            },
            msg: "success"
          });
        } else if (
          localStorage.getItem("from") &&
          localStorage.getItem("from").indexOf("invest_tenindex") > -1
        ) {
          _this.$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goBack",
              transferData: {}
            },
            msg: "success"
          });
        } else {
          //app跳转到产品列表
          _this.$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goToBorrowList",
              transferData: {
                productTypeIndex: "1"
              }
            },
            msg: "success"
          });
        }
      } else if (
        (_this.$route.params.tip == "activate" ||
          _this.$route.params.tip == "activation") &&
        localStorage.getItem("userLoginData")
      ) {
        if (
          localStorage.getItem("from") &&
          localStorage.getItem("from").indexOf("invest_tenindex") > -1
        ) {
          //wap开户成功 如果来自产品详情 跳转回产品详情
          location.href = localStorage.getItem("from");
          localStorage.removeItem("from");
        } else {
          //wap开户成功 清空记录来源页面的本地缓存 跳转到产品列表
          localStorage.removeItem("from");
          _this.$router.push({ path: "/product_list" });
        }
      } else if (
        //开通自动授权投标成功 返回3层页面
        _this.$route.params.tip == "authorize" &&
        !localStorage.getItem("userLoginData")
      ) {
        if (
          localStorage.getItem("from") &&
          localStorage.getItem("from").indexOf("invest_conftrans") > -1
        ) {
          localStorage.removeItem("from");
          history.go(-3);
        } else {
          localStorage.removeItem("from");
          _this.$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goBack",
              transferData: {}
            },
            msg: "success"
          });
        }
      } else if (
        _this.$route.params.tip == "authorize" &&
        localStorage.getItem("userLoginData")
      ) {
        if (
          localStorage.getItem("from") &&
          localStorage.getItem("from").indexOf("invest_conftrans") > -1
        ) {
          localStorage.removeItem("from");
          history.go(-3);
        } else {
          localStorage.removeItem("from");
          history.go(-4);
        }
      } else if (
        _this.$route.params.tip == "register" &&
        localStorage.getItem("userLoginData")
      ) {
        _this.$router.replace({ path: "/mine_open_account" });
      } else {
        //wap一般返回 app一般调用返回方法
        _this
          .$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goBack",
              transferData: {}
            },
            msg: "success"
          })
          .then(data => {
            if (data == "wap") {
              let value = localStorage.getItem("from");
              localStorage.removeItem("from");
              if (value) {
                location.href = value;
              } else {
                location.href = "/";
              }
            }
          });
      }
      localStorage.removeItem("userOpenData");
      localStorage.removeItem("userBindData");
      localStorage.removeItem("userRechargeData");
      localStorage.removeItem("userWithMoney");
    },
    onlyBack() {
      //返回按钮（白色的按钮） wap返回 app调用返回方法
      this.$withApp("takeAppOpen", {
        status: 0,
        result: {
          transferName: "goBack",
          transferData: {}
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
          let value = localStorage.getItem("from");
          localStorage.removeItem("from");
          if (value) {
            location.href = value;
          } else {
            location.href = "/";
          }
        }
      });
      localStorage.removeItem("userOpenData");
      localStorage.removeItem("userBindData");
      localStorage.removeItem("userRechargeData");
      localStorage.removeItem("userWithMoney");
    },
    addText: function() {
      var tipId = this.$route.params.tip;
      for (var i = 0; i < this.id.length; i++) {
        if (this.id[i] == tipId) {
          this.tip = this.text[i];
          this.titleTip = this.titleText[i];
        }
      }
      if (tipId == "unbund_sub") {
        this.littleT = true;
      } else if (tipId == "register") {
        this.littleR = true;
        this.btn1 = "开通银行存管账户";
        this.btn2 = "跳过";
      }
      if (tipId == "credit_assignment") {
        this.littleC = true;
        this.btn1 = "完成";
      }
    }
  }
};
</script>
<style lang="css" scoped>
.success .suc_box {
  width: 21.33%;
  padding-top: 58px;
  margin: 0 auto;
}

.success .suc_box .suc_bg {
  width: 100%;
  height: 80px;
  background: url(/static/img/mobile_recharge_suc_01.png) no-repeat center;
  background-size: contain;
}

.success .suc_box .suc_bg .suc_center {
  width: 51.9%;
  height: 80px;
  margin: 0 auto;
  background: url(/static/img/mobile_recharge_suc_02.png) no-repeat center;
  background-size: contain;
  animation: suc 0.3s linear;
}

.success .suc_text {
  padding-top: 0.43rem;
  padding-bottom: 0.84rem;
}

.success .suc_text p {
  width: 3.68rem;
  margin: auto;
  line-height: 0.4rem;
  font-size: 0.3rem;
  color: #333;
  text-align: center;
}

.success .little-text {
  font-size: 14px;
  line-height: 22px;
  color: #999;
  text-align: center;
  padding-bottom: 20px;
}

.success .back button {
  display: block;
  outline: none;
  width: 37.3%;
  margin: auto;
  height: 0.88rem;
  font-size: 16px;
  border: none;
  border-radius: 0.44rem;
  text-align: center;
}

.success .back button.color {
  border: none;
  color: #fff;
  background: linear-gradient(left, #fe7229, #ff5637);
}

.success .back button.empty {
  margin-top: 0.38rem;
  border: 1px solid #ddd;
  color: #545454;
  background: #fff;
}

.success .back button.width {
  width: 5.7rem;
}

.success .back button.empty.width {
  background: none;
}

@keyframes suc {
  0% {
    width: 0;
  }

  100% {
    width: 51.9%;
  }
}
</style>
