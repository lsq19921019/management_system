<!--
  create : dxc 2018-12-01
  desc : app 1.5
  update : 
  desc : 
-->
<template>
  <div class="failure">
    <div v-wechat-title="$route.meta.title = titleTip"></div>
    <div class="fail_box">
      <div class="fail_bg"></div>
    </div>
    <div class="suc_text">
      <p>{{tip}}</p>
      <p v-if="respMsg" class="little-text">{{respMsg}}</p>
    </div>
    <div class="back">
      <button class="color" @click="back()">{{btn1}}</button>
      <button v-show="btn2" class="empty" @click="onlyBack()">{{btn2}}</button>
    </div>
    <p class="service">
      {{footerText}}遇到问题？
      <router-link to="/service/serviceIndex">联系客服</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: "",
      titleTip: "",
      id: [
        "recharge",
        "withdrawal",
        "password",
        "unbind",
        "bind",
        "telphone",
        "credit_assignment",
        "authorize",
        "activate",
        "activation",
        "tel_update",
        "verfy",
        "unbund_sub"
      ],
      text: [
        "充值失败",
        "提现申请失败",
        "修改失败",
        "解绑银行卡失败",
        "绑卡失败",
        "变更预留手机号码失败", //无
        "转让申请提交失败", //不走
        "授权失败",
        "开户失败",
        "激活失败",
        "修改手机号码失败",
        "特权开通失败",
        "提交失败"
      ],
      titleText: [
        "充值失败",
        "提现申请失败",
        "修改失败",
        "解绑银行卡失败",
        "绑卡失败",
        "变更预留手机号码失败",
        "转让申请失败",
        "授权失败",
        "开户失败",
        "激活失败",
        "修改手机号码失败",
        "特权开通失败",
        "提交失败"
      ],
      respMsg: "",
      btn1: "返回",
      btn2: "",
      footerText: ""
    };
  },
  components: {},
  beforeCreate() {
    if (
      localStorage.getItem("isActivation") &&
      this.$route.params.tip == "activate"
    ) {
      this.$router.replace({ path: "/re_fail/activation" });
      localStorage.removeItem("isActivation");
    }
  },
  created() {
    this.addText();
    this.hiddenAppBack();
  },
  mounted() {},
  methods: {
    hiddenAppBack() {
      //进入页面先隐藏返回按钮
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
            if (location.getItem("appTableColor")) {
              return thatData.$withApp("takeAppTable", {
                status: 0,
                result: {
                  transferName: "switchTableColor",
                  transferData: {
                    color: location.getItem("appTableColor")
                  }
                },
                msg: "success"
              });
              location.removeItem("appTableColor");
            }
          }
        });
      this.switchBtn();
    },
    switchBtn() {
      //根据特殊情况切换btn文案
      let thatData = this;
      if (thatData.$route.params.tip == "activate") {
        thatData.btn1 = "继续去开户";
        thatData.btn2 = "返回";
        thatData.footerText = "开户";
      } else if (thatData.$route.params.tip == "activation") {
        thatData.btn1 = "继续去激活";
        thatData.btn2 = "返回";
        thatData.footerText = "激活";
      } else if (thatData.$route.params.tip == "recharge") {
        thatData.btn1 = "重新充值";
        thatData.btn2 = "返回";
        thatData.footerText = "充值";
      } else if (thatData.$route.params.tip == "withdrawal") {
        thatData.btn1 = "返回";
        thatData.footerText = "提现";
      }
    },
    back: function() {
      let _this = this;
      //返回按钮（橙色的按钮）点击方法
      if (_this.$route.params.tip == "withdrawal") {
        _this
          .$withApp("takeAppOpen", {
            status: 0,
            result: {
              //transferName: "goToHomePage",
              transferName: "goBack",
              transferData: {
                //pageIndex: "3" //首页为1、产品列表为2、资产为3、我的为4
              }
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
        localStorage.removeItem("userOpenData");
        localStorage.removeItem("userBindData");
        localStorage.removeItem("userRechargeData");
        localStorage.removeItem("userWithMoney");
      } else {
        this.goBackFailed();
      }
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
            //window.history.go(-4);
            this.$router.go(-4);
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
    goBackFailed() {
      //返回app重新操作
      let thatData = this;
      thatData
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "closeAppWebView",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            //window.history.go(-3);
            thatData.$router.go(-3);
          }
        });
    },
    addText: function() {
      var tipId = this.$route.params.tip;
      for (var i = 0; i < this.id.length; i++) {
        if (this.id[i] == tipId) {
          this.tip = this.text[i];
          this.titleTip = this.titleText[i];
        }
      }
      this.$route.query.respMsg
        ? (this.respMsg = decodeURIComponent(this.$route.query.respMsg))
        : (this.respMsg = "");
      tipId == "credit_assignment" ? (this.btn1 = "完成") : this.btn1;
    }
  }
};
</script>
<style lang='scss' scoped>
.failure {
  .fail_box {
    width: 21.33%;
    padding-top: 58px;
    margin: 0 auto;
    .fail_bg {
      width: 100%;
      height: 80px;
      background: url(/static/img/mobile_recharge_fail_01.png) no-repeat center;
      background-size: contain;
    }
  }
  .suc_text {
    padding-top: 0.43rem;
    padding-bottom: 0.84rem;
    p {
      width: 3.68rem;
      margin: auto;
      line-height: 0.4rem;
      font-size: 0.3rem;
      color: #333;
      text-align: center;
    }
    .little-text {
      padding-top: 0.28rem;
      font-size: 0.26rem;
      line-height: 0.4rem;
      color: #999;
      text-align: center;
    }
  }
  .back {
    button {
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
    button.color {
      border: none;
      color: #fff;
      background: linear-gradient(left, #fe7229, #ff5637);
    }
    button.empty {
      margin-top: 0.38rem;
      border: 1px solid #ddd;
      color: #545454;
      background: #fff;
    }
  }
  .service {
    position: fixed;
    bottom: 0.5rem;
    left: 0;
    width: 100%;
    font-size: 0.28rem;
    line-height: 0.3rem;
    text-align: center;
    color: #aaa;
    a {
      color: #ff9c1c;
    }
  }
}
</style>