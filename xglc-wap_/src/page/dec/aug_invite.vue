<template>
  <div>
    <div class="aug-invite">
      <div class="img-line">
        <img src="/static/img/aug_invite_01.png">
      </div>
      <div class="form-line">
        <div class="form">
          <div class="friends-tips">
            <p>您的好友{{inviteId}}邀请您与TA一起理财</p>
          </div>
          <div class="inputContainer">
            <input type="number" @blur="inputBulr()" name="cellphone" id="phoneNumber" maxlength="11" placeholder="请输入11位手机号" v-model="cellphone" />
          </div>
          <div class="inputContainer">
            <input type="password" name='password' id="password" maxlength="20" placeholder="请设置登录密码6-20位" v-model="password" />
          </div>
          <div class="inputContainer">
            <input type="number" name="photoCode" id="photoCode" maxlength="4" placeholder="请输入验证码" v-model="codenum" />
            <img id="imgCode" src="" @click="requestImgFunc()" />
            <div class="clear"></div>
          </div>
          <div id="messVerify" class="inputContainer">
            <input type="number" name='messagecode' id="validateCode" placeholder="短信验证码" v-model="smsCode" />
            <button id="validateCodeBth" @click="checkCallPhone()">{{smsBtn}}</button>
            <div class="clear"></div>
          </div>
          <div class="sub-btn">
            <button @click="checkFunc()">立即领取奖励</button>
          </div>
        </div>
      </div>
      <div class="img-line">
        <img src="/static/img/aug_invite_02.png">
        <div class="to-top-btn">
          <button id="foot-reg">立即注册</button>
        </div>
      </div>
      <div class="img-line">
        <img src="/static/img/aug_invite_03.png">
      </div>
      <div class="img-line">
        <img src="/static/img/aug_invite_04.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgBase: "", //发送短信验证码
      cellphone: "",
      type: "1",
      sendType: "0",
      codenum: "",
      //注册
      smsCode: "", //短信码
      password: "", //密码
      smsLocked: false,
      smsBtn: "获取",
      invitePhone: "",
      inviteId: ""
    };
  },
  watch: {
    //输入位数限制
    cellphone: function(val) {
      if (this.cellphone.length > 11) {
        this.cellphone = val.slice(0, 11);
      }
    },
    smsCode: function(val) {
      if (this.smsCode.length > 6) {
        this.smsCode = val.slice(0, 6);
      }
    },
    password: function(val) {
      if (this.password.length > 20) {
        this.password = val.slice(0, 20);
      }
    },
    codenum: function(val) {
      if (this.codenum.length >= 4) {
        this.codenum = val.slice(0, 4);
      }
    }
  },
  mounted() {
    this.getInvitePhone();
    this.requestImgFunc();
    $("#foot-reg").click(function() {
      console.log("ssds");
      $("html , body").animate({ scrollTop: 486 }, "slow");
    });
  },
  methods: {
    getInvitePhone() {
      let thatData = this;
      thatData.invitePhone = thatData.$route.query.phone;
      thatData.inviteId = thatData.$route.query.id;
      if (thatData.invitePhone && thatData.invitePhone.indexOf(" ") > 0) {
        thatData.invitePhone = thatData.invitePhone.replace(/[ ]/, "+");
      }
      if (!thatData.invitePhone) {
        thatData.invitePhone = thatData.inviteId;
      }
    },
    inputBulr: function() {
      let thatData = this;
      if (thatData.cellphone) {
        if (base.checkPhone(thatData.cellphone)) {
          thatData.requestImgFunc(thatData.cellphone);
        }
      }
    },
    requestImgFunc: function(number) {
      var phoneNumber = number || "15888888888";

      let thatData = this;

      let data = {
        cellphone: phoneNumber
      };

      this.$http
        .post("/api/img/code", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            $("img#imgCode").attr(
              "src",
              "data:image/png;base64," + resData.result
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postSms: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.cellphone,
        type: thatData.type,
        sendType: thatData.sendType,
        imgCode: thatData.codenum
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
          } else if (resData.status == 2719) {
            mui.toast("验证码已发送，请1分钟后再试", {
              duration: 1000,
              type: "div"
            });
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
            thatData.requestImgFunc(thatData.cellphone);
            thatData.smsLocked = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postRegister: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.cellphone,
        password: thatData.password,
        code: thatData.smsCode,
        referrer: thatData.invitePhone
      };

      let register = base.DES3.encrypt(base.desKey, JSON.stringify(data));

      this.$http
        .post(
          "/api/user/register",
          this.$qs.stringify({ register: register }),
          {
            headers: base.ajaxHeaderWithoutToken({ register: register })
          }
        )
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            mui.toast("注册成功", { duration: 1000, type: "div" });
            thatData.$router.replace({ path: "/reg_success" });
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
            thatData.requestImgFunc(thatData.cellphone);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkCallPhone: function() {
      let thatData = this;
      if (base.checkPhone(thatData.cellphone)) {
        if (thatData.codenum.length == 4) {
          thatData.postSms();
        } else {
          mui.toast("请输入图形验证码", { duration: 1000, type: "div" });
        }
      } else {
      }
    },
    checkFunc: function() {
      let thatData = this;
      if (
        base.checkPhone(thatData.cellphone) &&
        base.checkPword(thatData.password) &&
        base.checkSms(thatData.smsCode)
      ) {
        thatData.postRegister();
      } else {
      }
    },
    smsCountdown: function() {
      let thatData = this;
      thatData.smsLocked = true;
      thatData.smsBtn = "60s";
      let codeTime = 60;
      let st = setInterval(function() {
        if (codeTime > 1) {
          thatData.smsBtn = --codeTime + "s";
        } else {
          thatData.smsBtn = "重新获取";
          thatData.smsLocked = false;
          thatData.requestImgFunc(thatData.cellphone);
          clearInterval(st);
        }
      }, 1000);
    }
  }
};
</script>
<style lang="css" scoped>
.clear {
  clear: both;
}

.aug-invite .img-line {
  position: relative;
}

.aug-invite .img-line img {
  display: block;
  width: 100%;
}

.aug-invite .form-line {
  background: #5c34cd;
}

.aug-invite .form {
  width: 87.73%;
  margin: auto;
  background: #481da2;
  border-radius: 6px;
}

.aug-invite .form .friends-tips {
  width: 91.18%;
  margin: auto;
  padding-top: 18px;
  padding-bottom: 34px;
}

.aug-invite .form .friends-tips p {
  font-size: 12px;
  line-height: 22px;
  color: #fff;
  text-align: center;
  background: url(/static/img/aug_invite_05.png) repeat-y center;
  background-size: contain;
}

.aug-invite .form .inputContainer {
  width: 91.18%;
  margin: 0 auto;
  position: relative;
}

.aug-invite .form .inputContainer input {
  width: 100%;
  margin-bottom: 15px;
  height: 18px;
  text-indent: 25px;
  line-height: 18px;
  padding: 13px 0;
  background: #fff;
  font-family: "Microsoft Yahei";
  font-size: 15px;
  border: none;
  outline: none;
  border-radius: 4px;
}

.aug-invite .form .inputContainer input#validateCode,
.aug-invite .form .inputContainer input#photoCode {
  border-radius: 0;
  width: 67.6%;
  border-radius: 4px;
  padding-right: 32.4%;
}

