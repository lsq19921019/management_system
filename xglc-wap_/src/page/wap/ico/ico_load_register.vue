<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="register in-padding">
      <div class="top">
        <!-- <router-link to="/start_login">登录</router-link> -->
        <router-link class="active" to="">注册</router-link>
      </div>
      <div class="content">
        <div class="input-line">
          <img class="icon" src="/static/img/wap_start_01.png">
          <div class="input border-one-half-bottom">
            <input class="phoneid" v-model="id" type="number" placeholder="手机号">
          </div>
          <img @click="clear()" class="clos" src="/static/img/wap_start_02.png">
        </div>
        <div class="input-line">
          <img class="icon" src="/static/img/wap_start_03.png">
          <div class="input border-one-half-bottom">
            <input v-model="sms" style="padding-right: 26.5%;" type="number" placeholder="验证码">
          </div>
          <span @click="checkPhoneNum()" class="getsms" v-show="smsReady">获取验证码</span>
          <span class="getsms lock" v-show="!smsReady">{{smsBtn}}</span>
        </div>
        <!-- <div class="input-line">
          <img class="icon" src="/static/img/wap_start_04.png">
          <div class="input border-one-half-bottom">
            <input :type="show ? 'text' : 'password'" v-model="pw" style="padding-right: 11.1%;" type="password" placeholder="登录密码">
          </div>
          <img @click="show = !show" v-show="show" class="show" src="/static/img/wap_start_05.png">
          <img @click="show = !show" v-show="!show" class="show" src="/static/img/wap_start_06.png">
        </div> -->
        <!-- <div class="input-line">
          <img class="icon" src="/static/img/wap_start_07.png">
          <div class="input border-one-half-bottom">
            <input v-model="invite" type="number" placeholder="邀请人手机号（非必填）">
          </div>
        </div> -->
        <div class="reg-agree">
          <p><img @click="agree = !agree" src="/static/img/wap_start_08.png" v-show="!agree"><img @click="agree = !agree" src="/static/img/wap_start_09.png" v-show="agree"><span @click="agree = !agree">我已阅读并同意</span>
            <router-link to="/reg_agree">《小鸽理财用户协议》</router-link>
          </p>
        </div>
        <div class="btn-line">
          <button @click="checkFunc()">注册</button>
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
      //pw: "",
      //show: false,
      //invite: "",
      platId: "",
      agree: true,
      imgCode: false,
      codenum: "",
      come: null
    };
  },
  watch: {
    //输入位数限制
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
    /*'pw': function(val) {
      if (this.pw.length > 20) {
        this.pw = val.slice(0, 20)
      }
    },*/
    /*'invite': function(val) {
      if (this.invite.length > 11) {
        this.invite = val.slice(0, 11)
      }
    },*/
    codenum: function(val) {
      if (this.codenum.length >= 4) {
        this.codenum = val.slice(0, 4);
        this.postSms();
      }
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.getPlatId();
  },
  mounted() {},
  methods: {
    getPlatId: function() {
      let thatData = this;
      if (thatData.$route.query.platId) {
        thatData.id = thatData.$route.query.mobile;
        thatData.platId = thatData.$route.query.platId;
        let icoData = {
          mobile: thatData.$route.query.mobile,
          platId: thatData.$route.query.platId
        };
        localStorage.setItem("icoData", JSON.stringify(icoData));
      } else {
        let icoData = localStorage.getItem(JSON.parse(icoData));
        thatData.id = icoData.mobile;
        thatData.platId = icoData.platId;
      }
    },
    clear: function() {
      //清空手机号
      let thatData = this;
      thatData.id = "";
      document.querySelector(".phoneid").focus();
    },
    clickImgInput: function() {
      //选中隐藏的验证码输入框
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
    checkAgree: function() {
      let thatData = this;
      if (!thatData.agree) {
        mui.toast("您未同意《小鸽理财用户协议》", {
          duration: 1000,
          type: "div"
        });
        return false;
      } else {
        return true;
      }
    },
    checkFunc: function() {
      let thatData = this;
      if (
        base.checkPhone(thatData.id) &&
        base.checkSms(thatData.sms) /* && base.checkPword(thatData.pw)*/ &&
        thatData.checkAgree()
      ) {
        thatData.postRegister();
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
    postSms: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.id,
        module: "1",
        type: "1",
        imgCode: thatData.codenum,
        sendType: "0"
      };

      this.$http
        .post("/api/sms/register", this.$qs.stringify(data), {
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
    postRegister: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.id,
        //password: thatData.pw,
        code: thatData.sms
        //referrer: thatData.invite
      };

      let register = base.DES3.encrypt(base.desKey, JSON.stringify(data));

      let jsonData = {
        register: register,
        platformId: thatData.platId,
        type: 1
      };

      this.$http
        .post("/api/open/platformUserOpen", this.$qs.stringify(jsonData), {
          headers: base.ajaxHeaderWithoutToken(jsonData)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            mui.toast("注册成功", { duration: 1000, type: "div" });
            setTimeout(function() {
              let token = resData.result.token;
              localStorage.setItem("token", token);
              localStorage.setItem(
                "userLoginData",
                JSON.stringify(resData.result)
              );
              base.data.token = token;
              localStorage.removeItem("icoData");
              thatData.$router.replace({ path: "/invest_index" });
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
@import "../../../style/css/wap_start_reg.css";
</style>
