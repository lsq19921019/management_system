<template>
  <div>
    <div class="index">
      <div class="title">
        <p>请选择需要开通的存管账户类型</p>
      </div>
      <div class="personal" @click="jump(1)">
        <div class="head-img">
          <img src="/static/img/loan_index_01.jpg">
        </div>
        <div class="head-text">
          <span class="check-box">
            <img src="/static/img/loan_index_03.jpg" v-show="!personCheck">
            <img src="/static/img/loan_index_04.jpg" v-show="personCheck">
          </span>
          <span class="text">个人账户</span>
        </div>
      </div>
      <div class="company" @click="jump(2)">
        <div class="head-img">
          <img src="/static/img/loan_index_02.jpg">
        </div>
        <div class="head-text">
          <span class="check-box">
            <img src="/static/img/loan_index_03.jpg" v-show="!companyCheck">
            <img src="/static/img/loan_index_04.jpg" v-show="companyCheck">
          </span>
          <span class="text">企业账户</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      personCheck: false,
      companyCheck: false
    };
  },
  created() {
    this.chBg("#fff");
  },
  mounted() {
    localStorage.removeItem("userOpenData");
    localStorage.removeItem("companyOpenData");
  },
  methods: {
    jump(type) {
      if (type == 1) {
        this.personCheck = true;
        setTimeout(() => {
          this.$router.push({ path: "/register_sec" });
        }, 300);
      } else {
        this.companyCheck = true;
        setTimeout(() => {
          this.$router.push({ path: "/loan_com_reg" });
        }, 300);
      }
    },
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    }
  }
};
</script>
<style>
@import "../style/css/loan_index.css";
</style>
