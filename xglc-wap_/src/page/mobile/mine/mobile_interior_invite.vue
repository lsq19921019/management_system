<template>
  <div class="invite">
    <!-- banner -->
    <div class="banner por">
      <img class="banner_img" src="./images/invite_banner2.png" alt="邀请好友享2%返现">
      <p class="time_title">{{toYear}}.{{toMonth}}.1 - {{toYear}}.{{toMonth}}.{{monthLast}}</p>
      <a class="rule_btn dsb poa" href="javascript:;" @click="isShowRule = !isShowRule">活动规则</a>
    </div>
    <!-- 好友投长期 你能赚更多 -->
    <div class="rule por">
      <img src="./images/invite_rule2.jpg" alt>
      <!-- 标题-好友投长期 你能赚更多 -->
      <div class="title">
        <span></span>
        <span>好友投长期 你能赚更多</span>
        <span></span>
      </div>
    </div>
    <!-- 我的邀请记录 -->
    <div class="record por">
      <div class="title">
        <span></span>
        <span>我的邀请记录</span>
        <span></span>
      </div>
      <img src="./images/invite_record_bg.jpg" alt>
      <div class="con">
        <p class="num">{{ redmoneySum }}</p>
        <p>累计已收奖励（元）</p>
        <div class="total">
          <div>
            <p class="num">{{ inviFriCount }}</p>邀请好友（人）
          </div>
          <div>
            <p class="num">{{ waitredmoneySum }}</p>待收奖励（元）
          </div>
        </div>
        <div class="btn">
          <a href="/int_rec">点击查看详情 >></a>
        </div>
      </div>
    </div>
    <!-- 底部banner -->
    <div class="bg por">
      <a
        class="fin"
        :href="'/fin_plan?auditstatus=' + auditstatus + '&userType=' + userType + '&currCollection=' + currCollection"
      ></a>
      <img src="./images/invite_bto_banner.png">
      <!-- 底部说明 -->
      <div class="tips">广告：市场有风险 出借需谨慎
        <br>在法律许可的范围内，本次活动最终解释权归小鸽理财所有。
      </div>
    </div>
    <!-- 底部悬浮按钮 -->
    <div class="btns">
      <a href="javascript:;" @click="activaShare()"></a>
      <a href="javascript:;" @click="isShowEwm = !isShowEwm"></a>
    </div>

    <!-- 规则组件 -->
    <transition name="f2face">
      <inviteRule ref="rule" :rate="rate" v-show="isShowRule" v-on:parentOffRule="offRule"></inviteRule>
    </transition>
    <!-- 我的二维码组件 -->
    <transition name="f2face">
      <inviteEwm ref="ewm" v-show="isShowEwm" v-on:parentOffEwm="offEwm"></inviteEwm>
    </transition>
    <div class="wx_mask" v-show="wxMask">
      <img src="/static/img/wap_invest_share.png">
      <div class="iknow mui-btn" @click="wxMask = !wxMask">我知道啦</div>
    </div>
  </div>
</template>

<script>
import inviteRule from "./components/invite_rule";
import inviteEwm from "./components/invite_ewm";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      rate: 2,
      isShowRule: false,
      isShowEwm: false,
      inviFriCount: 0, //已邀请人数
      redmoneySum: 0, //累计奖励
      waitredmoneySum: 0, //待收奖励
      auditstatus: 0,
      userType: 0,
      currCollection: 0,
      imgStr: "", //我的二维码
      wxMask: false, //是否是微信
      link: "",
      toYear: "",
      toMonth: "",
      monthLast: ""
    };
  },
  components: {
    inviteRule,
    inviteEwm
  },
  beforeMount() {},
  created() {
    this.getAppToken();
  },
  mounted() {
    this.getRuleData();
  },
  methods: {
    //关闭规则弹窗
    offRule() {
      this.isShowRule = false;
    },
    //关闭二维码弹窗
    offEwm() {
      this.isShowEwm = false;
    },
    getRuleData() {
      this.toYear = this.$refs.rule.toYear;
      this.toMonth = this.$refs.rule.toMonth;
      this.monthLast = this.$refs.rule.monthLast;
    },
    //邀请好友
    activaShare: function() {
      let _this = this;

      _this
        .$withApp("postApp", {
          status: 0,
          result: {
            transferName: "jumpToSharing",
            transferData: {
              title: "我在小鸽理财投资很放心，请你一起来领福利！", //分享的标题
              content:
                "小鸽理财已上线银行存管，往期年化15%，还送888元红包，快来看看吧", //分享的内容，对应iOS的descr字段，
              url: _this.link, //分享链接
              icon: "https://wap.xiaogelicai.com/static/img/share_logo.jpg", //分享图标链接
              shareType: "sort", //all全平台,wx微信平台,custom自定义,sort自定义排序
              shareSort: "wechat,circle,qq,weibo,copylink", //按照指定的顺序排序显示 仅限使用 sort自定义排序 时
              copylink: _this.link //复制链接的链接
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              _this.wxMask = true;
            } else {
              location.href = "/appDownload";
            }
          }
        });
    },
    //获取邀请记录
    getRecord() {
      let _this = this;
      this.$http
        .post("/api/activity/invite/inviTotal", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            _this.waitredmoneySum =
              resData.result.summaryEntity.waitredmoneySum;
            _this.inviFriCount = resData.result.summaryEntity.inviFriCount;
            _this.redmoneySum = resData.result.summaryEntity.redmoneySum;
            _this.auditstatus = resData.result.auditstatus;
            _this.userType = resData.result.userType;
            _this.currCollection = resData.result.currCollection;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取token
    getAppToken: function() {
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
            _this.getRecord();
            //_this.wechatReadyShare();
            _this.$refs.ewm.getCode(); //这个子组件会调父组件的wechatReadyShare方法
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            localStorage.setItem("token", dataRes.transferData.token);
            base.data.token = dataRes.transferData.token;
            _this.getRecord();
            //_this.wechatReadyShare();
            _this.$refs.ewm.getCode(); //这个子组件会调父组件的wechatReadyShare方法
          }
        })
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
    regUrl: function(link) {
      var thatData = this;
      var data = {
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
                title: "我在小鸽理财投资很放心，请你一起来领福利！",
                desc:
                  "小鸽理财已上线银行存管，往期年化15%，还送888元红包，快来看看吧",
                link: link,
                imgUrl: "https://wap.xiaogelicai.com/static/img/share_logo.jpg"
              },
              {
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
    },
    find: function(str, cha, num) {
      let x = str.indexOf(cha);
      for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
      }
      return x;
    }
  }
};
</script>

