<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {};
  },
  components: {
    "wap-alert": wapAlert
  },
  created() {},
  mounted() {
    this.getFrom();
  },
  methods: {
    getFrom: function() {
      let thatData = this;
      let from = thatData.$route.params.from;
      thatData.getLocalData(from);
    },
    getLocalData: function(from) {
      let thatData = this;
      if (from == "open") {
        //开户
        let jsonData = JSON.parse(localStorage.getItem("userOpenData"));
        let data = {
          realName: jsonData.realName,
          idNo: jsonData.idNo,
          /* cardNo: jsonData.cardNo,
          cellphone: jsonData.cellphone, */
          bankName: "123"
        };
        this.$http
          .post("/api/cgt/register", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              window.open(resData.result.htmlData, "_self", "");
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
      } else if (from == "bind") {
        //绑定
        //let jsonData = JSON.parse(localStorage.getItem("userBindData"));
        let data = {
          /* cardNo: jsonData.cardNo,
          cellphone: jsonData.cellphone */
        };
        this.$http
          .post("/api/cgt/bindBankcard", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              //window.open(resData.result.htmlData, "_self", "");
              location.replace(resData.result.htmlData);
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
      } else if (from == "recharge") {
        //充值
        let jsonData = JSON.parse(localStorage.getItem("userRechargeData"));
        let data = {
          amount: jsonData
        };

        this.$http
          .post("/api/assets/recharge", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              window.open(resData.result.cgtData, "_self", "");
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
      }
      //  提现
      else if (from == "withdrawal") {
        let jsonData = JSON.parse(localStorage.getItem("userWithMoney"));
        let data = {
          amount: jsonData
        };
        this.$http
          .post("/api/assets/withdraw", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            let resData = response.data;
            if (resData.status == 0) {
              window.open(resData.result.cgtData, "_self", "");
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
      }
      //  开通权益标
      else if (from == "userVip") {
        let data = {};
        this.$http
          .post("/api/cgt/newUserVip", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            let resData = response.data;
            if (resData.status == 0) {
              location.replace("/re_suc/verfy");
              //window.open("/re_suc/verfy", "_self", "");
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
      }
      //  开通自动授权
      else if (from == "openAuth") {
        let thatData = this;
        this.$http
          .post("/api/cgt/autoAuth", this.$qs.stringify(), {
            headers: base.ajaxHeadersWithToken()
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              location.replace(resData.result.htmlData);
              //window.open(resData.result.htmlData, "_self", "");
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
      }
      //  关闭自动授权
      else if (from == "closeAuth") {
        let thatData = this;
        this.$http
          .post("/api/cgt/cancelAutoAuth", this.$qs.stringify(), {
            headers: base.ajaxHeadersWithToken()
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              //window.open(resData.result.htmlData, "_self", "");
              location.replace(resData.result.htmlData);
            } else if (resData.status * 1 == 11) {
              mui.alert(resData.msg, " ", () => {
                thatData.$router.go(-1);
              });
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
      }
      //修改交易密码
      else if (from == "transaction_password") {
        let thatData = this;
        this.$http
          .post("/api/cgt/modifyPassword", this.$qs.stringify(), {
            headers: base.ajaxHeadersWithToken()
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              window.open(resData.result.htmlData, "_self", "");
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
      }
      //查询存管账户信息
      else if (from == "bankaccount_info") {
        let thatData = this;
        this.$http
          .post("/api/user/bankAccountInfo", this.$qs.stringify(), {
            headers: base.ajaxHeadersWithToken()
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              location.replace(resData.result.htmlData);
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
      }
    }
  }
};
</script>
<style scoped>
</style>
