<!--
  create : dxc 2018-09-015
  desc : 资产-G自动服务加入详情
  update : 
  desc : 
-->
<template>
  <div class="add_details">
    <wap-alert ref="alert"></wap-alert>
    <div class="header pr">
      <div class="status_data">
        <h3>{{statusDataTitle}}</h3>
        <p>{{statusDataText}}</p>
      </div>
      <div class="pending_money">
        <div class="mui-row">
          <div class="mui-col-xs-6 right_border pr right_border">
            <h5>{{gDetails.waitInterest}}</h5>
            <p>
              待收本息(元)
              <img @click="waitAlert()" src="/static/img/wap_invest_confir_transfer_03.png">
            </p>
          </div>
          <div class="mui-col-xs-6">
            <h5>{{gDetails.hasInterest}}</h5>
            <p>已收本息(元)</p>
          </div>
        </div>
      </div>
      <router-link
        :to="'/assets_loanproject_list' + '/1/' + $route.params.id"
        class="loan_project"
        v-show="!isApp"
      >借款项目></router-link>
    </div>
    <div
      class="return_list"
      v-show="gDetails.repayListEntities && gDetails.repayListEntities.length > 0"
    >
      <div class="return_title border-one-half-bottom">
        <p>
          回款列表
          <span>本金+利息(元)</span>
        </p>
      </div>
      <div class="list_content">
        <ul>
          <li
            :class="{'border-one-half-bottom':index + 1 != gDetails.repayListEntities.length}"
            v-for="(repay,index) in gDetails.repayListEntities"
            :key="index"
            @click="repay.status != '已解冻' && goLoanProject($route.params.id, repay.repayDate)"
          >
            <p>
              <span class="date pr">
                {{repay.repayDate}}
                <i
                  class="border_tips"
                  :class="{'act':repay.status == '待回款'}"
                >{{repay.status}}</i>
                <img
                  v-if="repay.status == '已回部分' || repay.status == '已解冻'"
                  @click.stop="statusAlert(repay.status)"
                  src="/static/img/wap_invest_confir_transfer_03.png"
                >
              </span>
              <span class="money">
                {{repay.amount}}+{{repay.interest}}
                <img
                  v-if="repay.status != '已解冻'"
                  src="/static/img/wap_invest_index_01.png"
                >
                <span v-else></span>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="g_details">
      <p>
        <span>名称</span>
        <span>{{gDetails.title}}</span>
      </p>
      <p>
        <span>加入本金</span>
        <span>{{gDetails.joinAmount}}元</span>
      </p>
      <p>
        <span>加入时间</span>
        <span>{{gDetails.joinTime}}</span>
      </p>
      <p v-if="gDetails.isProp * 1 != 0">
        <span v-if="gDetails.propType * 1 == 1">代金券</span>
        <span v-else-if="gDetails.propType * 1 == 2">投资红包</span>
        <span v-else-if="gDetails.propType * 1 == 3">加息券</span>
        <span v-else-if="gDetails.propType * 1 == 4">现金红包</span>
        <span v-else-if="gDetails.propType * 1 == 5">返现券</span>
        <span class="pr">
          {{gDetails.propAmount}}元
          <i class="border_tips" v-if="gDetails.isProp * 1 == 2">已失效</i>
        </span>
      </p>
      <p v-if="gDetails.autoInvestReward && gDetails.autoInvestReward * 1 != 0">
        <span>续投奖励</span>
        <span class="pr">
          {{gDetails.autoInvestReward}}元
          <i
            class="border_tips"
            v-if="gDetails.autoInvestText"
          >{{gDetails.autoInvestText}}</i>
        </span>
      </p>
      <p v-if="gDetails.webStatus * 1 != 0">
        <span>结束时间</span>
        <span>{{gDetails.endTime}}</span>
      </p>
    </div>
    <div class="auto_continue" v-show="gDetails.supportAutoInvest * 1 == 0">
      <div class="auto_title">
        <span class="pr">
          自动续投
          <i
            class="border_tips width act"
            v-if="gDetails.autoInvestMark"
          >{{gDetails.autoInvestMark}}</i>
        </span>
        <div class="switch">
          <van-switch active-color="#44db5e"
            :value="gDetails.autoInvestStatus*1 == 1 || gDetails.autoInvestStatus*1 == 2"
            :disabled="gDetails.autoInvestStatus*1 == 2"
            @change="autoChange($route.params.id, gDetails.autoInvestStatus*1)"
          />
        </div>
      </div>
      <div class="auto_text">
        <p v-html="gDetails.autoInvestDescribe"></p>
      </div>
    </div>
    <div class="footer_table border-one-half-top">
      <router-link :to="'/invest_tenindex/1/' + gDetails.planId">产品详情</router-link>
      <a @click="goProtocol()">协议</a>
      <a
        v-if="gDetails.webStatus*1 == 0 && gDetails.hasBorrow * 1 > 0"
        @click="goTransferBorrow()"
      >转让</a>
    </div>
  </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      isApp: true,
      statusDataTitle: "",
      statusDataText: "",
      gDetails: {},
      checked: true
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.postGDetails();
    this.appShowLoanProject();
  },
  mounted() {},
  methods: {
    goProtocol() {
      // location.href = this.gDetails.protocolLink;
      // this.hiddenRightApp();
      this.$router.push({ path: `/agreeList/${this.gDetails.id}` });
    },
    waitAlert() {
      mui.alert("利息部分，根据借款项目的待收利息统计", " ");
    },
    statusAlert(status) {
      if (status == "已回部分") {
        mui.alert("有部分借款项目还未回款或加息等奖励还未发放", " ");
      } else if (status == "已解冻") {
        mui.alert(
          "由于该部分本金一直未出借到借款项目，已处理解冻回到余额，并补偿站岗时间及相应年化的利息奖励",
          "解冻说明"
        );
      }
    },
    goTransferBorrow() {
      let _this = this;
      _this
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToAppTransferBorrow",
            transferData: {
              investId: _this.$route.params.id
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            this.$router.push({ path: "/appDownload" });
          }
        });
    },
    goLoanProject(id, date) {
      this.$router.push({
        path: "/assets_loanproject_list" + "/0/" + id + "/" + date
      });
    },
    autoChange(id, type) {
      let thatData = this;
      if (type == 0) {
        mui.confirm(
          "开启后，回款的本金将续投相同期限的G自动服务，出借的项目回款日前5天内不可关闭，是否开启？",
          "开启确认",
          ["再想想", "开启"],
          function(e) {
            if (e.index == 1) {
              thatData.postChange(id, 1).then(data => {
                if (data[0]) {
                  thatData.gDetails.autoInvestStatus = 1;
                } else {
                  mui.alert(data[1], " ");
                }
              });
            }
          }
        );
      } else if (type == 1) {
        mui.confirm(
          "关闭后，该笔G自动服务的本金回款不再自动续投，是否关闭？",
          "关闭确认",
          ["再想想", "关闭"],
          function(e) {
            if (e.index == 1) {
              thatData.postChange(id, 0).then(data => {
                if (data[0]) {
                  thatData.gDetails.autoInvestStatus = 0;
                } else {
                  mui.alert(data[1], " ");
                }
              });
            }
          }
        );
      }
    },
    appShowLoanProject() {
      let _this = this;
      _this
        .$withApp("takeAppTable", {
          status: 0,
          result: {
            transferName: "showBackBarButton",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
          } else {
          }
          return _this.$withApp("takeAppTable", {
            status: 0,
            result: {
              transferName: "showLoanProject",
              transferData: {
                investId: _this.$route.params.id
              }
            },
            msg: "success"
          });
        })
        .then(data => {
          if (data == "wap") {
            _this.isApp = false;
          }
        });
    },
    postChange(id, type) {
      let thatData = this;
      let data = {
        tdprId: id,
        type: type
      };
      return new Promise((resolve, reject) => {
        this.$http
          .post("/api/invest/changePlanStatus", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)

            let resData = response.data;
            if (resData.status == 0) {
              if (resData.result.status) {
                resolve([1, ""]);
              } else {
                resolve([0, resData.result.resultMsg]);
              }
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
      });
    },
    postPlanReinvest() {
      let thatData = this;

      let data = {
        investId: thatData.$route.params.id,
        type: ""
      };

      this.$http
        .post("/api/assets/myInvestDcbDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            thatData.gDetails = resData.result;
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
    },
    postGDetails() {
      let thatData = this;

      let data = {
        investId: thatData.$route.params.id
      };

      this.$http
        .post("/api/assets/myInvestDcbDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            thatData.gDetails = resData.result;
            if (resData.result.webStatus * 1 == 0) {
              thatData.statusDataTitle = "出借中";
            } else {
              thatData.statusDataTitle = "已结束";
            }
            if (
              resData.result.webStatus * 1 == 0 &&
              resData.result.hasBorrow * 1 == 0
            ) {
              thatData.statusDataText =
                "待出借" + resData.result.waitBorrow + "元";
            } else if (
              resData.result.webStatus * 1 == 0 &&
              resData.result.hasBorrow * 1 > 0
            ) {
              thatData.statusDataText =
                "已出借" +
                resData.result.hasBorrow +
                "元，待出借" +
                resData.result.waitBorrow +
                "元";
            } else {
              thatData.statusDataText = "借款项目全部已结清";
            }
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
.add_details {
  padding-bottom: 1.25rem;
  .header {
    .status_data {
      background: url(/static/img/wap_assets_add_details_g_01.png) no-repeat
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
    .loan_project {
      font-size: 0.3rem;
      line-height: 0.3rem;
      color: #fff;
      position: absolute;
      top: 0.35rem;
      right: 0.35rem;
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
              right: -1.28rem;
              top: -0.02rem;
            }
            img {
              width: 0.24rem;
              position: absolute;
              right: -1.64rem;
              top: 0.05rem;
            }
          }
          .money {
            float: right;
            font-size: 0.28rem;
            color: #666;
            img {
              width: 0.13rem;
              padding-left: 0.2rem;
              position: relative;
              top: 0.02rem;
            }
            span {
              display: inline-block;
              width: 0.33rem;
            }
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
  .auto_continue {
    padding: 0.21rem 0.3rem 0.37rem;
    margin-top: 0.14rem;
    background: #fff;
    .auto_title {
      padding-bottom: 0.17rem;
      span {
        display: inline-block;
        font-size: 0.3rem;
        line-height: 0.66rem;
        color: #162337;
        i {
          top: 0.14rem;
          left: 1.44rem;
          white-space: nowrap;
        }
      }
      .switch {
        float: right;
        height: 0.66rem;
        /deep/ .van-switch--disabled {
          width: 1.54rem;
          position: relative;
          .van-switch__node {
            -webkit-transform: translateX(0.94rem);
            transform: translateX(0.94rem);
          }
        }
        /deep/ .van-switch--disabled::before {
          content: "已停止";
          font-size: 0.24rem;
          line-height: 0.23rem;
          color: #000;
          position: absolute;
          left: 0.12rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .auto_text {
      p {
        font-size: 0.28rem;
        line-height: 0.38rem;
        color: #909197;
        span {
          color: #ff5637;
        }
      }
    }
  }
  .footer_table {
    width: 100%;
    box-sizing: border-box;
    padding: 0.24rem 0.3rem;
    background: #fff;
    text-align: right;
    position: fixed;
    z-index: 9;
    bottom: 0;
    left: 0;
    a {
      display: inline-block;
      width: 1.5rem;
      text-align: center;
      font-size: 0.24rem;
      color: #666;
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
    width: 1rem;
    position: absolute;
  }
  .border_tips.width {
    width: auto;
    padding: 0.08rem 0.12rem;
  }
  .border_tips.act {
    color: #ff5637;
    border: 1px solid #ff5637;
  }
}
</style>