<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="realname">
      <div style="padding-bottom: 7px;"></div>
      <div class="tab-line">
        <div class="border-box border-one-half-bottom">
          <div class="clear">
            <div class="left">
              <span>姓名</span>
            </div>
            <div class="right">
              <span>{{userInfoData.realName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-line">
        <div class="border-box">
          <div class="clear">
            <div class="left">
              <span>身份证号</span>
            </div>
            <div class="right">
              <span>{{userInfoData.idNo}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from '../wap_alert.vue'
export default {
  data() {
    return {
      userInfoData: {}
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.getLocalData()
  },
  mounted() {},
  methods: {
    getLocalData: function() {
      let thatData = this
      thatData.userInfoData = JSON.parse(localStorage.getItem("userInfoData"))
    },
  },
}

</script>
<style scoped>
@import "../../../style/css/wap_mine_info_realname.css";

</style>
