<!--
  create : dxc 2018-12-14
  desc : 众邦存管
  update : 
  desc : 
-->
<template>
  <div class="bank_online">
    <wap-alert ref="alert"></wap-alert>
    <div class="top_banner">
      <img src="/static/img/mobile_newbank_online_01.png">
    </div>
    <div class="box_line">
      <div class="inner_box">
        <h5 class="box_title title_1">众邦银行介绍</h5>
        <p
          class="text"
          style="text-indent:2em"
        >小鸽理财自上线以来，始终积极拥抱监管，坚守合规发展底线。在符合监管规定、保证资金安全的前提下，为进一步提升用户体验，经过研发团队的紧张筹备和不懈努力，小鸽理财携手武汉众邦银行的全新资金存管系统正式上线！众邦银行是银监会批准设立的中国第11家民营银行、全国8大互联网银行之一，也是首批通过个体网贷借贷资金存管系统测评的“白名单”银行之一，资金存管模式、网贷业务流程与技术系统均已达到国家监管标准。今后，小鸽理财将携手众邦银行，共同维护用户资金安全，为大家提供更加安全、稳定、优质的互联网金融服务。</p>
      </div>
    </div>
    <div style="height:.6rem;"></div>
    <div class="box_line">
      <div class="inner_box">
        <h5 class="box_title title_2">存管银行升级后如何操作</h5>
        <div class="operating" style="margin-bottom: .6rem;">
          <p class="title">
            <span class="title_left">新用户</span>
            <a class="title_right" href="/newban_gui/1">
              查看详细操作指引
              <img src="/static/img/mobile_newbank_online_02.png">
            </a>
          </p>
          <div style="clear:both;"></div>
          <p class="instruc">如果您还未开户，欢迎您体验银行资金存管系统的安全与便利</p>
          <div class="step">
            <div class="step_box step_1">
              <img src="/static/img/mobile_newbank_online_03.png">
              <p>注册</p>
            </div>
            <div class="step_box step_2">
              <img src="/static/img/mobile_newbank_online_04.png">
              <p>填写身份信息</p>
            </div>
            <div class="step_box step_3">
              <img src="/static/img/mobile_newbank_online_05.png">
              <p>存管页面绑卡</p>
            </div>
            <div class="step_box step_4">
              <img src="/static/img/mobile_newbank_online_06.png">
              <p>开户成功</p>
            </div>
            <div style="clear:both;"></div>
          </div>
        </div>
        <div class="operating">
          <p class="title">
            <span class="title_left">老用户</span>
            <a class="title_right" href="/newban_gui/2">
              查看详细操作指引
              <img src="/static/img/mobile_newbank_online_02.png">
            </a>
          </p>
          <div style="clear:both;"></div>
          <p class="instruc">如果您之前已经开过存管账户，登录后通过“资产”页面的众邦银行存管激活入口进入存管激活页面，进行绑卡、设置交易密码即可完成激活</p>
          <div class="step">
            <div class="step_box step_1">
              <img src="/static/img/mobile_newbank_online_08.png">
              <p>激活</p>
            </div>
            <div class="step_box step_2">
              <img src="/static/img/mobile_newbank_online_09.png">
              <p>确认身份信息</p>
            </div>
            <div class="step_box step_3">
              <img src="/static/img/mobile_newbank_online_05.png">
              <p>存管页面绑卡</p>
            </div>
            <div class="step_box step_4">
              <img src="/static/img/mobile_newbank_online_06.png">
              <p>激活成功</p>
            </div>
            <div style="clear:both;"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:.6rem;"></div>
    <div class="box_line">
      <div class="inner_box">
        <h5 class="box_title title_3">常见问题</h5>
        <div class="a_q">
          <p class="question">
            <span>Q：</span>银行存管上线后，对用户资金有何影响？
          </p>
          <p class="answer">用户资金由众邦银行专门管理，只有用户本人才能操作账户上的资金，从根本上杜绝了用户资金被挪用的潜在风险。</p>
        </div>
        <div class="a_q">
          <p class="question">
            <span>Q：</span>银行存管由上海银行变为众邦银行后，对老用户资金有何影响？
          </p>
          <p class="answer">存管银行已负责将用户资金从上海银行存管账户直接迁移至众邦银行存管户，由众邦银行专门管理，用户激活后，即可操作账户上的资金。</p>
        </div>
        <div class="a_q">
          <p class="question">
            <span>Q：</span>对提现有什么影响？
          </p>
          <p class="answer">提现T+1到账，当天申请提现后，下一个工作日到账，遇双休日、国家法定节假日，到账日期顺延。</p>
        </div>
        <div class="a_q" style="margin-bottom: 0;">
          <p class="question">
            <span>Q：</span>绑卡支持哪些银行？
          </p>
          <p
            class="answer"
          >目前支持14家银行：工商银行、农业银行、中国银行、建设银行、交通银行、中信银行、光大银行、平安银行、招商银行、兴业银行、浦发银行、邮政储蓄、湖北银行、武汉农村商业银行。</p>
        </div>
      </div>
    </div>
    <div style="height:.6rem;"></div>
    <div style="height:1.68rem;"></div>
    <div class="footer_btn" v-if="cgtStatus * 1 == 1 || cgtStatus * 1 == 2 || cgtStatus == -1">
      <button v-if="cgtStatus * 1 == 1" @click="$refs.alert.goToAppAcOpen(1)">开通众邦银行存管账户</button>
      <button v-else-if="cgtStatus * 1 == 2" @click="$refs.alert.goToAppAcOpen(2)">激活众邦银行存管账户</button>
      <button v-else-if="cgtStatus == -1" @click="goLogin()">开通众邦银行存管账户</button>
    </div>
  </div>