.aug-invite .form .inputContainer #imgCode {
  position: absolute;
  right: 2.82%;
  top: 4px;
  width: 26.74%;
  height: 36px;
  border-radius: 18px;
}

.aug-invite .form .inputContainer button#validateCodeBth {
  position: absolute;
  right: 2.82%;
  top: 4px;
  width: 26.74%;
  height: 36px;
  border-radius: 18px;
  font-size: 15px;
  color: #fff;
  background: #f02027;
  border: none;
}

.aug-invite .form .sub-btn {
  padding-top: 20px;
  padding-bottom: 26px;
  text-align: center;
}

.aug-invite .form .sub-btn button {
  width: 91.18%;
  height: 46px;
  border: none;
  background: #feda1e;
  font-size: 15px;
  color: #802915;
}

.aug-invite .img-line .to-top-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 26px;
  text-align: center;
}

.aug-invite .img-line .to-top-btn button {
  width: 80.26%;
  height: 46px;
  border: none;
  background: #feda1e;
  font-size: 15px;
  color: #802915;
}
</style>
<style>
.mui-toast-container {
  bottom: 49% !important;
  transition: opacity 0.3s;
}

.mui-toast-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  width: 66%;
  padding: 12px 18px;
  border: 1px solid #2d2d2d;
}
</style>
