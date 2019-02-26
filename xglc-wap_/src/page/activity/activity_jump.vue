<!--
  create : dxc 2018-11-16
  desc : 活动-活动微信分享跳转页
  update : 
  desc : 
-->
<template>
  <div style="background:#fff;" :style="'min-height:' + height + 'px'">
    <!-- <div class="wechat-login">
      <div class="gif">
        <img src="/static/img/wechat_login.gif">
      </div>
      <p>tip：加载中...</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {
    this.autoHeight();
    this.getUrl();
  },
  mounted() {},
  methods: {
    autoHeight() {
      this.height = document.documentElement.clientHeight;
    },
    getUrl() {
      let url = location.href;
      location.href = decodeURIComponent(url.split("wxurl=")[1]);
    }
  }
};
</script>
<style scoped>
.wechat-login {
  width: 75%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}

.wechat-login .gif {
  height: 146px;
  text-align: center;
}

.wechat-login img {
  height: 100%;
}

.wechat-login p {
  padding-top: 16px;
  font-size: 12px;
  text-align: center;
  color: #666;
}
</style>