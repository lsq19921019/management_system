<template>
  <div>
    <div class="with-drawal">
      <div class="alr">
        <p class="top">提现申请已提交，等待银行处理</p>
        <p class="bank">{{bankName}}（{{cardno}}）</p>
        <p class="money">手续费{{fee}}元，到账{{amount}}元</p>
        <img src="/static/img/mobile_withdrawal_application.png">
      </div>
      <div class="exp">
        <p>预计下一个工作日24:00前到账</p>
      </div>
      <div class="to-record">
        <a v-if="isShowRecording" href="/withrecord">去提现记录查看进度></a>
        <a v-else href="/JumpToWithdrawRecord">去提现记录查看进度></a>
      </div>
    </div>
    <button class="mui-btn" v-if="isShowRecording" @click="towith">完成</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bankName: "",
      cardno: "",
      amount: "",
      fee: "",
      isShowRecording: false, //判断客户端类型
      bankLimits: [
        { bankName: "中国银行", bankcode: "104100000004" },
        { bankName: "工商银行", bankcode: "102100099996" },
        { bankName: "光大银行", bankcode: "303100000006" },
        { bankName: "招商银行", bankcode: "308584000013" },
        { bankName: "邮储银行", bankcode: "403100000004" },
        { bankName: "浦发银行", bankcode: "310290000013" },
        { bankName: "中信银行", bankcode: "302100011000" },
        { bankName: "广发银行", bankcode: "306581000003" },
        { bankName: "华夏银行", bankcode: "304100040000" },
        { bankName: "农业银行", bankcode: "103100000026" },
        { bankName: "交通银行", bankcode: "301290000007" },
        { bankName: "兴业银行", bankcode: "309391000011" },
        { bankName: "民生银行", bankcode: "305100000013" },
        { bankName: "建设银行", bankcode: "105100000017" },
        { bankName: "平安银行", bankcode: "307584007998" },
        { bankName: "北京银行", bankcode: "313100000013" },
        { bankName: "上海银行", bankcode: "325290000012" },
        { bankName: "杭州银行", bankcode: "313331000014" },
        { bankName: "浙商银行", bankcode: "316331000018" },
        { bankName: "江苏银行", bankcode: "313301099999" },
        { bankName: "广州银行", bankcode: "313581003284" },
        { bankName: "东莞银行", bankcode: "313602088017" }
      ]
    };
  },
  created() {
    this.hideenBtn();
    this.isType();
  },
  mounted: function() {
    let thatData = this;
    thatData.getBank(thatData.$route.query.bankcode);
    thatData.cardno = thatData.$route.query.cardno;
    thatData.amount = thatData.$route.query.amount;
    thatData.fee = thatData.$route.query.fee;
  },
  methods: {
    record() {
      this.$withApp("takeAppOpen", {
        status: 0,
        result: {
          transferName: "goToAppWithdrawalsRecord",
          transferData: {}
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
          location.href = "/appDownload";
        } else {
        }
      });
    },
    //判断客户端类型
    isType() {
      let istype = base.getClientType();
      if (istype.type == "wap") {
        this.isShowRecording = true;
      }
    },
    //<----------- 分割线在此 ------------->
    getBank: function(bankC) {
      var that = this;
      for (var i = 0; i < that.bankLimits.length; i++) {
        if (bankC == that.bankLimits[i].bankcode) {
          that.bankName = that.bankLimits[i].bankName;
          break;
        }
      }
    },
    //返回
    towith() {
      this.$router.push({ path: "/assets_center" });
    },
    hideenBtn() {
      this.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "hiddenBackBarButton",
          transferData: {}
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
        } else {
          return this.$withApp("takeAppTable", {
            status: 0,
            result: {
              transferName: "completeBindCard",
              transferData: {}
            },
            msg: "success"
          });
        }
      });
    }
  }
};
</script>
<style>
@import "../../../style/css/mobile_withdrawal_application.css";
</style>
