<template>
  <div>
    <div id="header">
      <div class="inner clear">
        <div class="left clear">
          <div class="logo"></div>
          <div class="title">
            <p>{{headerTitle}}</p>
          </div>
        </div>
        <div class="right" v-if="!loginHead">
          <div class="icon"></div>
          <div class="tel-number">
            <p>客服热线：400-700-4007（服务时间：周一 ~ 周五09:00-18:30）</p>
          </div>
        </div>
        <div class="right-login" v-else>
          <div class="up-tel">
            <div class="icon"></div>
            <div class="tel-number">
              <p>客服热线：400-700-4007（服务时间：周一 ~ 周五09:00-18:30）</p>
            </div>
          </div>
          <div class="user-info">
            <span class="user" @click="goAccount()">用户{{id}}</span><span class="exit" @click="logOut()">退出</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headerTitle: "",
      loginHead: false,
      id: "",
    }
  },
  mounted() {
    this.userHeadInfo()
  },
  methods: {
    setHeaderTitle: function(v) {
      this.headerTitle = v
    },
    goAccount: function() {
      this.$router.push({ path: "/account" })
    },
    userHeadInfo: function() {
      let thatData = this
      if (this.$route.meta.needLogin) {
        thatData.loginHead = true
        let loginData = JSON.parse(localStorage.getItem("loanLoginData"))
        thatData.id = loginData.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
    },
    logOut: function() {
      let thatData = this
      thatData.$confirm('确定退出当前帐号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        thatData.$message({
          type: 'success',
          message: '已退出当前账号'
        });
        localStorage.removeItem("loanLoginData")
        localStorage.removeItem("token")
        localStorage.removeItem("tablePage")
        base.data.token = ""
        thatData.$router.replace({ path: "/login" })
      }).catch(() => {})
    },
  }
}

</script>
<style>
* {
  padding: 0;
  margin: 0;
  font-family: "微软雅黑", "Microsoft YaHei", Arial, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", sans-serif;
}

ul {
  list-style: none;
}

a,
a:hover,
a:active,
a:visited,
a:link,
a:focus {
  outline: none;
  background: none;
  text-decoration: none;
}

input,
button {
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

.clear:after {
  font-weight: lighter;
  content: "";
  display: block;
  clear: both;
}

#header {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

#header .inner {
  width: 1160px;
  height: 98px;
  margin: 0 auto;
}

#header .inner .left {
  float: left;
  height: 100%;
}

#header .inner .left .logo {
  float: left;
  width: 144px;
  height: 100%;
  background: url(/static/img/loan_header_logo.png) center no-repeat;
  background: content;
}

#header .inner .left .title {
  float: left;
  padding-top: 44px;
  padding-bottom: 38px;
  padding-left: 14px;
}

#header .inner .left .title p {
  line-height: 15px;
  font-size: 14px;
  color: #999;
  padding-left: 15px;
  border-left: 1px solid #999;
}

#header .inner .right {
  float: right;
  height: 100%;
}

#header .inner .right .icon {
  float: left;
  width: 18px;
  height: 100%;
  margin-right: 11px;
  background: url(/static/img/loan_header.png) center no-repeat;
  background-size: contain;
}

#header .inner .right .tel-number {
  float: left;
  padding-top: 38px;
  padding-bottom: 39px;
}

#header .inner .right .tel-number p {
  font-size: 14px;
  line-height: 24px;
  color: #666;
}

#header .inner .right-login {
  float: right;
  height: 100%;
}

#header .inner .right-login .up-tel {
  height: 44px;
  padding-top: 12px;
}

#header .inner .right-login .icon {
  float: left;
  width: 20px;
  height: 100%;
  margin-right: 11px;
  background: url(/static/img/loan_header.png) center no-repeat;
  background-size: contain;
}

#header .inner .right-login .tel-number {
  float: left;
}

#header .inner .right-login .tel-number p {
  font-size: 14px;
  line-height: 44px;
  color: #666;
}

#header .inner .right-login .user-info {
  text-align: right;
}

#header .inner .right-login .user-info span {
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}

#header .inner .right-login .user-info span.user {
  color: #333;
}

#header .inner .right-login .user-info span.exit {
  color: #f07935;
  padding-left: 8px;
}

</style>
