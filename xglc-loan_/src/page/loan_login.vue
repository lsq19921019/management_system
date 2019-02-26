<template>
  <div class="form">
    <div class="login-input in-padding">
      <img class="top-icon" src="/static/img/loan_login_01.png">
      <input v-model="user.id" type="number" placeholder="请输入手机号">
      <img @click="clear" class="clear" src="/static/img/loan_login_02.png">
    </div>
    <div class="login-input in-padding">
      <img class="top-icon" src="/static/img/loan_login_03.png">
      <input :type="show ? 'text' : 'password'" v-model="user.pw" placeholder="请输入密码">
      <span @click="show = !show" class="switch-box">
        <img v-show="!show" class="f-show switch-img" src="/static/img/loan_login_04.png">
        <img v-show="show" class="t-show switch-img" src="/static/img/loan_login_05.png">
      </span>
    </div>
    <div class="in-padding">
      <button @click="postData" class="btn">登录存管账户</button>
    </div>
    <div class="in-padding foot-title">
      <p>未开通存管账户，
        <router-link to="/register_fir">点击注册开户</router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: "",
        pw: ""
      },
      show: false
    };
  },
  created() {
    this.chBg("#fff");
  },
  watch: {
    "user.id": function(val) {
      if (this.user.id.length > 11) {
        this.user.id = val.slice(0, 11);
      }
    }
  },
  mounted: function() {},
  methods: {
    clear: function() {
      this.user.id = "";
    },
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    postData: function() {
      let thatData = this;
      if (thatData.user.id != "" && thatData.user.pw != "") {
        if (base.checkPhone(thatData.user.id)) {
          let data = {
            loginName: thatData.user.id,
            password: DES3.encrypt(base.desKey, thatData.user.pw),
            userRole: 1,
            loginType: 2
          };

          this.$http
            .post("/api/user/login", this.$qs.stringify(data), {
              headers: base.ajaxHeaderWithoutToken(data)
            }) //axios进行ajax请求
            .then(function(response) {
              let resData = response.data;
              if (resData.status == 0) {
                localStorage.setItem("token", resData.result.token);
                localStorage.setItem(
                  "userLoginData",
                  JSON.stringify(resData.result)
                );
                base.data.token = resData.result.token;
                if (resData.result.cgtStatus * 1 == 1) {
                  thatData.$router.push({ path: "/loan_nocg" });
                } else {
                  if (resData.result.userType == 1) {
                    thatData.$router.push({ path: "/info" });
                  } else if (resData.result.userType == 2) {
                    thatData.$router.push({ path: "/loan_com_info" });
                  }
                }
              } else {
                mui.alert(resData.msg);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      } else {
        mui.alert("未输入账户名或密码");
      }
    }
  }
};
</script>
<style>
@import "../style/css/loan_login.css";
</style>
