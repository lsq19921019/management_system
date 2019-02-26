<!--
  create : dxc 2018-09-015
  desc : 资产-散标加入详情
  update : 
  desc : 
-->
<template>
  <div class="loan_details">
    <wap-alert ref="alert"></wap-alert>
    <div class="header pr">
      <div class="status_data">
        <h3 v-if="loanDetails.webStatus*1 == 1">待满标</h3>
        <h3 v-else-if="loanDetails.webStatus*1 == 2">出借中</h3>
        <h3 class="lonely" v-else-if="loanDetails.webStatus*1 == 3">转让中</h3>
        <h3 class="lonely" v-else-if="loanDetails.webStatus*1 == 4">银行处理中</h3>
        <h3 class="lonely" v-else-if="loanDetails.webStatus*1 == 5">已转让</h3>
        <h3 class="lonely" v-else-if="loanDetails.webStatus*1 == 6">已结清</h3>
        <h3 class="lonely" v-else-if="loanDetails.webStatus*1 == 7">提前结清</h3>
        <p v-if="loanDetails.webStatus*1 == 1">等待满标后计息</p>
        <p v-else-if="loanDetails.webStatus*1 == 2">等待项目还款</p>
      </div>
      <div class="pending_money">
        <div class="mui-row">
          <div class="mui-col-xs-6 right_border pr right_border">
            <h5>{{loanDetails.waitInterest}}</h5>
            <p>待收本息(元)
              <img @click="waitAlert()" src="/static/img/wap_invest_confir_transfer_03.png">
            </p>
          </div>
          <div class="mui-col-xs-6">
            <h5>{{loanDetails.hasInterest}}</h5>
            <p>已收本息(元)</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="return_list"
      v-show="loanDetails.repayListEntities && loanDetails.repayListEntities.length > 0"
    >
      <div class="return_title border-one-half-bottom">
        <p v-if="loanDetails.repayListEntities">
          {{loanDetails.repayListEntities[0].repayPeriod}} {{loanDetails.paymentMode}}
          <span>本金+利息(元)</span>
        </p>
      </div>
      <div class="list_content">
        <ul>
          <li
            :class="{'border-one-half-bottom':index + 1 != loanDetails.repayListEntities.length}"
            v-for="(repay,index) in loanDetails.repayListEntities"
            :key="index"
          >
            <p>
              <span class="date pr">
                {{repay.repayDate}}
                <i
                  class="border_tips"
                  :class="{'act':repay.status == '待回款'}"
                >{{repay.status}}</i>
              </span>
              <span class="money">{{repay.amount}}+{{repay.interest}}</span>
            </p>
            <p class="sub" v-if="repay.jxqInterest*1">含加息收益
              <span>{{repay.jxqInterest}}</span>
            </p>
            <p class="sub" v-if="repay.recivedFi*1">含补息
              <span>{{repay.recivedFi}}</span>
            </p>
            <p class="sub" v-if="repay.interestPrize*1">含利息奖励
              <span>{{repay.interestPrize}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="g_details">
      <p>
        <span>名称</span>
        <span>{{loanDetails.title}}</span>
      </p>
      <p>
        <span>出借本金</span>
        <span>{{loanDetails.borrowAmount}}元</span>
      </p>
      <p>
        <span>期限</span>
        <span>{{loanDetails.lockPeriod}}</span>
      </p>
      <p>
        <span>出借时间</span>
        <span>{{loanDetails.operateDate}}</span>
      </p>
      <p v-show="loanDetails.propType">
        <span v-if="loanDetails.propType*1 == 1">代金券</span>
        <span v-else-if="loanDetails.propType*1 == 2">投资红包</span>
        <span v-else-if="loanDetails.propType*1 == 3">加息券</span>
        <span v-else-if="loanDetails.propType*1 == 4">现金红包</span>
        <span v-else-if="loanDetails.propType*1 == 5">返现券</span>
        <span class="pr">
          {{loanDetails.propAmount}}元
          <i class="border_tips" v-if="loanDetails.isProp*1 == 2">已失效</i>
        </span>
      </p>
      <p
        v-if="loanDetails.webStatus*1 == 2 || loanDetails.webStatus*1 == 3 || loanDetails.webStatus*1 == 4"
      >
        <span>到期时间</span>
        <span>{{loanDetails.endDate}}</span>
      </p>
      <p v-if="loanDetails.webStatus*1 == 5">
        <span>转让时间</span>
        <span>{{loanDetails.auctionendTime}}</span>
      </p>
      <p v-if="loanDetails.webStatus*1 == 6 || loanDetails.webStatus*1 == 7">
        <span>结清时间</span>
        <span>{{loanDetails.endDate}}</span>
      </p>
      <p v-if="loanDetails.webStatus*1 == 5 && loanDetails.transferFee*1 > 0">
        <span>转让手续费</span>
        <span>{{loanDetails.transferFee}}元</span>
      </p>
    </div>
    <div class="footer_table border-one-half-top">
      <a :href="loanDetails.borrowDetailUrl">项目详情</a>
      <a :href="loanDetails.protocolBorrowLink">协议</a>
      <!-- <a @click="goTransferBorrow()" v-if="loanDetails.webStatus*1 == 2">转让</a> -->
    </div>
  </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      loanDetails: {},
      num: 0
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.postLoanDetails();
  },
  mounted() {
    this.hiddenRightApp();
  },
  methods: {
    hiddenRightApp() {
      let _this = this;
      _this.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "hiddenRightBarButton",
          transferData: {}
        },
        msg: "success"
      });
    },
    waitAlert() {
      mui.alert("待收利息，项目满标后计算", " ");
    },
    /* goTransferBorrow() {
      let _this = this;
      _this
        .$withApp("goToAppTransferBorrow", {
          status: 0,
          result: "",
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            this.$router.push({ path: "/appDownload" });
          }
        });
    }, */
    postLoanDetails() {
      let thatData = this;

      let data = {
        investId: thatData.$route.params.id,
        type: thatData.$route.params.type,
        assRecordId:
          thatData.$route.params.type * 1 == 2
            ? thatData.$route.params.recordId
            : ""
      };

      this.$http
        .post("/api/assets/myInvestBorrowNewDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            thatData.loanDetails = resData.result;
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
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
.loan_details {
  padding-bottom: 1.25rem;
  .header {
    .status_data {
      background: url(/static/img/wap_assets_loan_details_sb_01.png) no-repeat
        center;
      background-size: cover;
      padding-top: 0.7rem;
      padding-left: 0.38rem;
      padding-bottom: 0.65rem;
      h3 {
        font-size: 0.42rem;
        line-height: 0.42rem;
        color: #fff;
        font-weight: normal;
        padding-bottom: 0.24rem;
      }
      h3.lonely {
        line-height: 0.96rem;
        padding-bottom: 0;
      }
      p {
        font-size: 0.3rem;
        line-height: 0.3rem;
        color: #fff;
      }
    }
    .pending_money {
      background: #fff;
      text-align: center;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      h5 {
        font-size: 0.3rem;
        line-height: 0.23rem;
        color: #545454;
        font-weight: normal;
        padding-bottom: 0.3rem;
      }
      p {
        font-size: 0.24rem;
        line-height: 0.24rem;
        color: #999;
        img {
          margin-left: 0.09rem;
          width: 0.24rem;
          position: relative;
          top: 0.06rem;
        }
      }
    }
  }
  .return_list {
    margin-top: 0.14rem;
    background: #fff;
    .return_title {
      padding: 0.3rem;
      p {
        font-size: 0.3rem;
        line-height: 0.3rem;
        color: #162337;
        span {
          float: right;
          font-size: 0.24rem;
          line-height: 0.24rem;
          color: #999;
        }
      }
    }
    .list_content {
      padding-left: 0.3rem;
      li {
        padding: 0.33rem 0.3rem 0.33rem 0;
        p {
          .date {
            font-size: 0.28rem;
            line-height: 0.28rem;
            color: #666;
            i {
              right: -1.38rem;
              top: -0.02rem;
            }
          }
          .money {
            float: right;
            font-size: 0.28rem;
            color: #666;
          }
        }
        p.sub {
          font-size: 0.24rem;
          line-height: 0.24rem;
          color: #666;
          padding-top: 0.24rem;
          span {
            font-size: 0.24rem;
            float: right;
          }
        }
      }
    }
  }
  .g_details {
    padding: 0.24rem 0.3rem;
    background: #fff;
    margin-top: 0.14rem;
    p {
      padding-bottom: 0.24rem;
      span:first-child {
        display: inline-block;
        width: 1.3rem;
        font-size: 0.26rem;
        line-height: 0.25rem;
        color: #909197;
      }
      span:last-child {
        display: inline-block;
        font-size: 0.28rem;
        line-height: 0.22rem;
        color: #404451;
        i {
          right: -1.28rem;
          top: -0.07rem;
        }
      }
    }
    p:last-child {
      padding-bottom: 0;
    }
  }
  .footer_table {
    width: 100%;
    box-sizing: border-box;
    padding: 0.24rem 0.3rem;
    background: #fff;
    text-align: right;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    a {
      display: inline-block;
      width: 1.5rem;
      font-size: 0.24rem;
      color: #666;
      text-align: center;
      border: 1px solid #999;
      border-radius: 0.54rem;
      padding: 0.15rem 0;
      margin-left: 0.24rem;
    }
  }
  .pr {
    position: relative;
  }
  .right_border::after {
    content: "";
    display: block;
    width: 0.01rem;
    height: 0.8rem;
    background: #ddd;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .border_tips {
    display: inline-block;
    font-size: 0.24rem;
    line-height: 0.2rem;
    text-align: center;
    font-style: normal;
    color: #666;
    border: 1px solid #999;
    border-radius: 0.04rem;
    padding: 0.08rem 0;
    width: 1.24rem;
    position: absolute;
  }
  .border_tips.act {
    color: #ff5637;
    border: 1px solid #ff5637;
  }
}
</style>