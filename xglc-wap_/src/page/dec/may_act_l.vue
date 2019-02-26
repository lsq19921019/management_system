<template>
  <div>
    <div class="act_l">
      <div class="top-img">
        <img src="/static/img/may_act_l_01.png" v-if="channel == 'JD'">
        <img src="/static/img/may_act_l_00.png" v-else-if="channel == 'JY'">
      </div>
      <div class="out-line">
        <div class="inner-box box-1" style=" border-top-left-radius: 0;border-top-right-radius: 0;">
          <div class="title-s">
            <img src="/static/img/may_act_l_02.png">
          </div>
          <div class="inputContainer">
            <input v-model="cellphone" @blur="inputBulr()" type="number" name="cellphone" placeholder="请输入11位手机号码" />
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
          <div class="plan-img">
            <img src="/static/img/may_act_l_03.png?v=1">
          </div>
          <div class="title-s">
            <img src="/static/img/may_act_l_04.png">
          </div>
          <div class="gift-list">
            <div class="mui-row th">
              <span class="mui-col-xs-2">期限</span>
              <span class="mui-col-xs-4">累计出借额</span>
              <span class="mui-col-xs-3">预计利息</span>
              <span class="mui-col-xs-3" v-if="channel == 'JD'">送京东E卡</span>
              <span class="mui-col-xs-3" v-else-if="channel == 'JY'">送加油卡</span>
            </div>
            <ul>
              <li class="mui-row">
                <span class="mui-col-xs-2">≥40天</span>
                <span class="mui-col-xs-4">5000元</span>
                <span class="mui-col-xs-3">83.33元</span>
                <span class="mui-col-xs-3 paper">¥30</span>
              </li>
              <li class="mui-row">
                <span class="mui-col-xs-2">≥40天</span>
                <span class="mui-col-xs-4">10000元</span>
                <span class="mui-col-xs-3">166.66元</span>
                <span class="mui-col-xs-3 paper">¥50</span>
              </li>
              <li class="mui-row">
                <span class="mui-col-xs-2">≥40天</span>
                <span class="mui-col-xs-4">30000元</span>
                <span class="mui-col-xs-3">500.00元</span>
                <span class="mui-col-xs-3 paper">¥100</span>
              </li>
              <li class="mui-row">
                <span class="mui-col-xs-2">≥90天</span>
                <span class="mui-col-xs-4">15000元</span>
                <span class="mui-col-xs-3">412.50元</span>
                <span class="mui-col-xs-3 paper">¥100</span>
              </li>
              <li class="mui-row">
                <span class="mui-col-xs-2">≥90天</span>
                <span class="mui-col-xs-4">30000元</span>
                <span class="mui-col-xs-3">825.00元</span>
                <span class="mui-col-xs-3 paper">¥100</span>
              </li>
              <li class="mui-row">
                <span class="mui-col-xs-2">≥90天</span>
                <span class="mui-col-xs-4">100000元</span>
                <span class="mui-col-xs-3">2750.00元</span>
                <span class="mui-col-xs-3 paper">¥600</span>
              </li>
              <li class="mui-row">
                <span class="mui-col-xs-2">≥90天</span>
                <span class="mui-col-xs-4">200000元</span>
                <span class="mui-col-xs-3">5500.00元</span>
                <span class="mui-col-xs-3 paper">¥1000</span>
              </li>
            </ul>
            <p class="list-inst">1、本活动仅G自动服务（包括新手专享）参加，其他产品不参与此活动；</p>
            <p class="list-inst">2、活动有效期：2018年5月1日起至2018年7月31日期间内，在本页面完成注册且40天内累计出借额满足以上条件的用户可获得对应奖励；</p>
            <p class="list-inst">3、领取<span v-if="channel == 'JD'">京东E卡</span><span v-else-if="channel == 'JY'">加油卡</span>请咨询QQ：3494492176。出借本息在到期后可提现至银行卡。</p>
            <p class="list-inst">4、本活动解释权归小鸽理财所有。</p>
          </div>
        </div>
        <div class="inner-box box-2">
          <div class="box-title">
            <img src="/static/img/may_act_l_06.png">
          </div>
          <div class="mui-row">
            <div class="mui-col-xs-6">
              <img src="/static/img/may_act_l_07.png">
              <p>银行资金存管</p>
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
                <p>点击领取888元红包+1000元<span v-if="channel == 'JD'">京东卡</span><span v-else-if="channel == 'JY'">加油卡</span></p>
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
      agree: true,
      channel: "",
    }
  },
  watch: {
    cellphone: function(val) { //限制手机号输入
      if (this.cellphone.length > 11) {
        this.cellphone = val.slice(0, 11)
      }
    },
    password: function(val) { //限制密码输入
      if (this.password.length > 20) {
        this.password = val.slice(0, 20)
      }
    },
    smsCode: function(val) {
      if (this.smsCode.length > 6) {
        this.smsCode = val.slice(0, 6)
      }
    },
    codenum: function(val) {
      if (this.codenum.length >= 4) {
        this.codenum = val.slice(0, 4)
      }
    },
  },
  mounted() {
    this.getSTnCH()
    this.requestImgFunc()
    //this.aLiVerify()
    $('#foot-reg').click(function() {
      $('html , body').animate({ scrollTop: 150 }, 'slow');
    });
  },
  methods: {
    inputBulr: function() {
      let thatData = this
      if (thatData.cellphone) {
        if (base.checkPhone(thatData.cellphone)) {
          thatData.requestImgFunc(thatData.cellphone);
        }
      }
    },
    getSTnCH: function() {
      let thatData = this
      thatData.channel = thatData.$route.params.chid
      if (thatData.$route.query.stype) {
        thatData.sourceType = thatData.$route.query.stype
      } else {
        thatData.sourceType = "1"
      }
    },
    requestImgFunc: function(number) {
      var phoneNumber = number || '15888888888';

      let thatData = this

      let data = {
        cellphone: phoneNumber,
      }

      this.$http.post('/api/img/code', this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            $('img#imgCode').attr('src', 'data:image/png;base64,' + resData.result);
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    postSms: function() {
      let thatData = this

      let data = {
        cellphone: thatData.cellphone,
        type: thatData.type,
        sendType: thatData.sendType,
        imgCode: thatData.codenum,
      }

      this.$http.post('/api/sms/register', this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            thatData.smsCountdown()
            mui.toast("短信验证码发送成功", { duration: 1000, type: 'div' })
          } else if (resData.status == 2719) {
            mui.toast("验证码已发送，请1分钟后再试", { duration: 1000, type: 'div' })
          } else {
            mui.toast(resData.msg, { duration: 1000, type: 'div' })
            thatData.requestImgFunc(thatData.cellphone)
            thatData.smsLocked = false
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    postRegister: function() {
      let thatData = this

      let data = {
        cellphone: thatData.cellphone,
        password: thatData.password,
        code: thatData.smsCode,
        sourceType: thatData.sourceType,
      }

      let register = base.DES3.encrypt(base.desKey, JSON.stringify(data));

      this.$http.post('/api/user/register', this.$qs.stringify({ "register": register }), {
          headers: base.ajaxHeaderWithoutToken({ "register": register })
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            mui.toast("注册成功", { duration: 1000, type: 'div' })
            thatData.$router.replace({ path: "/reg_success" })
          } else {
            mui.toast(resData.msg, { duration: 1000, type: 'div' })
            thatData.requestImgFunc(thatData.cellphone)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    checkCallPhone: function() {
      let thatData = this
      if (base.checkPhone(thatData.cellphone)) {
        if (thatData.codenum.length == 4) {
          thatData.postSms()
        } else {
          mui.toast("请输入图形验证码", { duration: 1000, type: 'div' })
        }
      } else {}
    },
    checkFunc: function() {
      let thatData = this
      if (base.checkPhone(thatData.cellphone) && base.checkPword(thatData.password) && base.checkSms(thatData.smsCode) && thatData.checkAgree()) {
        thatData.postRegister()
      } else {}
    },
    checkAgree: function() {
      let thatData = this
      if (!thatData.agree) {
        mui.toast("您未同意《小鸽理财用户协议》", { duration: 1000, type: 'div' });
        return false;
      } else {
        return true;
      }
    },
    smsCountdown: function() {
      let thatData = this
      thatData.smsLocked = true
      thatData.smsBtn = "60s"
      let codeTime = 60;
      let st = setInterval(function() {
        if (codeTime > 1) {
          thatData.smsBtn = (--codeTime + "s");
        } else {
          thatData.smsBtn = "重新获取"
          thatData.smsLocked = false;
          thatData.requestImgFunc(thatData.cellphone)
          clearInterval(st)
        }
      }, 1000);
    },
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
}

</script>
<style scoped>
@import "../../style/css/may_act_l.css";

</style>
<style>
.mui-toast-container {
  bottom: 49% !important;
  transition: opacity .3s;
}

.mui-toast-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  width: 66%;
  padding: 12px 18px;
  border: 1px solid #2d2d2d;
}

</style>
