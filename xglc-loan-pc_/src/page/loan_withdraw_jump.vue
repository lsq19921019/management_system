<!--
  create : dxc 2018-12-19
  desc : 众邦存管
  update : 
  desc : 
-->
<template>
  <div>
    <div v-wechat-title="$route.meta.title = titleTip"></div>
    <loan-header ref="header"></loan-header>
    <div class="rechargejump">
      <div class="icon">
        <img v-if="serviceFlag === 'true'" src="/static/img/icon_succeed.png">
        <img v-else src="/static/img/icon_failure.png">
      </div>
      <div class="text">
        <p v-if="serviceFlag === 'true'">提现申请成功</p>
        <p v-else>提现申请失败</p>
        <p v-if="serviceFlag === 'true'">请关闭后在原页面刷新</p>
        <p v-else>{{respMsg}}</p>
      </div>
      <div class="close_btn">
        <button class="close" @click="close">关闭</button>
      </div>
    </div>
    <loan-footer></loan-footer>
  </div>
</template>

<script>
import loanHeader from "./loan_header.vue";
import loanFooter from "./loan_footer.vue";
export default {
  data() {
    return {
      serviceFlag: "",
      respMsg: "",
      titleTip: ""
    };
  },
  components: {
    loanHeader,
    loanFooter
  },
  created() {
    this.switch();
  },
  mounted() {},
  methods: {
    switch() {
      this.serviceFlag = this.$route.query.serviceFlag;
      this.$route.query.respMsg
        ? (this.respMsg = decodeURIComponent(this.$route.query.respMsg))
        : (this.respMsg = "");
      if (this.serviceFlag === "true") {
        this.titleTip = "提现申请成功";
      } else {
        this.titleTip = "提现申请失败";
      }
    },
    close() {
      window.opener = null;
      window.open("", "_self");
      window.close();
    }
  }
};
</script>
<style lang='scss' scoped>
.rechargejump {
  background: #f2f2f2;
  height: 783px;
  text-align: center;
  #success {
    display: none;
  }
  .icon {
    padding-top: 160px;
    img {
      width: 120px;
    }
  }
  .text {
    p:nth-child(1) {
      font-size: 20px;
      line-height: 22px;
      color: #333;
      padding-top: 40px;
    }
    p:nth-child(2) {
      font-size: 20px;
      line-height: 22px;
      color: #666;
      padding-top: 20px;
    }
  }
  .close_btn {
    padding-top: 60px;
    button {
      font-size: 16px;
      width: 160px;
      height: 40px;
      color: #fff;
      background: #ec7935;
      border: none;
    }
  }
}
</style>