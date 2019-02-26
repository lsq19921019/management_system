<template>
  <div>
    <div class="recharge">
      <loan-header ref="header"></loan-header>
      <div class="center">
        <div class="inner">
          <div class="content">
            <div class="top-bank clear">
              <div class="top-bank-img">
                <img src="/static/img/loan_rechange.png">
              </div>
              <p>携手银行账户资金存管，保障资金安全</p>
              <p class="can-use-money">可用余额：{{bankOnlineList.balance}}</p>
            </div>
            <div class="top-tips">
              <p class="title">温馨提示</p>
              <p class="text">1.单笔充值不小于10元；
                <br>2.部分银行网银充值仅支持IE浏览器；
                <br>3.企业网银充值注意操作充值后，用复核员账号登录网银账号进行交易复核，不复核交易则无法充值到账；
              </p>
            </div>
            <div class="bank-list">
              <div class="bank-list-title">
                <p>网银充值</p>
              </div>
              <div class="bank-link">
                <ul class="clear">
                  <li
                    class
                    v-for="(bank,index) in bankOnlineList.bankOnlineResultList"
                    :key="index"
                    @click="classIndex = index,bankClick(bank.bankName,bank.content,bank.bankCode,bank.companyCode)"
                    :class="{'active':index == classIndex}"
                  >
                    <div class="bank-box">
                      <div class="bank-logo">
                        <img :src="bank.logoUrl">
                      </div>
                      <p>{{bank.bankName}}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="rechange-line">
                <span>充值金额</span>
                <input type="number" placeholder="请输入充值金额，10元起" v-model="recharge">
                <span>元</span>
                <p
                  style="font-size: 14px;color: #999;padding: 8px 0 0 83px;"
                >温馨提示：支付成功后，需等待大约5分钟，存管账户余额才会更新</p>
                <div class="btn">
                  <el-button @click="checking()">充值</el-button>
                </div>
              </div>
            </div>
            <div class="bank-quota">
              <div class="bank-quota-title">
                <p>{{activeBank}}</p>
              </div>
              <div class="table-box" v-html="activeTable"></div>
            </div>
          </div>
        </div>
      </div>
      <loan-footer></loan-footer>
      <transition name="changeTip">
        <div class="change-tip" v-show="changeTip">
          <div class="block"></div>
          <div class="window">
            <div class="title">
              <p>温馨提示</p>
            </div>
            <div class="text">
              <p>请您在新打开的页面完成充值
                <br>充值完前请不要关闭此窗口，根据完成结果，选择下面的操作
              </p>
            </div>
            <div class="btn">
              <el-button @click="goRepaying()">充值成功，马上还款</el-button>
            </div>
            <div class="not">
              <span @click="reload()">充值遇到问题</span>
            </div>
            <div class="close">
              <img src="/static/img/loan_alert_close.png" @click="changeTip = !changeTip">
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import loanHeader from "./loan_header.vue";
import loanFooter from "./loan_footer.vue";
export default {
  data() {
    return {
      changeTip: false,
      bankOnlineList: {},
      classIndex: -1,
      activeBank: "",
      activeTable: "",
      recharge: "",
      bankCode: "",
      companyCode: ""
    };
  },
  components: {
    loanHeader,
    loanFooter
  },
  watch: {
    recharge(val) {
      if (val != "" && val.length < 13) {
        this.recharge = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      } else if (val != "" && val.length >= 13) {
        this.recharge = Math.floor(val.slice(0, 11) * 100) / 100;
      } else {
      }
    }
  },
  created() {
    this.postBankOnlineList();
  },
  mounted() {
    this.$refs.header.setHeaderTitle("我的账户");
  },
  updated() {
    $(".table-box table").css({
      border: "1px solid #e9e9e9",
      "border-collapse": "collapse",
      width: "100%",
      "text-align": "center"
    });
    $(".table-box th").css({
      background: "#f5f5f5",
      width: "33.33%",
      border: "1px solid #e9e9e9",
      "font-size": "14px",
      "line-height": "22px",
      "font-weight": "normal",
      color: "#333"
    });
    $(".table-box td").css({
      width: "33.33%",
      border: "1px solid #e9e9e9",
      "font-size": "14px",
      "line-height": "22px",
      "font-weight": "normal",
      color: "#333"
    });
  },
  methods: {
    reload: function() {
      location.reload();
    },
    goRepaying: function() {
      this.$router.push({ path: "/account" });
    },
    bankClick: function(bank, table, bankCode, companyCode) {
      let thatData = this;
      thatData.activeBank = bank;
      thatData.activeTable = table;
      thatData.bankCode = bankCode;
      thatData.companyCode = companyCode;
    },
    postBankOnlineList: function() {
      var thatData = this;
      var data = {};

      this.$http
        .post("/api/assets/bankOnlineList", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            let bankListArry = resData.result;
            bankListArry.bankOnlineResultList.splice(
              0,
              0,
              bankListArry.bankOnlineResultList[
                bankListArry.bankOnlineResultList.length - 1
              ]
            );
            bankListArry.bankOnlineResultList.pop();
            thatData.bankOnlineList = bankListArry;
          } else if (resData.status == "-3") {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
            thatData.$router.push({ path: "/login" });
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checking: function() {
      let thatData = this;
      if (thatData.recharge < 10) {
        thatData.$message({
          showClose: true,
          message: "充值金额不能小于10元",
          type: "error"
        });
      } else {
        thatData.postRecharge();
      }
    },
    postRecharge: function() {
      var thatData = this;
      var data = {
        amount: thatData.recharge,
        bankCode: thatData.bankCode
        //expectPayCompany: thatData.companyCode,
      };

      this.$http
        .post("/api/assets/recharge", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            window.open(resData.result.cgtData, "_blank", "");
            thatData.changeTip = true;
          } else if (resData.status == "-3") {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
            thatData.$router.push({ path: "/login" });
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
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
@import "../style/css/loan_recharge.css";
</style>
