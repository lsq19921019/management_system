<!--
  create : dxc 2018-08-08
  desc : 众邦银行
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
      <button @click="back" class="btn color">{{btn1}}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tip: "",
      titleTip: "",
      respMsg: "",
      id: ["activate", "bind", "activation"],
      text: ["开户失败", "绑卡失败", "激活失败"],
      titleText: ["开户失败", "绑卡失败", "激活失败"],
      btn1: "返回"
    };
  },
  beforeCreate() {
    if (
      localStorage.getItem("isActivation") &&
      this.$route.params.tip == "activate"
    ) {
      this.$router.replace({
        path: "/re_fail/activation?respMsg=" + this.$route.query.respMsg
      });
      localStorage.removeItem("isActivation");
    }
  },
  created() {
    this.chBg("#fff");
    this.switchBtn();
    this.addText();
  },
  mounted: function() {},
  methods: {
    switchBtn() {
      //根据特殊情况切换btn文案
      let thatData = this;
      if (thatData.$route.params.tip == "activate") {
        thatData.btn1 = "继续去开户";
      } else if (thatData.$route.params.tip == "bind") {
        thatData.btn1 = "继续去绑卡";
      } else if (thatData.$route.params.tip == "activation") {
        thatData.btn1 = "继续去激活";
      }
    },
    addText: function() {
      var tipId = this.$route.params.tip;
      for (var i = 0; i < this.id.length; i++) {
        if (this.id[i] == tipId) {
          this.tip = this.text[i];
          this.titleTip = this.titleText[i];
        }
      }
      if (
        localStorage.getItem("companyOpenData") &&
        this.$route.params.tip == "activate"
      ) {
        this.tip = "开户申请失败";
        this.titleTip = "开户申请失败";
        this.comp = true;
      } else if (
        localStorage.getItem("companyOpenData") &&
        this.$route.params.tip == "activation"
      ) {
        this.tip = "激活申请失败";
        this.titleTip = "激活申请失败";
        this.comp = true;
      }
      this.$route.query.respMsg
        ? (this.respMsg = decodeURIComponent(this.$route.query.respMsg))
        : (this.respMsg = "");
    },
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    back: function() {
      window.history.go(-3);
    }
  }
};
</script>
<style lang="scss" scoped>
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
      width: 6.5rem;
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
}
</style>