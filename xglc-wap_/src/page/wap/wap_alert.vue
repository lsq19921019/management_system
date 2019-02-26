<template>
  <div>
    <transition name="tip-escrow">
      <div id="tip-escrow" v-show="tipEscrow">
        <div class="block"></div>
        <div class="window" :class="{ipx:ipX}">
          <div class="img-title">
            <div class="mui-row">
              <div class="mui-col-xs-6">
                <img src="/static/img/logo_xiaoge.png">
              </div>
              <div class="mui-col-xs-6">
                <img src="/static/img/logo_zhongbang.png">
              </div>
            </div>
          </div>
          <div class="text">
            <p class="primary">银行资金存管全新上线</p>
            <p class="secondary">坚守合法合规经营，稳步前行</p>
          </div>
          <div class="btn-line">
            <a @click="goToAppAcOpen(1)" class="mui-btn">{{AcOpenBtn}}</a>
          </div>
        </div>
      </div>
    </transition>
    <transition name="tip-login">
      <div id="tip-login" v-show="tipLogin">
        <div class="block"></div>
        <div class="window" :class="{ipx:ipX}">
          <div class="img-title">
            <img src="/static/img/wap_assets_center_login.png">
          </div>
          <div class="text">
            <p class="primary">注册立享888元红包
              <br>15%年化新手标
            </p>
            <p class="secondary">小鸽理财 & 银行存管</p>
          </div>
          <div class="btn-line">
            <a @click="userLogin()" class="mui-btn">注册/登录</a>
          </div>
        </div>
      </div>
    </transition>
    <div class="alert-box-tip-suc" v-show="sucShow">
      <div class="under"></div>
      <div class="window">
        <div class="coin-img">
          <img src="/static/img/wap_suc.png">
        </div>
        <p>{{suc}}</p>
      </div>
    </div>
    <div class="alert-box-tip-err" v-show="errShow">
      <div class="under"></div>
      <div class="window">
        <div class="coin-img">
          <img src="/static/img/wap_err.png">
        </div>
        <p>{{err}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      suc: "提交成功",
      err: "提交失败",
      AcOpenBtn: "开通存管账户",
      tipEscrow: false,
      tipLogin: false,
      sucShow: false,
      errShow: false,
      ipX: false
    };
  },
  created() {
    this.checkIpX();
  },
  methods: {
    sucS: function() {
      this.sucShow = true;
      var that = this;
      setTimeout(function() {
        that.sucShow = false;
      }, 3190);
    },
    errS: function() {
      this.errShow = true;
      var that = this;
      setTimeout(function() {
        that.errShow = false;
      }, 3190);
    },
    notLogin: function() {
      this.tipLogin = true;
    },
    notAccount: function() {
      this.tipEscrow = true;
      this.AcOpenBtn = "开通存管账户";
    },
    notActivation() {
      this.tipEscrow = true;
      this.AcOpenBtn = "激活存管账户";
    },
    goToAppAcOpen(type) {
      let _this = this;
      _this
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToAppAcOpen",
            transferData: {
              type: type //1=开户 2=激活
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            localStorage.setItem("from", location.href);
            _this.$router.push({ path: "/mine_open_account" });
          } else {
            localStorage.setItem("from", location.href);
          }
        });
    },
    userLogin() {
      localStorage.setItem("from", location.href);
      this.$router.replace({ path: "/start_login" });
    },
    deleteLocalStorage() {
      //先清掉可能冗余的缓存
      localStorage.removeItem("redEnv");
      localStorage.removeItem("cashBack");
      localStorage.removeItem("coupon");
      localStorage.removeItem("token");
      localStorage.removeItem("showAssets");
      localStorage.removeItem("from");
      localStorage.removeItem("expectedData");
      base.data.token = "";
      localStorage.removeItem("userInfoData");
      localStorage.removeItem("userLoginData");
      localStorage.removeItem("userPlanData");
      localStorage.removeItem("userOpenData");
      localStorage.removeItem("userBindData");
      localStorage.removeItem("userRechargeData");
      localStorage.removeItem("userRealName");
      localStorage.removeItem("userCenterData");
      localStorage.removeItem("userType");
      localStorage.removeItem("riskFrom");
      localStorage.removeItem("userLockContinue");
      localStorage.removeItem("appTableColor");
      localStorage.removeItem("isActivation");
      localStorage.removeItem("continueTips");
      localStorage.removeItem("planG");
    },
    loginExpired: function() {
      //服务端判断token过期
      let thatData = this;
      thatData.deleteLocalStorage();
      //启用请求apptoken方法
      thatData
        .$withApp("postApp", {
          status: 0,
          result: {
            transferName: "getTokenFromApp",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            // wap就直接提示重新登录了
            setTimeout(function() {
              mui.toast("登陆已过期，请重新登录", {
                duration: 1000,
                type: "div"
              });
              localStorage.setItem("from", location.href);
              thatData.$router.push({ path: "/start_login" });
            }, 600);
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            if (dataRes.transferData.token == "null") {
              //如果app传回了null 说明app没有登录 刷新页面切换成未登录状态页面
              location.reload();
            } else {
              //传回了token 说明用户更换了帐号 重新保存好 刷新页面
              base.data.token = dataRes.transferData.token;
              localStorage.setItem("token", dataRes.transferData.token);
              location.reload();
            }
          }
        });
    },
    loginSwitchDevice() {
      //服务端判断账号已切换设备
      let thatData = this;
      thatData.deleteLocalStorage();
      mui.toast("登陆已过期，请重新登录", {
        duration: 1000,
        type: "div"
      });
      setTimeout(function() {
        thatData
          .$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goToHomePage",
              transferData: {
                pageIndex: "3" //首页为1、产品列表为2、资产为3、我的为4
              }
            },
            msg: "success"
          })
          .then(data => {
            if (data == "wap") {
              // wap就直接提示重新登录了
              localStorage.setItem("from", location.href);
              thatData.$router.push({ path: "/start_login" });
            } else {
            }
          });
      }, 650);
    },
    checkIpX: function() {
      let wi = document.documentElement.clientWidth;
      let he = document.documentElement.clientHeight;
      if (wi == 375 && he >= 690) {
        this.ipX = true;
        document.getElementById("app").style.paddingBottom = "77px";
      }
    }
  },
  mounted: function() {
    //this.tipsS("吼吼吼嘿嘿嘿")
    //this.sucS()
    //this.errS()
    /*(function() {
      var re = /骚年，你打开控制台想干什么？(눈_눈)/;
      var i = 0;
      console.log(re);

      re.toString = function() {
        return "骚年，你打开控制台想干什么？(눈_눈)";
      };
    })()*/
  }
};
</script>
<style>
@import "../../style/css/wap_toast.css";
</style>
