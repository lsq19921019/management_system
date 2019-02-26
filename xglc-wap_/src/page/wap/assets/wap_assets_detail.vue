<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="detail">
      <div class="chart">
        <div id="myChart" class="echarts-box" :style="width"></div>
        <div class="total">
          <p>
            总资产：
            <span>{{totalNum}}</span>
          </p>
        </div>
      </div>
      <div class="line-data">
        <div class="data-type">
          <p>
            G自动服务
            <span>{{planX}}</span>
          </p>
        </div>
        <div class="data-type">
          <p>
            散标&债权
            <span>{{outNdebt}}</span>
          </p>
        </div>
        <div class="data-type">
          <p>
            可用余额
            <span>{{available}}</span>
          </p>
        </div>
        <div class="data-type">
          <p>
            续投冻结
            <span>{{cont}}</span>
          </p>
        </div>
      </div>
      <div class="account_info" style="display:none;">
        <span @click="postAccountInfo">查询存管账户信息></span>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  data() {
    return {
      width: "",
      option: {
        series: [
          {
            type: "pie",
            radius: ["50%", "100%"],
            legendHoverLink: false,
            hoverAnimation: false,
            silent: true,
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: "G自动服务", itemStyle: { color: "#fe908d" } },
              { value: 0, name: "散标&债权", itemStyle: { color: "#fcd07e" } },
              { value: 0, name: "可用余额", itemStyle: { color: "#a9dafc" } },
              { value: 0, name: "续投冻结", itemStyle: { color: "#d9cbf3" } }
            ]
          }
        ]
      },
      totalNum: "",
      planX: "",
      outNdebt: "",
      available: "",
      cont: ""
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.autoWidth();
    this.getAppToken();
  },
  mounted() {},
  methods: {
    postAccountInfo: function() {
      let thatData = this;
      thatData.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "hiddenRightBarButton",
          transferData: {}
        },
        msg: "success"
      });
      location.href = "/mine_open_jump/bankaccount_info";
      //thatData.$router.push({ path: "/mine_open_jump/open" })
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
            return thatData.$withApp("takeAppTable", {
              status: 0,
              result: {
                transferName: "showTransitionRecords",
                transferData: {}
              },
              msg: "success"
            });
          }
        });
    },
    autoWidth: function() {
      let thatData = this;
      thatData.width = document.documentElement.clientWidth;
    },
    chart: function() {
      var myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption(this.option);
    },
    postData: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/assets/detailPic", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.totalNum = resData.result.assetsDetailList[0].value;
            thatData.option.series[0].data[0].value =
              parseFloat(resData.result.assetsDetailList[1].value) + "";
            thatData.planX = resData.result.assetsDetailList[1].value;
            thatData.option.series[0].data[1].value =
              parseFloat(resData.result.assetsDetailList[2].value) + "";
            thatData.outNdebt = resData.result.assetsDetailList[2].value;
            thatData.option.series[0].data[2].value =
              parseFloat(resData.result.assetsDetailList[3].value) + "";
            thatData.available = resData.result.assetsDetailList[3].value;
            thatData.option.series[0].data[3].value =
              parseFloat(resData.result.assetsDetailList[4].value) + "";
            thatData.cont = resData.result.assetsDetailList[4].value;

            if (parseFloat(resData.result.assetsDetailList[0].value) == 0) {
              thatData.option.series[0].data.length = 0;
              thatData.option.series[0].data[0] = {
                value: 0,
                name: "总资产",
                itemStyle: { color: "#dedbdb" }
              };
            }

            thatData.chart();
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
<style scoped>
@import "../../../style/css/wap_assets_detail.css";
</style>
