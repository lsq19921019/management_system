<!--
    create : lff 2018-08-26
    desc : 中秋活动页
-->
<template>
  <div class="midBox">
    <div class="mid-top">
      <img src="./images/mid_02.jpg" alt>
      <img src="./images/mid_03.jpg" alt>
      <img src="./images/mid_04.jpg" alt>
      <img src="./images/mid_05.jpg" alt>
      <img src="./images/mid_06.jpg" alt>
      <img src="./images/mid_07.jpg" alt>
    </div>
    <div class="mid-boon">
      <img src="./images/boon_08.gif" alt>
      <div class="mid-btn">
        <img src="./images/boon2_08.gif" alt>
        <div class="get-btn">
          <a @click="payment" v-bind:class="redStatus==1?'redStatus':'btn_1'">立即领取</a>
          <a class="btn_2" @click="clickShare">分享领取</a>
        </div>
      </div>
      <div class="boon-txt">
        <p>5%加息券领取方法:</p>
        <div>点击“分享领取”分享后，当您和其他4位好友一起助力后，您和您的好友都可领取该奖励（您也需要点击分享链接进行领取)。</div>
        <div class="boon-info">单个账户仅可领取一张5%加息券。</div>
      </div>
    </div>
    <div class="mid-boon-3">
      <img src="./images/boon_15.gif" alt>
      <div class="get-btn">
        <div class="get-btn-item">
          <div class="title">出借90天定存宝≥6万</div>
          <a @click="getmoon" v-bind:class="ybStatus==1?'ybStatus':'btn'">免费领取</a>
        </div>
        <div class="get-btn-item">
          <div class="title">出借180天定存宝≥3万</div>
          <a @click="getmoon" v-bind:class="ybStatus==1?'ybStatus':'btn'">免费领取</a>
        </div>
      </div>
      <img class="boon-img" src="./images/boon_22.jpg" alt>
      <a class="btn-nub">
        当前剩余
        <b>{{ remain }}</b>份
      </a>
      <!-- <div class="boon-info">单个账户仅可领取一张5%加息券。</div> -->
    </div>
    <div class="rule">
      <p>活动规则</p>
      <p>1.活动时间：2018年9月10日-2018年9月16日。</p>
      <p>2.活动对象：所有小鸽理财用户。</p>
      <p>3.单账户仅可领取一次好礼一奖励。</p>
      <p>4.好礼二中，5%加息券领取方法：点击“分享领取”分享后，当您和其他4位好友一起助力后，您和您的好友都可领取该奖励（您也需要点击分享链接进行领取）。单个账户仅可领取一张5%加息券。</p>
      <p>5%加息券适用于40天及以上普通定存宝产品，最长加息时间为40天，最高加息金额为1万元。</p>
      <p>5.新手标、权益标、债权、40天G自动服务、散标不计入好礼三活动。</p>
      <p>6.单账户仅可领取一份香港美心流心奶黄月饼礼盒。收货地址请在APP“我的”-“头像”-“收货地址”填写，最迟填写时间为2018年9月17日中午12：00，未填写收货地址的用户将视为自动放弃获奖资格。奖品将在活动结束后3个工作日内进行发放，届时将通过小鸽理财短信告知。活动奖品固定，数量有限，兑完即止。</p>
      <p>7.此活动最终解释权在法律允许范围内归小鸽理财所有。如有疑问请联系小鸽理财在线客服。</p>
      <p>客服电话：400-700-4007</p>
      <p>&nbsp;</p>
    </div>
    <div class="popout" v-if="isShowDialog">
      <div>
        <img class="dl-img" src="./images/mid_03.gif" alt>
        <img class="yb-img mt-40" src="./images/mid_06.gif" alt>
        <div class="yb-txt mt-40">恭喜你获得香港美心流心奶黄月饼礼盒一份</div>
        <a class="yb-btn mt-40" @click="hideDialog">收下啦</a>
        <div class="yb-info">别忘了到APP填写收货地址哦！月饼预计于9月17-9月19日寄出，请耐心等待。</div>
      </div>
    </div>
    <div class="popout" v-if="isMent">
      <div>
        <img class="dl-img" src="./images/mid_04.gif" alt>
        <img class="ment-img mt-40" src="./images/mid_07.gif" alt>
        <div class="yb-txt mt-40">恭喜你获得50元红包</div>
        <a class="yb-btn mt-40 mb-40" @click="hideMent">中秋节快乐</a>
      </div>
    </div>
    <div class="cover" v-if="isMent"></div>
    <div class="cover" v-if="isShowDialog"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remain: 0, //剩余数量
      isShowDialog: false, //领取弹框控制
      isMent: false, //领取月饼弹框
      redStatus: "", //红包领取状态
      ybStatus: false, //月饼状态
      shareLink: "" //分享链接
    };
  },
  beforeMount() {
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
          //wap业务逻辑代码
          _this.getData();
          _this.checkShare();
          _this.shareLinks();
        } else {
          /**
           * getTokenFromApp返回处理结果后调用goToAppLogin
           * 参数data为 app getTokenFromApp 方法返回的参数
           */
          data = JSON.parse(data);
          let dataRes = data.result;
          if (dataRes.transferData.token == "null") {
            return _this.$withApp("takeAppOpen", {
              status: 0,
              result: {
                transferName: "goToAppLogin",
                transferData: {
                  url: location.href
                }
              },
              msg: "success"
            });
          } else {
            base.data.token = dataRes.transferData.token;
            _this.getData();
            _this.checkShare();
            _this.shareLinks();
          }
        }
      })
      .then(data => {
        //goToAppLogin 桥接方法处理完毕并返回data 往下执行
      });
  },
  created() {
    this.checkShare();
    this.shareLinks();
    this.getData();
  },
  methods: {
    //剩余月饼数量
    getData: function() {
      let thatData = this;
      this.$http
        .post("/api/activity/815/userIndex", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(res) {
          if (res.data.status == 0) {
            thatData.redStatus = res.data.result.redStatus; //红包状态
            thatData.remain = res.data.result.giftTotal; //剩余月饼数量
            thatData.ybStatus = res.data.result.ybStatus; //月饼状态
          }
        });
    },
    //领取50元红包
    payment: function() {
      let thatData = this;
      let data = {
        activityType: 1
      };
      this.$http
        .post("/api/activity/815/getGift", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(res) {
          if (res.data.status == 0) {
            thatData.isMent = true;
            thatData.redStatus = 1;
          } else {
            mui.toast(res.data.msg);
          }
        });
    },
    //隐藏
    hideMent: function() {
      this.isMent = false;
      location.reload();
    },
    //领取月饼
    getmoon: function() {
      let thatData = this;
      let data = {
        activityType: 3
      };
      this.$http
        .post("/api/activity/815/getGift", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(res) {
          if (res.data.status == 0) {
            thatData.isShowDialog = true;
            thatData.ybStatus = 1;
          } else {
            mui.toast(res.data.msg);
          }
        });
    },
    //分享链接
    shareLinks: function() {
      let thatData = this;
      this.$http
        .post("/api/activity/shareUrl", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(res) {
          if (res.data.status == 0) {
            thatData.shareLink = res.data.result;
          }
        });
    },
    clickShare() {
      let obj = {
        status: 0,
        result: {
          title: "快来助我一臂之力，我们共同领5%加息券!", //分享的标题
          content: "快来助我一臂之力，我们共同领5%加息券!", //分享的内容，对应iOS的descr字段，
          url: this.shareLink, //分享链接
          icon: "https://wap.xiaogelicai.com/static/img/mid.jpg" //分享图标链接
        }
      };
      //alert(JSON.stringify(obj));
      this.$withApp("postApp", {
        status: 0,
        result: {
          transferName: "jumpToSharing",
          transferData: {
            title: "快来助我一臂之力，我们共同领5%加息券!", //分享的标题
            content: "快来助我一臂之力，我们共同领5%加息券!", //分享的内容，对应iOS的descr字段
            url: this.shareLink, //分享链接
            icon: "https://wap.xiaogelicai.com/static/img/mid.jpg", //分享图标链接
            shareType: "wx"
          }
        },
        msg: "success"
      })
    },
    checkShare() {
      this.$withApp("postApp", {
        status: 0,
        result: {
          transferName: "getTokenFromApp",
          transferData: {}
        },
        msg: "success"
      }).then(data => {
        data = JSON.parse(data);
        let dataRes = data.result;
        localStorage.setItem("token", dataRes.transferData.token);
        base.data.token = dataRes.transferData.token;
      });
    },
    //弹框隐藏
    hideDialog() {
      this.isShowDialog = false;
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.midBox {
  background: #3f1672;
  padding-bottom: 0.2rem;
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
.mid-boon {
  width: 6.93rem;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.15rem;
  .boon-txt {
    color: #3f1672;
    padding: 0.4rem;
    p {
      font-weight: bold;
    }
    p,
    div {
      font-size: 0.3rem;
    }
    .boon-info {
      font-size: 0.25rem;
      color: #8e8986;
      margin-top: 0.4rem;
    }
  }
  .btn_1,
  .btn_2 {
    color: #fff;
    width: 2.45rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 1.5em;
    display: block;
    background-color: #f84b46;
  }
  .redStatus {
    background: #999;
    pointer-events: none;
    color: #fff;
    width: 2.45rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 1.5em;
    display: block;
  }
  .mid-btn {
    position: relative;
  }
  .get-btn {
    display: flex;
    position: absolute;
    left: 0.6rem;
    bottom: 0.5rem;
  }
  .btn_2 {
    margin-left: 0.9rem;
  }
}
.mid-boon-3 {
  width: 6.93rem;
  margin: 0.64rem auto 0;
  border-radius: 0.15rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  .get-btn {
    display: flex;
    justify-content: space-between;
    width: 6.32rem;
    .get-btn-item {
      text-align: center;
      text-align: -webkit-center;
    }
  }
  .title {
    color: #3f1672;
    font-size: 0.3rem;
    font-weight: bold;
  }
  .btn {
    color: #fff;
    width: 2.45rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 1.5em;
    display: block;
    background-color: #f84b46;
    margin: 0.48rem 0;
  }
  .ybStatus {
    color: #fff;
    width: 2.45rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 1.5em;
    display: block;
    background-color: #999;
    pointer-events: none;
    margin: 0.48rem 0;
  }
  .boon-img {
    width: 5.3rem;
    height: 3rem;
  }
  .btn-nub {
    width: 6.25rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 1.5em;
    text-align: center;
    color: #3f1672;
    font-size: 0.3rem;
    margin: 0.48rem 0;
    display: block;
  }
  .boon-info {
    font-size: 0.25rem;
    color: #8e8986;
    margin-bottom: 0.4rem;
  }
}
.rule {
  background: url("./images/bot_23.gif") no-repeat;
  background-size: 7.5rem;
  background-position-y: bottom;
  font-size: 0.25rem;
  color: #be89ff;
  padding: 0.5rem;
  p {
    line-height: 0.4rem;
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
  text-align: center;
  z-index: 3;
  .dl-img {
    width: 0.7rem;
    height: 2.11rem;
    position: absolute;
    left: -0.3rem;
    top: 0;
  }
  .ment-img {
    width: 2.4rem;
    height: 2rem;
    margin: 0 auto;
  }
  .yb-img {
    width: 2.7rem;
    height: 1.48rem;
    display: inline-block;
  }
  .yb-txt {
    font-size: 0.3rem;
    color: #333;
    width: 3.24rem;
    margin: 0 auto;
  }
  .yb-btn {
    background: #f84b46;
    border-radius: 1.5em;
    color: #fff;
    font-size: 0.3rem;
    width: 2.6rem;
    height: 0.58rem;
    line-height: 0.58rem;
    display: inline-block;
  }
  .yb-info {
    font-size: 0.24rem;
    color: #aaa;
    width: 3.64rem;
    margin: 0.4rem auto;
    cursor: pointer;
  }
  .mt-40 {
    margin-top: 0.4rem;
  }
  .mb-40 {
    margin-bottom: 0.4rem;
  }
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
</style>