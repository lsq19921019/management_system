<template>
  <div>
    <div class="login" @keyup.enter="check">
      <loan-header ref="header"></loan-header>
      <div class="center">
        <div class="login-window">
          <div class="login-title">
            <p>会员登录</p>
          </div>
          <div class="login-form">
            <div class="input-line">
              <input type="number" v-model="id" placeholder="请输入11位注册手机号码">
            </div>
            <div class="input-line b-b">
              <input type="password" v-model="pw" placeholder="请输入登录密码">
            </div>
            <div class="tips" v-show="tips">
              <p>{{tips}}</p>
            </div>
            <div class="btn">
              <el-button @click="check()">登录</el-button>
            </div>
          </div>
          <div class="forget">
            <router-link to="/forget">忘记密码</router-link>
          </div>
        </div>
      </div>
      <loan-footer></loan-footer>
    </div>
  </div>
</template>
<script>
import loanHeader from "./loan_header.vue";
import loanFooter from "./loan_footer.vue";
export default {
  data() {
    return {
      id: "",
      pw: "",
      tips: ""
    };
  },
  components: {
    loanHeader,
    loanFooter
  },
  watch: {
    id: function(val) {
      if (this.id.length > 11) {
        this.id = val.slice(0, 11);
      }
    },
    pw: function(val) {
      if (this.pw.length > 20) {
        this.pw = val.slice(0, 20);
      }
    }
  },
  mounted() {
    this.$refs.header.setHeaderTitle("登录");
  },
  methods: {
    check: function() {
      let thatData = this;
      thatData.tips = "";
      if (
        thatData.checkPhone(thatData.id) &&
        thatData.checkPword(thatData.pw)
      ) {
        thatData.postData();
      }
    },
    checkPhone: function(a) {
      let thatData = this;
      if (!/^1[3456789]\d{9}$/.test(a) && a != "") {
        thatData.tips = "手机号码格式错误";
        return false;
      } else if (a == "") {
        thatData.tips = "请输入手机号码";
        return false;
      } else {
        return true;
      }
    },
    checkPword: function(pw) {
      let thatData = this;
      if (!/^[A-Za-z0-9]{6,20}$/.test(pw) && pw != "") {
        thatData.tips = "登录密码为6-20位字母和数字组合，请校验";
        return false;
      } else if (pw == "") {
        thatData.tips = "请输入登录密码";
        return false;
      } else {
        return true;
      }
    },
    postData: function() {
      let thatData = this;

      let data = {
        loginName: thatData.id,
        password: DES3.encrypt(base.desKey, thatData.pw),
        userRole: 1,
        loginType: 2
      };

      this.$http
        .post("/api/user/login", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            localStorage.setItem("token", resData.result.token);
            localStorage.setItem(
              "loanLoginData",
              JSON.stringify(resData.result)
            );
            base.data.token = resData.result.token;
            thatData.$message({
              message: "登陆成功",
              type: "success"
            });
            thatData.$router.replace({ path: "/account" });
          } else {
            thatData.tips = resData.msg;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
@import "../style/css/loan_login.css";
</style>
