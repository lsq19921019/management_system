<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="bind-card">
      <p class="cardholder">持卡人：{{realName}}</p>
      <div class="input-line in-padding input-bg">
        <div class="border-one-half-bottom">
          <div class="in-border">
            <span>银行卡号</span>
            <input v-model="bindData.cardNo" type="tel" placeholder="请输入您的银行卡号">
          </div>
        </div>
      </div>
      <div class="input-line in-padding input-bg">
        <div class="in-border">
          <span>预留手机号</span>
          <input v-model="bindData.cellphone" type="tel" placeholder="请输入银行预留手机号">
        </div>
      </div>
      <div class="bank-list p-r">
        <router-link to="/bank_limit">支持银行></router-link>
      </div>
      <div class="in-padding p-r">
        <button class="btn" @click="checkFunction()">下一步</button>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from '../wap_alert.vue'
export default {
  data() {
    return {
      realName: "",
      bindData: {
        cardNo: "",
        cellphone: "",
      }
    }
  },
  watch: {
    "bindData.cardNo": function(val) {
      if (this.bindData.cardNo.length > 19) {
        this.bindData.cardNo = val.slice(0, 19)
      }
    },
    "bindData.cellphone": function(val) {
      if (this.bindData.cellphone.length > 11) {
        this.bindData.cellphone = val.slice(0, 11)
      }
    },
  },
  components: {
    wapAlert
  },
  created() {
    this.postRealName()
    this.getBindData()
  },
  mounted() {},
  methods: {
    postRealName: function() {
      let thatData = this

      let data = {}

      this.$http.post('/api/user/index', this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            thatData.realName = resData.result.realName
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
    getBindData: function() {
      let thatData = this
      if (localStorage.getItem("userBindData")) {
        thatData.bindData = JSON.parse(localStorage.getItem("userBindData"))
      }
    },
    checkFunction: function() {
      let thatData = this
      if (base.checkicNo(thatData.bindData.cardNo) && base.checkPhone(thatData.bindData.cellphone)) {
        thatData.postData()
      }
    },
    postData: function() {
      let thatData = this
      localStorage.setItem("userBindData", JSON.stringify(thatData.bindData))
      location.href = "/mine_open_jump/bind"
      //thatData.$router.push({ path: "/mine_open_jump/bind" })
    },
  },
}

</script>
<style scoped>
@import "../../../style/css/wap_mine_bind_bankcard.css";

</style>
