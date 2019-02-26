<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="setting">
      <div style="padding-bottom: 7px;"></div>
      <div class="tab-line" @click="$router.push({ path: '/mine_change_pass' })">
        <div class="border-box border-one-half-bottom">
          <div class="clear">
            <div class="left">
              <span>修改登录密码</span>
            </div>
            <div class="right">
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div class="tab-line" @click="checkAccount()">
        <div class="border-box">
          <div class="clear">
            <div class="left">
              <span>修改交易密码</span>
            </div>
            <div class="right">
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-line">
        <button @click="logOut()">退出登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {};
  },
  components: {
    wapAlert
  },
  created() {},
  mounted() {},
  methods: {
    logOut: function() {
      let thatData = this;
      mui.confirm("确定退出当前帐号吗？", " ", function(e) {
        if (e.index == 1) {
          thatData.$refs.alert.deleteLocalStorage();
          mui.toast("已退出当前账号", { duration: 1000, type: "div" });
          thatData.$router.replace({ path: "/invest_index" });
        } else {
        }
      });
    },
    checkAccount: function() {
      let thatData = this;
      let userCenterData = JSON.parse(localStorage.getItem("userCenterData"));

      if (userCenterData.cgtStatus == 1) {
        thatData.$refs.alert.goToAppAcOpen(1);
      } else if (userCenterData.cgtStatus == 2) {
        thatData.$refs.alert.goToAppAcOpen(2);
      } else {
        location.href = "/mine_open_jump/transaction_password";
      }
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_mine_setting.css";
</style>
