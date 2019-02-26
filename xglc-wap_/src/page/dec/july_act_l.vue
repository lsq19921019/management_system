<template>
  <div>
    <div class="act_l">
      <div class="top-img">
        <img src="/static/img/july_act_l_01.png">
      </div>
      <div class="out-line">
        <div class="inner-box box-1" style=" border-top-left-radius: 0;border-top-right-radius: 0;">
          <div class="title-s">
            <img src="/static/img/may_act_l_02.png">
          </div>
          <div class="inputContainer">
            <input v-model="cellphone" @blur="inputBulr" type="number" name="cellphone" placeholder="请输入11位手机号码" />
          </div>
          <div class="inputContainer">
            <input v-model="password" type="password" name='password' placeholder="请设置6-20位登录密码" />
          </div>
          <div class="inputContainer">
            <input type="number" name="photoCode" id="photoCode" maxlength="4" placeholder="请输入验证码" v-model="codenum" />
            <div class="imgCodeBox"><img id="imgCode" :src="imgBase" alt="" @click="requestImgFunc()" /></div>
            <div class="clear"></div>
          </div>
          <!-- <div v-show="!showMessageCode" id="slideVerify"></div> -->
          <div class="inputContainer">
            <input v-model="smsCode" type="number" name='messagecode' placeholder="请输入短信验证码" id="validateCode" />
            <button @click="checkCallPhone()" :disabled="smsLocked" id="validateCodeBth">{{smsBtn}}</button>
            <div class="clear"></div>
          </div>
          <p class="agree"><img @click="agree = !agree" src="/static/img/may_act_l_13.png" v-show="agree"><img @click="agree = !agree" src="/static/img/may_act_l_14.png" v-show="!agree"><span @click="agree = !agree">我已阅读并同意</span><a href="/reg_agree">《小鸽理财用户协议》</a></p>
          <div class="btn">
            <div class="btn-border" @click="checkFunc()">
              <div class="btn-top">
                <p>免费注册送888元红包</p>
              </div>
            </div>
          </div>
          <div class="title-s">
            <img src="/static/img/july_act_l_02.png" style="width: 39%;">
          </div>
          <div class="rule-text">
            <p>1、活动时间：7月8日-7月9日</p>
            <p>2、活动期间通过本页面注册的新用户，累计投资金额达5000元及以上，即送3000阅饼。（每位用户限领取1次）</p>
            <p>3、领取阅饼请咨询QQ：3494492176</p>
          </div>
          <div class="plan-img">
            <img src="/static/img/may_act_l_03.png?v=1">
          </div>
        </div>
        <div class="inner-box box-2">
          <div class="box-title">
            <img src="/static/img/may_act_l_06.png">
          </div>
          <div class="mui-row">
            <div class="mui-col-xs-6">
              <img src="/static/img/may_act_l_07.png">
              <p>银行存管</p>
            </div>
            <div class="mui-col-xs-6">
              <img src="/static/img/may_act_l_08.png">
              <p>国有银行背景风控团队</p>
            </div>
          </div>
          <div class="mui-row">
            <div class="mui-col-xs-6">
              <img src="/static/img/may_act_l_09.png">
              <p>公安局颁发等保备案</p>
            </div>
            <div class="mui-col-xs-6">
              <img src="/static/img/may_act_l_10.png">
              <p>胡润新金融获奖企业</p>
            </div>
          </div>
        </div>
        <div class="inner-box box-3">
          <div class="box-title">
            <img src="/static/img/may_act_l_11.png">
          </div>
          <div class="about-us">
            <p>小鸽理财是一家专注于为有资产的优质客户提供抵押或信用贷款的网络借贷信息中介服务平台，总部位于深圳市南山区。我司融合“互联网+金融”,一直以来秉持规范、安全、透明、诚信的经营准则，为用户提供T+1高效安全的互联网投融资信息中介服务。
              <br>核心团队大部分来自国有银行，在10余年资深国有大银行系风控团队把关下，29道程序层层流转，兼用百度人脸识别技术，以及央行及8大征信机构验核体系，第三方机构担保和代偿协议，多重交叉审核等多维度确保标的资产安全可控。
              <br>2017年9月，小鸽理财正式上线资金存管，平台不触碰资金。在线电子合同凭证第三方机构投资标担保+代偿等保障方式，为投资人的资金保驾护航</p>
          </div>
        </div>
        <div class="out-line btn-line">
          <div class="btn">
            <div class="btn-border" id="foot-reg">
              <div class="btn-top">
                <p>点击领取888元红包+3000阅饼</p>
              </div>
            </div>
          </div>
        </div>
        <div class="logo-line">
          <img src="/static/img/may_act_l_12.png">
          <p><span>银行资金存管</span><span>真实授信资料</span></p>
          <p class="tips">出借有风险 入市需谨慎</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //阿里滑动校验
      /*session: "",
      sig: "",
      ncToken: "",
      ncScene: "",*/
      imgBase: "",
      //发送短信验证码
      cellphone: "",
      type: "1",
      sendType: "0",
      codenum: "",
      //注册
      smsCode: "", //短信码
      password: "", //密码
      sourceType: "", //渠道号
      showMessageCode: false,
      smsLocked: false,
      smsBtn: "获取验证码",
      agree: true
    };
  },
  watch: {
    cellphone: function(val) {
      //限制手机号输入
      if (this.cellphone.length > 11) {
        this.cellphone = val.slice(0, 11);
      }
    },
    password: function(val) {
      //限制密码输入
      if (this.password.length > 20) {
        this.password = val.slice(0, 20);
      }
    },
    smsCode: function(val) {
      if (this.smsCode.length > 6) {
        this.smsCode = val.slice(0, 6);
      }
    },
    codenum: function(val) {
      if (this.codenum.length >= 4) {
        this.codenum = val.slice(0, 4);
      }
    }
  },
  mounted() {
    this.getST();
    this.requestImgFunc();
    //this.aLiVerify()
    $("#foot-reg").click(function() {
      $("html , body").animate({ scrollTop: 150 }, "slow");
    });
  },
  methods: {
    inputBulr: function() {
      let thatData = this;
      if (thatData.cellphone) {
        if (base.checkPhone(thatData.cellphone)) {
          thatData.requestImgFunc(thatData.cellphone);
        }
      }
    },
    getST: function() {
      let thatData = this;
      if (thatData.$route.query.stype) {
        thatData.sourceType = thatData.$route.query.stype;
      } else {
        thatData.sourceType = "1";
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
        sourceType: thatData.sourceType
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
        base.checkSms(thatData.smsCode) &&
        thatData.checkAgree()
      ) {
        thatData.postRegister();
      } else {
      }
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
    /*aLiVerify: function() { //阿里滑动验证
      let thatData = this
      var nc_appkey = 'FFFF00000000017940A2'; //  应用标识,不可更改
      var nc_scene = 'login_h5'; //场景,不可更改
      var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
      var nc_option = {
        renderTo: '#slideVerify', //渲染到该DOM  ID指定的Div位置
        appkey: nc_appkey,
        scene: nc_scene,
        token: nc_token,
        //trans: '{"name1":"code100"}', //测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
        callback: function(data) { //  校验成功回调
          thatData.session = data.csessionid
          thatData.sig = data.sig
          thatData.ncToken = nc_token
          thatData.ncScene = nc_scene
          thatData.showMessageCode = true
        },
        error: function(s) {},
        verifycallback: function(data) {}
      };
      NoCaptcha.init(nc_option);
      NoCaptcha.setEnabled(true);
    },*/
  }
};
</script>
<style scoped>
@import "../../style/css/july_act_l.css";
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
