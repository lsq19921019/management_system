<template>
  <div>
    <div class="form">
      <div class="info-list in-padding list-bg">
        <div class="in-border">
          <span>登录手机号</span>
          <span class="info-text">{{user.userLoginPhone}}</span>
        </div>
      </div>
      <div class="info-list in-padding list-bg">
        <div class="in-border">
          <span>用户ID</span>
          <span class="info-text">{{user.userID}}</span>
        </div>
      </div>
      <div class="info-list in-padding list-bg">
        <div class="in-border">
          <span>真实姓名</span>
          <span class="info-text">{{user.name}}</span>
        </div>
      </div>
      <div class="info-list in-padding list-bg">
        <div class="in-border">
          <span>身份证号</span>
          <span class="info-text">{{user.idCard}}</span>
        </div>
      </div>
      <div class="info-list in-padding list-bg">
        <div class="in-border">
          <span>银行卡号</span>
          <span v-if="hasCard" class="info-text">{{user.icCard}}</span>
          <span v-else @click="goBind" class="no-card">未绑定></span>
        </div>
      </div>
      <div class="info-list in-padding list-bg" v-if="user.bankName">
        <div class="in-border">
          <span>所属银行</span>
          <span v-if="hasCard" class="info-text">{{user.bankName}}</span>
        </div>
      </div>
      <div class="info-list in-padding list-bg">
        <div class="in-border">
          <span>银行预留手机号</span>
          <span class="info-text s-width">{{user.bankPhone}}</span>
        </div>
      </div>
      <div class="in-padding" v-if="user.cgtStatus == 2">
        <button @click="postActivation()" class="btn">激活众邦银行存管账户</button>
      </div>
      <div class="in-padding">
        <button @click="signOut" class="btn empty">退出账户</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        loginPhone: "",
        userID: "",
        name: "",
        idCard: "",
        icCard: "",
        bankName: "",
        bankPhone: "",
        cgtStatus: 1
      },
      hasCard: false,
      realName: "",
      idNo: ""
    };
  },
  created() {
    this.chBg("#f2f2f2");
  },
  mounted: function() {
    this.getInfo();
  },
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    goCg() {
      this.$router.push({ path: "/loan_reg_index" });
    },
    getInfo: function() {
      let thatData = this;
      /* thatData.user.loginPhone = JSON.parse(
        localStorage.getItem("userLoginData")
      ).phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"); */
      if (localStorage.getItem("token")) {
        //let data = new URLSearchParams() //把数据格式进行转化
        var data = {};

        this.$http
          .post("/api/borrower/cgtInfo", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          }) //axios进行ajax请求
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              thatData.user.userID = resData.result.platformUserNo;
              thatData.user.name = resData.result.formatUsername;
              thatData.user.idCard = resData.result.formatIdNo;
              if (resData.result.bankCardStatus == 1) {
                thatData.hasCard = true;
                thatData.user.icCard = resData.result.cardNo;
              }
              thatData.user.bankPhone = resData.result.formatBankPhone;
              thatData.user.bankName = resData.result.bankName;
              thatData.user.cgtStatus = resData.cgtStatus;
              thatData.user.userLoginPhone = resData.result.userLoginPhone;
              if (thatData.user.cgtStatus == 2) {
                thatData.postBaseInfo();
              }
            } else if (resData.status == -3) {
              mui.alert(resData.msg, function() {
                thatData.$router.push({ path: "/login" });
              });
            } /*  else if (resData.status * 1 == 30) {
              thatData.user.cgtStatus = resData.cgtStatus;
            } */ else {
              mui.alert(resData.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        mui.alert("设备授权已过期，请重新登录!", function() {
          thatData.$router.push({ path: "/login" });
        });
      }
    },
    postBaseInfo() {
      let thatData = this;
      this.$http
        .post("/api/user/baseInfo", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response);
          let resData = response.data;
          if (resData.status == 0) {
            thatData.realName = resData.result.realName;
            thatData.idNo = resData.result.idNo;
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postActivation: function() {
      let thatData = this;

      let data = {
        realName: thatData.realName,
        idNo: thatData.idNo
      };

      this.$http
        .post("/api/cgt/borrowerRegister", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response);
          let resData = response.data;
          if (resData.status == 0) {
            localStorage.setItem("isActivation", "1");
            localStorage.setItem("userOpenData", "1");
            window.open(response.data.result.htmlData, "_self", "");
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goBind: function() {
      var data = {};

      this.$http
        .post("/api/cgt/bindBankcard", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            localStorage.setItem("userOpenData", "");
            window.open(response.data.result.htmlData, "_self", "");
          } else if (resData.msg == "设备授权已过期，请重新登录!") {
            mui.alert(resData.msg, function() {
              this.$router.push({ path: "/login" });
            });
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    signOut: function() {
      let thatData = this;
      mui.confirm("您确定要退出吗?", function(e) {
        if (e.index) {
          localStorage.removeItem("token");
          localStorage.removeItem("userLoginData");
          base.data.token = "";
          thatData.$router.push({ path: "/login" });
        }
      });
    }
  }
};
</script>
<style>
@import "../style/css/loan_info.css";
</style>
