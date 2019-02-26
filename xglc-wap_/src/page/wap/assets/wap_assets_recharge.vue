<!--
  desc:充值页面
-->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="recharge">
      <div class="inner-card">
        <div class="top_tip clear" @click="$router.push({ path: '/open_unionpay' })" v-show="openPayStatus == 1">
          <img src="/static/img/wap_mine_open_account_01.png">
          <p>
            该银行卡需开通银联在线支付，才可充值成功；已开通请忽略。
            <span>如何开通</span>
          </p>
        </div>
        <div class="up-card">
          <span class="card-type">储蓄卡</span>
          <p class="bank-logo-name">
            <img :src="bankLogo">
            {{bankName}}（{{cardNo}}）
          </p>
          <p class="quota" v-if="bankCardIsable == 1">{{bankLimit}}</p>
          <p class="quota" v-else>暂不支持，请更换银行卡</p>
        </div>
        <div class="inner-recharge">
          <p class="title">充值金额</p>
          <div class="recharge-input border-one-half-bottom">
            <span>&yen;</span>
            <input v-model="reMoney" type="number" step="0.01" autofocus>
          </div>
          <button class="mui-btn" @click="checkInput()" :disabled="reMoney == ''">下一步</button>
        </div>
      </div>
      <div class="large-amount">
        <router-link to="/assets_big_recharge">限额太低？用大额充值></router-link>
      </div>
      <div class="footer_recording" v-show="isShowRecording">
        <router-link to="/assets_re_record">查看充值记录 ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      bankLogo: "",
      bankName: "",
      cardNo: "",
      bankLimit: "",
      openPayStatus: "",
      openPayUrl: "",
      limitOne: "",
      reMoney: "",
      bankCardIsable: "",
      isShowRecording: false //判断客户端类型
    };
  },
  watch: {
    reMoney: function(val) {
      let thatData = this;
      if (val != "" && val.length < 13) {
        thatData.reMoney = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      } else if (val != "" && val.length >= 13) {
        thatData.reMoney = Math.floor(val.slice(0, 11) * 100) / 100;
      } else {
      }
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.getRechargeData();
    this.postData();
    this.isType();
  },
  mounted() {},
  methods: {
    getRechargeData() {
      if (localStorage.getItem("userRechargeData")) {
        this.reMoney = JSON.parse(localStorage.getItem("userRechargeData"));
      }
    },
    //判断客户端类型
    isType() {
      let istype = base.getClientType();
      if (istype.type == "wap") {
        this.isShowRecording = true;
      }
    },
    //<----------- 分割线在此 ------------->
    topTip: function() {
      mui.alert(this.openPayUrl, " ");
    },
    checkInput: function() {
      let thatData = this;
      if (thatData.bankCardIsable == 1) {
        if (thatData.reMoney != "") {
          if (parseFloat(thatData.reMoney) >= 10) {
            if (
              parseFloat(thatData.reMoney) <= parseFloat(thatData.limitOne) ||
              thatData.limitOne == "-1"
            ) {
              localStorage.setItem(
                "userRechargeData",
                JSON.stringify(thatData.reMoney)
              );
              location.href = "/mine_open_jump/recharge";
            } else {
              mui.toast("超过单笔限额", { duration: 1000, type: "div" });
            }
          } else {
            mui.toast("充值金额不能低于10元", { duration: 1000, type: "div" });
          }
        } else {
          mui.toast("请输入金额", { duration: 1000, type: "div" });
        }
      } else {
        mui.confirm(
          "暂不支持该银行，请在我的-银行卡页面，更换银行卡",
          "",
          ["取消", "去换卡"],
          function(e) {
            if (e.index == 1) {
              thatData.$router.push({ path: "/mine_bank_card" });
            }
          }
        );
      }
    },
    postData: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/assets/clickRecharge", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            thatData.bankCardIsable = resData.result.bankCardIsable;
            thatData.bankLogo = resData.result.bankCard.bankLogo;
            thatData.bankName = resData.result.bankCard.bankName;
            thatData.cardNo = resData.result.bankCard.cardNo.substr(
              resData.result.bankCard.cardNo.length - 4
            );
            thatData.bankLimit = resData.result.bankCard.bankLimit;
            thatData.openPayStatus = resData.result.bankCard.openPayStatus;
            thatData.openPayUrl = resData.result.bankCard.openPayUrl;
            thatData.rechargeMoney = resData.result.bankCard.rechargeMoney;
            thatData.limitOne = resData.result.bankCard.limitOne;
            thatData.bankCardIsable = resData.result.bankCardIsable;
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
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
@import "../../../style/css/wap_assets_recharge.css";
@media (max-height: 400px) and (-webkit-min-device-pixel-ratio: 2) {
  .footer_recording {
    display: none;
  }
}
</style>
