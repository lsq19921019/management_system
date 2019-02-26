<!--
    desc:提现页面
    update:luofeifie 10/17
-->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="recharge">
      <div class="inner-card">
        <div class="up-card">
          <span class="card-type">提现到</span>
          <p class="bank-logo-name">
            <img :src="bankLogo">
            {{bankName}}（{{cardNo}}）
          </p>
          <p class="quota">预计下一个工作日到账</p>
        </div>
        <div class="inner-recharge">
          <p class="title">提现金额</p>
          <div class="recharge-input border-one-half-bottom">
            <span>&yen;</span>
            <input v-model="reMoney" type="number" step="0.01">
          </div>
          <div class="useMoney">
            <span>可用余额</span>
            <span>{{ usableSum }}元</span>
          </div>
          <button class="mui-btn" @click="checkInput()" :disabled="reMoney == ''">提现</button>
        </div>
      </div>
      <div class="large-amount">
        <a v-show="withdrawCount!=0">
          本月还可免费提现
          <span>{{ withdrawCount }}</span>次
        </a>
        <a
          v-show="withdrawCount==0"
        >手续费{{ withdrawRate*reMoney <= 2 ? 2 : (withdrawRate*reMoney).toFixed(2) }}元</a>
        <img class="wenhao" src="/static/img/wap_invest_confir_transfer_03.png" alt @click="wenhao">
      </div>
      <div class="footer_recording" v-show="isShowRecording">
        <router-link to="/withrecord">查看提现记录 ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
const math = require("mathjs");
import wapAlert from "../../wap/wap_alert.vue";
export default {
  data() {
    return {
      bankLogo: "",
      bankName: "",
      cardNo: "",
      openPayUrl: "",
      limitOne: "",
      reMoney: "",
      usableSum: "", //可用余额
      withdrawRate: "", //提现费率
      withdrawCount: "", //免费提现次数
      isShowRecording: false //判断客户端类型
    };
  },
  components: {
    wapAlert
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
  created() {
    this.postData();
    this.isType();
  },
  mounted() {},
  methods: {
    wenhao() {
      var btnArray = ["确定"];
      mui.confirm(
        "每个月可免费提现5次，超出后按单笔提现金额的0.2%收取手续费（最低2元，无上限）",
        " ",
        btnArray,
        function() {}
      );
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
    // 点击提现按钮
    checkInput: function() {
      let _this = this;
      let data = { amount: _this.reMoney };
      localStorage.setItem("userWithMoney", JSON.stringify(_this.reMoney));
      if (_this.reMoney * 1 > _this.usableSum * 1) {
        mui.toast("提现金额大于可用金额", { duration: 1000, type: "div" });
      } else {
        var btnArr = ["再想想", "确认提现"];
        var sxf = "";
        if (_this.withdrawCount == 0) {
          if (_this.reMoney * _this.withdrawRate <= 2) {
            sxf = 2;
          } else {
            sxf = _this.reMoney * _this.withdrawRate;
          }
        } else {
          sxf = 0;
        }

        let need = math.format(
          math
            .chain(math.bignumber(_this.reMoney))
            .subtract(math.bignumber(Math.floor(sxf * 100) / 100))
            .done()
        );
        mui.confirm(
          `提现金额:${_this.reMoney}元<br/>手续费:${Math.floor(sxf * 100) /
            100}元<br/>到账金额:${need}元`,
          "确认提现",
          btnArr,
          function(e) {
            if (e.index == 1) {
              location.href = "/mine_open_jump/withdrawal";
            }
          }
        );
      }
      //this.$router.push({path:'/with_drawal'})
    },
    // 提现页面数据
    postData: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/assets/clickWithdraw", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          let resData = response.data;
          //console.log(response);
          if (resData.status == 0) {
            thatData.bankLogo = resData.result.bankCard.bankLogo;
            thatData.bankName = resData.result.bankCard.bankName;
            thatData.cardNo = resData.result.bankCard.cardNo.substr(
              resData.result.bankCard.cardNo.length - 4
            );
            thatData.openPayUrl = resData.result.bankCard.openPayUrl;
            thatData.limitOne = resData.result.bankCard.limitOne;
            thatData.withdrawRate = resData.result.withdrawRate; //提现费率
            thatData.withdrawCount = resData.result.withdrawCount; //免费提现次数
            thatData.usableSum = parseFloat(resData.result.usableSum); //可用余额
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
.recharge .inner-card {
  margin: 0 4%;
  padding-top: 15px;
}

.recharge .inner-card .up-card {
  background: #fbfbfb;
  padding: 10px 0 11px 24.3%;
  position: relative;
}

.recharge .inner-card .up-card .card-type {
  font-size: 14px;
  color: #333;
  position: absolute;
  left: 8.7%;
  top: 13px;
}

.recharge .inner-card .bank-logo-name {
  font-size: 15px;
  line-height: 28px;
  color: #000;
}

.recharge .inner-card .bank-logo-name img {
  float: left;
  width: 22px;
  margin-right: 7px;
  border-radius: 50%;
  position: relative;
  top: 3px;
}

.recharge .inner-card .quota {
  font-size: 14px;
  line-height: 27px;
  color: #666;
  padding-left: 28px;
}

.recharge .inner-card .inner-recharge {
  background: #fff;
  padding: 10px 9% 30px;
}

.recharge .inner-card .inner-recharge .title {
  font-size: 14px;
  color: #333;
  line-height: 35px;
}
.useMoney {
  font-size: 0.28rem;
  color: #666;
  margin: 0.4rem 0;
}
.recharge .inner-recharge .recharge-input span {
  display: inline-block;
  width: 10%;
  font-size: 36px;
  line-height: 68px;
  font-weight: bold;
  color: #333;
}

.recharge .inner-recharge .recharge-input input {
  display: inline-block;
  width: 88%;
  height: 68px;
  font-size: 36px;
  line-height: 42px;
  color: #111;
  border: none;
  outline: none;
}

.recharge button {
  display: block;
  font-size: 15px;
  color: #fff;
  height: 42px;
  background: linear-gradient(to right, #fd794b, #ff5637);
  border-radius: 21px;
  width: 100%;
  border: none;
}

.recharge .large-amount {
  text-align: center;
  font-size: 14px;
  line-height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.recharge .large-amount .wenhao {
  width: 0.26rem;
  height: 0.26rem;
  margin-left: 0.1rem;
}
.recharge .large-amount a {
  color: #aaa;
}
.recharge .large-amount a span {
  color: #ff9c1c;
}

.recharge .footer_recording {
  position: fixed;
  bottom: 0.52rem;
  left: 0;
  width: 100%;
  text-align: center;
}

.recharge .footer_recording a {
  font-size: 0.28rem;
  line-height: 0.28rem;
  color: #ff9c1c;
}
@media (max-height: 400px) and (-webkit-min-device-pixel-ratio: 2) {
  .footer_recording {
    display: none;
  }
}
</style>
