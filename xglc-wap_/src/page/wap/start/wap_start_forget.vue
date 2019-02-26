<!-- 开始-忘记密码 -->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="forget">
      <div class="content">
        <div class="input-line">
          <div class="input border-one-half-bottom">
            <input class="phoneid" v-model="id" type="number" placeholder="请输入手机号码">
          </div>
          <img @click="clear()" class="clos" src="/static/img/wap_start_02.png">
        </div>
        <div class="input-line">
          <div class="input border-one-half-bottom">
            <input v-model="sms" type="number" placeholder="请输入验证码" style="padding-right: 36.7%;">
          </div>
          <span @click="checkPhoneNum()" class="getsms" v-show="smsReady">获取验证码</span>
          <span class="getsms lock" v-show="!smsReady">{{smsBtn}}</span>
        </div>
        <div class="input-line">
          <div class="input border-one-half-bottom">
            <input v-model="pw" :type="show ? 'text' : 'password'" placeholder="请设置登录密码（6~20位，至少含字母、数字）">
          </div>
          <img @click="show = !show" v-show="show" class="show" src="/static/img/wap_start_05.png">
          <img @click="show = !show" v-show="!show" class="show" src="/static/img/wap_start_06.png">
        </div>
        <div class="btn-line">
          <button @click="checkFunc()">提交</button>
        </div>
      </div>
      <transition name="imgCode">
        <div id="img-code" v-show="imgCode">
          <div class="block"></div>
          <div class="window">
            <h5 class="title">请输入图片验证码</h5>
            <div class="img clear">
              <img :src="base64Str">
              <span class="f5" @click="postImgCode(),codenum=''"><img src="/static/img/wap_start_11.png"></span>
            </div>
            <div class="hidden-input">
              <input id="hdinput" type="number" v-model="codenum" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
            </div>
            <div @click="clickImgInput()" class="num-input clear">
              <span>{{codenum.charAt(0)}}</span>
              <span>{{codenum.charAt(1)}}</span>
              <span>{{codenum.charAt(2)}}</span>
              <span>{{codenum.charAt(3)}}</span>
            </div>
            <img @click="imgCode = !imgCode" class="clos" src="/static/img/wap_start_10.png">
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      id: "",
      smsBtn: "",
      smsReady: true,
      base64Str: "",
      sms: "",
      pw: "",
      show: false,
      invite: "",
      imgCode: false,
      codenum: ""
    };
  },
  watch: {
    id: function(val) {
      if (this.id.length > 11) {
        this.id = val.slice(0, 11);
      }
    },
    sms: function(val) {
      if (this.sms.length > 6) {
        this.sms = val.slice(0, 6);
      }
    },
    pw: function(val) {
      if (this.pw.length > 20) {
        this.pw = val.slice(0, 20);
      }
    },
    codenum: function(val) {
      if (this.codenum.length >= 4) {
        this.codenum = val.slice(0, 4);
        this.postFindPhone();
      }
    }
  },
  beforeCreate() {
    $("body").css("background", "#fff");
  },
  beforeDestroy() {
    $("body").css("background", "#f2f2f2");
  },
  components: {
    wapAlert
  },
  methods: {
    clear: function() {
      //清空手机号
      let thatData = this;
      thatData.id = "";
      document.querySelector(".phoneid").focus();
    },
    clickImgInput: function() {
      document.querySelector("#hdinput").focus();
    },
    smsCountdown: function() {
      let thatData = this;
      thatData.smsReady = false;
      thatData.smsBtn = "60s";
      let codeTime = 60;
      let st = setInterval(function() {
        if (codeTime > 1) {
          thatData.smsBtn = --codeTime + "s";
        } else {
          thatData.smsBtn = "重新获取";
          thatData.smsReady = true;
          clearInterval(st)
        }
      }, 1000);
    },
    checkFunc: function() {
      let thatData = this;
      if (
        base.checkPhone(thatData.id) &&
        base.checkSms(thatData.sms) &&
        base.checkPword(thatData.pw)
      ) {
        thatData.postPassword();
      } else {
      }
    },
    checkPhoneNum: function() {
      let thatData = this;
      if (base.checkPhone(thatData.id)) {
        thatData.codenum = "";
        thatData.imgCode = !thatData.imgCode;
        thatData.postImgCode();

        setTimeout(function() {
          thatData.clickImgInput();
        }, 100);
      } else {
      }
    },
    postImgCode: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.id
      };

      this.$http
        .post("/api/img/code", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.base64Str = "data:img/png;base64," + resData.result;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postFindPhone() {
      let thatData = this;

      let data = {
        cellphone: thatData.id
      };

      this.$http
        .post("/api/user/findPhoneExist", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.postSms();
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
            thatData.codenum = "";
            thatData.postImgCode();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postSms: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.id,
        module: "2",
        type: "1",
        imgCode: thatData.codenum
      };

      this.$http
        .post("/api/sms/findPwd", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.smsCountdown();
            mui.toast("短信验证码发送成功", { duration: 1000, type: "div" });
            thatData.imgCode = false;
          } else if (resData.status == 2003) {
            mui.toast("图片验证码错误", { duration: 1000, type: "div" });
            thatData.codenum = "";
            thatData.postImgCode();
          } else if (resData.status == 2719) {
            mui.toast("验证码已发送，请1分钟后再试", {
              duration: 1000,
              type: "div"
            });
            thatData.codenum = "";
            thatData.postImgCode();
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
            thatData.codenum = "";
            thatData.postImgCode();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postPassword: function() {
      var thatData = this;

      var data = {
        cellphone: thatData.id,
        code: thatData.sms,
        password: base.DES3.encrypt(base.desKey, thatData.pw),
        confirmPassword: base.DES3.encrypt(base.desKey, thatData.pw)
      };

      this.$http
        .post("/api/user/findPwdStepOne", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response);
          let resData = response.data;

          if (resData.status == 0) {
            mui.toast("修改成功", { duration: 1000, type: "div" });
            setTimeout(function() {
              thatData.$router.replace({ path: "/start_login" });
            }, 600);
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
@import "../../../style/css/wap_start_forget.css";
</style>
