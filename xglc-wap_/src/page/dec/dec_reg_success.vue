<template>
  <div id="reg-suc">
    <div class="top">
      <img src="/static/img/reg_success.jpg" @click.prevent>
      <div class="center">
        <p>现在下载App使用红包，即可提现</p>
        <div class="btn-img" @click="judgment()"></div>
      </div>
    </div>
    <div class="bottom">
      <img src="/static/img/s_dec_footlogo.0.1.png" @click.prevent>
    </div>
    <div class="wx_mask" v-show="wxMask">
      <img src="/static/img/wap_invest_download.png" @click.prevent>
      <div class="iknow mui-btn" @click="wxMask = !wxMask">我知道啦</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'reg_success',
  data() {
    return {
      u: '',
      isAndroid: '',
      isiOS: '',
      wxMask: false,
    }
  },
  created() {

  },
  mounted() {
    let thatData = this
    thatData.chBg("#dc3a24")
    thatData.u = navigator.userAgent;
    thatData.isAndroid = thatData.u.indexOf('Android') > -1 || thatData.u.indexOf('Adr') > -1; //android终端
    thatData.isiOS = !!thatData.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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
    chBg: function(bg) {
      document.body.style.backgroundColor = bg
    },
  },
}

</script>
<style lang="css" scoped>
#reg-suc .top {
  position: relative;
}

#reg-suc .top img {
  display: block;
  width: 100%;
}

#reg-suc .top .center {
  position: absolute;
  width: 100%;
  bottom: 70px;
}

#reg-suc .top .center p {
  font-size: 14px;
  color: #fff100;
  text-align: center;
}

#reg-suc .top .center .btn-img {
  width: 80%;
  height: 50px;
  margin: 0 auto;
  margin-top: 17px;
  background: url(/static/img/reg_succ_down.png) no-repeat center;
  background-size: contain;
}

#reg-suc .bottom {
  height: 112px;
  background: #c6301b;
}

#reg-suc .bottom img {
  width: 51%;
  display: block;
  margin: 0 auto;
  padding-top: 18px;
}

#reg-suc .wx_mask {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

#reg-suc .wx_mask img {
  display: block;
  width: 100%;
}

#reg-suc .iknow {
  position: relative;
  right: -41.5%;
  background: #eb6244;
  border: none;
  width: 90px;
  height: 20px;
  line-height: 20px;
  color: #fff;
  border-radius: 45px;
}

</style>