<style lang="scss" scoped>
.invite {
  background: #fff;
  .por {
    position: relative;
  }
  .poa {
    position: absolute;
  }
  .dsb {
    display: block;
  }
  .pt10 {
    padding-top: 0.1rem;
  }
  .pt20 {
    padding-top: 0.2rem;
  }
  img {
    width: 100%;
  }
  padding-bottom: 1rem;
  .banner {
    //height: 11.31rem;
    .rule_btn {
      width: 0.56rem;
      height: 0.65rem;
      padding-top: 0.05rem;
      background: #fff;
      text-align: center;
      border-radius: 0 0 0.28rem 0.28rem;
      right: 0.46rem;
      top: 0;
      color: #2f30c6;
      font-size: 0.2rem;
      line-height: 1.2;
    }
    .banner_img {
      display: block;
    }
    .time_title {
      position: absolute;
      left: 50%;
      top: 3.58rem;
      transform: translateX(-50%);
      color: #fff;
      font-size: 0.3rem;
      line-height: 0.3rem;
      font-weight: bold;
    }
    .time_title::before {
      content: "";
      width: 0.87rem;
      height: 0.12rem;
      position: absolute;
      left: -1.18rem;
      top: 0.07rem;
      background: url(./images/invite_banner_bg_01.png) no-repeat center;
      background-size: contain;
    }
    .time_title::after {
      content: "";
      width: 0.87rem;
      height: 0.12rem;
      position: absolute;
      right: -1.18rem;
      top: 0.07rem;
      background: url(./images/invite_banner_bg_02.png) no-repeat center;
      background-size: contain;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    font-size: 0.4rem;
    line-height: 0.46rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span:nth-child(1) {
      width: 0.5rem;
      background: url(./images/invite_title_left.png) no-repeat;
      height: 0.46rem;
      background-size: 0.5rem 0.46rem;
    }
    span:nth-child(3) {
      width: 0.5rem;
      background: url(./images/invite_title_right.png) no-repeat;
      height: 0.46rem;
      background-size: 0.5rem 0.46rem;
    }
  }

  .rule {
    height: 10.14rem;
  }

  .btns {
    position: fixed;
    width: 100%;
    height: 1rem;
    background: #fff;
    bottom: 0;
    left: 0;
    z-index: 2;
    a {
      display: block;
      float: left;
      width: 2.5rem;
      height: 0.8rem;
      margin-top: 0.1rem;
    }
    a:nth-child(1) {
      background: url(./images/invite_rule_share.png) no-repeat;
      background-size: 2.5rem 0.8rem;
      margin-left: 1rem;
    }
    a:nth-child(2) {
      background: url(./images/invite_rule_ewm.png) no-repeat;
      background-size: 2.5rem 0.8rem;
      float: right;
      margin-right: 1rem;
    }
  }

  .record {
    height: 4.78rem;
    .con {
      width: 5.4rem;
      top: 0.9rem;
      position: absolute;
      left: 50%;
      margin-left: -2.7rem;
      color: #aeaae0;
      font-size: 0.2rem;
      text-align: center;
      .num {
        color: #433e82;
        font-weight: 500;
        font-size: 0.53rem;
      }
      .total {
        height: 1rem;
        padding-top: 0.2rem;
        div {
          width: 45%;
          float: left;
        }
        div:nth-child(2) {
          float: right;
          width: 55%;
        }
      }
      .btn {
        text-align: center;
        padding-top: 0.3rem;
        float: right;
        width: 55%;
        a {
          color: #aeaae0;
        }
      }
    }
  }

  .fin {
    position: absolute;
    width: 6.58rem;
    height: 2.88rem;
    top: 0.17rem;
    left: 0.46rem;
  }

  .tips {
    font-size: 0.2rem;
    line-height: 0.35rem;
    text-align: center;
    color: #905ff4;
    position: absolute;
    width: 100%;
    bottom: 0.65rem;
    left: 0;
  }

  /* 提示微信分享弹窗 */

  .wx_mask {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;
  }

  .wx_mask img {
    display: block;
    width: 100%;
  }

  .wx_mask .iknow {
    position: relative;
    right: -41.5%;
    background: #eb6244;
    border: none;
    width: 90px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    border-radius: 45px;
  }

  .f2face-enter-active,
  .f2face-leave-active {
    transition: opacity 0.3s;
  }

  .f2face-enter,
  .f2face-leave-to {
    opacity: 0;
  }
}
</style>