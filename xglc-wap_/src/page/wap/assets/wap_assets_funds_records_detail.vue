<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="founds-records-detail">
      <div class="data-content">
        <div class="data-line in-padding">
          <p><span>时间</span>{{foundsDetail.recordTime}}</p>
        </div>
        <div class="data-line in-padding">
          <p><span>类型</span>{{foundsDetail.fundMode}}</p>
        </div>
        <div class="data-line in-padding">
          <p><span v-if="foundsDetail.flag == 0">支出</span><span v-else-if="foundsDetail.flag == 1">收入</span>{{foundsDetail.handleSum}}</p>
        </div>
        <div class="data-line in-padding">
          <p><span>流水号</span>{{foundsDetail.serNo}}</p>
        </div>
        <div class="data-line in-padding">
          <p><span>备注</span><span class="right">{{foundsDetail.remarks}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      foundsDetail: {},
      id: ""
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.getUrlData();
    this.postData();
  },
  mounted() {},
  methods: {
    getUrlData: function() {
      let thatData = this;
      thatData.id = thatData.$route.params.id;
    },
    postData: function() {
      let thatData = this;

      let data = {
        id: thatData.id
      };

      this.$http
        .post("/api/assets/transactionDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            thatData.foundsDetail = resData.result;
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
@import "../../../style/css/wap_assets_funds_records.css";
</style>
