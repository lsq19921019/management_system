<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="new-pri">
      <div class="top-img">
        <img src="/static/img/mobile_novice_privilege_01.jpg">
      </div>
      <div class="pri-text in-padding">
        <h4 class="title">特权说明</h4>
        <div class="pri-1">
          <p>特权一</p>
          <p>{{vipData.powerLabels[0]}}</p>
        </div>
        <div class="pri-2">
          <p>特权二</p>
          <p>{{vipData.powerLabels[1]}}</p>
        </div>
      </div>
      <div class="in-padding">
        <button
          @click="toOpen"
          class="btn"
          :class="{'locked': vipData.buttonStatus * 1 == 1}"
          :disabled="vipData.buttonStatus * 1 == 1"
        >{{vipData.buttonTips}}</button>
      </div>
      <div class="in-padding surplus" v-if="vipData.buttonStatus * 1 == 1">
        <p>
          剩余可投额度：
          <span>&yen;{{vipData.canIvstMoney}}</span>
        </p>
      </div>
      <div class="in-padding footer">
        <p>最终解释权归小鸽理财所有</p>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      cgtStatus: 0,
      vipData: {
        powerLabels: []
      },
      alert: {
        title: "支付10元购买新手标特权",
        msg:
          "<p style='text-align: left'>特权说明：<br>1、开通日起一年内均可投资新手标，不限次数；<br>2、新手标待收本金上限额度1万元，回款后可继续投资。</p>",
        btn: ["取消", "确定购买"]
      }
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.getAppToken();
  },
  methods: {
    toOpen: function() {
      let that = this;
      if (that.vipData.buttonStatus * 1 != 1) {
        if (that.cgtStatus * 1 == 1) {
          that
            .$withApp("takeAppOpen", {
              status: 0,
              result: {
                transferName: "goToAppAcOpen",
                transferData: {
                  type: "1" //1=开户 2=激活
                }
              },
              msg: "success"
            })
            .then(data => {
              if (data == "wap") {
                localStorage.setItem("from", location.href);
                that.$router.push({ path: "/mine_open_account" });
              } else {
                localStorage.setItem("from", location.href);
              }
            });
        } else if (that.cgtStatus * 1 == 2) {
          that
            .$withApp("takeAppOpen", {
              status: 0,
              result: {
                transferName: "goToAppAcOpen",
                transferData: {
                  type: "2" //1=开户 2=激活
                }
              },
              msg: "success"
            })
            .then(data => {
              if (data == "wap") {
                localStorage.setItem("from", location.href);
                that.$router.push({ path: "/mine_open_account" });
              } else {
                localStorage.setItem("from", location.href);
              }
            });
        } else {
          if (that.vipData.usablesum * 1 < 10) {
            mui.confirm(
              "余额不足，是否去充值",
              "提示",
              ["取消", "充值"],
              function(e) {
                if (e.index == 1) {
                  that
                    .$withApp("takeAppOpen", {
                      status: 0,
                      result: {
                        transferName: "goToAppRecharge",
                        transferData: {
                          amount: "0"
                        }
                      },
                      msg: "success"
                    })
                    .then(data => {
                      if (data == "wap") {
                        localStorage.setItem("from", location.href);
                        that.$router.push({
                          path: "/assets_recharge"
                        });
                      } else {
                        localStorage.setItem("from", location.href);
                      }
                    });
                }
              }
            );
          } else {
            //开通权益标特权
            mui.confirm("确认开通权益标特权？", " ", ["取消", "确认"], function(
              e
            ) {
              if (e.index == 1) {
                let data = {};
                that.$http
                  .post("/api/cgt/newUserVip", that.$qs.stringify(data), {
                    headers: base.ajaxHeadersWithToken(data)
                  })
                  .then(function(response) {
                    let resData = response.data;
                    if (resData.status == 0) {
                      localStorage.setItem("from", location.href);
                      that.$router.push({
                        path: "/re_suc/verfy"
                      });
                    } else {
                      mui.toast(resData.msg, { duration: 1000, type: "div" });
                      setTimeout(function() {
                        that.$router.go(-1);
                      }, 800);
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }
            });
          }
        }
      }
    },
    getAppToken: function() {
      let thatData = this;
      thatData
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
            thatData.postData();
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            base.data.token = dataRes.transferData.token;
            localStorage.setItem("token", dataRes.transferData.token);
            thatData.postData();
            return thatData.$withApp("showBackBarButton", {
              status: 0,
              result: {
                transferName: "showBackBarButton", //调用app方法名
                transferData: {}
              },
              msg: "success"
            });
          }
        });
    },
    postData: function() {
      let that = this;
      var data = {};

      this.$http
        .post("/api/user/vipInfo", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken()
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            that.vipData = resData.result;
            that.cgtStatus = resData.cgtStatus;
          } else {
            mui.alert(response.data.msg);
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
@import "../../../style/css/mobile_novice_privilege.css";
</style>
