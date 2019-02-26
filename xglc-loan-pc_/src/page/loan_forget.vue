<template>
  <div>
    <div class="forget">
      <loan-header ref="header"></loan-header>
      <div class="center">
        <div class="forget-window">
          <div class="forget-title">
            <p>找回登录密码</p>
          </div>
          <div class="forget-form">
            <div class="input-line" :class="{'warning':warningClass == 1}">
              <input type="tel" @blur="inputBulr" v-model="cellphone" placeholder="请输入11位手机号码">
            </div>
            <div class="input-line clear b-1" :class="{'warning':warningClass == 2}">
              <input
                class="left"
                type="text"
                @blur="imgBulr"
                v-model="codenum"
                placeholder="输入图形验证码"
              >
              <div class="imgCode" @click="requestImgFunc()">
                <img :src="imgCode">
              </div>
            </div>
            <div class="input-line clear b-2" :class="{'warning':warningClass == 3}">
              <input class="left" type="tel" v-model="smsCode" placeholder="请输入短信验证码">
              <div class="sms-btn">
                <el-button type="text" @click="check()" :disabled="smsLocked">{{smsBtn}}</el-button>
              </div>
            </div>
            <div class="input-line clear b-3" :class="{'warning':warningClass == 4}">
              <input type="password" v-model="newPass" placeholder="请输入6-20位新密码">
            </div>
            <div class="tips" v-show="tips">
              <p>{{tips}}</p>
            </div>
            <div class="btn">
              <el-button @click="findPw">找回密码</el-button>
            </div>
          </div>
        </div>
        <div class="footer-tips">
          <p>温馨提示：请保持手机畅通以便于接收短信验证码。若您无法收到短信，请联系客服热线；400-700-4007</p>
        </div>
      </div>
      <loan-footer></loan-footer>
    </div>
  </div>
</template>
<script>
import loanHeader from "./loan_header.vue";
import loanFooter from "./loan_footer.vue";
export default {
  data() {
    return {
      cellphone: "",
      imgCode: "",
      codenum: "",
      smsCode: "",
      smsBtn: "获取验证码",
      smsLocked: false,
      newPass: "",
      tips: "",
      warningClass: ""
    };
  },
  components: {
    loanHeader,
    loanFooter
  },
  watch: {
    cellphone: function(val) {
      //限制手机号输入
      if (this.cellphone.length > 11) {
        this.cellphone = val.slice(0, 11);
      }
    },
    newPass: function(val) {
      //限制密码输入
      if (this.newPass.length > 20) {
        this.newPass = val.slice(0, 20);
      }
    },
    smsCode: function(val) {
      if (this.smsCode.length > 4) {
        this.smsCode = val.slice(0, 4);
      }
    },
    codenum: function(val) {
      if (this.codenum.length >= 4) {
        this.codenum = val.slice(0, 4);
      }
    }
  },
  created() {
    this.requestImgFunc();
  },
  mounted() {
    this.$refs.header.setHeaderTitle("忘记密码");
  },
  methods: {
    findPw: function() {
      let thatData = this;
      thatData.tips = "";
      thatData.warningClass = "";
      if (
        thatData.checkPhone(thatData.cellphone) &&
        thatData.checkSms(thatData.smsCode) &&
        thatData.checkPword(thatData.newPass)
      ) {
        thatData.postFindPwd();
      }
    },
    imgBulr: function() {
      let thatData = this;
      thatData.tips = "";
      thatData.warningClass = "";
      if (thatData.codenum.length != 4) {
        thatData.warningClass = 2;
        thatData.tips = "请输入图形验证码";
      }
    },
    inputBulr: function() {
      let thatData = this;
      thatData.tips = "";
      thatData.warningClass = "";
      if (thatData.cellphone) {
        if (thatData.checkPhone(thatData.cellphone)) {
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
            thatData.imgCode = "data:image/png;base64," + resData.result;
          } else {
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
        module: 2,
        type: 1,
        imgCode: thatData.codenum,
        sendType: 0,
        userRole: 1
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
            thatData.$message({
              message: "短信验证码发送成功",
              type: "success"
            });
          } else if (resData.status == 2719) {
            thatData.tips = "验证码已发送，请1分钟后再试";
          } else {
            thatData.tips = resData.msg;
            thatData.requestImgFunc(thatData.cellphone);
            thatData.smsLocked = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postFindPwd: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.cellphone,
        code: thatData.smsCode,
        roleType: 3,
        userRole: 1,
        password: DES3.encrypt(base.desKey, thatData.newPass),
        confirmPassword: DES3.encrypt(base.desKey, thatData.newPass)
      };

      this.$http
        .post("/api/user/findPwdStepOneForBorrower", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.$message({
              message: "密码修改成功",
              type: "success"
            });
            thatData.$router.push({ path: "/login" });
          } else {
            thatData.tips = resData.msg;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
    },
    check: function() {
      let thatData = this;
      thatData.tips = "";
      thatData.warningClass = "";
      if (thatData.checkPhone(thatData.cellphone)) {
        if (thatData.codenum.length == 4) {
          thatData.postSms();
        } else {
          thatData.warningClass = 2;
          thatData.tips = "请输入图形验证码";
        }
      } else {
      }
    }, //校验手机号
    checkPhone: function(a) {
      let thatData = this;
      if (!/^1[3456789]\d{9}$/.test(a) && a != "") {
        thatData.warningClass = 1;
        thatData.tips = "手机号码格式错误";
        return false;
      } else if (a == "") {
        thatData.warningClass = 1;
        thatData.tips = "请输入手机号码";
        return false;
      } else {
        return true;
      }
    }, //校验密码 不能低于6位高于20位 字母和数字组合
    checkPword: function(pw) {
      let thatData = this;
      if (!/^[A-Za-z0-9]{6,20}$/.test(pw) && pw != "") {
        thatData.warningClass = 4;
        thatData.tips = "密码长度为6-20个字符，且仅能包含数字和英文大小写!";
        return false;
      } else if (pw == "") {
        thatData.warningClass = 4;
        thatData.tips = "请输入登录密码";
        return false;
      } else {
        return true;
      }
    }, //校验短信验证码
    checkSms: function(sms) {
      let thatData = this;
      if (!/^\d{4}$/.test(sms) && sms != "") {
        thatData.warningClass = 3;
        thatData.tips = "短信验证码格式错误";
        return false;
      } else if (sms == "") {
        thatData.warningClass = 3;
        thatData.tips = "请输入短信验证码";
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style scoped>
@import "../style/css/loan_forget.css";
</style>
