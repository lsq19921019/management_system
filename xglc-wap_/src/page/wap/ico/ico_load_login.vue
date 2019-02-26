<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="login in-padding">
      <div class="top">
        <router-link class="active" to="">登录</router-link>
        <!-- <router-link to="/start_reg">注册</router-link> -->
      </div>
      <div class="content">
        <div class="input-line">
          <img class="icon" src="/static/img/wap_start_01.png">
          <div class="input border-one-half-bottom">
            <input class="phoneid" v-model="id" type="number" placeholder="请输入手机号码">
          </div>
          <img @click="clear()" class="clos" src="/static/img/wap_start_02.png">
        </div>
        <div class="input-line">
          <img class="icon" src="/static/img/wap_start_04.png">
          <div class="input border-one-half-bottom">
            <input :type="show ? 'text' : 'password'" v-model="pw" style="padding-right: 11.1%;" placeholder="登录密码">
          </div>
          <img @click="show = !show" v-show="show" class="show" src="/static/img/wap_start_05.png">
          <img @click="show = !show" v-show="!show" class="show" src="/static/img/wap_start_06.png">
        </div>
        <div class="forget-line clear">
          <!-- <router-link to="/start_forget">忘记密码</router-link> -->
        </div>
        <div class="btn-line">
          <button @click="checkFunc()">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from '../wap_alert.vue';
export default {
  data() {
    return {
      id: '',
      pw: '',
      platId: "",
      fromPage: "",
      show: false,
    }
  },
  watch: {
    'id': function(val) { //限制输入
      if (this.id.length > 11) {
        this.id = val.slice(0, 11)
      }
    },
    'pw': function(val) {
      if (this.pw.length > 20) {
        this.pw = val.slice(0, 20)
      }
    },
  },
  components: {
    wapAlert,
  },
  created() {
    this.getPlatId()
  },
  mounted() {

  },
  methods: {
    getPlatId: function() {
      let thatData = this
      thatData.saveFrom()
      thatData.id = thatData.$route.query.mobile
      thatData.platId = thatData.$route.query.platId
    },
    clear: function() {
      let thatData = this
      thatData.id = ''
      document.querySelector(".phoneid").focus()
    },
    checkFunc: function() {
      let thatData = this
      if (base.checkPhone(thatData.id) && base.checkPword(thatData.pw)) {
        thatData.postLogin()
      } else {}
    },
    saveFrom: function() {
      let thatData = this
      let strin = ""
      for (let prop in thatData.$route.params) {
        strin = strin + "/" + thatData.$route.params[prop]
      }
      thatData.fromPage = strin
    },
    postLogin: function() {
      let thatData = this

      let data = {
        loginName: thatData.id,
        password: base.DES3.encrypt(base.desKey, thatData.pw),
        platformId: thatData.platId
      }

      this.$http.post('/api/open/platformUserBind', this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            let token = resData.result.token
            localStorage.setItem("token", token)
            localStorage.setItem("userLoginData", JSON.stringify(resData.result))
            base.data.token = token
            if (thatData.fromPage != "") {
              mui.toast("登录成功", { duration: 1000, type: 'div' })
              thatData.$router.replace({ path: thatData.fromPage })
            } else {
              mui.toast("登录成功", { duration: 1000, type: 'div' })
              thatData.$router.replace({ path: "/invest_index" })
            }
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
@import "../../../style/css/wap_start_login.css"

</style>
