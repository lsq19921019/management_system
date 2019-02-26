<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="big-recharge">
      <div class="replace">
        <div class="tab-line inner-pandding border-one-half-bottom">
          <p>更换银行卡</p>
        </div>
        <div class="text-line inner-pandding border-one-half-bottom">
          <p>更换限额高的银行卡充值</p>
        </div>
        <div class="tab-line inner-pandding">
          <router-link to="/mine_bank_card">去换卡></router-link>
        </div>
      </div>
      <div class="online-bank">
        <div class="tab-line inner-pandding border-one-half-bottom">
          <p>使用网银充值</p>
        </div>
        <div class="text-line inner-pandding border-one-half-bottom">
          <img src="/static/img/wap_assets_big_recharge_01.png">
          <p class="step">用电脑进入小鸽理财官网：
            <br>www.xiaogelicai.com</p>
          <p class="step">进入“我的账户”页面</p>
          <p class="step">登录后，使用“网银充值”</p>
          <p class="tips">小贴士：
            <br>1、网银充值单笔最高1000万元
            <br>2、网银充值不限于本人银行卡
            <br>3、银行卡需开通网银支付</p>
        </div>
      </div>
      <div class="footer-servers">
        <p>如有疑问？请<a :href="'tel:'+userCenterData.hotline">联系客服</a></p>
      </div>
      <!-- <div class="img-line">
      </div>
      <div class="text-line">
        <p>用电脑进入小鸽理财官网：
          <br><span>www.xiaogelicai.com</span></p>
      </div>
      <div class="text-line">
        <p>登录您的小鸽理财账户</p>
      </div>
      <div class="text-line">
        <p>在【我的账户】页面，使用网银充值即可
          <br><span>网银支付最高无限额</span></p>
      </div> -->
    </div>
  </div>
</template>
<script>
import wapAlert from '../wap_alert.vue'
export default {
  data() {
    return {
      userCenterData: {},
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.postServers()
  },
  mounted() {},
  methods: {
    postServers: function() {
      var thatData = this

      var data = {}

      this.$http.post('/api/user/index', this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            thatData.userCenterData = resData.result
          } else {
            mui.toast(resData.msg, { duration: 1000, type: 'div' })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
}

</script>
<style scoped>
@import "../../../style/css/wap_assets_big_recharge.css";

</style>
