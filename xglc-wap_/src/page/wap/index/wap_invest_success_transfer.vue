<!-- 投资-投资成功 -->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="suc-tran">
      <div class="top-schedule">
        <img src="/static/img/wap_invest_success_transfer.png">
        <p style="padding-bottom: 12px;">加入成功，正在出借项目
          <br>
          <span>{{expData.joinAmount}}元</span>
        </p>
        <p style="padding-bottom: 20px;">出借成功，开始计息</p>
        <p>项目到期还款</p>
      </div>
      <!-- <div class="ref-inco">
        <p>参考收益：<span>{{expData.exInterest}}元</span></p>
      </div>-->
      <div class="btn-line">
        <a @click="addDetails()">加入详情</a>
        <span @click="complete()">完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      expData: {}
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.getExp();
  },
  mounted() {},
  methods: {
    addDetails() {
      //去投资详情
      let thatData = this;
      thatData.$router.push({
        path: "/assets_adddetails_g/" + thatData.expData.investId
      });
      /* thatData
        .$withApp("goToAppXInvestDetail", {
          status: 0,
          result: {
            investId: thatData.expData.investId //查定存宝投资详情
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            thatData.$router.push({
              path: "/assets_adddetails_g/" + thatData.expData.investId
            });
          }
        }); */
    },
    complete() {
      //完成 wap回首页 app回G自动服务列表
      let thatData = this;
      thatData
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToBorrowList",
            transferData: {
              productTypeIndex: "1"
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            location.href = "/";
          }
        });
      localStorage.removeItem("expectedData");
    },
    getExp: function() {
      let thatData = this;
      thatData.expData = JSON.parse(localStorage.getItem("expectedData"));
      thatData
        .$withApp("takeAppTable", {
          status: 0,
          result: {
            transferName: "hiddenRightBarButton",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
          } else {
            return thatData.$withApp("takeAppTable", {
              status: 0,
              result: {
                transferName: "hiddenBackBarButton",
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
<style scoped>
@import "../../../style/css/wap_invest_success_transfer.css";
</style>
