<template>
  <div>
    <div class="form">
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 26.2%">登录手机号</span>
          <p style="width: 73.8%">{{user.userLoginPhone}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 20.2%">企业名称</span>
          <p style="width: 79.8%">{{user.name}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 39.3%">开户银行许可证号</span>
          <p style="width: 60.7%">{{user.banklicense}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg" v-show="unified">
        <div class="in-border">
          <span style="width: 39.3%">统一社会信用代码</span>
          <p style="width: 60.7%">{{user.unifiedcode}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg" v-show="part">
        <div class="in-border">
          <span style="width: 29.5%">组织机构代码</span>
          <p style="width: 70.5%">{{user.orgno}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg" v-show="part">
        <div class="in-border">
          <span style="width: 29.5%">营业执照编号</span>
          <p style="width: 70.5%">{{user.businesslicense}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg" v-show="part">
        <div class="in-border">
          <span style="width: 29.5%">税务登记证号</span>
          <p style="width: 70.5%">{{user.taxno}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 20.2%">法人姓名</span>
          <p style="width: 79.8%">{{user.legal}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 29.5%">法人证件类型</span>
          <p style="width: 70.5%">身份证</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 29.5%">法人证件号码</span>
          <p style="width: 70.5%">{{user.legalidcardno}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 25.4%">企业联系人</span>
          <p style="width: 74.6%">{{user.contact}}</p>
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 34.5%">联系人手机号码</span>
          <p style="width: 65.5%">{{user.contactphone}}</p>
        </div>
      </div>
      <div
        class="reg-input in-padding input-bg"
        v-if="user.bankcardno != 'null' && user.bankcardno != ''"
      >
        <div class="in-border no-border">
          <span style="width: 29.5%">企业对公账户</span>
          <p style="width: 70.5%">{{user.bankcardno}}</p>
        </div>
      </div>
      <div class="in-padding" v-if="user.cgtStatus == 2">
        <button @click="postActivation()" class="btn">激活众邦银行存管账户</button>
      </div>
      <div class="in-padding">
        <button @click="signOut" class="btn empty">退出账户</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        loginPhone: "",

        name: "",
        banklicense: "",

        unifiedcode: "",
        orgno: "",
        businesslicense: "",
        taxno: "",

        legal: "",
        legalidcardno: "",
        contact: "",
        contactphone: "",
        bankcardno: "",

        cgtStatus: ""
      },
      unified: false,
      part: false,
      realName: "",
      idNo: ""
    };
  },
  methods: {
    postData: function() {
      if (localStorage.getItem("token")) {
        var thatData = this;

        /* thatData.user.loginPhone = JSON.parse(
          localStorage.getItem("userLoginData")
        ).phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"); */
        //let data = new URLSearchParams() //把数据格式进行转化
        var data = {};

        this.$http
          .post("/api/enterprise/cgtInfo", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          }) //axios进行ajax请求
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              thatData.user.name = resData.result.name;
              thatData.user.banklicense = resData.result.banklicense;
              thatData.user.legal = resData.result.legal;
              thatData.user.legalidcardno = resData.result.legalidcardno;
              thatData.user.contact = resData.result.contact;
              thatData.user.contactphone = resData.result.contactphone;
              thatData.user.bankcardno = resData.result.bankcardno;
              thatData.user.cgtStatus = resData.cgtStatus;
              thatData.user.userLoginPhone = resData.result.userLoginPhone;
              if (resData.result.unifiedcode == undefined) {
                thatData.user.orgno = resData.result.orgno;
                thatData.user.businesslicense = resData.result.businesslicense;
                thatData.user.taxno = resData.result.taxno;
                thatData.part = true;
              } else if (
                resData.result.orgno == undefined &&
                resData.result.businesslicense == undefined &&
                resData.result.taxno == undefined
              ) {
                thatData.user.unifiedcode = resData.result.unifiedcode;
                thatData.unified = true;
              }
              if (resData.cgtStatus == 2) {
                //thatData.postBaseInfo();
              }
            } else if (resData.msg == "设备授权已过期，请重新登录!") {
              mui.alert(resData.msg, function() {
                thatData.$router.push({ path: "/login" });
              });
            } else {
              mui.alert(resData.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        var thatData = this;
        mui.alert("设备授权已过期，请重新登录!", function() {
          thatData.$router.push({ path: "/login" });
        });
      }
    },
    /* postBaseInfo() {
      let thatData = this;
      this.$http
        .post("/api/user/baseInfo", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response);
          let resData = response.data;
          if (resData.status == 0) {
            thatData.realName = resData.result.realName;
            thatData.idNo = resData.result.idNo;
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }, */
    postActivation: function() {
      let thatData = this;

      let data = {
        name: this.user.name,
        banklicense: this.user.banklicense,
        unifiedcode: this.user.unifiedcode,
        legal: this.user.legal,
        legalidcardno: this.user.legalidcardno,
        contact: this.user.contact
      };

      this.$http
        .post("/api/cgt/enterpriseRegister", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response);
          let resData = response.data;
          if (resData.status == 0) {
            localStorage.setItem("isActivation", "1");
            localStorage.setItem("companyOpenData", "1");
            window.open(response.data.result.htmlData, "_self", "");
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    signOut: function() {
      let thatData = this;
      mui.confirm("您确定要退出吗?", function(e) {
        if (e.index) {
          localStorage.removeItem("token");
          thatData.$router.push({ path: "/login" });
        }
      });
    }
  },
  mounted: function() {
    this.postData();
    base.inLocalStorage();
  }
};
</script>
<style>
@import "../style/css/loan_company_info.css";
</style>
