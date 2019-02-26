<template>
  <div>
    <div class="update">
      <div class="top-img">
        <img src="/static/img/mobile_update_android.png">
      </div>
      <div class="up-title">
        <h2>新版APP上线啦</h2>
        <h5>了解1.4.0新功能</h5>
      </div>
      <div class="up-text">
        <div class="list-line">
          <p class="ma">1、产品详情页全新设计，产品描述更清晰</p>
        </div>
        <div class="list-line">
          <p class="ma">2、优化投资流程，提升投资体验</p>
        </div>
        <div class="list-line">
          <p class="ma">3、投资记录全新改版，回款进度更清晰</p>
        </div>
        <div class="list-line">
          <p class="ma">4、新增累计收益页面</p>
        </div>
      </div>
      <div class="btn-line">
        <button @click="qrcode=!qrcode">下载新版APP</button>
      </div>
      <div class="footer-line">
        <p>关注微信公众号【小鸽服务平台】，了解更多理财咨询</p>
      </div>
      <transition name="qrcode">
        <div id="qrcode" v-show="qrcode">
          <div class="block"></div>
          <div class="window">
            <div class="way-1">
              <h3>方法一:扫描以下二维码下载</h3>
              <img src="/static/img/mobile_update_android_qrcode.png">
              <p>您可以将以上二维码页面截图保存，然后通过微信发给朋友们，再在微信中长按截图识别打开二维码</p>
            </div>
            <div class="way-2">
              <h3>方法二：复制链接下载</h3>
              <p>1.复制下载链接
                <br><span>https://www.pgyer.com/SjOP</span><span class="copy-btn" @click="copyPaste()">复制</span></p>
              <p style="padding-top: 23px;">2.在手机浏览器中打开，直接下载</p>
            </div>
            <div id="qrcode-clos">
              <img src="/static/img/f2f_clos.png" @click="qrcode=!qrcode">
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import * as clipboard from "clipboard-polyfill";
export default {
  data() {
    return {
      qrcode: false,
    }
  },
  methods: {
    copyPaste: function() {
      clipboard.writeText("https://www.pgyer.com/SjOP");
      mui.toast("复制成功，快去浏览器粘贴吧", { duration: "long" });
    }
  }
}

</script>
<style scoped>
@import '../../../style/css/mobile_update_android.css'

</style>
