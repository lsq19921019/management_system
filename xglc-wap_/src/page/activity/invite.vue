<!--
    create : luofeifei 2018-08-26
    desc : 中秋节活动
-->
<template>
    <div class="invite">
        <img src="./images/invi_02.gif" alt="">
        <div class="invi-box">
            <img class="img-bg" src="./images/inv_04.gif" alt="">
            <div class="tit-img">
                <img v-for="(item,index) in headerUrl" :key="index" :src="item" alt="">
                <img @click="shareHelp" v-for="(item,index) in sharePerson" :key="index" src="./images/inv_03.gif" alt="">
            </div>
            <div>
                <span class="mid-lead">点击“+”进行助力</span>
            </div>
            <div class="inp-phone">
                <img class="icon-phone" src="./images/inv_14.gif" alt="">
                <input type="number" name="myphone" v-model="myphone" maxlength="11" placeholder="请输入手机号领取" :disabled="inputStat">
            </div>
            <a class="inv-btn" @click="activaShare()" v-if="shareStatus==0">再邀请{{sharePerson}}人助力即可领取</a>
            <a class="inv-btn" @click="shareGet" v-if="shareStatus==1">立即领取奖励</a>
            <a class="inv-btn-no" v-if="shareStatus==2">领取成功</a>
            <a class="inv-btn-no" v-if="shareStatus==3">奖励已领完,可重新在APP内发起助力</a>
        </div>
        <router-link to="/start_reg"><img class="bot-img" src="./images/inv_18.gif" alt=""></router-link>
        <p class="ad">广告 市场有风险 出借需谨慎</p>
        <div class="popout" v-if="isShow">
            <img class="dl-img" src="./images/mid_03.gif" alt="">
            <div>
                <p class="wx-tit">绑定微信服务号，领现金最高可领88元</p>
                <img class="wx-img" src="./images/wx_03.gif" alt="">
            </div>
            <div class="wx-info">
                <p>绑定步骤：</p>
                <p>1、微信搜索“小鸽服务平台”微信公众号；</p>
                <p>2、在菜单栏回复“绑定”二字；</p>
                <p>3、点击收到的链接，登录即可绑定；</p>
                <p>4、绑定成功后，系统将发放一份现金奖励至您的账户，请注意查收。</p>
            </div>
        </div>
        <div class="wx_mask" v-show="wxMask" @click="wxMask = !wxMask">
            <img src="/static/img/wap_invest_share.png" @click.prevent>
        </div>
        <div class="cover" v-if="isShow" @click="hideFrm"></div>
    </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      sharePerson: 0, //剩余分享人数
      shareStatus: "", //0，未助力满，1 //可领取 2//已领取 3;//已领完;
      headerUrl: "", //头像URL
      inputStat: true, //输入框状态 true不可输入 false可以输入
      isShow: false,
      myphone: "",
      wxMask: false
    };
  },
  watch: {
    //输入位数限制
    myphone: function(val) {
      if (this.myphone.length > 11) {
        this.myphone = val.slice(0, 11);
      }
    }
  },
  created() {
    this.sharePage();
  },
  methods: {
    activaShare: function() {
      let thatData = this;
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        thatData.wxMask = !thatData.wxMask;
      } else {
        if (base.isAndroid) {
          if (!thatData.version) {
            location.href = "/appDownload";
          } else {
            thatData.connectWebViewJavascriptBridge(function(bridge) {
              bridge.callHandler("jumpToSharing", {}, function(
                responseData
              ) {});
            });
          }
        } else if (base.isiOS) {
          if (!thatData.version) {
            location.href = "/appDownload";
          } else {
            thatData.setupWebViewJavascriptBridge(function(bridge) {
              bridge.callHandler("jumpToSharing", {}, function(response) {});
            });
          }
        }
      }
    },
    //分享页面加载
    sharePage: function() {
      let thatData = this;
      let data = {
        wxOpenId: thatData.$route.query.wxOpenId,
        urlKey: thatData.$route.query.urlKey
      };
      this.$http
        .post("/api/activity/shareLoad", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(res) {
          let result = res.data.result;
          thatData.regUrl(result.shareUrl); //微信分享
          thatData.sharePerson = result.sharePerson;
          thatData.headerUrl = result.headUrl;
          if (result.shareStatus == 1) {
            thatData.inputStat = false;
            thatData.shareStatus = 1;
          } else if (result.shareStatus == 2) {
            thatData.shareStatus = 2;
          } else if (result.shareStatus == 3) {
            thatData.shareStatus = 3;
          } else {
          }
        });
    },
    isShowWx: function() {
      this.isShow = true;
    },
    hideFrm: function() {
      this.isShow = false;
    },
    shareGet: function() {
      let thatData = this;
      let data = {
        activityType: 2,
        wxOpenId: thatData.$route.query.wxOpenId,
        urlKey: thatData.$route.query.urlKey,
        phone: thatData.myphone
      };
      this.$http
        .post("/api/activity/815/getGift", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(res) {
          if (res.data.status == 0) {
            location.reload();
          } else if (res.data.status == 6018) {
            mui.alert(res.data.msg, function() {
              thatData.$router.push({ path: "/start_reg" });
            });
            thatData.myphone = "";
          } else {
            mui.alert(res.data.msg);
          }
        });
    },
    //好友助力
    shareHelp: function() {
      let thatData = this;
      let data = {
        wxOpenId: thatData.$route.query.wxOpenId,
        urlKey: thatData.$route.query.urlKey
      };
      this.$http
        .post("/api/activity/shareHelp", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(res) {
          if (res.data.status == 0) {
            location.reload();
            mui.toast("助力成功!");
          } else {
            mui.alert(res.data.msg);
          }
        });
    },
    //好友助力微信分享
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
          let resData = response.data;
          if (resData.status == 0) {
            base.wxShare(
              wx,
              {
                title: "中秋活动-分享领取礼包!",
                desc: "快来助我一臂之力，我们共同领5%加息券!",
                link: link,
                imgUrl: "http://twap.xiaogelicai.com/static/mid.jpg"
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

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  display: block;
}
.invite {
  width: 7.5rem;
  background: #3f1672;
  background-size: cover;
  padding-bottom: 0.2rem;
  .invi-box {
    width: 6.38rem;
    background: #fff;
    margin: 0 auto;
    border-radius: 1em;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: -1.5rem;
    .tit-img {
      display: flex;
      img:nth-child(n + 2) {
        margin-left: 0.28rem;
      }
      margin: 0.3rem 0;
      img {
        border-radius: 50%;
      }
    }
    .inp-phone {
      width: 5.23rem;
      border: 1px solid #dddddd;
      border-radius: 0.4em;
      padding: 0.25rem;
      .icon-phone {
        width: 0.25rem;
        height: 0.35rem;
        float: left;
      }
      input {
        border: none;
        outline: none;
        margin-left: 0.2rem;
        font-size: 0.24rem;
        background: #fff;
      }
    }
    .inv-btn {
      background: #f94b47;
      font-size: 0.28rem;
      color: #fff;
      border-radius: 1.5em;
      height: 0.8rem;
      line-height: 0.8rem;
      width: 5.23rem;
      text-align: center;
      margin: 0.45rem 0 0.77rem;
    }
    .inv-btn-no {
      background: #999;
      pointer-events: none;
      font-size: 0.28rem;
      color: #fff;
      border-radius: 1.5em;
      height: 0.8rem;
      line-height: 0.8rem;
      width: 5.23rem;
      text-align: center;
      margin: 0.45rem 0 0.77rem;
    }
  }
  .img-bg {
    width: 2rem;
    height: 1.8rem;
    margin-top: 0.3rem;
  }
  .tit-img img {
    width: 0.73rem;
    height: 0.73rem;
  }
  .bot-img {
    width: 6.38rem;
    margin: -1rem auto 0;
  }
  .ad {
    font-size: 0.22rem;
    color: #68518c;
    margin: 0.6rem auto;
    text-align: center;
  }
}
.popout {
  background: #fff;
  width: 5.34rem;
  position: fixed;
  top: 3.55rem;
  margin: auto;
  left: 0;
  right: 0;
  border-radius: 0.5em;
  z-index: 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .dl-img {
    width: 0.7rem;
    height: 2.11rem;
    position: absolute;
    left: -0.2rem;
    top: 0;
  }
  .wx-img {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 auto;
  }
  .wx-tit {
    font-size: 0.3rem;
    color: #333;
    width: 3.2rem;
    text-align: center;
    margin: 0.3rem auto;
  }
  .wx-info {
    font-size: 0.24rem;
    color: #aaa;
    width: 4.8rem;
    margin: 0.3rem auto;
  }
}
.mid-lead {
  font-size: 0.24rem;
  color: #aaa;
  margin-bottom: 0.1rem;
  display: inline-block;
  width: 5.23rem;
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
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
.mt-40 {
  margin-top: 0.4rem;
}
</style>
