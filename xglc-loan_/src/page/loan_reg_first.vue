<!--
  create : dxc 2018-12-01
  desc : 个人开户第一步
  update : 
  desc : 
-->
<template>
  <div class="register_fir" :style="{height:height + 'px'}">
    <div class="login-input in-padding">
      <img class="top-icon" src="/static/img/loan_login_01.png">
      <input v-model="phone" type="number" placeholder="请输入注册手机号">
      <img @click="phone = ''" class="clear" src="/static/img/loan_login_02.png">
    </div>
    <div class="login-input in-padding">
      <img class="top-icon" src="/static/img/loan_login_03.png">
      <input type="number" v-model="smsCode" placeholder="请输入验证码">
      <span v-if="smsReady" @click="checkPhoneNum()" class="switch-box">{{smsBtn}}</span>
      <span v-else class="switch-box" style="background:#ccc;">{{smsBtn}}</span>
    </div>
    <div class="in-padding">
      <button @click="checkFunc()" class="btn">注册</button>
    </div>
    <div class="in-padding foot-title">
      <p>
        已开通借款人账户
        <router-link to="/login">点击登录</router-link>
      </p>
    </div>
    <div class="agree">
      <input class="a_cb" type="checkbox" v-model="state" @click="state = !state">
      <p @click="state = !state">
        我已阅读并签署
        <router-link to="/agree_book">《借款人授权委托书》</router-link>、
        <a href="https://wap.xiaogelicai.com/reg_agree">《小鸽理财用户协议》</a>、
        <router-link to="/agree_riskbook">《收费标准及风险告知书》</router-link>同意注册众邦银行存管服务
      </p>
    </div>
    <transition name="imgCode">
      <div id="img-code" v-show="imgCode">
        <div class="block"></div>
        <div class="window">
          <h5 class="title">请输入图片验证码</h5>
          <div class="img clear">
            <img :src="base64Str">
            <span class="f5" @click="postImgCode(),imgCodeNum=''">
              <img src="/static/img/wap_start_11.png">
            </span>
          </div>
          <div class="hidden-input">
            <input
              id="hdinput"
              type="number"
              v-model="imgCodeNum"
              onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            >
          </div>
          <div @click="clickImgInput()" class="num-input clear">
            <span>{{imgCodeNum.charAt(0)}}</span>
            <span>{{imgCodeNum.charAt(1)}}</span>
            <span>{{imgCodeNum.charAt(2)}}</span>
            <span>{{imgCodeNum.charAt(3)}}</span>
          </div>
          <img @click="imgCode = !imgCode" class="clos" src="/static/img/wap_start_10.png">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      smsCode: "",
      smsBtn: "获取验证码",
      smsReady: true,
      imgCode: false,
      base64Str: "",
      imgCodeNum: "",
      state: true,
      height: ""
    };
  },
  watch: {
    phone: function(val) {
      if (this.phone.length > 11) {
        this.phone = val.slice(0, 11);
      }
    },
    smsCode: function(val) {
      if (this.smsCode.length > 4) {
        this.smsCode = val.slice(0, 4);
      }
    },
    imgCodeNum: function(val) {
      if (this.imgCodeNum.length >= 4) {
        this.imgCodeNum = val.slice(0, 4);
        this.postSms();
      }
    }
  },
  components: {},
  created() {
    this.chBg("#fff");
    this.autoBg();
  },
  mounted() {},
  methods: {
    autoBg: function() {
      this.height = document.documentElement.clientHeight - 36;
    },
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    clickImgInput: function() {
      //第三步 选中隐藏的验证码输入框
      document.querySelector("#hdinput").focus();
    },
    smsCountdown: function() {
      //第三步 短信按钮
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
          clearInterval(st);
        }
      }, 1000);
    },
    checkFunc: function() {
      //第三步 注册信息填写校验
      let thatData = this;
      if (base.checkPhone(thatData.phone)) {
        if (base.checkSms(thatData.smsCode)) {
          if (thatData.state) {
            thatData.postRegister();
          } else {
            mui.alert("请勾选并阅读相关协议!");
          }
        }
      }
    },
    checkPhoneNum: function() {
      //第三步 短信按钮激活图形验证码
      let thatData = this;
      if (base.checkPhone(thatData.phone)) {
        thatData.imgCodeNum = "";
        thatData.imgCode = !thatData.imgCode;
        thatData.postImgCode();

        setTimeout(function() {
          thatData.clickImgInput();
        }, 100);
      } else {
      }
    },
    postImgCode: function() {
      //第三步 图形验证码
      let thatData = this;

      let data = {
        cellphone: thatData.phone
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
      //第三步 短信验证码
      let thatData = this;

      let data = {
        cellphone: thatData.phone,
        module: 1,
        type: 1,
        imgCode: thatData.imgCodeNum,
        sendType: 0,
        userRole: 1
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
            thatData.imgCodeNum = "";
            thatData.postImgCode();
          } else if (resData.status == 2719) {
            mui.toast("验证码已发送，请1分钟后再试", {
              duration: 1000,
              type: "div"
            });
            thatData.imgCodeNum = "";
            thatData.postImgCode();
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
            thatData.imgCodeNum = "";
            thatData.postImgCode();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postRegister: function() {
      //第三步 注册
      let thatData = this;

      let data = {
        cellphone: thatData.phone,
        code: thatData.smsCode,
        userRole: 1
      };

      let register = DES3.encrypt(base.desKey, JSON.stringify(data));

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
            let token = resData.result.token;
            localStorage.setItem("token", token);
            localStorage.setItem(
              "userLoginData",
              JSON.stringify(resData.result)
            );
            base.data.token = token;
            thatData.$router.push({ path: "/loan_reg_index" });
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
<style lang='scss' scoped>
.register_fir {
  margin-top: 36px;
  .info-list {
    height: 45px;
  }
  .in-padding {
    padding-left: 4%;
    padding-right: 4%;
  }
  .in-border {
    border: none;
    border-bottom: 1px solid #e6e6e6;
  }
  .login-input {
    position: relative;
    img.top-icon {
      display: inline-block;
      width: 5.8%;
      padding-left: 3.4%;
      padding-right: 3.1%;
      position: relative;
      top: 5px;
    }
    input {
      display: inline-block;
      padding: 0;
      width: 65.8%;
      border: none;
      height: 62px;
      line-height: 18px;
      font-family: "Microsoft Yahei";
      font-size: 14px;
      outline: none;
      padding-left: 8.6%;
      padding-right: 9.3%;
      border-bottom: 1px solid #e6e6e6;
    }
    img.clear {
      position: absolute;
      top: 50%;
      right: 7%;
      width: 5.2%;
      transform: translateY(-50%);
    }
    .switch-box {
      position: absolute;
      top: 50%;
      right: 7%;
      width: 1.6rem;
      height: 0.54rem;
      transform: translateY(-50%);
      font-size: 0.22rem;
      line-height: 0.54rem;
      color: #fff;
      background: #ff5637;
      text-align: center;
      border-radius: 0.54rem;
    }
  }
  .btn {
    display: block;
    outline: none;
    width: 94.2%;
    margin: 0.9rem auto 0;
    height: 44px;
    border: none;
    border-radius: 22px;
    font-size: 16px;
    color: #fff;
    box-shadow: 0 0 20px rgba(255, 86, 55, 0.5);
    background: linear-gradient(left, #fe7229, #ff5637);
  }
  .foot-title {
    margin-top: 5px;
    p {
      text-align: center;
      font-size: 14px;
      line-height: 32px;
      color: #999;
      a {
        color: #ff5637;
      }
    }
  }
  .agree {
    position: absolute;
    bottom: 0;
    left: 7%;
    padding-bottom: 0.4rem;
    width: 86%;
    margin: 0 auto;
    p {
      font-size: 12px;
      line-height: 15px;
      color: #a3a2a8;
      margin-left: 20px;
      a {
        color: #a3a2a8;
      }
    }
    .a_cb {
      width: 12px;
      height: 12px;
      float: left;
    }
  }
  .clear:after {
    content: "";
    display: block;
    clear: both;
  }
  #img-code {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .block {
      width: 100%;
      height: 100%;
      opacity: 0.6;
      background: #000;
    }
    .window {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      height: 204px;
      margin-left: -40%;
      margin-top: -102px;
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      overflow: hidden;
      .title {
        font-size: 16px;
        line-height: 60px;
        color: #555;
        text-align: center;
        font-weight: normal;
        position: relative;
      }
      .img {
        padding-top: 10px;
        width: 240px;
        margin: 0 auto;
        img {
          display: block;
          width: 75%;
          height: 60px;
          float: left;
        }
        .f5 {
          display: block;
          width: 25%;
          height: 60px;
          float: right;
          background: #9eb7d6;
          position: relative;
          img {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 28px;
            height: 31px;
          }
        }
      }
      .hidden-input {
        text-align: center;
        height: 0;
        position: relative;
        top: -300px;
        opacity: 0;
        input {
          border: none;
          background: none;
        }
      }
      .num-input {
        width: 240px;
        padding-top: 12px;
        margin: 0 auto;
        span {
          display: block;
          height: 42px;
          width: 42px;
          font-size: 27px;
          line-height: 42px;
          float: left;
          border: 1px solid #d1d1d1;
          margin-right: 21px;
          text-align: center;
        }
        span:last-child {
          margin-right: 0;
        }
      }
      .clos {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }
  }
}
</style>