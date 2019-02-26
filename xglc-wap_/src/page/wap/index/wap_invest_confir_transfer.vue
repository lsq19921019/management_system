<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="conf_trans" :style="{'min-height':height + 'px'}">
      <div class="header-data in-panding">
        <div class="plan-title">
          <p>{{userPlanData.title}}</p>
        </div>
        <div class="plan-data mui-row">
          <p class="mui-col-xs-5">{{userPlanData.yield}}{{userPlanData.jxYield}}</p>
          <p class="mui-col-xs-7">{{userPlanData.remainAmount}}元</p>
        </div>
        <div class="plan-data-title mui-row">
          <p class="mui-col-xs-5">往期年化收益率</p>
          <p class="mui-col-xs-7">产品剩余金额</p>
        </div>
      </div>
      <div class="center-into">
        <div class="balance in-panding">
          <p>
            <span class="usable">可用余额 {{userPlanData.usableSum}}元</span>
            <span class="recharge" @click="checkAccount()">充值</span>
          </p>
        </div>
        <div class="trans-input in-panding">
          <div class="clear">
            <span class="title">加入金额</span>
            <input
              v-model="amountInput"
              @focus="switchAgree = !switchAgree"
              @blur="switchAgree = !switchAgree"
              type="number"
              :placeholder="userPlanData.minAmount +'元起，' + userPlanData.unit + '元整数递增'"
              onKeypress="return (/[\d.]/.test(String.fromCharCode(event.keyCode)))"
            >
            <span class="all" @click="allForInvest()">全额加入</span>
          </div>
        </div>
      </div>
      <div class="ex-interest in-panding">
        <p>
          预期利息：
          <span class="color">{{exInterest}}元</span>
          <span class="tips" v-show="tips">{{tips}}</span>
        </p>
      </div>
      <div class="coupon in-panding">
        <span class="coupon-line clear" @click="goMyCoupon()">
          <span class="title">使用优惠券</span>
          <span
            class="coupon-text"
            :class="{empty : userPlanData.yhTips == '暂无可用' || userPlanData.yhTips == '不使用优惠券'}"
            v-html="userPlanData.yhTips"
          ></span>
          <img src="/static/img/wap_assets_center_05.png">
        </span>
      </div>
      <div class="confirm_renewal" id="confirm_line" v-show="userPlanData.continue">
        <span @click="userPlanData.isContinue=!userPlanData.isContinue">
          <img
            src="/static/img/wap_invest_confir_transfer_01.png"
            v-show="!userPlanData.isContinue"
            class="confirm_img"
          >
          <img
            src="/static/img/wap_invest_confir_transfer_02.png"
            v-show="userPlanData.isContinue"
            class="confirm_img"
          >回款后自动续投
        </span>
        <img
          src="/static/img/wap_invest_confir_transfer_03.png"
          class="confirm_tip"
          @click="confirmTip()"
        >
      </div>
      <div class="trans-btn">
        <button @click="checkInput()" v-show="!lockBtn">立即加入</button>
        <button disabled="disabled" v-show="lockBtn">加入中</button>
      </div>
      <div class="agree" v-show="switchAgree">
        <p @click="agree = !agree">
          <img
            src="/static/img/wap_invest_confir_transfer_04.png"
            v-show="!agree"
            class="confirm_img"
          >
          <img
            src="/static/img/wap_invest_confir_transfer_05.png"
            v-show="agree"
            class="confirm_img"
          >我已同意并签署
        </p>
        <a @click="$router.push({ path: '/inv_agr_g' }),jumpGoAnother()">《G自动服务协议》</a>&nbsp;
        <a @click="$router.push({ path: '/inv_auth_g' }),jumpGoAnother()">《授权委托书》</a>
        <p>和</p>
        <a @click="$router.push({ path: '/risk_warning' }),jumpGoAnother()">《风险提示书》</a>
        <div v-if="ipX" class="mui-col-xs-12" style="height: 24px;background: #f2f2f2;"></div>
      </div>
    </div>
    <div class="continue_tips" v-show="autoContinue">
      <div class="bg"></div>
      <div class="tips" :style="'top:' + toTop + 'px'">
        <div class="light">
          <img src="/static/img/continue_tips_01.png">
        </div>
        <div class="smile">
          <img src="/static/img/continue_tips_02.png">
        </div>
        <div class="text">
          <p>自动续投上线啦，勾选后，该笔加入本金回款后可续投同期限G自动服务</p>
        </div>
        <button @click="autoContinue = !autoContinue">知道了</button>
      </div>
    </div>
  </div>
