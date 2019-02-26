<template>
  <div>
    <div class="form">
      <div class="bind-input in-padding input-bg">
        <div class="in-border">
          <span>银行卡号</span>
          <input v-model="user.icCard" type="number" placeholder="请输入银行卡号">
        </div>
      </div>
      <div class="bind-input in-padding input-bg">
        <div class="in-border">
          <span>手机号码</span>
          <input v-model="user.phone" type="number" placeholder="请输入银行预存手机号码">
        </div>
      </div>
      <div class="bank-list in-padding">
        <router-link to="/bank">支持银行></router-link>
      </div>
      <div class="in-padding">
        <button @click="bindCard" class="btn">前往存管绑定银行卡</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        icCard: "",
        phone: ""
      }
    };
  },
  methods: {
    bindCard: function() {
      this.tpid = this.$route.params.tpid;

      if (this.user.icCard == "") {
        mui.alert("未填写银行卡");
      } else if (this.user.phone == "") {
        mui.alert("未填写手机号");
      } else if (this.user.icCard != "" && this.user.phone != "") {
        var token = this.$route.query.token;
        var thatData = this;
        /*let data = new URLSearchParams()
        data.append("cardNo", thatData.user.icCard)
        data.append("cellphone", thatData.user.phone)*/

        var data = {
          cardNo: thatData.user.icCard,
          cellphone: thatData.user.phone,
          tpid: "1"
        };

        this.$http
          .post("/api/cgt/bindBankcard", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              window.open(response.data.result.htmlData, "_self", "");
            } else if (resData.msg == "设备授权已过期，请重新登录!") {
              mui.alert(resData.msg, function() {
                this.$router.push({ path: "/login" });
              });
            } else {
              mui.alert(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  mounted: function() {
    base.inLocalStorage();
  }
};
</script>
<style>
@import "../style/css/loan_bind.css";
</style>
