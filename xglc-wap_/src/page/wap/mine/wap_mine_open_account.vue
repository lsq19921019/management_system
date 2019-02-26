<!-- 我的-存管开户 -->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="open-account">
      <div class="top_tip clear">
        <img src="/static/img/wap_mine_open_account_01.png">
        <p>为保障您的资金安全，小鸽理财已接入众邦银行存管系统。在出借、充值、提现、转让前需先{{operate}}银行存管账户。</p>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="border-one-half-bottom">
          <div class="in-border">
            <span>真实姓名</span>
            <input
              v-model="openData.realName"
              type="text"
              placeholder="请输入姓名"
              maxlength="4"
              :disabled="disabled"
            >
          </div>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span>证件号码</span>
          <input
            v-model="openData.idNo"
            type="text"
            placeholder="请输入证件号码"
            maxlength="18"
            :disabled="disabled"
          >
        </div>
      </div>
      <!-- <div class="reg-input in-padding input-bg margin-t">
        <div class="border-one-half-bottom">
          <div class="in-border">
            <span>银行卡号</span>
            <input v-model="openData.cardNo" type="number" placeholder="请输入银行卡号" maxlength="19">
          </div>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border no-border">
          <span>预留手机</span>
          <input v-model="openData.cellphone" type="number" placeholder="请输入银行预留手机号" maxlength="12">
        </div>
      </div>-->
      <!-- <div class="bank-list in-padding">
        <a href="/bank_limit">支持银行及限额></a>
      </div>-->
      <div class="btn-list in-padding">
        <button class="btn" @click="checkFunction()">{{btn}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      openData: {
        realName: "",
        idNo: "",
        cardNo: "",
        cellphone: ""
      },
      disabled: false,
      operate: "开通",
      btn: "下一步"
    };
  },
  watch: {
    "openData.realName": function(val) {
      //限制输入
      if (this.openData.realName.length > 4) {
        this.openData.realName = val.slice(0, 4);
      }
    },
    "openData.idNo": function(val) {
      if (this.openData.idNo.length > 18) {
        this.openData.idNo = val.slice(0, 18);
      }
    }
    /* "openData.cardNo": function(val) {
      if (this.openData.cardNo.length > 19) {
        this.openData.cardNo = val.slice(0, 19);
      }
    },
    "openData.cellphone": function(val) {
      if (this.openData.cellphone.length > 11) {
        this.openData.cellphone = val.slice(0, 11);
      }
    } */
  },
  components: {
    "wap-alert": wapAlert
  },
  created() {
    this.getOpenData();
  },
  methods: {
    postBaseInfo() {
      let thatData = this;
      this.$http
        .post("/api/user/baseInfo", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            if (resData.cgtStatus == 2) {
              thatData.openData.realName = resData.result.realName;
              thatData.openData.idNo = resData.result.idNo;
              thatData.disabled = true;
              thatData.operate = "激活";
              thatData.btn = "前往存管页面绑卡激活";
            }
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
            setTimeout(function() {
              thatData.$router.go(-1);
            }, 800);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getOpenData: function() {
      let thatData = this;
      if (
        localStorage.getItem("userOpenData") &&
        !localStorage.getItem("isActivation")
      ) {
        thatData.openData = JSON.parse(localStorage.getItem("userOpenData"));
      } else {
        thatData.postBaseInfo();
      }
    },
    checkFunction: function() {
      let thatData = this;
      if (
        base.checkName(thatData.openData.realName) &&
        base.checkidNo(
          thatData.openData.idNo
        ) /*  &&
        base.checkicNo(thatData.openData.cardNo) &&
        base.checkPhone(thatData.openData.cellphone) */
      ) {
        thatData.postData();
      }
    },
    postData: function() {
      let thatData = this;

      localStorage.setItem("userOpenData", JSON.stringify(thatData.openData));
      if (thatData.disabled) {
        localStorage.setItem("isActivation", "1");
      }
      location.href = "/mine_open_jump/open";
      //thatData.$router.push({ path: "/mine_open_jump/open" })
    }
  },
  mounted: function() {}
};
</script>
<style scoped>
@import "../../../style/css/wap_mine_open_account.css";
</style>
