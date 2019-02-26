<!--
  create : dxc 2018-08-08
  desc : 众邦存管
  update : 
  desc : 
-->
<template>
  <div class="user-info">
    <wap-alert ref="alert"></wap-alert>
    <div style="padding-bottom: 7px"></div>
    <div class="tab-line" @click="switchAuthorize()">
      <div class="border-box border-one-half-bottom">
        <div class="clear">
          <div class="left">
            <span>自动投标</span>
          </div>
          <div class="right">
            <span>{{text}}</span>
            <img src="/static/img/wap_assets_center_05.png">
          </div>
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
      text: "未开启",
      userInfoData: {}
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.chBg("#f2f2f2");
    this.checkAuth();
  },
  mounted() {},
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    checkAuth() {
      let thatData = this;
      thatData.userInfoData = JSON.parse(localStorage.getItem("userInfoData"));
      if (thatData.userInfoData.isholdTenderAuth == 1) {
        thatData.text = "已开启";
      } else {
        thatData.text = "未开启";
      }
    },
    switchAuthorize() {
      let thatData = this;
      localStorage.setItem("from", location.href);
      if (thatData.userInfoData.isholdTenderAuth == 0) {
        location.href = "/mine_open_jump/openAuth";
      } else if (thatData.userInfoData.isholdTenderAuth == 1) {
        location.href = "/mine_open_jump/closeAuth";
      }
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_mine_user_info.css";
</style>