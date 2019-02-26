<!--
  create : 张三 2018-12-08
  desc : 众邦存管
  update : 
  desc : 
-->
<template>
  <div class="form">
    <div class="info-list in-padding list-bg">
      <div class="in-border">
        <span>登录手机号</span>
        <span class="info-text">{{user.loginPhone}}</span>
      </div>
    </div>
    <div class="in-padding">
      <button @click="$router.push({ path: '/loan_reg_index' })" class="btn">开通众邦银行存管账户</button>
    </div>
    <div class="in-padding">
      <button @click="signOut()" class="btn empty">退出账户</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        loginPhone: "",
        cgtStatus: 1
      }
    };
  },
  components: {},
  created() {
    this.chBg("#f2f2f2");
  },
  mounted: function() {
    this.getInfo();
  },
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    getInfo() {
      let thatData = this;
      thatData.user.loginPhone = JSON.parse(
        localStorage.getItem("userLoginData")
      ).phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    goCg() {
      this.$router.push({ path: "/loan_reg_index" });
    },
    signOut: function() {
      let thatData = this;
      mui.confirm("您确定要退出吗?", function(e) {
        if (e.index) {
          localStorage.removeItem("token");
          localStorage.removeItem("userLoginData");
          base.data.token = "";
          thatData.$router.push({ path: "/login" });
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.form {
  margin-top: 11px;
  .info-list {
    height: 45px;
  }
  .info-list:first-child {
    .in-border {
      border: none;
    }
  }
  .in-padding {
    padding-left: 4%;
    padding-right: 4%;
  }
  .list-bg {
    background: #fff;
  }
  .in-border {
    border-bottom: 1px solid #ede9e9;
  }
  .info-list {
    span {
      float: left;
      font-size: 14px;
      line-height: 44px;
      color: #333;
      width: 34.4%;
    }
    span.info-text {
      color: #666;
      width: 65.5%;
    }
    span.no-card {
      color: #999;
      width: 65.5%;
      text-align: right;
    }
  }
  .btn {
    display: block;
    outline: none;
    width: 94.2%;
    margin: 0.9rem auto 0;
    height: 44px;
    border: none;
    border-radius: 22px;
    font-size: 16px;
    color: #fff;
    box-shadow: 0 0 20px rgba(255, 86, 55, 0.5);
    background: linear-gradient(left, #fe7229, #ff5637);
  }
  .btn.empty {
    margin: 0.4rem auto 0;
    color: #ff5637;
    box-shadow: none;
    background: #fff;
  }
}
</style>