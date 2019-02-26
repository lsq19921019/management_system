<template>
  <div>
    <div class="download auto-download" :style="{height:height + 'px'}">
      <!-- <a id="andApp" href="xglc://open.app" style="opacity: 0;"></a>
      <a id="iosApp" href="com.anjbo.finance://com.anjbo.finance" style="opacity: 0;"></a> -->
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
      wxMask: false,
      height: "",
    }
  },
  mounted() {
    let thatData = this
    thatData.autoBg()
    thatData.u = navigator.userAgent;
    thatData.isAndroid = thatData.u.indexOf('Android') > -1 || thatData.u.indexOf('Adr') > -1; //android终端
    thatData.isiOS = !!thatData.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    thatData.judgment()
  },
  methods: {
    autoBg: function() {
      this.height = document.documentElement.clientHeight
    },
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
          thatData.wxMask = true
        } else {
          window.location = "xglc://open.app"
          //$("#andApp").trigger("click")
          /*let ifr = document.createElement('iframe')
          ifr.src = "xglc://open.app"
          ifr.style.display = 'none'
          document.body.appendChild(ifr)*/
          setTimeout(function() {
            location.href = "https://www.xiaogelicai.com/xglc.apk"
          }, 2000);
        }
      } else if (thatData.isiOS) {
        if (thatData.isWeiXin()) {
          thatData.wxMask = true
        } else {
          window.location = "com.anjbo.finance://com.anjbo.finance"
          //$("#iosApp").trigger("click")
          /*let ifr = document.createElement('iframe')
          ifr.src = "com.anjbo.finance://com.anjbo.finance"
          ifr.style.display = 'none'
          document.body.appendChild(ifr)*/
          setTimeout(function() {
            location.href = "https://itunes.apple.com/cn/app/%E5%B0%8F%E9%B8%BD%E7%90%86%E8%B4%A2/id1255464866?mt=8"
          }, 2000);
        }
      }
    },
  },
}

</script>
<style scoped>
@import "../../style/css/wap_download.css"

</style>
