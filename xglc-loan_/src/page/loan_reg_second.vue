<template>
  <div>
    <div class="form" :style="{height:height + 'px'}">
      <p class="top-title in-padding">申请借款，请开通银行存管账户</p>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span>真实姓名</span>
          <input v-model="user.realName" type="text" placeholder="请输入姓名">
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span>证件类型</span>
          <input type="text" value="身份证" readonly="readonly">
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border no-border">
          <span>证件号码</span>
          <input v-model="user.idNo" type="text" placeholder="请输入证件号码" maxlength="18">
        </div>
      </div>
      <p class="footer-title">请确认您的姓名和证件信息真实有效，开通存管账户之后无法修改</p>
      <div class="in-padding">
        <button @click="postData" class="btn">前往存管页面开户</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        realName: "",
        idNo: ""
        //cardNo: "",
        //cellphone: "",
      },
      height: ""
    };
  },
  watch: {
    "user.cardNo": function(val) {
      if (this.user.cardNo.length > 19) {
        this.user.cardNo = val.slice(0, 19);
      }
    },
    "user.cellphone": function(val) {
      if (this.user.cellphone.length > 11) {
        this.user.cellphone = val.slice(0, 11);
      }
    }
  },
  created() {
    this.chBg("#f2f2f2");
    this.getOpenData();
    this.autoBg();
  },
  mounted() {},
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    autoBg: function() {
      this.height = document.documentElement.clientHeight;
    },
    getOpenData: function() {
      let thatData = this;
      if (localStorage.getItem("userOpenData")) {
        thatData.user = JSON.parse(localStorage.getItem("userOpenData"));
      }
    },
    postData: function() {
        let thatData =this
      if (this.user.realName != "" && this.user.idNo != "") {
        if (base.checkName(this.user.realName)) {
          if (base.checkidNo(this.user.idNo)) {
            var data = {
              realName: this.user.realName,
              idNo: this.user.idNo,
              tpid: "1"
            };

            localStorage.setItem("userOpenData", JSON.stringify(this.user));

            this.$http
              .post("/api/cgt/borrowerRegister", this.$qs.stringify(data), {
                headers: base.ajaxHeadersWithToken(data)
              }) //axios进行ajax请求
              .then(function(response) {
                //console.log(response);
                let resData = response.data;
                if (resData.status == 0) {
                  var newwin = window.open(
                    response.data.result.htmlData,
                    "_self",
                    ""
                  );
                } else if (resData.status * 1 == 47 || resData.status * 2075) {
                  mui.confirm(
                    response.data.msg,
                    " ",
                    ["取消", "重新登录"],
                    e => {
                      if (e.index == 1) {
                        thatData.$router.push({ path: "/login" });
                      }
                    }
                  );
                } else {
                  mui.alert(response.data.msg);
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      } else {
        mui.alert("信息输入不完整，请查验");
      }
    }
  }
};
</script>
<style>
@import "../style/css/loan_reg.css";
</style>
