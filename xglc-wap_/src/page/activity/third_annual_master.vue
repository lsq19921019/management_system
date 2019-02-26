<!--
  create : dxc 2018-11-09
  desc : 三周年活动
  update : 
  desc : 迭代名称-周年庆
--> 
<template>
  <div class="third_master p_r">
    <wap-alert ref="alert"></wap-alert>
    <div class="top_absolute">
      <img src="./images/third_annual_master_02.png">
    </div>
    <div class="active_box">
      <div class="active_title">
        <img src="./images/third_annual_master_03.png">
      </div>
      <div class="active_text">
        <p>活动期间，加入以下G自动服务，可享受相应加息利率,增资部分再享1%年化奖励。</p>
      </div>
      <div class="active_g">
        <div class="mui-row">
          <div class="mui-col-xs-4">
            <router-link :to="'/invest_tenindex/' + masterData.productIds[0]">
              <img src="./images/third_annual_master_04.png">
            </router-link>
          </div>
          <div class="mui-col-xs-4">
            <router-link :to="'/invest_tenindex/' + masterData.productIds[1]">
              <img src="./images/third_annual_master_05.png">
            </router-link>
          </div>
          <div class="mui-col-xs-4">
            <router-link :to="'/invest_tenindex/' + masterData.productIds[2]">
              <img src="./images/third_annual_master_06.png">
            </router-link>
          </div>
        </div>
      </div>
      <div class="active_reward">
        <h5>增资返现奖励</h5>
        <div class="amount">
          <div class="mui-row">
            <div class="mui-col-xs-6">
              <div class="box_s">
                <p>有效增资金额</p>
                <p>{{masterData.addAmount}}元</p>
              </div>
            </div>
            <div class="mui-col-xs-6">
              <div class="box_s">
                <p>预期返现金额</p>
                <p>{{masterData.cashbackAmount}}元</p>
              </div>
            </div>
          </div>
        </div>
        <p class="tips">*增资返现奖励仅限2018年12月2日24时前注册的老用户参与。预期返现金额=增资金额x1%x90/360</p>
        <div class="des_alert">
          <span @click="direc1 = !direc1">返现说明></span>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="active_box">
      <div class="active_title">
        <img src="./images/third_annual_master_07.png">
      </div>
      <div class="active_text">
        <p>活动期间，每邀请一位好友完成首次有效出借，你可领取对应的现金红包。邀请奖励与平台邀请有礼活动可叠加。</p>
      </div>
      <div class="active_table">
        <div class="table_line bg">
          <span class="table_td">好友首投金额</span>
          <span class="table_td">现金奖励</span>
          <span class="table_td">有效出借好友</span>
          <div class="clear"></div>
        </div>
        <div class="table_line">
          <span class="table_td">≥1000元</span>
          <span class="table_td p_r p_left" style="text-align: left;">
            <img src="./images/third_annual_master_08.png">10元
          </span>
          <span class="table_td">{{masterData.loanNum[0]}}人</span>
          <div class="clear"></div>
        </div>
        <div class="table_line bg">
          <span class="table_td">≥10000元</span>
          <span class="table_td p_r p_left" style="text-align: left;">
            <img src="./images/third_annual_master_09.png">60元
          </span>
          <span class="table_td">{{masterData.loanNum[1]}}人</span>
          <div class="clear"></div>
        </div>
        <div class="table_line">
          <span class="table_td">≥50000元</span>
          <span class="table_td p_r p_left" style="text-align: left;">
            <img src="./images/third_annual_master_10.png">180元
          </span>
          <span class="table_td">{{masterData.loanNum[2]}}人</span>
          <div class="clear"></div>
        </div>
      </div>
      <div class="des_alert">
        <span @click="direc2 = !direc2">奖励说明></span>
        <div class="clear"></div>
      </div>
    </div>
    <div class="active_box">
      <div class="active_title">
        <img src="./images/third_annual_master_11.png">
      </div>
      <div class="active_text">
        <p>活动期间，邀请好友帮你助力，助力成功后，你可获得随机现金红包一份，总奖池100000元，先到先得!</p>
      </div>
      <div class="active_bonus">
        <img src="./images/third_annual_master_13.png">
        <p v-if="masterData.getAmount * 1 > 0">已领取{{masterData.getAmount}}元</p>
        <div class="des_alert" style="padding-top:.06rem;padding-bottom:.59rem;">
          <span @click="direc3 = !direc3">奖励说明></span>
          <div class="clear"></div>
        </div>
      </div>
      <div class="active_btn">
        <button @click="alertAppShare()">邀请好友助力</button>
      </div>
    </div>
    <div class="active_rule">
      <h5 class="p_r">周年庆活动规则</h5>
      <p>1、活动时间：2018年12月3日-2018年12月14日</p>
      <p>2、活动对象：所有小鸽理财用户</p>
      <p>3、加息活动、增资返现活动、好友首投有奖活动、助力活动的规则，以上方该活动说明为准。</p>
      <p>4、本活动最终解释权在法律允许范围内归小鸽理财所有。如有疑问请联系小鸽理财微信客服。（客服微信号：xglckf)</p>
    </div>
    <div class="active_footer">
      <img src="./images/third_annual_master_14.png">
    </div>
    <transition name="direc1">
      <div id="direc" v-show="direc1">
        <div class="block"></div>
        <div class="window">
          <img class="close" @click="direc1 = !direc1" src="./images/third_annual_master_17.png">
          <h5>活动规则</h5>
          <div class="window_scroll">
            <p>1. 活动期间，所有用户加入90/180/360天G自动服务，即可享受相应加息利率，加息部分收益将在项目到期后一次性返还。</p>
            <p>2. 增资返现奖励仅限2018年12月2日24时前注册的老用户参与。</p>
            <p>3. 系统将自动统计您在12月3日0时的总待收本金，并与活动结束后的总待收本金进行对比，期间新增充值并出借至90天及以上产品的部分，即可享受90天1%的额外返现。</p>
            <p>4. 增资部分返现金额= 增资金额×1%×90/360</p>
            <p>5. 增资部分不计算新手标、权益标、债权、散标、40天G自动服务。</p>
            <p>6. 增资返现部分将在活动结束后3个工作日内发放</p>
            <p>举个例子：
              <br>小鸽在活动期间新增充值10万元并加入360天服务，到期后预期可获得15250元，其中：产品预期收益=100000×15%=15000元
              <br>增资返现奖励=100000×1%×90/360=250元
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="direc2">
      <div id="direc" v-show="direc2">
        <div class="block"></div>
        <div class="window">
          <img class="close" @click="direc2 = !direc2" src="./images/third_annual_master_17.png">
          <h5>活动规则</h5>
          <div class="window_scroll">
            <p>1. 活动期间，每邀请一位新用户完成首次有效出借，即可享受相应现金奖励。</p>
            <p>2. 好友有效出借为：活动期间，新邀请的好友首次出借新手标、权益标、40/90/180/360天G自动服务达到表格中对应金额，视为有效出借。</p>
            <p>3. 邀请现金奖励将于活动结束后7个工作日内，以现金红包形式发放，用户需开通存管账户方可到帐。</p>
            <p>
              4. 本活动邀请奖励与平台邀请有礼活动可叠加。
              <a :href="masterData.yqyjLink">查看详情>></a>
            </p>
            <p>5. 如有恶意刷取行为，平台将不予发放奖励。</p>
            <p>举个例子：
              <br>小鸽在活动期间邀请了5个好友，每人首次出借均达到1万元，小鸽可获得300元现金奖励。
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="direc3">
      <div id="direc" v-show="direc3">
        <div class="block"></div>
        <div class="window">
          <img class="close" @click="direc3 = !direc3" src="./images/third_annual_master_17.png">
          <h5>活动规则</h5>
          <div class="window_scroll">
            <p>1. 活动期间，点击“邀请好友助力”按钮进行分享，当有2位好友成功助力后你可获得随机现金红包一份，未开户用户需在活动期间开户领取奖励，逾期红包失效。</p>
            <p>2. 好友助力说明：好友通过点击链接、或识别图片二维码进入你的邀请页，显示“助力成功”即表示成功助力。</p>
            <p>3. 好友通过该页面注册，即可成为您的邀请好友。</p>
            <p>4. 单个账户活动期间内仅可帮助别人助力1次，例如A帮B助力，则不可以再帮C助力。</p>
            <p>5. 奖励发放时间：用户完成助力，系统自动发放。</p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="share_tip">
      <div id="share_tip" v-show="shareTip">
        <div class="block" @click="shareTip = !shareTip"></div>
        <div class="window">
          <img src="./images/third_annual_master_18.png">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import wapAlert from "../wap/wap_alert.vue";
