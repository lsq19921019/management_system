<template>
  <div>
    <div class="form">
      <p class="top-title in-padding">申请借款，请开通银行存管账户</p>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 20.2%">企业名称</span>
          <input style="width: 79.8%" v-model="user.name" type="text" placeholder="请输入企业名称">
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border no-border">
          <span style="width: 39.3%">开户许可证核准号</span>
          <input
            style="width: 60.7%"
            v-model="user.banklicense"
            type="text"
            placeholder="请输入开户许可证核准号"
          >
        </div>
      </div>
      <div class="text-out in-padding"></div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 39.3%">统一社会信用代码</span>
          <input
            style="width: 60.7%"
            v-model="user.unifiedcode"
            type="text"
            placeholder="请输入统一社会信用代码"
          >
        </div>
      </div>
      <!-- <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 29.5%">组织机构代码</span>
          <input style="width: 70.5%" v-model="user.orgno" type="text" placeholder="请输入组织机构代码">
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 29.5%">营业执照编号</span>
          <input style="width: 70.5%" v-model="user.businesslicense" type="text" placeholder="请输入营业执照编号">
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border no-border">
          <span style="width: 29.5%">税务登记证号</span>
          <input style="width: 70.5%" v-model="user.taxno" type="text" placeholder="请输入税务登记证号">
        </div>
      </div>
      <div class="text-out in-padding">
        <p class="center-title">统一社会信用代码和三证信息（组织机构代码、营业执照编号、税务登记证号）两者选择输入其一即可</p>
      </div>-->
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 20.2%">法人姓名</span>
          <input style="width: 79.8%" v-model="user.legal" type="text" placeholder="请输入法人姓名">
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 29.5%">法人证件类型</span>
          <input style="width: 70.5%" type="text" value="身份证" readonly="readonly">
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 29.5%">法人证件号码</span>
          <input
            style="width: 70.5%"
            v-model="user.legalidcardno"
            type="text"
            placeholder="请输入法人证件号码"
          >
        </div>
      </div>
      <div class="reg-input in-padding input-bg">
        <div class="in-border no-border">
          <span style="width: 25.4%">企业联系人</span>
          <input style="width: 74.6%" v-model="user.contact" type="text" placeholder="请输入企业联系人">
        </div>
      </div>
      <!-- <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 34.5%">联系人手机号码</span>
          <input
            style="width: 65.5%"
            type="number"
            placeholder="请输入联系人手机号码"
            v-model="user.contactphone"
          >
        </div>
      </div>-->
      <!-- <div class="reg-input in-padding input-bg">
        <div class="in-border">
          <span style="width: 29.5%">所属银行选择</span>
          <select v-model="user.bankcode" style="width: 70.5%">
            <option value="" disabled selected>请选择所属银行</option>
            <option v-for="(bankVal,index) in bankList" :value="bankVal.bankcode" :key="index">{{bankVal.bankName}}</option>
          </select>
        </div>
      </div>-->
      <!-- <div class="reg-input in-padding input-bg">
        <div class="in-border no-border">
          <span style="width: 29.5%">企业对公账户</span>
          <input style="width: 70.5%" v-model="user.bankcardno" type="text" placeholder="请输入企业对公账户">
        </div>
      </div>-->
      <!-- <div class="bank-list in-padding">
        <a :href="'/'+tpid+'/bank'">支持银行></a>
      </div>-->
      <div class="btn-list in-padding">
        <button @click="postData" class="btn">前往存管页面开户</button>
      </div>
      <!-- <div class="in-padding foot-title">
        <p>
          已开通借款人账户
          <a href="/login">点击登录</a>
        </p>
      </div>-->
      <div class="agree">
        <input class="a_cb" type="checkbox" v-model="state" @click="state = !state">
        <p>
          我已阅读并签署
          <a @click="saveDataAgreeBook">《借款人授权委托书》</a>、
          <a @click="saveDataRegAgree">《小鸽理财用户协议》</a>、
          <a @click="saveDataAgreeRiskbook">《收费标准及风险告知书》</a>同意注册众邦银行存管服务
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: "", //企业名称
        banklicense: "", //开户银行许可证号

        unifiedcode: "", //统一社会信用代码
        /* orgno: "", //组织机构代码
        businesslicense: "", //营业执照编号
        taxno: "", //税务登记证号 */

        legal: "", //法人姓名
        legalidcardno: "", //法人证件号码
        contact: "" //企业联系人
        //contactphone: "", //联系人手机号码
        //bankcardno: "" //企业对公账户
        //bankcode: "" //所属银行
      },
      bankList: [],
      state: true,
      nameKey:
        "「」[`~!#$@^%&*=|{}':;'\",\\[\\].<>/?~！#￥_……&*-+——|{}【】《》‘；：”“'。，、？]‘’ ",
      key:
        "「」[`~!#$@^%&*()=|{}':;'\",\\[\\].<>/?~！#￥_……&*（）-+——|{}【】《》‘；：”“'。，、？]‘’ "
    };
  },
  watch: {
    "user.name"(val) {
      for (var i = 0; i < this.nameKey.length; i++) {
        if (val.indexOf(this.nameKey[i]) > -1) {
          this.user.name = val.replace(this.nameKey[i], "");
          break;
        }
      }
    },
    "user.banklicense"(val) {
      for (var i = 0; i < this.key.length; i++) {
        if (val.indexOf(this.key[i]) > -1) {
          this.user.banklicense = val.replace(this.key[i], "");
          break;
        }
      }
    },
    "user.unifiedcode"(val) {
      for (var i = 0; i < this.key.length; i++) {
        if (val.indexOf(this.key[i]) > -1) {
          this.user.unifiedcode = val.replace(this.key[i], "");
          break;
        }
      }
    },
    "user.legal"(val) {
      for (var i = 0; i < this.key.length; i++) {
        if (val.indexOf(this.key[i]) > -1) {
          this.user.legal = val.replace(this.key[i], "");
          break;
        }
      }
    },
    "user.legalidcardno"(val) {
      for (var i = 0; i < this.key.length; i++) {
        if (val.indexOf(this.key[i]) > -1) {
          this.user.legalidcardno = val.replace(this.key[i], "");
          break;
        }
      }
    },
    "user.contact"(val) {
      for (var i = 0; i < this.key.length; i++) {
        if (val.indexOf(this.key[i]) > -1) {
          this.user.contact = val.replace(this.key[i], "");
          break;
        }
      }
    }
    /* "user.bankcardno"(val) {
      for (var i = 0; i < this.key.length; i++) {
        if (val.indexOf(this.key[i]) > -1) {
          this.user.bankcardno = val.replace(this.key[i], "");
          break;
        }
      }
    } */
    /* "user.contactphone"(val) {
      if (this.user.contactphone.length > 11) {
        this.user.contactphone = val.slice(0, 11);
      }
    } */
  },
  created() {
    this.getOpenData();
    this.chBg("#f2f2f2");
  },
  mounted() {
    //this.getBank();
  },
  methods: {
    saveDataAgreeBook() {
      localStorage.setItem("companyOpenData", JSON.stringify(this.user));
      this.$router.push({ path: "/agree_book" });
    },
    saveDataRegAgree() {
      localStorage.setItem("companyOpenData", JSON.stringify(this.user));
      location.href = "https://wap.xiaogelicai.com/reg_agree";
    },
    saveDataAgreeRiskbook() {
      localStorage.setItem("companyOpenData", JSON.stringify(this.user));
      this.$router.push({ path: "/agree_riskbook" });
    },
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    subReg: function(val) {
      let data = {
        //tpid: "1",
        name: this.user.name,
        banklicense: this.user.banklicense,
        unifiedcode: this.user.unifiedcode,
        legal: this.user.legal,
        legalidcardno: this.user.legalidcardno,
        contact: this.user.contact
        //contactphone: 17600000000
        //bankcardno: this.user.bankcardno
        //bankcode: this.user.bankcode
      };

      localStorage.setItem("companyOpenData", JSON.stringify(this.user));

      this.$http
        .post("/api/cgt/enterpriseRegister", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            window.open(response.data.result.htmlData, "_self", "");
          } else if (resData.status * 1 == 47 || resData.status * 1 == 2076) {
            mui.confirm(response.data.msg, " ", ["取消", "重新登录"], e => {
              if (e.index == 1) {
                this.$router.push({ path: "/login" });
              }
            });
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getOpenData: function() {
      let thatData = this;
      if (localStorage.getItem("companyOpenData")) {
        thatData.user = JSON.parse(localStorage.getItem("companyOpenData"));
      }
    },
    postData: function() {
      if (this.checkReq() && this.checkOpt()) {
        this.subReg();
      }
    },
    checkReq: function() {
      //检查必填项
      if (
        this.user.name != "" &&
        this.user.banklicense != "" &&
        this.user.legal != "" &&
        this.user.legalidcardno != "" &&
        this.user.contact != ""
        //this.user.contactphone != "" &&
        //this.user.bankcardno != "" &&
        //this.user.bankcode != ""
      ) {
        if (base.checkName(this.user.legal)) {
          if (base.checkidNo(this.user.legalidcardno)) {
            if (base.checkName(this.user.contact)) {
              /* if (base.checkPhone(this.user.contactphone)) { */
              if (!this.state) {
                mui.alert("请勾选并阅读相关协议!");
              } else {
                return true;
              }
              /* } else {
                return false;
              } */
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        mui.alert("必填项信息填写不完整");
      }
    },
    checkOpt: function() {
      //检查选填项
      if (this.user.unifiedcode != "") {
        return true;
      } else {
        mui.alert("选填项信息填写不完整");
      }
    }
  }
};
</script>
<style>
@import "../style/css/loan_company_reg.css";
</style>