</template>

<script>
import wapAlert from "../../wap/wap_alert.vue";
export default {
  data() {
    return {
      cgtStatus: 0
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.getAppToken();
  },
  mounted() {},
  methods: {
    getAppToken() {
      let _this = this;
      _this
        .$withApp("postApp", {
          status: 0,
          result: {
            transferName: "getTokenFromApp",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            _this.checkLogin();
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            if (dataRes.transferData.token == "null") {
              localStorage.removeItem("token");
              _this.checkLogin();
            } else {
              base.data.token = dataRes.transferData.token;
              localStorage.setItem("token", dataRes.transferData.token);
              _this.checkLogin();
            }
          }
        });
    },
    checkLogin() {
      let thatData = this;
      if (localStorage.getItem("token")) {
        thatData.postData();
      } else {
        thatData.cgtStatus = -1;
      }
    },
    goLogin() {
      let _this = this;
      _this
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToAppLogin",
            transferData: {
              url: location.href
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            localStorage.setItem("from", location.href);
            this.$router.push({ path: "/start_login" });
          } else {
          }
        });
    },
    postData: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/user/index", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.cgtStatus = resData.cgtStatus;
          } else if (resData.status == -3) {
            thatData.$refs.alert.deleteLocalStorage();
            thatData.cgtStatus = -1;
          } else if (resData.status == -5) {
            thatData.$refs.alert.deleteLocalStorage();
            thatData.cgtStatus = -1;
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
.bank_online {
  background: linear-gradient(
    180deg,
    rgba(62, 43, 246, 1) 0%,
    rgba(62, 42, 246, 1) 100%
  );
  .top_banner {
    img {
      width: 100%;
      display: block;
    }
  }
  .box_line {
    box-sizing: border-box;
    width: 6.9rem;
    background: rgba(255, 255, 255, 0.3);
    margin: 0 auto;
    padding: 0.2rem;
    border-radius: 0.12rem;
    .inner_box {
      padding: 0 0.2rem 0.3rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 0.06rem 0.26rem 0 rgba(111, 111, 114, 0.16);
      border-radius: 0.12rem;
      .box_title {
        font-size: 0.34rem;
        line-height: 0.48rem;
        color: #111;
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        position: relative;
      }
      .box_title::before {
        content: "";
        width: 0.6rem;
        height: 0.06rem;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(216, 216, 216, 1) 100%
        );
        border-radius: 0.04rem;
        position: absolute;
        top: 50%;

        transform: translateY(-50%);
      }
      .box_title::after {
        content: "";
        width: 0.6rem;
        height: 0.06rem;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(216, 216, 216, 1) 100%
        );
        border-radius: 0.04rem;
        position: absolute;
        top: 50%;

        transform: translateY(-50%);
      }
      .title_1::before {
        left: 1.23rem;
      }
      .title_1::after {
        right: 1.23rem;
      }
      .title_2::before {
        left: 0.38rem;
      }
      .title_2::after {
        right: 0.38rem;
      }
      .title_3::before {
        left: 1.57rem;
      }
      .title_3::after {
        right: 1.57rem;
      }
      .text {
        font-size: 0.26rem;
        line-height: 0.44rem;
        color: #666;
        text-align: justify;
      }
      .operating {
        background: #f6f8ff;
        border-radius: 0.12rem;
        padding-bottom: 0.6rem;
        .title {
          padding-top: 0.24rem;
          height: 0.48rem;
          .title_left {
            float: left;
            position: relative;
            padding-left: 0.2rem;
            font-size: 0.28rem;
            line-height: 0.48rem;
            color: #111;
            font-weight: bold;
          }
          .title_left::before {
            content: "";
            width: 0.06rem;
            height: 0.3rem;
            background: #ff5637;
            border-radius: 0.04rem;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .title_right {
            float: right;
            padding-left: 0.24rem;
            width: 2.36rem;
            height: 0.48rem;
            font-size: 0.24rem;
            line-height: 0.48rem;
            border-radius: 1rem 0 0 1rem;
            color: #ff9a37;
            background: #f2f2f2;
            position: relative;
            img {
              width: 0.24rem;
              position: absolute;
              top: 50%;
              right: 0.1rem;
              transform: translateY(-50%);
            }
          }
        }
        .instruc {
          padding-top: 0.16rem;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
          font-size: 0.26rem;
          line-height: 0.37rem;
          color: #666666;
        }
        .step {
          padding-top: 0.6rem;
          .step_box {
            float: left;
            width: 1.6rem;
            text-align: center;
            position: relative;
            img {
              display: block;
              width: 0.54rem;
              margin: auto;
            }
            p {
              padding-top: 0.26rem;
              font-size: 0.2rem;
              line-height: 0.28rem;
            }
          }
          .step_box::after {
            content: "";
            position: absolute;
            right: -0.13rem;
            top: 0.17rem;
            width: 0.26rem;
            height: 0.2rem;
            background: url(/static/img/mobile_newbank_online_07.png) no-repeat
              center;
            background-size: cover;
          }
          .step_box.step_1 {
            width: 0.74rem;
            padding-left: 0.2rem;
            padding-right: 0.43rem;
          }
          .step_box.step_4 {
            width: 1.2rem;
            padding-left: 0.2rem;
            padding-right: 0.13rem;
          }
          .step_box.step_4::after {
            background: none;
          }
        }
      }
      .a_q {
        padding: 0.2rem;
        margin-bottom: 0.2rem;
        background: #f6f8ff;
        border-radius: 0.12rem;
        .question {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #333;
          span {
            color: #ff5b3c;
          }
        }
        .answer {
          padding-top: 0.2rem;
          font-size: 0.24rem;
          line-height: 0.33rem;
          color: #666;
          text-align: justify;
        }
      }
    }
  }
  .footer_btn {
    padding: 0.4rem 0;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    button {
      font-size: 0.32rem;
      width: 6.7rem;
      height: 0.88rem;
      color: #fff;
      background: linear-gradient(
        180deg,
        rgba(255, 200, 0, 1) 0%,
        rgba(247, 107, 28, 1) 100%
      );
      border-radius: 44px;
      border: none;
    }
  }
}
</style>