export default {
  data() {
    return {
      direc1: false,
      direc2: false,
      direc3: false,
      shareTip: false,
      masterData: {
        productIds: [0, 0, 0],
        loanNum: [0, 0, 0],
        getAmount: 0
      },
      shareImg: ""
    };
  },
  components: {
    wapAlert
  },
  created() {
    // this.shareLinks();
    this.getAppToken();
  },
  mounted() {
    this.checkIpX();
  },
  methods: {
    checkIpX: function() {
      let wi = document.documentElement.clientWidth;
      let he = document.documentElement.clientHeight;
      if (wi == 375 && he >= 690) {
        document.getElementById("app").style.paddingBottom = "0";
      }
    },
    getAppToken() {
      //先找app要token
      let _this = this;
      _this
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
            //wap直接从localStorage拿到token去请求
            _this.postData();
          } else {
            data = JSON.parse(data);
            //从app拿到token
            let dataRes = data.result;
            if (dataRes.transferData.token == "null") {
              return _this.$withApp("takeAppOpen", {
                status: 0,
                result: {
                  transferName: "goToHomePage",
                  transferData: {
                    pageIndex: "3" //首页为1、产品列表为2、资产为3、我的为4
                  }
                },
                msg: "success"
              });
            } else {
              base.data.token = dataRes.transferData.token;
              localStorage.setItem("token", dataRes.transferData.token);
              _this.postData();
            }
          }
        });
    },
    postData: function() {
      let thatData = this;
      this.$http
        .post("/api/activity/anniversaryIndex", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            thatData.masterData = resData.result;
            thatData.postShareImg(resData.result.shareUrl);
            thatData.wechatReadyShare(resData.result.shareUrl);
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //登陆过期 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        });
    },
    postShareImg() {
      let thatData = this;
      let data = {
        urlKey: thatData.masterData.shareUrl
      };
      this.$http
        .post("/api/activity/anniversaryImg", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            thatData.shareImg = resData.result;
          }
        });
    },
    wechatReadyShare(link) {
      this.link = link;
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.regUrl(link);
      } else {
        return false;
      }
    },
    alertAppShare() {
      let thatData = this;

      this.$withApp("postApp", {
        status: 0,
        result: {
          transferName: "jumpToSharing",
          transferData: {
            title: "帮我助力一把，最高领88元现金！", //分享的标题
            content: "小鸽理财3周年庆，好礼放肆送~", //分享的内容，对应iOS的descr字段，
            url:
              location.origin +
              "/activity_jump?wxurl=" +
              thatData.masterData.shareUrl, //分享链接
            icon: location.origin + "/static/img/share_logo_3rd_share.png", //分享图标链接
            shareType: "sort", //all全平台,wx微信平台,custom自定义,sort自定义排序
            //微信 朋友圈 QQ 微博 QQ空间
            shareSort: "wechat,circle,friendimg,circleimg,copylink", //按照指定的顺序排序显示 仅限使用 sort自定义排序 时
            //shareSort: "wechat,circle,copylink", //按照指定的顺序排序显示 仅限使用 sort自定义排序 时
            copylink:
              location.origin +
              "/activity_jump?wxurl=" +
              thatData.masterData.shareUrl,
            friendimg: thatData.shareImg,
            circleimg: thatData.shareImg
          }
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
          thatData.shareTip = !thatData.shareTip;
        } else {
        }
      });
    },
    regUrl: function(link) {
      let thatData = this;
      let data = {
        url: encodeURIComponent(location.href.split("#")[0])
      };

      this.$http
        .post("/api/user/wxSign", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            base.wxShare(
              wx,
              {
                title: "帮我助力一把，最高领88元现金！",
                desc: "小鸽理财3周年庆，好礼放肆送~",
                link: location.origin + "/activity_jump?wxurl=" + link,
                imgUrl: location.origin + "/static/img/share_logo_3rd_share.png"
              },
              {
                debug: false,
                appId: resData.result.appId,
                timestamp: resData.result.timestamp,
                nonceStr: resData.result.noncestr,
                signature: resData.result.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
              }
            );
          } else {
            mui.alert(resData.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.third_master {
  background: #f9f9f9 url(./images/third_annual_master_01.png) no-repeat top
    center;
  background-size: contain;
  padding-top: 4.86rem;
  .top_absolute {
    position: absolute;
    top: 3.72rem;
    left: 0;
    width: 1.75rem;
    img {
      display: block;
      width: 100%;
    }
  }
  .active_box {
    width: 6.95rem;
    margin: 0 auto 0.43rem;
    background: #fff;
    border-radius: 0.12rem;
    box-shadow: 0px 3px 25px 0px rgba(144, 150, 238, 0.3);
    .active_title {
      height: 0.5rem;
      padding-top: 0.57rem;
      img {
        display: block;
        height: 100%;
        margin: auto;
      }
    }
    .active_text {
      padding-top: 0.46rem;
      padding-left: 0.36rem;
      padding-right: 0.36rem;
      p {
        font-size: 0.26rem;
        line-height: 0.36rem;
        color: #727272;
      }
    }
    .active_g {
      padding-top: 0.47rem;
      padding-left: 0.12rem;
      padding-right: 0.12rem;
      .mui-col-xs-4 {
        box-sizing: border-box;
        padding-left: 0.09rem;
        padding-right: 0.09rem;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .active_reward {
      padding-top: 0.72rem;
      h5 {
        font-size: 0.32rem;
        line-height: 0.5rem;
        text-align: center;
        font-weight: normal;
        color: #333;
      }
      .amount {
        padding-top: 0.38rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        .box_s {
          padding-top: 0.35rem;
          margin-left: 0.13rem;
          margin-right: 0.13rem;
          padding-bottom: 0.32rem;
          background: #fff;
          box-shadow: 0px 3px 20px 0px rgba(144, 150, 238, 0.2);
          border-radius: 4px;
          p:nth-child(1) {
            font-size: 0.24rem;
            line-height: 0.43rem;
            text-align: center;
            color: #727272;
          }
          p:nth-child(2) {
            font-size: 0.32rem;
            line-height: 0.48rem;
            text-align: center;
            color: #4e6ce3;
          }
        }
      }
      .tips {
        padding-top: 0.3rem;
        padding-left: 0.32rem;
        padding-right: 0.32rem;
        font-size: 0.2rem;
        line-height: 0.32rem;
        color: #aaa;
      }
    }
    .des_alert {
      padding-top: 0.2rem;
      padding-bottom: 0.73rem;
      span {
        float: right;
        padding-right: 0.32rem;
        font-size: 0.24rem;
        line-height: 0.36rem;
        color: #6c75fe;
      }
    }
    .active_table {
      border: 1px solid #f6f5f5;
      width: 6.53rem;
      margin: 0.44rem auto 0;
      .table_line {
        .table_td {
          float: left;
          box-sizing: border-box;
          font-size: 0.24rem;
          line-height: 0.66rem;
          text-align: center;
          color: #333;
          img {
            position: absolute;
            left: 0.64rem;
            height: 0.64rem;
          }
        }
        .table_td.p_left {
          padding-left: 1.08rem;
        }
        .table_td:nth-child(1) {
          width: 33.38%;
        }
        .table_td:nth-child(2) {
          width: 33.23%;
        }
        .table_td:nth-child(3) {
          width: 33.39%;
        }
      }
      .table_line.bg {
        background: #f4f4fd;
      }
    }
    .active_bonus {
      padding-top: 0.45rem;
      img {
        display: block;
        width: 2.74rem;
        margin: auto;
      }
      p {
        padding-top: 0.24rem;
        font-size: 0.4rem;
        line-height: 0.46rem;
        text-align: center;
        color: #e64c2a;
      }
    }
    .active_btn {
      padding-bottom: 0.8rem;
      text-align: center;
      button {
        border: none;
        width: 6.3rem;
        height: 0.98rem;
        border-radius: 0.44rem;
        background: linear-gradient(top, #62c0f9, #5175e5);
        font-size: 0.32rem;
        color: #fff;
      }
    }
  }
  .active_rule {
    padding-top: 0.6rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    h5 {
      margin-bottom: 0.27rem;
      font-size: 0.34rem;
      line-height: 0.46rem;
      text-align: center;
      color: 333;
    }
    h5::before {
      content: "";
      width: 0.16rem;
      height: 0.03rem;
      background: #070707;
      position: absolute;
      top: 50%;
      left: 1.75rem;
      transform: translateY(-50%);
    }
    h5::after {
      content: "";
      width: 0.16rem;
      height: 0.03rem;
      background: #070707;
      position: absolute;
      top: 50%;
      right: 1.75rem;
      transform: translateY(-50%);
    }
    p {
      padding-bottom: 0.18rem;
      font-size: 0.28rem;
      line-height: 0.36rem;
      color: #555;
    }
  }
  .active_footer {
    padding-top: 0.47rem;
    img {
      display: block;
      width: 100%;
    }
  }
  .p_r {
    position: relative;
  }
  .clear {
    clear: both;
  }
}
#direc {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .block {
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
  .window {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 8.1rem;
    width: 5.98rem;
    box-sizing: border-box;
    background: url(./images/third_annual_master_15.png) no-repeat left top,
      url(./images/third_annual_master_16.png) no-repeat right bottom 0.22rem,
      linear-gradient(top, #c975fe, #9580ff);
    background-size: 1.61rem, 1.02rem, 100% 100%;
    transform: translate(-50%, -50%);
    border-radius: 0.12rem;
    padding-left: 0.36rem;
    padding-right: 0.36rem;
    color: #fff;
    h5 {
      padding-top: 0.53rem;
      padding-bottom: 0.25rem;
      font-size: 0.34rem;
      line-height: 0.46rem;
      text-align: center;
      font-weight: normal;
    }
    .window_scroll {
      height: 6.86rem;
      overflow: scroll;
      p {
        padding-bottom: 0.11rem;
        font-size: 0.24rem;
        line-height: 0.34rem;
        a {
          color: #ffd502;
        }
      }
    }
    .close {
      width: 0.22rem;
      padding: 0.22rem;
      position: absolute;
      right: 0.04rem;
      top: 0.04rem;
    }
  }
}
#share_tip {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .block {
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  .window {
    position: absolute;
    top: 0.43rem;
    right: 0.83rem;
    height: 3.61rem;
    width: 3.12rem;
    img {
      display: block;
      width: 100%;
    }
  }
}
.direc1-enter-active,
.direc1-leave-active {
  transition: opacity 0.3s;
}
.direc1-enter,
.direc1-leave-to {
  opacity: 0;
}
.direc2-enter-active,
.direc2-leave-active {
  transition: opacity 0.3s;
}
.direc2-enter,
.direc2-leave-to {
  opacity: 0;
}
.direc3-enter-active,
.direc3-leave-active {
  transition: opacity 0.3s;
}
.direc3-enter,
.direc3-leave-to {
  opacity: 0;
}
.share_tip-enter-active,
.share_tip-leave-active {
  transition: opacity 0.2s;
}
.share_tip-enter,
.share_tip-leave-to {
  opacity: 0;
}
</style>