<!--
  create : dxc 2018-08-08
  desc : 众邦存管
  update : 
  desc : 
-->
<template>
  <div class="unionpay">
    <div class="open_way">
      <h5 class="border-one-half-bottom">银联官网开通</h5>
      <p>通过银联在线支付开通页面操作开通，需在电脑浏览器打开</p>
      <p class="copy_link border-one-half-top" @click="copyPaste()">复制链接</p>
    </div>
    <div class="open_way">
      <h5 class="border-one-half-bottom">云闪付绑卡开通</h5>
      <p>通过银联旗下“云闪付”APP，绑卡成功即可开通银联在线支付</p>
    </div>
    <div class="open_way">
      <h5 class="border-one-half-bottom">网点柜台办理</h5>
      <p style="padding-bottom:.68rem;">在线下银行网点柜台办理开通银联在线支付</p>
    </div>
  </div>
</template>

<script>
import * as clipboard from "clipboard-polyfill";
export default {
  data() {
    return {};
  },
  components: {},
  created() {
    $("body").css({ background: "#f2f2f2" });
  },
  mounted() {},
  methods: {
    copyPaste() {
      clipboard.writeText(
        "https://www.95516.com/static/union/pages/card/openFirst.html?entry=openPay"
      );
      mui.toast("复制成功，快去浏览器粘贴吧", { duration: "long" });
    }
  }
};
</script>
<style lang='scss' scoped>
.unionpay {
  .open_way {
    margin-top: 0.16rem;
    background: #fff;
    h5 {
      font-size: 0.28rem;
      line-height: 0.88rem;
      color: #333;
      font-weight: normal;
      padding-left: 0.58rem;
      position: relative;
    }
    h5::before {
      content: "";
      width: 0.06rem;
      height: 0.26rem;
      background: linear-gradient(
        90deg,
        rgba(254, 129, 86, 1) 0%,
        rgba(255, 90, 60, 1) 100%
      );
      border-radius: 0.03rem;
      position: absolute;
      left: 0.4rem;
      top: 50%;
      transform: translateY(-50%);
    }
    p {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #666;
      padding: 0.28rem 0.4rem;
    }
    p.copy_link {
      text-align: center;
      padding: 0.24rem 0;
      color: #ff9c1c;
    }
  }
  .border-one-half-top,
  .border-one-half-bottom {
    position: relative;
    color: #ddd;
  }

  .border-one-half-top:after {
    content: "";
    top: 0;
    left: 0;
    position: absolute;
    width: 200%;
    height: 1px;
    border-bottom: 1px solid #ddd;
    transform-origin: 0 0;
    transform: scale(0.5, 0.5);
    box-sizing: border-box;
    color: #ddd;
  }

  .border-one-half-bottom:after {
    content: "";
    bottom: 0;
    left: 0;
    position: absolute;
    width: 200%;
    height: 1px;
    border-bottom: 1px solid #ddd;
    transform-origin: 0 0;
    transform: scale(0.5, 0.5);
    box-sizing: border-box;
  }
}
</style>