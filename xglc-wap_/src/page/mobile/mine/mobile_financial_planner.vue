<template>
  <div>
    <div v-if="userType == 2" v-wechat-title="$route.meta.title = '金牌理财师'"></div>
    <div v-else v-wechat-title="$route.meta.title = '理财师养成计划'"></div>
    <div class="financial" id="fin">
      <div class="header-img">
        <div class="into-rule" @click="rule=!rule">
          <span>查看规则</span>
        </div>
        <div class="header_title">
          <img class="img_title" v-show="userType != 2" src="/static/img/financial_02.png">
          <p class="hello" v-show="userType == 2">你好，{{userName}}理财师!</p>
          <p
            class="active_time"
          >活动时间: {{toYear}}年{{toMonth}}月1日-{{toYear}}年{{toMonth}}月{{monthLast}}日</p>
        </div>
        <img class="img_bg" src="/static/img/financial_01.png">
      </div>
      <div class="not_financial" v-if="userType != 2">
        <div class="not_tips">
          <p>很抱歉，您当前不是理财师！</p>
        </div>
        <div class="center_chart">
          <div class="center_title">
            <p>成为理财师，享三重好礼</p>
          </div>
          <div class="center_1">
            <p class="num_title">
              <span>1</span>首次见面礼
            </p>
            <p class="num_text">
              首次成为理财师，可免费获得理财师见面礼一份！
              <span style="color:#828181;">(直接发放至账户)</span>
            </p>
            <img class="gift_img" src="/static/img/financial_05.png">
          </div>
          <div class="center_2">
            <p class="num_title">
              <span>2</span>一起拿好礼
            </p>
            <p class="num_text">通过理财师邀请注册成功后，理财师和好友均可获得1%加息券一张。</p>
            <img class="gift_img" src="/static/img/financial_06.png">
          </div>
          <div class="center_3">
            <p class="num_title">
              <span>3</span>最高享3%返现奖励
            </p>
            <p class="num_text">根据理财师等级，可享受对应理财师等级的返现比例，多邀多得，上不封顶！</p>
            <img class="chart_img" src="/static/img/financial_07.png">
          </div>
        </div>
      </div>
      <div class="already_financial" v-else>
        <div class="invite_data">
          <div class="invite_title">
            <p>我的邀请记录</p>
          </div>
          <div class="data_card">
            <div class="total_money">
              <p>{{redmoneySum}}</p>
              <p>累计已收奖励（元）</p>
            </div>
            <div class="total_line mui-row">
              <div class="left mui-col-xs-6">
                <p>{{inviFriCount}}</p>
                <p>邀请好友（人）</p>
              </div>
              <div class="right mui-col-xs-6">
                <p>
                  {{waitredmoneySum}}
                  <img
                    @click="rewardAlert()"
                    src="/static/img/wap_invest_confir_transfer_03.png"
                  >
                </p>
                <p>当月应收奖励（元）</p>
              </div>
              <div class="clear"></div>
            </div>
            <div class="to_details">
              <a href="/int_rec">点击查看详情 >></a>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="invite_gift">
          <div class="invite_title">
            <p>邀请领好礼</p>
          </div>
          <div class="gift_text">
            <p>通过理财师邀请的链接注册成功后，理财师和好友均可得到1%加息券一张。</p>
          </div>
          <div class="gift_img">
            <img src="/static/img/financial_12.png">
          </div>
        </div>
      </div>
      <div class="footer-tips">
        <p>广告：市场有风险 出借需谨慎
          <br>本活动最终解释权归小鸽理财所有
        </p>
      </div>
      <div class="footer_btn">
        <div class="submit_apply" v-if="userType != 2">
          <span @click="checkPending()" v-show="auditstatus != 1">我要申请理财师</span>
          <span @click="tips = !tips" v-show="auditstatus == 1">申请受理中</span>
        </div>
        <div class="share_btn mui-row" v-else>
          <span class="mui-col-xs-6 btn_box right_line" @click="activaShare()">
            <img src="/static/img/financial_08.png">分享邀请
          </span>
          <span class="mui-col-xs-6 btn_box" @click="f2face=!f2face">
            <img src="/static/img/financial_09.png">我的二维码
          </span>
        </div>
      </div>
      <transition name="rule">
        <div id="rule" v-show="rule">
          <div class="close" @click="rule=!rule,openRuleBtn = false">
            <img src="/static/img/financial_close.png">
          </div>
          <div class="block"></div>
          <div class="window">
            <div class="rule-title">
              <h5>理财师规划</h5>
            </div>
            <div class="rule-center">
              <div>
                <span class="s_title">1</span>
                <p>活动时间：{{toYear}}年{{toMonth}}月1日-2018年{{toMonth}}月{{monthLast}}日。</p>
                <div class="clear"></div>
              </div>
              <div>
                <span class="s_title">2</span>
                <p>申请理财师准入条件：当前待收≥1万元（不限标的）。</p>
              </div>
              <div>
                <span class="s_title">3</span>
                <p>理财师等级划分规则
                  <br>成为理财师后，根据活动期间邀请的所有好友，每个好友每个月最后5天平均待收金额之和，划分不同等级，您可以享受对应最高等级的返现比例，多邀多得，上不封顶！
                </p>
              </div>
              <div class="tab_img">
                <img src="/static/img/financial_13.png">
              </div>
              <p
                style="width:100%;color:#828181;"
              >举个例子：您申请成为理财师后，在活动期间共邀请了好友A和好友B，好友A在月末5天的平均待收为50万，好友B在月末5天的平均待收为10万，那么您的好友月末5天平均待收之和为60万，根据返现比例划分，您享受好友每笔有效出借3%返现。</p>
              <div>
                <span class="s_title">4</span>
                <p>提成奖励计算公式：
                  <br>提成奖励=好友有效投资金额×投资期限（天）/360×返现比例
                  <br>提成奖励=好友有效投资金额×投资期限（月）/12×返现比例
                  <br>*好友的有效投资不包括新手标、权益标
                </p>
              </div>
              <div>
                <span class="s_title">5</span>
                <p>理财师享受好友1年内有效出借返现奖励（自好友注册之日开始计算），若理财师身份失效则不再享受理财师等级返现。</p>
              </div>
              <div>
                <span class="s_title">6</span>
                <p>返现奖励按月分期发放，好友投资成功次月开始每月5号发放至您的“可用余额”中（如未开通银行存管账户，则无法发放）。</p>
              </div>
              <div>
                <span class="s_title">7</span>
                <p>若好友对已投项目已成功进行债权转让,则邀请人无法继续享受该笔投资剩余提成奖励。</p>
              </div>
              <div>
                <span class="s_title">8</span>
                <p>好友连续2个月月末5天平均待收之和＜10万元，则理财师资格将于次月2日失效</p>
              </div>
              <p style="width:100%;color:#999">在法律许可的合法范围内，本活动最终解释权归小鸽理财所有。</p>
            </div>
          </div>
          <div v-show="openRuleBtn" class="rule_btn" @click="doJoin()">
            <p>我已阅读并确认</p>
          </div>
        </div>
      </transition>
      <transition name="f2face">
        <div id="face-2-face" v-show="f2face">
          <div class="close" @click="f2face=!f2face">
            <img src="/static/img/financial_close.png">
          </div>
          <div class="block"></div>
          <div class="window">
            <div class="d2-title">
              <p>我的专属二维码</p>
            </div>
            <div class="left"></div>
            <div class="right"></div>
            <img :src="base64Str">
            <div class="d2-tip">
              <p>该二维码七天内有效，重新进入将更新</p>
            </div>
          </div>
        </div>
      </transition>
      <transition name="bomb">
        <div id="bomb" v-show="tips">
          <div class="block"></div>
          <div class="window">
            <div class="bomb_center">
              <div class="thank_q">
                <p class>感谢您申请理财师！请添加客服微信以便进一步的核实，核实通过就意味着您正式成为小鸽理财理财师！</p>
              </div>
              <div class="kf_wx">
                <p>
                  客服微信号：xglckf
                  <span class="copyBtn" @click="copy()">复制</span>
                </p>
              </div>
              <div class="tips">
                <p>*节假日微信核实统一在下一个工作日进行</p>
              </div>
              <!-- <div v-if="!hideBtn" @click="openWechat()" class="addWechat">
                                <button>前往添加客服微信</button>
              </div>-->
              <div class="bomb_title">
                <p>如何添加客服微信</p>
              </div>
              <div class="process">
                <p>点击“复制”客服微信号，打开微信</p>
                <p>点击微信右上角“+”号，点击“添加朋友”</p>
                <p style="padding-bottom:.28rem;">在查找框内粘贴刚才复制的微信号，您也可以直接输入“xglckf”，进行搜索</p>
                <p style="padding-bottom:1.5rem;">点击添加好友，等待客服审核，预计下一个工作日审核完成</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="wx_mask" v-show="wxMask">
        <img src="/static/img/wap_invest_share.png">
        <div class="iknow mui-btn" @click="wxMask = !wxMask">我知道啦</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as clipboard from "clipboard-polyfill";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      rule: false,
      f2face: false,
      tips: false,
      openRuleBtn: false,
      base64Str: "",
      code: "",
      userType: "",
      token: "",
      auditstatus: "",
      currCollection: "",
      hideBtn: false,
      toYear: "",
      toMonth: "",
      monthLast: "",
      //version: "",
      wxMask: false,
      redmoneySum: "",
      inviFriCount: "",
      waitredmoneySum: "",
      urlLink: "",
      userName: ""
    };
  },
  created() {
    this.getCurrentMonthLast();
    this.getAppToken();
  },
  mounted: function() {
    this.autoHeight();
    //this.wechatReadyShare();
  },
  methods: {
    rewardAlert() {
      mui.alert(
        "<p style='text-align: center;'>1、每月1日，自动更新当月应收奖励；<br>2、每月5日，当月应收奖励将会以现金红包形式发放到您的可用余额</p>",
        " ",
        "我知道了"
      );
    },
    checkPending() {
      if (this.currCollection && this.currCollection * 1 >= 10000) {
        this.rule = !this.rule;
        this.openRuleBtn = true;
      } else {
        mui.alert(
          "对不起，您当前不符合理财师申请条件，请阅读理财师规则后再试。",
          " "
        );
      }
    },
    openWechat() {
      let _this = this;
      _this.$withApp("takeAppOpen", {
        status: 0,
        result: {
          transferName: "openWxLauncher",
          transferData: {}
        },
        msg: "success"
      });
    },
    copy() {
      clipboard.writeText("xglckf");
      mui.toast("复制成功，快去微信添加吧", { duration: 1000, type: "div" });
    },
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
              url: _this.urlLink, //分享链接
              icon: "https://wap.xiaogelicai.com/static/img/share_logo.jpg", //分享图标链接
              shareType: "sort", //all全平台,wx微信平台,custom自定义,sort自定义排序
              shareSort: "wechat,circle,qq,weibo,copylink", //按照指定的顺序排序显示 仅限使用 sort自定义排序 时
              copylink: _this.urlLink //复制链接的链接
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
    find: function(str, cha, num) {
      let x = str.indexOf(cha);
      for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
      }
      return x;
    },
    getCurrentMonthLast: function() {
      let thatData = this;
      var date = new Date();
      thatData.toYear = date.getFullYear();
      var currentMonth = date.getMonth();
      thatData.toMonth = currentMonth + 1;
      var nextMonth = ++currentMonth;
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      var oneDay = 1000 * 60 * 60 * 24;
      thatData.monthLast = new Date(nextMonthFirstDay - oneDay).getDate();
    },
    userTypeNum: function() {
      this.auditstatus = this.$route.query.auditstatus;
      this.userType = this.$route.query.userType;
      this.currCollection = this.$route.query.currCollection;
      if (this.auditstatus == 1) {
        //申请受理中，开启加微信弹窗
        this.tips = true;
      }
      if (this.userType == 2) {
        //已经是理财师，可以邀请好友和面对面二维码
        this.getRecord(); //获取邀请详细数据
        //_this.wechatReadyShare();
        this.getCode(); //这个方法后续会调用wechatReadyShare方法
      }
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
            _this.userTypeNum();
            _this.hideBtn = true;
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            localStorage.setItem("token", dataRes.transferData.token);
            base.data.token = dataRes.transferData.token;
            _this.userTypeNum();
          }
        })
    },
    doJoin: function() {
      let thatData = this;
      var data = {
        token: localStorage.getItem("token")
      };

      this.$http
        .post("/api/user/joinPlanner", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            thatData.tips = true;
            thatData.auditstatus = "1";
          } else if (resData.status == "6005") {
            mui.alert("您已成为理财师");
          } else if (resData.status == "6006") {
            mui.alert("您尚未开户，请开户再试");
          } else if (resData.status == "6008") {
            mui.alert("您的申请我们正在审核哦，敬请等待");
          } else if (resData.status == "6009") {
            mui.alert("加入失败，您的加入条件尚不满足");
          } else if (resData.status == "-3") {
            mui.alert("页面已过期，请您重新进入");
          } else {
            mui.alert(resData.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCode: function() {
      //获取二维码
      var thatData = this;

      this.$http
        .post("/api/user/inviteFriendCode", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.base64Str =
              "data:img/png;base64," + resData.result.base64Str;
            thatData.code = resData.result.code.replace(
              /^(\d{3})\d{4}(\d+)/,
              "$1****$2"
            );
            thatData.wechatReadyShare(resData.result.shareInviteFriendLink);
          } else {
            mui.alert(resData.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
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
            _this.userName = resData.result.userName;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    wechatReadyShare(link) {
      let thatData = this;
      thatData.urlLink = link;
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
    autoHeight: function() {
      let height = document.documentElement.clientHeight;
      document.getElementById("fin").style.minHeight = height + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}

.clear {
  width: 100%;
  clear: both;
}

.financial {
  background: #ffe6b2;
  padding-bottom: 0.83rem;
  .header-img {
    position: relative;
    .header_title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      .img_title {
        width: 5.22rem;
        padding-top: 0.57rem;
        padding-bottom: 0.2rem;
      }
      .hello {
        font-size: 0.54rem;
        line-height: 0.99rem;
        color: #f85f0a;
        padding-top: 0.62rem;
      }
      .active_time {
        font-size: 0.22rem;
        line-height: 0.28rem;
        color: #f85f0a;
      }
    }
    .img_bg {
      display: block;
      width: 100%;
    }
    .into-rule {
      position: absolute;
      top: 0;
      right: 0.32rem;
      width: 0.54rem;
      height: 0.71rem;
      z-index: 1;
      background: #fff;
      border-bottom-left-radius: 0.27rem;
      border-bottom-right-radius: 0.27rem;
      span {
        display: block;
        padding-top: 0.07rem;
        padding-left: 0.03rem;
        font-size: 0.2rem;
        line-height: 0.22rem;
        color: #d09330;
      }
    }
  }
  .not_financial {
    width: 7.12rem;
    margin: auto;
    .not_tips {
      p {
        font-size: 0.28rem;
        line-height: 0.8rem;
        color: #f85f0a;
        text-align: center;
      }
    }
    .center_chart {
      background: #fff;
      border-radius: 0.06rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      .center_title {
        padding-top: 0.65rem;
        padding-bottom: 0.57rem;
        p {
          font-size: 0.38rem;
          line-height: 0.5rem;
          color: #f85f0a;
          text-align: center;
          position: relative;
        }
        p::before {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_03.png) no-repeat center;
          background-size: cover;
        }
        p::after {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_04.png) no-repeat center;
          background-size: contain;
        }
      }
      .num_title {
        font-size: 0.32rem;
        line-height: 0.38rem;
        color: #f85f0a;
        padding-bottom: 0.28rem;
        span {
          font-size: 0.22rem;
          line-height: 0.3rem;
          text-align: center;
          display: inline-block;
          position: relative;
          top: -0.03rem;
          width: 0.3rem;
          height: 0.3rem;
          color: #fff;
          background: #f85f0a;
          border-top-left-radius: 0.15rem;
          border-bottom-left-radius: 0.15rem;
          border-bottom-right-radius: 0.15rem;
          margin-right: 0.2rem;
        }
      }
      .num_text {
        font-size: 0.28rem;
        line-height: 0.32rem;
        color: #545454;
        padding-bottom: 0.38rem;
      }
      .gift_img {
        display: block;
        width: 3.27rem;
        margin: auto;
        padding-bottom: 0.8rem;
      }
      .chart_img {
        display: block;
        width: 100%;
        padding-bottom: 0.8rem;
      }
    }
  }
  .already_financial {
    width: 7.12rem;
    margin: auto;
    padding-top: 0.28rem;
    .invite_data {
      background: #fff;
      border-radius: 0.06rem;
      padding-left: 0.27rem;
      padding-right: 0.27rem;
      padding-bottom: 0.37rem;
      margin-bottom: 0.36rem;
      .invite_title {
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        p {
          font-size: 0.38rem;
          line-height: 0.5rem;
          color: #f85f0a;
          text-align: center;
          position: relative;
        }
        p::before {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          left: 1.46rem;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_03.png) no-repeat center;
          background-size: cover;
        }
        p::after {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          right: 1.46rem;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_04.png) no-repeat center;
          background-size: contain;
        }
      }
      .data_card {
        border: 1px solid #fee7da;
        background: #fff6f1;
        text-align: center;
        position: relative;
        .total_money {
          padding-top: 0.4rem;
          padding-bottom: 0.21rem;
          p:nth-child(1) {
            font-size: 0.53rem;
            line-height: 0.67rem;
            font-weight: bold;
            color: #3b3b3b;
          }
          p:nth-child(2) {
            font-size: 0.2rem;
            line-height: 0.34rem;
            color: #555;
          }
        }
        .total_line {
          text-align: center;
          padding-bottom: 0.43rem;
          .left {
            p:nth-child(1) {
              font-size: 0.36rem;
              line-height: 0.43rem;
              color: #3b3b3b;
              font-weight: bold;
            }
            p:nth-child(2) {
              font-size: 0.2rem;
              line-height: 0.34rem;
              color: #555;
            }
          }
          .right {
            p:nth-child(1) {
              font-size: 0.36rem;
              line-height: 0.43rem;
              color: #3b3b3b;
              font-weight: bold;
            }
            p:nth-child(2) {
              font-size: 0.2rem;
              line-height: 0.34rem;
              color: #555;
            }
            img {
              width: 0.24rem;
              position: relative;
              top: -0.02rem;
              margin-left: 0.08rem;
            }
          }
        }
        .to_details {
          padding-bottom: 0.2rem;
          a {
            font-size: 0.2rem;
            line-height: 0.36rem;
            color: #3b3b3b;
            float: right;
            margin-right: 0.33rem;
          }
        }
      }
      .data_card::before {
        content: "";
        width: 0.16rem;
        height: 0.36rem;
        background: url(/static/img/financial_10.png) no-repeat center;
        background-size: contain;
        position: absolute;
        left: -1px;
        top: 1.3rem;
      }
      .data_card::after {
        content: "";
        width: 0.16rem;
        height: 0.36rem;
        background: url(/static/img/financial_11.png) no-repeat center;
        background-size: contain;
        position: absolute;
        right: -1px;
        top: 1.3rem;
      }
    }
    .invite_gift {
      background: #fff;
      border-radius: 0.06rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-bottom: 0.84rem;
      .invite_title {
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        p {
          font-size: 0.38rem;
          line-height: 0.5rem;
          color: #f85f0a;
          text-align: center;
          position: relative;
        }
        p::before {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          left: 1.4rem;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_03.png) no-repeat center;
          background-size: cover;
        }
        p::after {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          right: 1.4rem;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_04.png) no-repeat center;
          background-size: contain;
        }
      }
      .gift_text {
        padding-bottom: 0.58rem;
        p {
          font-size: 0.28rem;
          line-height: 0.36rem;
          color: #545454;
        }
      }
      .gift_img {
        img {
          display: block;
          width: 3.4rem;
          margin: auto;
        }
      }
    }
  }
  .footer-tips {
    padding-top: 0.55rem;
    padding-bottom: 0.55rem;
    p {
      font-size: 0.24rem;
      line-height: 0.3rem;
      color: #a66c3a;
      text-align: center;
      opacity: 0.3;
    }
  }
  .footer_btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .submit_apply {
      background: linear-gradient(left, #ff8f53, #fe6b37);
      span {
        display: block;
        font-size: 0.3rem;
        line-height: 0.83rem;
        color: #fff;
        text-align: center;
      }
    }
    .share_btn {
      background: linear-gradient(left, #ff8f53, #fe6b37);
      .btn_box {
        text-align: center;
        display: block;
        font-size: 0.3rem;
        line-height: 0.98rem;
        color: #fff;
        img {
          width: 0.41rem;
          margin-right: 0.12rem;
          position: relative;
          top: 0.05rem;
        }
      }
      .right_line {
        position: relative;
      }
      .right_line::after {
        content: "";
        width: 0.02rem;
        height: 0.38rem;
        background: #f2d7c2;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

/* 申请成功弹窗 */

#bomb {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .block {
    background: #ffe6b2;
    width: 100%;
    height: 100%;
  }
  .window {
    position: absolute;
    top: 0.94rem;
    left: 50%;
    height: 81.45%;
    width: 96.27%;
    box-sizing: border-box;
    transform: translateX(-50%);
    border-radius: 0.08rem;
    overflow: scroll;
    padding-left: 0.36rem;
    padding-right: 0.36rem;
    background: #fff;
    .bomb_center {
      p {
        font-size: 0.3rem;
        line-height: 0.36rem;
        color: #333;
      }
      .thank_q {
        padding-top: 0.57rem;
        padding-bottom: 0.25rem;
      }
      .kf_wx {
        padding-bottom: 0.2rem;
        .copyBtn {
          padding-left: 0.33rem;
          color: #fe7841;
          text-decoration: underline;
        }
      }

      .tips {
        padding-bottom: 0.62rem;
        p {
          font-size: 0.24rem;
          color: #aaa;
        }
      }
      .addWechat {
        text-align: center;
        button {
          width: 3.62rem;
          height: 0.8rem;
          border-radius: 0.4rem;
          border: none;
          background: linear-gradient(left, #ff8f53, #fe6b37);
          color: #fff;
          font-size: 0.3rem;
          box-shadow: 0 0.02rem 0.12rem rgba(254, 108, 56, 0.3);
        }
      }
      .bomb_title {
        padding-top: 1.36rem;
        padding-bottom: 0.57rem;
        p {
          font-size: 0.38rem;
          line-height: 0.5rem;
          color: #f85f0a;
          text-align: center;
          position: relative;
        }
        p::before {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_03.png) no-repeat center;
          background-size: cover;
        }
        p::after {
          content: "";
          height: 0.22rem;
          width: 0.56rem;
          position: absolute;
          right: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          background: url(/static/img/financial_04.png) no-repeat center;
          background-size: contain;
        }
      }
      .process {
        padding-left: 0.55rem;
        background: url(/static/img/financial_14.png) no-repeat left top;
        background-size: 0.4rem auto;
        p {
          line-height: 0.4rem;
          padding-bottom: 0.68rem;
        }
        p:last-child {
          padding-bottom: 0;
        }
      }
    }
  }
}

/* 二维码弹窗 */

#face-2-face {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
  z-index: 9;
  .block {
    width: 100%;
    height: 100%;
    background: #ffe6b2 url(/static/img/f2f_bg_01.png) center top no-repeat;
    background-size: contain;
  }
  .window {
    position: absolute;
    top: 54%;
    left: 50%;
    width: 5.52rem;
    height: 6.53rem;
    background: #fff;
    transform: translate(-50%, -50%);
    .d2-title {
      padding-top: 0.52rem;
      padding-bottom: 0.52rem;
      p {
        font-size: 0.3rem;
        line-height: 0.36rem;
        color: #4d4d4d;
        text-align: center;
      }
    }
    .left {
      position: absolute;
      left: -1px;
      top: 0.98rem;
      width: 0.26rem;
      height: 0.48rem;
      background: #f7e8cb;
      border-top-right-radius: 0.24rem;
      border-bottom-right-radius: 0.24rem;
    }
    .right {
      position: absolute;
      right: -1px;
      top: 0.98rem;
      width: 0.26rem;
      height: 0.48rem;
      background: #f7e8cb;
      border-top-left-radius: 0.24rem;
      border-bottom-left-radius: 0.24rem;
    }
    img {
      display: block;
      width: 3.75rem;
      margin: auto;
    }
    .d2-tip {
      padding-top: 0.18rem;
      p {
        font-size: 0.2rem;
        line-height: 0.36rem;
        color: #9b9b9b;
        text-align: center;
      }
    }
  }
  .close {
    position: absolute;
    bottom: 7%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.6rem;
    img {
      display: block;
      width: 100%;
    }
  }
}

/* 规则弹窗 */

#rule {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .block {
    background: #ffe6b2;
    width: 100%;
    height: 100%;
  }
  .window {
    position: absolute;
    top: 0.94rem;
    left: 50%;
    height: 81.45%;
    width: 96.27%;
    box-sizing: border-box;
    transform: translateX(-50%);
    border-radius: 0.08rem;
    overflow: scroll;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    background: #fff;
    .rule-title {
      position: relative;
      h5 {
        font-size: 0.34rem;
        line-height: 1.25rem;
        text-align: center;
        font-weight: normal;
      }
    }
    .rule-title::before {
      content: "";
      width: 0.12rem;
      height: 0.03rem;
      background: #383636;
      position: absolute;
      left: 2.02rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .rule-title::after {
      content: "";
      width: 0.12rem;
      height: 0.03rem;
      background: #383636;
      position: absolute;
      right: 2.02rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .rule-center {
      p {
        width: 5.9rem;
        font-size: 0.24rem;
        line-height: 0.38rem;
        color: #383636;
        padding-bottom: 0.38rem;
        float: left;
      }
      .s_title {
        display: block;
        background: #fa8f53;
        width: 0.3rem;
        height: 0.3rem;
        font-size: 0.18rem;
        line-height: 0.3rem;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        margin-right: 0.13rem;
        position: relative;
        top: 0.04rem;
        float: left;
      }
      .tab_img {
        padding-bottom: 0.1rem;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
  .rule_btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(left, #ff8f53, #fe6b37);
    p {
      font-size: 0.3rem;
      line-height: 0.92rem;
      color: #fff;
      text-align: center;
    }
  }
  .close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    width: 0.6rem;
    img {
      display: block;
      width: 100%;
    }
  }
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
  img {
    display: block;
    width: 100%;
  }
  .iknow {
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
}

.bomb-enter-active,
.bomb-leave-active {
  transition: opacity 0.3s;
}

.bomb-enter,
.bomb-leave-to {
  opacity: 0;
}

.rule-enter-active,
.rule-leave-active {
  transition: opacity 0.3s;
}

.rule-enter,
.rule-leave-to {
  opacity: 0;
}

.f2face-enter-active,
.f2face-leave-active {
  transition: opacity 0.3s;
}

.f2face-enter,
.f2face-leave-to {
  opacity: 0;
}
</style>
<style>
.mui-toast-container {
  bottom: 49% !important;
  transition: opacity 0.3s;
}

.mui-toast-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  width: 66%;
  padding: 12px 18px;
  border: 1px solid #2d2d2d;
}
</style>
