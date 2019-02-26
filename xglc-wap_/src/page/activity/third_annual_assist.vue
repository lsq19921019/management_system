<!--
  create : dxc 2018-11-09
  desc : 三周年活动
  update : 
  desc : 迭代名称-周年庆
--> 
<template>
  <div class="third_assist" :class="{'congratulations': schedule == 3 || schedule == 4 || schedule == 5 || schedule == 6 || schedule == 7}" :style="'min-height:' + height + 'px'">
      <wap-alert ref="alert"></wap-alert>
      <div class="out_padding" :class="{'congratulations': schedule == 3 || schedule == 4 || schedule == 5 || schedule == 6 || schedule == 7}">
        <div class="red_envelope" :class="{'short': schedule == 0 || schedule == 1 || schedule == 4 || schedule == 7, 'long': schedule == 2, 'opened': schedule == 3 || schedule == 5 || schedule == 6}">
            <div class="title" :class="{'closed': schedule == 0 || schedule == 1 || schedule == 2 || schedule == 4 || schedule == 7, 'opened': schedule == 5 || schedule == 6, 'congratulations': schedule == 3}">
                <p v-if="schedule == 0 || schedule == 1 || schedule == 2">“确认过眼神是对的人，帮我拆一下啦”</p>
                <p v-else-if="schedule == 3">恭喜你已获得<br><span class="c_money">5.88<span class="c_money_unit">元</span></span></p>
                <p v-else-if="schedule == 4">邀2位好友成功助力，现金立即到账</p>
                <p v-else-if="schedule == 5">TA人缘太好，已经完成助力了~</p>
                <p v-else-if="schedule == 6">长按识别二维码，参加更多活动</p>
                <p v-else-if="schedule == 7">您已经帮好友助力成功</p>
            </div>
            <div class="field_line" v-if="schedule == 0 || schedule == 1 || schedule == 2">
                <van-cell-group>
                    <van-field v-model="phone" clearable type="number" placeholder="请输入手机号" />
                </van-cell-group>
            </div>
            <div class="field_line" v-if="schedule == 2">
                <van-cell-group>
                    <van-field v-model="smsCode" clearable type="number" placeholder="请输入验证码">
                        <van-button v-if="smsReady" @click="checkPhoneNum()" slot="button" size="small" type="primary">{{smsBtn}}</van-button>
                        <van-button v-else-if="!smsReady" slot="button" size="small" type="primary">{{smsBtn}}</van-button>
                    </van-field>
                </van-cell-group>
            </div>
            <div class="field_line" v-if="schedule == 1 || schedule == 2">
                <van-cell-group>
                    <van-field v-model="password" clearable type="password" placeholder="请输入密码" />
                </van-cell-group>
            </div>
            <div class="user_head" v-if="schedule == 3 || schedule == 4 || schedule == 5 || schedule == 7">
                <div class="mui-row">
                    <div class="mui-col-xs-6" v-for="(header,index) in helpData.list" :key="index">
                        <div class="head_img">
                            <img :src="header.headImgUrl">
                        </div>
                        <p class="user_name">{{header.nickname}}</p>
                    </div>
                    <div class="mui-col-xs-6" v-if="helpData.list.length < 1">
                        <div class="head_img">
                            <img src="./images/third_annual_assist_06.png">
                        </div>
                        <p class="user_name">???</p>
                    </div>
                    <div class="mui-col-xs-6" v-if="helpData.list.length < 2">
                        <div class="head_img">
                            <img src="./images/third_annual_assist_06.png">
                        </div>
                        <p class="user_name">???</p>
                    </div>
                </div>
            </div>
            <div class="agree" v-if="schedule == 2">
                <p @click="agree = !agree"><img v-show="!agree" src="./images/third_annual_assist_07.png"><img v-show="agree" src="./images/third_annual_assist_08.png">我已阅读并同意<router-link to="/vest_reg_agree">《注册协议》</router-link>和<router-link to="/privacy_pol">《隐私条款》</router-link></p>
            </div>
            <div class="submit_btn" v-if="schedule == 0 || schedule == 1 || schedule == 2 || schedule == 3 || schedule == 4 || schedule == 5 || schedule == 7" :class="{'form': schedule == 2}">
                <button v-if="schedule == 0" @click="findPhone()">立即拆礼包</button>
                <button v-else-if="schedule == 1" @click="postLogin()">下一步</button>
                <button v-else-if="schedule == 2" @click="checkFunc()">立即注册拆礼包</button>
                <button v-else-if="schedule == 3" @click="$router.push({ path: '/assets_center' })">前往查看奖励</button>
                <button v-else-if="schedule == 4" @click="shareTip = !shareTip">邀请好友助力</button>
                <button v-else-if="schedule == 5 || schedule == 7" @click="wantToo()">我也要拆礼包></button>
            </div>
            <div class="d2_code" v-if="schedule == 6">
                <img src="./images/wx_03.gif">
            </div>
            <p class="footer_time">活动时间：2018.12.03-2018.12.14</p>
        </div>
        <div class="footer_rule" v-if="schedule == 3 || schedule == 4 || schedule == 5 || schedule == 6 || schedule == 7">
            <p>活动规则：<br>1.本活动获得的现金奖励预计10分钟到账，可在小鸽理财—“资产”—“可用余额”查看；<br>2.单个账户在活动期间内仅可助力1次。</p>
        </div>
      </div>
      <transition name="imgCode">
        <div id="img-code" v-show="imgCode">
          <div class="block"></div>
          <div class="window">
            <h5 class="title">请输入图片验证码</h5>
            <div class="img clear">
              <img :src="base64Str">
              <span class="f5" @click="postImgCode(),imgCodeNum=''"><img src="/static/img/wap_start_11.png"></span>
            </div>
            <div class="hidden-input">
              <input id="hdinput" type="number" v-model="imgCodeNum" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
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
      <transition name="share_tip">
            <div id="share_tip" v-show="shareTip">
                <div class="block" @click="shareTip = !shareTip"></div>
                <div class="window">
                    <img src="./images/third_annual_master_18.png">
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import wapAlert from "../wap/wap_alert.vue";
export default {
  data() {
    return {
      height: "",
      phone: "",
      smsCode: "",
      imgCodeNum: "",
      password: "",
      imgCode: false,
      agree: true,
      smsReady: true,
      smsBtn: "获取验证码",
      base64Str: "",
      helpData: {},
      shareTip: false,
      schedule: -1 //进度控制器 根据步骤进度展示页面不同元素
    };
  },
  watch: {
    //输入位数限制
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
    password: function(val) {
      if (this.password.length > 20) {
        this.password = val.slice(0, 20);
      }
    },
    imgCodeNum: function(val) {
      if (this.imgCodeNum.length >= 4) {
        this.imgCodeNum = val.slice(0, 4);
        this.postSms();
      }
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.autoHeight();
    this.checkLogin();
  },
  mounted() {
    this.checkIpX();
  },
  methods: {
    checkIpX: function() {
      let wi = document.documentElement.clientWidth;
      let he = document.documentElement.clientHeight;
      if (wi == 375 && he >= 690) {
        document.getElementById("app").style.paddingBottom = "0";
      }
    },
    autoHeight() {
      this.height = document.documentElement.clientHeight;
    },
    checkLogin() {
      //第零步 检查是否保存有token保持登录
      let thatData = this;
      if (localStorage.getItem("token")) {
        //拿token去问后端 token有没有失效
        this.$http
          .post("/api/user/inviteFriendCode", this.$qs.stringify(), {
            headers: base.ajaxHeadersWithToken()
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              //进入请求助力信息
              thatData.postHelp();
            } else if (resData.status == -3) {
              //进入第一步
              thatData.$refs.alert.deleteLocalStorage();
              thatData.schedule = 0;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //进入第一步
        thatData.schedule = 0;
      }
    },
    findPhone() {
      //第一步 查询服务端手机号是否注册
      let thatData = this;
      if (base.checkPhone(thatData.phone)) {
        let data = {
          cellphone: thatData.phone
        };

        this.$http
          .post("/api/user/findPhoneExist", this.$qs.stringify(data), {
            headers: base.ajaxHeaderWithoutToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              //进入第二步
              thatData.schedule = 1;
            } else if (resData.status == 2428) {
              //进入第三步
              thatData.schedule = 2;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    postLogin: function() {
      //第二步 登录
      let thatData = this;
      if (
        base.checkLoginPhone(thatData.phone) &&
        base.checkLoginPword(thatData.password)
      ) {
        let data = {
          loginName: thatData.phone,
          password: base.DES3.encrypt(base.desKey, thatData.password)
        };

        this.$http
          .post("/api/user/login", this.$qs.stringify(data), {
            headers: base.ajaxHeaderWithoutToken(data)
          })
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
              //进入请求助力信息
              thatData.postHelp();
            } else {
              mui.toast(resData.msg, { duration: 1000, type: "div" });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
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
          clearInterval(st)
        }
      }, 1000);
    },
    checkAgree: function() {
      //第三步 同意协议
      let thatData = this;
      if (!thatData.agree) {
        mui.toast("您未同意《注册协议》和《隐私条款》", {
          duration: 1000,
          type: "div"
        });
        return false;
      } else {
        return true;
      }
    },
    checkFunc: function() {
      //第三步 注册信息填写校验
      let thatData = this;
      if (
        base.checkPhone(thatData.phone) &&
        base.checkSms(thatData.smsCode) &&
        base.checkPword(thatData.password) &&
        thatData.checkAgree()
      ) {
        thatData.postRegister();
      } else {
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
        module: "1",
        type: "1",
        imgCode: thatData.imgCodeNum,
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
        password: thatData.password,
        code: thatData.smsCode,
        referrer: thatData.$route.query.urlKey
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
            let token = resData.result.token;
            localStorage.setItem("token", token);
            localStorage.setItem(
              "userLoginData",
              JSON.stringify(resData.result)
            );
            base.data.token = token;
            //进入请求助力信息
            thatData.postHelp();
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postHelp() {
      //请求助力信息
      let thatData = this;

      let data = {
        wxOpenId: thatData.$route.query.wxOpenId,
        phone: thatData.$route.query.urlKey
      };

      this.$http
        .post("/api/activity/anniversaryHelp", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.helpData = resData.result;
            thatData.judgeFun();
            thatData.regUrl(thatData.helpData.shareUrl);
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postAlsoGet() {
      //请求我也要拆包信息
      let thatData = this;

      this.$http
        .post("/api/activity/anniversaryGet", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    judgeFun() {
      //用户注册或登陆后 判断流程
      let thatData = this;
      //是否邀请者自己登陆
      if (thatData.helpData.isOwn * 1 == 1) {
        //是
        //是否已完成2人助力
        if (thatData.helpData.status * 1 == 1) {
          //已完成
          thatData.schedule = 3;
        } else if (thatData.helpData.status * 1 == 0) {
          //未完成
          thatData.schedule = 4;
        }
      } else {
        //不是
        //助力者是否已帮助别人助力过
        if (
          thatData.helpData.status * 1 == 3 ||
          thatData.helpData.status * 1 == 4
        ) {
          //未帮助 且 当前助力已被自己助力成功
          thatData.schedule = 7;
          //7
        } else if (thatData.helpData.status * 1 == 1) {
          //未帮助 且 当前助力已被别人助力成功
          thatData.schedule = 5;
        } else if (thatData.helpData.status * 1 == 2) {
          //已帮助
          thatData.schedule = 6;
        }
      }
      console.log(thatData.schedule);
    },
    wantToo() {
      let thatData = this;
      thatData.postAlsoGet();
      //是否首次注册未投资用户
      if (thatData.helpData.isFirstInvest * 1 == 1) {
        //是
        thatData.$router.push({ path: "/third_annual_new" });
      } else {
        //否
        //该助力用户是否领取过奖励
        if (thatData.helpData.isReceive * 1 == 1) {
          //是
          thatData.schedule = 6;
        } else {
          //否
          thatData.shareTip = !thatData.shareTip;
        }
      }
    },
    regUrl: function(link) {
      let thatData = this;
      let data = {
        url: encodeURIComponent(location.href.split("#")[0])
      };

      this.$http
        .post("/api/user/wxSign", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            base.wxShare(
              wx,
              {
                title: "帮我助力一把，最高领88元现金！",
                desc: "小鸽理财3周年庆，好礼放肆送~",
                link: location.origin + "/activity_jump?wxurl=" + link,
                imgUrl: location.origin + "/static/img/share_logo_3rd_share.png"
              },
              {
                debug: false,
                appId: resData.result.appId,
                timestamp: resData.result.timestamp,
                nonceStr: resData.result.noncestr,
                signature: resData.result.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
              }
            );
          } else {
            mui.alert(resData.msg);
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
.third_assist {
  background: url(./images/third_annual_assist_01.png) no-repeat top left,
    url(./images/third_annual_assist_02.png) no-repeat bottom left,
    linear-gradient(top, #bc7af8, #7f67f6);
  background-size: 100%, 100%, 100%;
  .out_padding {
    padding: 3.07rem 0 1.8rem;
  }
  .out_padding.congratulations {
    padding: 3.07rem 0 1.04rem;
  }
  .red_envelope {
    width: 6.44rem;
    margin: auto;
    position: relative;
    .title.closed {
      padding-top: 0.49rem;
      padding-bottom: 1.68rem;
      p {
        font-size: 0.3rem;
        line-height: 0.36rem;
        text-align: center;
        color: #faebb6;
      }
    }
    .title.opened {
      padding-top: 1.08rem;
      padding-bottom: 1.38rem;
      p {
        font-size: 0.3rem;
        line-height: 0.36rem;
        text-align: center;
        color: #faebb6;
      }
    }
    .title.congratulations {
      padding-top: 0.56rem;
      padding-bottom: 0.51rem;
      p {
        font-size: 0.3rem;
        line-height: 0.46rem;
        text-align: center;
        color: #fff;
        span.c_money {
          font-size: 0.8rem;
          line-height: 0.9rem;
          color: #ffd769;
          span.c_money_unit {
            font-size: 0.5rem;
          }
        }
      }
    }
    .field_line {
      width: 5.42rem;
      margin: auto;
      padding-top: 0.3rem;
      .van-cell {
        padding-left: 0.52rem;
        border-radius: 0.88rem;
        van-button {
          color: #546bdb;
          padding-left: 0.29rem;
          border-left: 1px solid #ccc;
        }
      }
    }
    .user_head {
      width: 4.72rem;
      margin: auto;
      padding-top: 0.4rem;
      .head_img {
        width: 1.32rem;
        height: 1.32rem;
        margin: auto;
        border-radius: 0.66rem;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }
      .user_name {
        font-size: 0.24rem;
        line-height: 0.36rem;
        text-align: center;
        padding-top: 0.15rem;
        color: #fff;
      }
    }
    .agree {
      padding-top: 0.3rem;
      padding-left: 0.6rem;
      padding-right: 0.6rem;
      p {
        font-size: 0.24rem;
        color: #fff;
        white-space: nowrap;
        overflow: scroll;
        img {
          width: 0.28rem;
          padding-right: 0.13rem;
          position: relative;
          top: 0.04rem;
        }
        a {
          color: #fff;
        }
      }
    }
    .submit_btn {
      padding-top: 0.56rem;
      width: 5.42rem;
      margin: auto;
      position: relative;
      z-index: 5;
      button {
        height: 0.82rem;
        width: 100%;
        font-size: 0.3rem;
        color: #771f13;
        background: #f6c847;
        box-shadow: 0 0 0.2rem #f8edba inset;
        border-radius: 0.41rem;
        border: none;
      }
    }
    .submit_btn.form {
      padding-top: 0.3rem;
    }
    .d2_code {
      padding-top: 0.64rem;
      img {
        width: 2.42rem;
        height: 2.42rem;
        display: block;
        margin: auto;
      }
    }
    .footer_time {
      position: absolute;
      bottom: 0.34rem;
      left: 0;
      width: 100%;
      font-size: 0.24rem;
      line-height: 0.36rem;
      text-align: center;
      color: #faebb6;
      z-index: 2;
    }
  }
  .footer_rule {
    width: 6.4rem;
    margin: auto;
    padding-top: 0.15rem;
    p {
      font-size: 0.2rem;
      line-height: 0.32rem;
      color: #faebb6;
    }
  }
  .red_envelope.short {
    height: 7.33rem;
    background: url(./images/third_annual_assist_03.png) no-repeat center;
    background-size: cover;
  }
  .red_envelope.long {
    height: 8.68rem;
    background: url(./images/third_annual_assist_04.png) no-repeat center;
    background-size: cover;
  }
  .red_envelope.opened {
    height: 7.53rem;
    background: url(./images/third_annual_assist_05.png) no-repeat center;
    background-size: cover;
  }
  .clear:after {
    content: "";
    display: block;
    clear: both;
  }
}
.third_assist.congratulations {
  background: url(./images/third_annual_assist_01.png) no-repeat top left,
    url(./images/third_annual_assist_09.png) no-repeat bottom left,
    linear-gradient(top, #bc7af8, #7f67f6);
  background-size: 100%, 100%, 100%;
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
#share_tip {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .block {
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  .window {
    position: absolute;
    top: 0.43rem;
    right: 0.83rem;
    height: 3.61rem;
    width: 3.12rem;
    img {
      display: block;
      width: 100%;
    }
  }
}
.share_tip-enter-active,
.share_tip-leave-active {
  transition: opacity 0.2s;
}
.share_tip-enter,
.share_tip-leave-to {
  opacity: 0;
}
</style>
