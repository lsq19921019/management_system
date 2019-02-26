<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="back-card" :style="{height:height + 'px'}">
      <div class="center-card">
        <div class="card-bg clear">
          <p class="bank-logo-name">
            <img :src="bankLogo">{{bankName}}<span><span class="card-mosaic">****</span><span class="card-mosaic">****</span><span class="card-mosaic">****</span>{{cardNo.slice(-4)}}</span>
          </p>
          <p class="limit" v-if="bankCardIsable == 1">单笔{{limitOne}}，单日{{limitDay}}</p>
          <p class="limit" v-else>暂不支持该银行卡充值</p>
        </div>
      </div>
      <div class="tab-line">
        <div class="border-box border-one-half-bottom">
          <div class="clear">
            <div class="left">
              <span>银行预留手机号</span>
            </div>
            <div class="right">
              <span>{{mobile.substr(0,3) + "****" + mobile.substr(7)}}</span>
              <router-link to="/appDownload">&nbsp;&nbsp;修改</router-link>
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div class="bank-list">
        <router-link to='/bank_limit'>支持银行及限额></router-link>
      </div>
      <div class="btn-line">
        <button @click="$router.push('/appDownload')">{{buttonDesc}}</button>
      </div>
      <div class="hint">
        <p>小贴士：
          <br>1、为保障您的资金安全，存管要求只能绑定一张银行卡
          <br>2、如有疑问，请<a :href="'tel:'+userCenterData.hotline">联系客服</a></p>
      </div>
      <div class="bg"></div>
    </div>
  </div>
</template>
<script>
import wapAlert from '../wap_alert.vue'
export default {
  data() {
    return {
      bankLogo: "",
      bankName: "",
      cardNo: "",
      bankCardIsable: "",
      limitOne: "",
      limitDay: "",
      mobile: "",
      height: "",
      buttonDesc: "",
      userCenterData: {},
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.postData()
    this.postServers()
  },
  mounted() {
    this.autoBg()
  },
  methods: {
    autoBg: function() {
      this.height = document.documentElement.clientHeight - 53
    },
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
    postData: function() {
      var thatData = this

      var data = {}

      this.$http.post('/api/user/bankcard', this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            thatData.bankLogo = resData.result.bankLogo
            thatData.bankName = resData.result.bankName
            thatData.cardNo = resData.result.cardNo
            thatData.bankCardIsable = resData.result.bankCardIsable
            thatData.limitOne = resData.result.limitOne
            thatData.limitDay = resData.result.limitDay
            thatData.mobile = resData.result.mobile
            thatData.buttonDesc = resData.result.buttonDesc
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
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
@import "../../../style/css/wap_mine_bankcard.css"

</style>