</template>
<script>
const math = require("mathjs");
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      userPlanData: {
        //title: "", //G自动服务标题
        //planId: 0, //定存宝id
        //planType: 0, //产品类型
        //continue: "", //是否开启可续投
        //continueDesc: "" //可续投说明文案
        //showCP: "", //是否显示测评
        //isAuth: "", //是否交易授权
        //investTopAmount: "", //用户的最大可投金额
        //cpUrl: "", //测评跳转链接
        //cpDesc: "", //加入页面提示语
        //overTopAmountDesc: "", //购买页 超过了可投的金额的提示语
        //openAmountValidate: "" //是否校验最大投资金额
        //totalYield: 0, //总利率
        //lockPeriod: 0, //期限
        //currentDhkMoney: 0, //权益标已持有
        //canIvstMoney: 0, //权益标还可投
        //usableSum: 0, //用户当前可用余额
        //unit: 0, //投资金额倍数
        //maxAmount: 0, //个人最大投资金额
        //minAmount: 0, //input框提示信息 起投金额
        //remainAmount: 0, //input框提示信息 产品剩余金额
        //templateId: "", //模板id 查该项目的优惠券和加息券
        //yhTips: "", //展示用户满足该项目的优惠数量
        //yield: "", //年化利率
        //jxYield: "", //加息利率
        //voucherId: 0, //使用的红包返现券或加息券id
        //amountInput: 0, //input输入投标金额
        //useCou: true, //是否自动使用优惠券
        //useRed: false, //是否手动使用红包
        //useFxq: false, //是否手动使用返现券
        //useJxq: false, //是否手动使用加息券
        //calcPrompt: false //激活计算提醒
        //isContinue: false //回款后自动续投
      },
      redEnv: [], //红包
      cashBack: [], //返现券
      coupon: [], //加息券
      onlyYhTips: "", //单纯的保存优惠券可用数量
      tips: "", //对输入金额的判断提示
      amountInput: null, //input输入投标金额
      ticketFlag: 0, //0.表示不使用任何道具 2.使用投资红包 3.使用加息券
      amount: 0, //使用的红包金额
      reverse: 0, //使用的返现券金额
      rate: 0, //使用的加息金额
      exInterest: 0, //预期利息
      agree: true, //同意 G自动服务投资协议
      lockBtn: false,
      codeKey: "",
      ipX: false,
      toTop: 0,
      autoContinue: false,
      height: "",
      switchAgree: true
    };
  },
  watch: {
    amountInput: function(val) {
      let thatData = this;
      thatData.amountTips();
      //thatData.findEnvelope(val)
      thatData.calcInterest();
      thatData.findEnvelope(val);
      thatData.userPlanData.useRed = false;
      thatData.userPlanData.useFxq = false;
      thatData.userPlanData.useJxq = false;
      let userJson = JSON.parse(localStorage.getItem("userPlanData"));
      userJson.useRed = thatData.userPlanData.useRed;
      userJson.useFxq = thatData.userPlanData.useFxq;
      userJson.useJxq = thatData.userPlanData.useJxq;
      localStorage.setItem("userPlanData", JSON.stringify(userJson));
      if (val != "" && val.length < 13) {
        thatData.amountInput = Math.floor(val * 100) / 100;
        thatData.userPlanData.useCou = true;
      } else if (val != "" && val.length >= 13) {
        thatData.amountInput = Math.floor(val.slice(0, 11) * 100) / 100;
        thatData.userPlanData.useCou = true;
      } else {
      }
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.autoHeight();
    this.showAppBack();
    this.getLocalData();
    this.checkIpX();
  },
  mounted() {
    math.config({
      number: "BigNumber"
    });
    this.firstContinue();
    /* window.onresize = function temp() {
      alert(document.documentElement.clientHeight);
    }; */
  },
  methods: {
    autoHeight() {
      this.height = document.documentElement.clientHeight - 53;
    },
    showAppBack() {
      this.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "showBackBarButton",
          transferData: {}
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
        } else {
          return this.$withApp("takeAppTable", {
            status: 0,
            result: {
              transferName: "switchTableColor",
              transferData: {
                color: "2"
              }
            },
            msg: "success"
          });
        }
      });
    },
    firstContinue() {
      $("#app").css("padding-bottom", "53px");
      if (!localStorage.getItem("continueTips") && this.userPlanData.continue) {
        this.autoContinue = !this.autoContinue;
        this.autoTop();
        localStorage.setItem("continueTips", "1");
      }
    },
    autoTop() {
      this.toTop = document.getElementById("confirm_line").offsetTop + 5;
    },
    confirmTip() {
      mui.alert(this.userPlanData.continueDesc, "自动续投规则", "确定");
    },
    checkIpX() {
      let wi = document.documentElement.clientWidth;
      let he = document.documentElement.clientHeight;
      if (wi == 375 && he >= 690) {
        this.ipX = true;
      }
    },
    getNewXInvestDetail() {
      //重新获取可用金额等信息
      let thatData = this;

      let data = {
        planId: thatData.userPlanData.planId
      };
      this.$http
        .post("/api/finance/planXInvestDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.userPlanData.usableSum = parseFloat(
              resData.result.usableSum
            );
            thatData.userPlanData.cgtStatus = resData.cgtStatus;
            thatData.userPlanData.showCP = resData.result.showCP;
            thatData.userPlanData.investTopAmount =
              resData.result.investTopAmount;
            thatData.userPlanData.cpUrl = resData.result.cpUrl;
            thatData.userPlanData.cpDesc = resData.result.cpDesc;
            thatData.userPlanData.overTopAmountDesc =
              resData.result.overTopAmountDesc;
            thatData.userPlanData.openAmountValidate =
              resData.result.openAmountValidate;
            thatData.userPlanData.isAuth = resData.result.isAuth;
            thatData.onlyYhTips = parseFloat(resData.result.yhTips);
            thatData.autoRedEnv();
            thatData.autoCashBack();
            thatData.autoCoupon();
            thatData.checkNotUseCou();
            thatData.checkComeBack();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkAccount: function() {
      //点击充值
      let thatData = this;
      if (thatData.userPlanData.cgtStatus == 2) {
        thatData.$refs.alert.goToAppAcOpen(2);
      } else if (thatData.userPlanData.cgtStatus == 3) {
        //没绑卡 弹出去绑卡弹窗
        mui.confirm("请先绑定银行卡", " ", ["取消", "去绑卡"], function(e) {
          if (e.index == 1) {
            thatData.jumpGoAnother();
            localStorage.setItem("from", location.href);
            //thatData.$router.push({ path: "/mine_bind_bankcard" });
            location.href = "/mine_open_jump/bind";
          }
        });
      } else {
        thatData.jumpGoAnother();
        thatData
          .$withApp("takeAppOpen", {
            status: 0,
            result: {
              transferName: "goToAppRecharge",
              transferData: {
                amount: "0" //h5G自动服务加入时余额不足 弹窗 充值 带入还需充值差额
              }
            },
            msg: "success"
          })
          .then(data => {
            if (data == "wap") {
              localStorage.setItem("from", location.href);
              thatData.$router.push({ path: "/assets_recharge" });
            } else {
              localStorage.setItem("from", location.href);
            }
          });
      }
    },
    parameterCompare(property) {
      //根据特定属性值排序
      return function(a, b) {
        let v1 = a[property];
        let v2 = b[property];
        return v1 - v2;
      };
    },
    jumpGoAnother() {
      //跳去除了选择优惠券的其他地方
      let thatData = this;
      if (
        thatData.userPlanData.useCou &&
        !thatData.userPlanData.useRed &&
        !thatData.userPlanData.useFxq &&
        !thatData.userPlanData.useJxq
      ) {
        let userJson = JSON.parse(localStorage.getItem("userPlanData"));
        userJson.isContinue = thatData.userPlanData.isContinue;
        if (!thatData.amountInput) {
          userJson.amountInput = 0;
        } else {
          userJson.amountInput = thatData.amountInput;
        }
        localStorage.setItem("userPlanData", JSON.stringify(userJson));
      }
    },
    goMyCoupon: function() {
      //点击使用优惠券
      let thatData = this;
      let userJson = JSON.parse(localStorage.getItem("userPlanData"));
      userJson.voucherId = thatData.userPlanData.voucherId;
      userJson.isContinue = thatData.userPlanData.isContinue;
      if (!thatData.amountInput) {
        userJson.amountInput = 0;
      } else {
        userJson.amountInput = thatData.amountInput;
      }
      localStorage.setItem("userPlanData", JSON.stringify(userJson));
      thatData.$router.push({ path: "/invest_mycoupon" });
    },
    checkNotUseCou: function() {
      //在优惠券页面点击不使用优惠券
      let thatData = this;
      if (thatData.userPlanData.useCou == false) {
        thatData.ticketFlag = 0;
        thatData.amount = 0;
        thatData.reverse = 0;
        thatData.rate = 0;
        thatData.userPlanData.voucherId = 0;
        let userPlanData = JSON.parse(localStorage.getItem("userPlanData"));
        thatData.userPlanData.yhTips = userPlanData.yhTips;
        thatData.amountInput = thatData.userPlanData.amountInput;
      }
    },
    autoRedEnv: function() {
      //在优惠券页面选择了红包
      let thatData = this;
      if (
        thatData.userPlanData.voucherId != 0 &&
        thatData.userPlanData.useRed
      ) {
        console.log("inRed");
        let redId = thatData.redEnv.filter(function(e) {
          return e.id == thatData.userPlanData.voucherId;
        });
        if (redId.length != 0) {
          if (
            thatData.userPlanData.amountInput <
            parseFloat(redId[0].minUseAmount)
          ) {
            console.log("<");
            thatData.amount = redId[0].amount;
            thatData.amountInput = parseFloat(redId[0].minUseAmount);
          } else if (
            thatData.userPlanData.amountInput >=
            parseFloat(redId[0].minUseAmount)
          ) {
            console.log(">=");
            thatData.amount = redId[0].amount;
            thatData.amountInput = thatData.userPlanData.amountInput;
          }
          thatData.ticketFlag = 2;
          thatData.reverse = 0;
          thatData.rate = 0;
          thatData.userPlanData.voucherId = redId[0].id;
          thatData.userPlanData.yhTips =
            "投资红包返现" + thatData.amount + "元";

          let userPlanData = JSON.parse(localStorage.getItem("userPlanData"));
          if (
            userPlanData.calcPrompt &&
            userPlanData.amountInput != thatData.amountInput
          ) {
            mui.toast("已自动为您调整金额", { duration: 1000, type: "div" });
          }
          userPlanData.calcPrompt = false;
          localStorage.setItem("userPlanData", JSON.stringify(userPlanData));
        }
      }
    },
    autoCashBack: function() {
      //在优惠券页面选择了返现券
      let thatData = this;
      if (
        thatData.userPlanData.voucherId != 0 &&
        thatData.userPlanData.useFxq
      ) {
        console.log("inFxq");
        let fxqId = thatData.cashBack.filter(function(e) {
          return e.id == thatData.userPlanData.voucherId;
        });
        if (fxqId.length != 0) {
          let maxArry = [
            thatData.userPlanData.amountInput, //输入的金额
            thatData.userPlanData.minAmount, //产品起投金额
            fxqId[0].minUseAmount * 1, //返现券起投金额
            fxqId[0].surplusValue / fxqId[0].useScale //返现券全部使用最大金额
            //thatData.userPlanData.usableSum //账户可用余额
          ];
          let maxAmount = maxArry.sort((a, b) => a - b)[maxArry.length - 1];
          thatData.reverse = maxAmount * fxqId[0].useScale;
          if (thatData.reverse > fxqId[0].surplusValue * 1) {
            thatData.reverse = fxqId[0].surplusValue * 1;
          }
          thatData.amountInput = maxAmount;
          thatData.ticketFlag = 4;
          thatData.amount = 0;
          thatData.rate = 0;
          thatData.userPlanData.voucherId = fxqId[0].id;
          thatData.userPlanData.yhTips = "返现券返现" + thatData.reverse + "元";

          let userPlanData = JSON.parse(localStorage.getItem("userPlanData"));
          if (
            userPlanData.calcPrompt &&
            userPlanData.amountInput != thatData.amountInput
          ) {
            mui.toast("已自动为您调整金额", { duration: 1000, type: "div" });
          }
          userPlanData.calcPrompt = false;
          localStorage.setItem("userPlanData", JSON.stringify(userPlanData));
        }
      }
    },
    autoCoupon: function() {
      //在优惠券页面选择了加息券
      let thatData = this;
      if (
        thatData.userPlanData.voucherId != 0 &&
        thatData.userPlanData.useJxq
      ) {
        console.log("inJxq");
        let couponId = thatData.coupon.filter(function(e) {
          return e.id == thatData.userPlanData.voucherId;
        });
        if (couponId.length != 0) {
          if (
            thatData.userPlanData.amountInput <
            couponId[0].minUseAmount * 1
          ) {
            console.log("<");
            let maxTime =
              thatData.userPlanData.lockPeriod * 1 > couponId[0].maxFaxTime * 1
                ? couponId[0].maxFaxTime * 1
                : thatData.userPlanData.lockPeriod * 1;
            thatData.rate = base.rateHikeMath(
              parseFloat(couponId[0].rate),
              maxTime,
              couponId[0].minUseAmount * 1
            );
            thatData.amountInput = couponId[0].minUseAmount * 1;
          } else if (
            thatData.userPlanData.amountInput >=
            couponId[0].minUseAmount * 1
          ) {
            console.log(">=");
            let maxAmount =
              thatData.userPlanData.amountInput > couponId[0].maxFaxNum * 1
                ? couponId[0].maxFaxNum * 1
                : thatData.userPlanData.amountInput;
            let maxTime =
              thatData.userPlanData.lockPeriod * 1 > couponId[0].maxFaxTime * 1
                ? couponId[0].maxFaxTime * 1
                : thatData.userPlanData.lockPeriod * 1;
            thatData.rate = base.rateHikeMath(
              parseFloat(couponId[0].rate),
              maxTime,
              maxAmount
            );
            thatData.amountInput = thatData.userPlanData.amountInput;
          }
          thatData.ticketFlag = 3;
          thatData.amount = 0;
          thatData.reverse = 0;
          thatData.userPlanData.voucherId = couponId[0].id;
          thatData.userPlanData.yhTips = "加息券加息" + thatData.rate + "元";

          let userPlanData = JSON.parse(localStorage.getItem("userPlanData"));
          if (
            userPlanData.calcPrompt &&
            userPlanData.amountInput != thatData.amountInput
          ) {
            mui.toast("已自动为您调整金额", { duration: 1000, type: "div" });
          }
          userPlanData.calcPrompt = false;
          localStorage.setItem("userPlanData", JSON.stringify(userPlanData));
        }
      }
    },
    checkComeBack() {
      //仅用于点出去什么都没点就返回 的 沙雕
      let thatData = this;
      if (
        thatData.userPlanData.useCou &&
        !thatData.userPlanData.useRed &&
        !thatData.userPlanData.useFxq &&
        !thatData.userPlanData.useJxq
      ) {
        let userJson = JSON.parse(localStorage.getItem("userPlanData"));
        if (userJson.amountInput > 0) {
          thatData.amountInput = userJson.amountInput;
        } else {
          thatData.amountInput = null;
        }
      }
    },
    findEnvelope: function(val) {
      //根据输入金额自动选择收益最大的红包还是加息券
      let thatData = this;
      if (
        thatData.userPlanData.useCou &&
        !thatData.userPlanData.useRed &&
        !thatData.userPlanData.useFxq &&
        !thatData.userPlanData.useJxq
      ) {
        console.log("Find");
        let userJson = JSON.parse(localStorage.getItem("userPlanData"));
        userJson.amountInput = 0;
        thatData.userPlanData.amountInput = 0;
        localStorage.setItem("userPlanData", JSON.stringify(userJson));

        //查找当前金额下 使用最优惠红包的金额
        let maxRed = {};

        let redNum = 0;

        for (var i = 0; i < thatData.redEnv.length; i++) {
          if (thatData.redEnv[i].minUseAmount * 1 <= val) {
            if (thatData.redEnv[i].amount * 1 > redNum) {
              redNum = thatData.redEnv[i].amount * 1;
              maxRed = thatData.redEnv[i];
            }
          }
        }

        //查找当前金额下 使用最优惠返现券的金额
        let maxCash = {};

        let cashNum = 0;

        if (thatData.cashBack.length > 0) {
          if (thatData.cashBack[0].minUseAmount <= val) {
            let maxCashAmount =
              val * 1 * thatData.cashBack[0].useScale >
              thatData.cashBack[0].surplusValue * 1
                ? thatData.cashBack[0].surplusValue * 1
                : val * 1 * thatData.cashBack[0].useScale;

            cashNum = Math.floor(maxCashAmount * 100) / 100;
            maxCash = thatData.cashBack[0];
          }
        }

        //查找当前金额下 使用最优惠加息券的金额
        let maxCou = {};

        let couNum = 0;

        for (var i = 0; i < thatData.coupon.length; i++) {
          if (thatData.coupon[i].minUseAmount * 1 <= val) {
            let maxAmount =
              val > thatData.coupon[i].maxFaxNum * 1
                ? thatData.coupon[i].maxFaxNum * 1
                : val;
            let maxTime =
              thatData.userPlanData.lockPeriod * 1 >
              thatData.coupon[i].maxFaxTime * 1
                ? thatData.coupon[i].maxFaxTime * 1
                : thatData.userPlanData.lockPeriod * 1;
            let maxCouNum = base.rateHikeMath(
              parseFloat(thatData.coupon[i].rate),
              maxTime,
              maxAmount
            );
            if (maxCouNum > couNum) {
              couNum = maxCouNum;
              maxCou = thatData.coupon[i];
            }
          }
        }

        console.log("redNum:", redNum);
        console.log("cashNum:", cashNum);
        console.log("couNum:", couNum);

        //最优惠金额放在一起比较
        if (redNum != 0 || cashNum != 0 || (couNum != 0 && val != "")) {
          let totalMax = redNum > cashNum ? redNum : cashNum;
          totalMax = totalMax > couNum ? totalMax : couNum;
          if (redNum == cashNum && cashNum == couNum) {
            console.log("=");
            thatData.amount = maxRed.amount;
            thatData.reverse = 0;
            thatData.rate = 0;
            thatData.userPlanData.yhTips = "投资红包返现" + redNum + "元";
            thatData.ticketFlag = 2;
            thatData.userPlanData.voucherId = maxRed.id;
          } else if (totalMax == redNum) {
            console.log("redNumWon");
            thatData.amount = maxRed.amount;
            thatData.reverse = 0;
            thatData.rate = 0;
            thatData.userPlanData.yhTips = "投资红包返现" + redNum + "元";
            thatData.ticketFlag = 2;
            thatData.userPlanData.voucherId = maxRed.id;
          } else if (totalMax == cashNum) {
            console.log("cashNumWon");
            thatData.amount = 0;
            thatData.reverse = cashNum;
            thatData.rate = 0;
            thatData.userPlanData.yhTips =
              "返现券返现" + thatData.reverse + "元";
            thatData.ticketFlag = 4;
            thatData.userPlanData.voucherId = maxCash.id;
          } else if (totalMax == couNum) {
            console.log("couNumWon");
            thatData.amount = 0;
            thatData.reverse = 0;
            thatData.rate = couNum;
            thatData.userPlanData.yhTips = "加息券加息" + thatData.rate + "元";
            thatData.ticketFlag = 3;
            thatData.userPlanData.voucherId = maxCou.id;
          }
        } else if (redNum == 0 && cashNum == 0 && couNum == 0 && val != "") {
          thatData.userPlanData.yhTips = "暂无可用";
          thatData.ticketFlag = 0;
          thatData.userPlanData.voucherId = 0;
          thatData.amount = 0;
          thatData.rate = 0;
        } else if (val == "") {
          let userPD = JSON.parse(localStorage.getItem("userPlanData"));
          thatData.userPlanData.yhTips = userPD.yhTips;
          thatData.ticketFlag = 0;
          thatData.userPlanData.voucherId = 0;
          thatData.amount = 0;
          thatData.rate = 0;
        }
      }
    },
    amountTips: function() {
      //根据输入的金额比对数目进行提示
      let thatData = this;
      if (
        thatData.userPlanData.maxAmount < thatData.userPlanData.remainAmount
      ) {
        if (
          thatData.amountInput > thatData.userPlanData.maxAmount &&
          thatData.amountInput < thatData.userPlanData.remainAmount
        ) {
          thatData.tips =
            "超过单笔加入上限" + thatData.userPlanData.maxAmount + "元";
        } else if (
          thatData.amountInput > thatData.userPlanData.remainAmount &&
          thatData.amountInput > thatData.userPlanData.maxAmount
        ) {
          thatData.tips =
            "该项目仅剩" + thatData.userPlanData.remainAmount + "元";
        } else {
          thatData.tips = "";
        }
      } else if (
        thatData.userPlanData.maxAmount >= thatData.userPlanData.remainAmount
      ) {
        if (thatData.amountInput > thatData.userPlanData.remainAmount) {
          thatData.tips =
            "该项目仅剩" + thatData.userPlanData.remainAmount + "元";
        } else {
          thatData.tips = "";
        }
      } else {
      }
    },
    checkInput: function() {
      //确认投资输入查验（原谅我屎一样的if嵌套）
      let thatData = this;
      if (thatData.amountInput) {
        if (
          thatData.amountInput >= thatData.userPlanData.minAmount ||
          thatData.userPlanData.remainAmount < thatData.userPlanData.minAmount
        ) {
          if (thatData.amountInput % thatData.userPlanData.unit == 0) {
            if (thatData.userPlanData.planType == 6) {
              if (thatData.amountInput <= thatData.userPlanData.canIvstMoney) {
                thatData.checkInputBranch();
              } else {
                mui.toast(
                  "您还可以加入" + thatData.userPlanData.canIvstMoney + "元",
                  { duration: 1000, type: "div" }
                );
                return false;
              }
            } else {
              thatData.checkInputBranch();
            }
          } else {
            mui.toast(
              "加入金额只能为" + thatData.userPlanData.unit + "元的整数倍",
              { duration: 1000, type: "div" }
            );
            return false;
          }
        } else {
          mui.toast(
            "加入金额需不低于" + thatData.userPlanData.minAmount + "元",
            { duration: 1000, type: "div" }
          );
          return false;
        }
      } else {
        mui.toast("请输入加入金额", { duration: 1000, type: "div" });
        return false;
      }
    },
    checkInputBranch: function() {
      //继续输入查验（继续屎一样的if）
      let thatData = this;
      if (thatData.amountInput <= thatData.userPlanData.remainAmount) {
        if (thatData.amountInput <= thatData.userPlanData.maxAmount) {
          if (thatData.amountInput <= thatData.userPlanData.usableSum) {
            if (thatData.agree) {
              if (
                thatData.userPlanData.openAmountValidate &&
                thatData.userPlanData.investTopAmount * 1 < thatData.amountInput
              ) {
                mui.confirm(
                  thatData.userPlanData.overTopAmountDesc,
                  "风险提示",
                  ["取消", "重新测评"],
                  function(e) {
                    if (e.index == 1) {
                      thatData.$router.push({ path: "/riskass" });
                      localStorage.setItem("riskFrom", "x");
                    }
                  }
                );
              } else {
                if (thatData.userPlanData.isAuth * 1 == 1) {
                  mui.confirm(
                    "您未开启投资授权服务，需要开启后才能加入",
                    " ",
                    ["暂不开启", "去开启"],
                    function(e) {
                      if (e.index == 1) {
                        localStorage.setItem("from", location.href);
                        location.href = "/mine_open_jump/openAuth";
                      }
                    }
                  );
                } else if (thatData.userPlanData.isAuth * 1 == 2) {
                  mui.toast("授权服务存管处理中，请稍后再试", {
                    duration: 1000,
                    type: "div"
                  });
                } else {
                  thatData.muiAlert();
                }
              }
            } else {
              mui.toast("请阅读并同意协议", { duration: 1000, type: "div" });
              return false;
            }
          } else {
            let stillNeed = math.format(
              math
                .chain(math.bignumber(thatData.amountInput))
                .subtract(math.bignumber(thatData.userPlanData.usableSum))
                .done()
            );
            mui.confirm(
              "余额不足，还差" + stillNeed + "元，是否去充值？",
              "提示",
              ["取消", "去充值"],
              function(e) {
                if (e.index == 1) {
                  if (thatData.userPlanData.cgtStatus == 3) {
                    //没绑卡 弹出去绑卡弹窗
                    mui.confirm(
                      "请先绑定银行卡",
                      " ",
                      ["取消", "去绑卡"],
                      function(e) {
                        if (e.index == 1) {
                          thatData.jumpGoAnother();
                          localStorage.setItem("from", location.href);
                          //thatData.$router.push({ path: "/mine_bind_bankcard" });
                          location.href = "/mine_open_jump/bind";
                        }
                      }
                    );
                  } else {
                    thatData.jumpGoAnother();
                    thatData
                      .$withApp("takeAppOpen", {
                        status: 0,
                        result: {
                          transferName: "goToAppRecharge",
                          transferData: {
                            amount: stillNeed + "" //h5G自动服务加入时余额不足 弹窗 充值 带入还需充值差额
                          }
                        },
                        msg: "success"
                      })
                      .then(data => {
                        if (data == "wap") {
                          localStorage.setItem("from", "invest_conftrans");
                          thatData.$router.push({ path: "/assets_recharge" });
                        }
                      });
                  }
                }
              }
            );
          }
        } else {
          let stillNeed = math.format(
            math
              .chain(math.bignumber(thatData.amountInput))
              .subtract(math.bignumber(thatData.userPlanData.usableSum))
              .done()
          );
          mui.confirm(
            "余额不足，还差" + stillNeed + "元，是否去充值？",
            "提示",
            ["取消", "去充值"],
            function(e) {
              if (e.index == 1) {
                if (thatData.userPlanData.cgtStatus == 3) {
                  //没绑卡 弹出去绑卡弹窗
                  mui.confirm(
                    "请先绑定银行卡",
                    " ",
                    ["取消", "去绑卡"],
                    function(e) {
                      if (e.index == 1) {
                        thatData.jumpGoAnother();
                        localStorage.setItem("from", location.href);
                        //thatData.$router.push({ path: "/mine_bind_bankcard" });
                        location.href = "/mine_open_jump/bind";
                      }
                    }
                  );
                } else {
                  thatData.jumpGoAnother();
                  thatData
                    .$withApp("takeAppOpen", {
                      status: 0,
                      result: {
                        transferName: "goToAppRecharge",
                        transferData: {
                          amount: stillNeed + "" //h5G自动服务加入时余额不足 弹窗 充值 带入还需充值差额
                        }
                      },
                      msg: "success"
                    })
                    .then(data => {
                      if (data == "wap") {
                        localStorage.setItem("from", location.href);
                        thatData.$router.push({ path: "/assets_recharge" });
                      }
                    });
                }
              }
            }
          );
        }
      } else {
        mui.toast(
          "该项目仅剩" + thatData.userPlanData.remainAmount + "元可加入",
          { duration: 1000, type: "div" }
        );
        return false;
      }
    },
    calcInterest: function() {
      //计算预期利息
      let thatData = this;
      let floatInterest =
        (thatData.amountInput *
          thatData.userPlanData.totalYield *
          thatData.userPlanData.lockPeriod) /
        36000;
      thatData.exInterest = Math.round(floatInterest * 100) / 100;
    },
    muiAlert: function() {
      //确认加入弹窗，根据选择的优惠券有增加提示
      let thatData = this;

      if (
        thatData.onlyYhTips > 0 &&
        thatData.userPlanData.useCou &&
        thatData.ticketFlag == 2
      ) {
        mui.confirm(
          "加入金额：" +
            thatData.amountInput +
            "元\n" +
            "使用优惠券：" +
            thatData.amount +
            "元红包" +
            "\n<p style='color:#999;'>红包金额将在满标复审后返还<p>",
          "加入确认",
          ["取消", "确认加入"],
          function(e) {
            if (e.index == 1) {
              thatData.lockBtn = true;
              thatData.postBuy();
            } else {
            }
          }
        );
      } else if (
        thatData.onlyYhTips > 0 &&
        thatData.userPlanData.useCou &&
        thatData.ticketFlag == 4
      ) {
        mui.confirm(
          "加入金额：" +
            thatData.amountInput +
            "元\n" +
            "使用优惠券：返现" +
            thatData.reverse +
            "元" +
            "\n<p style='color:#999;'>返现券返现金额将在满标复审后返还<p>",
          "加入确认",
          ["取消", "确认加入"],
          function(e) {
            if (e.index == 1) {
              thatData.lockBtn = true;
              thatData.postBuy();
            } else {
            }
          }
        );
      } else if (
        thatData.onlyYhTips > 0 &&
        thatData.userPlanData.useCou &&
        thatData.ticketFlag == 3
      ) {
        mui.confirm(
          "加入金额：" +
            thatData.amountInput +
            "元\n" +
            "使用优惠券：加息" +
            thatData.rate +
            "元" +
            "\n<p style='color:#999;'>加息收益将在到期后一次性返还<p>",
          "加入确认",
          ["取消", "确认加入"],
          function(e) {
            if (e.index == 1) {
              thatData.lockBtn = true;
              thatData.postBuy();
            } else {
            }
          }
        );
      } else if (
        thatData.onlyYhTips > 0 &&
        !thatData.userPlanData.useCou &&
        thatData.ticketFlag == 0
      ) {
        mui.confirm(
          "加入金额：" +
            thatData.amountInput +
            "元<p style='color:#999'>您有" +
            thatData.onlyYhTips +
            "张优惠券未使用，确定要继续加入吗？</p>",
          "加入确认",
          ["继续加入", "选择优惠券"],
          function(e) {
            if (e.index == 0) {
              thatData.lockBtn = true;
              thatData.postBuy();
            } else {
              thatData.goMyCoupon();
            }
          }
        );
      } else {
        mui.confirm(
          "加入金额：" + thatData.amountInput + "元",
          "加入确认",
          ["取消", "确认加入"],
          function(e) {
            if (e.index == 1) {
              thatData.lockBtn = true;
              thatData.postBuy();
            } else {
            }
          }
        );
      }
    },
    allForInvest: function() {
      //全额加入
      let thatData = this;
      if (thatData.userPlanData.usableSum * 1 > 0) {
        let minNum;
        if (thatData.userPlanData.planType == 6) {
          minNum = Math.min.apply(Math, [
            thatData.userPlanData.canIvstMoney,
            thatData.userPlanData.usableSum,
            thatData.userPlanData.remainAmount
          ]);
        } else {
          minNum = Math.min.apply(Math, [
            thatData.userPlanData.usableSum,
            thatData.userPlanData.remainAmount,
            thatData.userPlanData.maxAmount
          ]);
        }
        if (minNum < thatData.userPlanData.minAmount) {
          if (
            thatData.userPlanData.remainAmount < thatData.userPlanData.minAmount
          ) {
            mui.toast(
              "已自动调整为产品剩余金额" +
                thatData.userPlanData.remainAmount +
                "元",
              { duration: 1000, type: "div" }
            );
            thatData.amountInput = thatData.userPlanData.remainAmount;
          } else {
            thatData.amountInput = thatData.userPlanData.minAmount;
          }
        } else {
          let zz =
            parseInt(minNum / thatData.userPlanData.unit) *
            thatData.userPlanData.unit;
          if (
            thatData.userPlanData.planType == 6 &&
            zz == thatData.userPlanData.canIvstMoney
          ) {
            mui.toast(
              "已自动调整为权益标可投额度" +
                thatData.userPlanData.canIvstMoney +
                "元",
              { duration: 1000, type: "div" }
            );
          } else if (
            thatData.userPlanData.planType == 6 &&
            zz == thatData.userPlanData.maxAmount
          ) {
            mui.toast(
              "已自动调整为产品单笔投资上限" +
                thatData.userPlanData.maxAmount +
                "元",
              { duration: 1000, type: "div" }
            );
          } else if (
            thatData.userPlanData.planType == 6 &&
            zz == thatData.userPlanData.remainAmount
          ) {
            mui.toast(
              "已自动调整为产品剩余金额" +
                thatData.userPlanData.remainAmount +
                "元",
              { duration: 1000, type: "div" }
            );
          } else if (
            thatData.userPlanData.planType != 6 &&
            zz == thatData.userPlanData.maxAmount
          ) {
            mui.toast(
              "已自动调整为产品单笔投资上限" +
                thatData.userPlanData.maxAmount +
                "元",
              { duration: 1000, type: "div" }
            );
          } else if (
            thatData.userPlanData.planType != 6 &&
            zz == thatData.userPlanData.remainAmount
          ) {
            mui.toast(
              "已自动调整为产品剩余金额" +
                thatData.userPlanData.remainAmount +
                "元",
              { duration: 1000, type: "div" }
            );
          } else {
            mui.toast(
              "已自动调整为" + thatData.userPlanData.unit + "元的整数倍",
              {
                duration: 1000,
                type: "div"
              }
            );
          }
          thatData.amountInput =
            parseInt(minNum / thatData.userPlanData.unit) *
            thatData.userPlanData.unit;
        }
      }
    },
    getLocalData: function() {
      //获取一下从详情保存的数据
      let thatData = this;
      thatData.userPlanData = JSON.parse(localStorage.getItem("userPlanData"));
      thatData.getNewXInvestDetail();
      let redEnv = JSON.parse(localStorage.getItem("redEnv"));
      let cashBack = JSON.parse(localStorage.getItem("cashBack"));
      let coupon = JSON.parse(localStorage.getItem("coupon"));
      thatData.redEnv = redEnv.redpackListEntity;
      thatData.cashBack = cashBack.voucherListEntity;
      thatData.coupon = coupon.jiaXiListEntity;
    },
    postBuy: function() {
      //投资请求
      let thatData = this;

      let data = {
        planId: thatData.userPlanData.planId,
        ticketFlag: thatData.ticketFlag,
        joinAmount: thatData.amountInput,
        voucherId: thatData.userPlanData.voucherId,
        isContinue: thatData.userPlanData.isContinue ? 0 : 1
      };

      this.$http
        .post("/api/finance/planBuy", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.codeKey = resData.result.codeKey;
            setTimeout(thatData.postBuyPlanStatus(), 2000);
          } else if (resData.status * 1 == 8230 || resData.status * 1 == 32) {
            mui.confirm(
              "您未开启投资授权服务，需要开启后才能加入",
              " ",
              ["暂不开启", "去开启"],
              function(e) {
                if (e.index == 1) {
                  localStorage.setItem("from", location.href);
                  location.href = "/mine_open_jump/openAuth";
                }
              }
            );
          } else {
            mui.toast("加入失败，请联系客服", { duration: 1000, type: "div" });
          }
          thatData.lockBtn = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postBuyPlanStatus: function() {
      //确认是否投资成功
      let thatData = this;

      let data = {
        codeKey: thatData.codeKey
      };

      this.$http
        .post("/api/finance/queryBuyPlanStatus", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            let expData = resData.result;
            localStorage.setItem("expectedData", JSON.stringify(expData));
            localStorage.removeItem("userPlanData");
            localStorage.removeItem("redEnv");
            localStorage.removeItem("cashBack");
            localStorage.removeItem("coupon");
            thatData.$router.replace({ path: "/invest_suctransfer" });
          } else {
            mui.toast("加入失败，请联系客服", { duration: 1000, type: "div" });
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
@import "../../../style/css/wap_invest_confir_transfer.css";
</style>
