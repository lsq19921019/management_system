<template>
  <div>
    <div id="inv">
      <div class="head-data">
        <div class="center-box">
          <h2 id="total">{{redmoneySum}}</h2>
          <span class="text">累计已收奖励（元）</span>
        </div>
        <div class="double-box">
          <div class="left">
            <h5 id="person-num">{{inviFriCount}}</h5>
            <span class="text">邀请好友（人）</span>
          </div>
          <div class="right" @click="alert()">
            <h5 id="be-closed">{{waitredmoneySum}}</h5>
            <span class="text">
              当月应收奖励（元）
              <img src="/static/img/mobile_repay_calend.png">
            </span>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="main-data">
        <div class="title-box">
          <div class="left">
            <a href="javascript:;" :class="{active : titleBox == 0}" @click="switchTab(0)">我的好友</a>
          </div>
          <div class="right">
            <a href="javascript:;" :class="{active : titleBox == 1} " @click="switchTab(1)">奖励记录</a>
          </div>
        </div>
        <!-- 我的好友 -->
        <van-swipe
          @change="switchTab"
          ref="swipeCenter"
          :show-indicators="false"
          :loop="false"
          :duration="300"
        >
          <van-swipe-item>
            <div class="left-box" :style="'height:' + centerTabHeight + 'px'">
              <div class="empty" v-show="leftEmpty">
                <p>您还未有邀请的好友，赶快去邀请吧~</p>
              </div>
              <div class="data-list">
                <ul id="haoyou">
                  <li v-for="(friend,index) in friListEntities" :key="index">
                    <div class="left">
                      <span class="person-name">{{friend.username}}</span>
                      <span class="person-phone">{{friend.cellphone}}</span>
                    </div>
                    <div class="right">
                      <span class="status">{{friend.status}}</span>
                      <span class="reg">{{friend.createtime}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </van-swipe-item>
          <!-- 奖励记录 -->
          <van-swipe-item>
            <div class="right-box" :style="'height:' + centerTabHeight + 'px'">
              <div class="empty" v-show="rightEmpty">
                <p>您还未有奖励记录，赶快邀请好友得奖励吧~</p>
              </div>
              <div class="data-list">
                <div class="month-box" v-for="(award,index) in redmoneyListEntities" :key="index">
                  <p class="month">
                    {{award.month}}&nbsp;&nbsp;
                    <span>奖励总额{{award.sum}}元</span>
                  </p>
                  <ul id="jiangli">
                    <li v-for="(awar,index) in award.inviFriRedmoneyListEntity" :key="index">
                      <span class="list-date">{{awar.updateTime}}</span>
                      <span class="list-type"></span>
                      <span class="list-amount">&yen;{{awar.redmoney}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="foot-financial" v-show="(leftEmpty||rightEmpty)&&userType!=2">
        <a
          :href="'/fin_plan?auditstatus=' + auditstatus + '&userType=' + userType + '&currCollection=' + currCollection"
        >
          <img src="/static/img/financial.png">
        </a>
      </div>
      <div class="foot-position">
        <a id="footFriends" href="javascript:;" @click="activaShare()">
          <img src="/static/img/friends_1.png">分享邀请
        </a>
        <a id="f2f" href="javascript:;" @click="f2face=!f2face">
          <img src="/static/img/friends_2.png">当面邀请
        </a>
      </div>
      <transition name="f2face">
        <div id="face-2-face" v-show="f2face">
          <div class="block show"></div>
          <div class="window show">
            <div class="out">
              <p>请朋友扫描二维码</p>
            </div>
            <div class="main-win">
              <div class="title">
                <img src="/static/img/f2f_peo.png">
                <p class="phone-num" id="f2f-phone">{{code}}</p>
                <p class="txt">邀请小伙伴一起赚钱享福利</p>
              </div>
              <img src="/static/img/f2f_bg.png" class="bg">
              <div class="code">
                <img id="f2f-code" :src="base64Str">
              </div>
            </div>
            <div id="f2f-clos">
              <img src="/static/img/f2f_clos.png" @click="f2face=!f2face">
            </div>
          </div>
        </div>
      </transition>
      <div class="wx_mask" v-show="wxMask">
        <img src="/static/img/wap_invest_share.png" @click.prevent>
        <div class="iknow mui-btn" @click="wxMask = !wxMask">我知道啦</div>
      </div>
      <!-- <wechat-jssdk src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></wechat-jssdk> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      redmoneySum: "0", //累计奖励
      inviFriCount: "0", //邀请好友人数
      waitredmoneySum: "0", //待收
      titleBox: 0,
      centerTabHeight: 0,
      base64Str: "",
      code: "",
      f2face: false,
      leftEmpty: true,
      rightEmpty: true,
      auditstatus: 0,
      userType: 2,
      currCollection: 0,
      friListEntities: [],
      redmoneyListEntities: [],
      fetchToken: "",
      //version: "",
      wxMask: false,
      link: ""
    };
  },
  created() {
    this.getAppToken();
  },
  mounted() {
    this.setEmptyHeight();
  },
  methods: {
    setEmptyHeight() {
      //自动调节scroll盒子的高度
      this.centerTabHeight = document.documentElement.clientHeight - 255;
    },
    switchTab(index) {
      this.$refs.swipeCenter.swipeTo(index);
      this.titleBox = index;
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
              url: _this.link, //分享链接
              icon: "https://wap.xiaogelicai.com/static/img/share_logo.jpg", //分享图标链接
              shareType: "sort", //all全平台,wx微信平台,custom自定义,sort自定义排序
              shareSort: "wechat,circle,qq,weibo,copylink" //按照指定的顺序排序显示 仅限使用 sort自定义排序 时
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
    alert: function() {
      mui.alert(
        '<p style="text-aline:left;">1、每月1号，自动更新当月应收奖励；</p><p style="text-aline:left;">2、每月5号，当月应收奖励将会以现金红包形式发放到您的可用余额；</p>',
        " ",
        "我知道了"
      );
    },
    find: function(str, cha, num) {
      let x = str.indexOf(cha);
      for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
      }
      return x;
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
            _this.postFriendsAward();
            _this.getCode();
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            localStorage.setItem("token", dataRes.transferData.token);
            base.data.token = dataRes.transferData.token;
            _this.postFriendsAward();
            _this.getCode();
          }
        })
    },
    postFriendsAward() {
      var thatData = this;
      var data = {
        token: thatData.fetchToken
      };

      this.$http
        .post("/api/activity/invite/inviTotal", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.redmoneySum = resData.result.summaryEntity.redmoneySum;
            thatData.inviFriCount = resData.result.summaryEntity.inviFriCount;
            thatData.waitredmoneySum =
              resData.result.summaryEntity.waitredmoneySum;
            thatData.auditstatus = resData.result.auditstatus;
            thatData.userType = resData.result.userType;
            thatData.currCollection = resData.result.currCollection;

            if (resData.result.friListEntities.length > 0) {
              thatData.leftEmpty = false;
              thatData.friListEntities = resData.result.friListEntities;
            }
            if (resData.result.redmoneyListEntities.length > 0) {
              thatData.rightEmpty = false;
              thatData.redmoneyListEntities =
                resData.result.redmoneyListEntities;
            }
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
                jsApiList: [
                  "onMenuShareTimeline",
                  "onMenuShareAppMessage",
                  "onMenuShareQQ",
                  "onMenuShareWeibo",
                  "onMenuShareQZone"
                ]
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
<style scoped>
@import "../../../style/css/mobile_invitation_record.css";
</style>
