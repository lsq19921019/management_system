<template>
  <div>
    <div class="download" :style="{height:height + 'px'}">
      <div class="img">
        <img src="/static/img/wap_download.png?v=1" @click.prevent>
      </div>
      <div class="btn-line">
        <div class="btn-img" @click="judgment()"></div>
      </div>
      <div class="bg"></div>
      <div class="wx_mask" v-show="wxMask">
        <img src="/static/img/wap_invest_download.png" @click.prevent>
        <div class="iknow mui-btn" @click="wxMask = !wxMask">我知道啦</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      u: '',
      isAndroid: '',
      isiOS: '',
      height: "",
      wxMask: false,
    }
  },
  methods: {
    isWeiXin: function() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    judgment: function() {
      let thatData = this
      if (thatData.isAndroid) {
        if (thatData.isWeiXin()) {
          //window.location.href = "http://appurl.me/16748143";
          thatData.wxMask = true
        } else {
          window.location.href = "https://www.xiaogelicai.com/xglc.apk";
        }
      } else if (thatData.isiOS) {
        window.location.href = "https://itunes.apple.com/cn/app/%E5%B0%8F%E9%B8%BD%E7%90%86%E8%B4%A2/id1255464866?mt=8";
      }
    },
    autoBg: function() {
      this.height = document.documentElement.clientHeight - 53
    },
  },
  mounted() {
    let thatData = this
    thatData.autoBg()
    thatData.u = navigator.userAgent;
    thatData.isAndroid = thatData.u.indexOf('Android') > -1 || thatData.u.indexOf('Adr') > -1; //android终端
    thatData.isiOS = !!thatData.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  }
}

</script>
<style scoped>
@import "../../style/css/wap_download.css"

</style>
