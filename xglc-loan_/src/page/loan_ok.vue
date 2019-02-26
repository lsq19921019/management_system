<template>
  <div class="success">
    <div v-wechat-title="$route.meta.title = titleTip"></div>
    <div class="suc_box">
      <div class="suc_bg">
        <div class="suc_center"></div>
      </div>
    </div>
    <div class="suc_text">
      <p>{{tip}}</p>
      <p v-show="comp">等待存管运营人员审核</p>
    </div>
    <div class="back">
      <button @click="back" class="btn color">{{btn1}}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tip: "",
      titleTip: "",
      id: ["activate", "bind", "activation"],
      text: ["开户成功", "绑卡成功", "激活成功"],
      titleText: ["开户成功", "绑卡成功", "激活成功"],
      btn1: "完成",
      comp: false
    };
  },
  beforeCreate() {
    if (
      localStorage.getItem("isActivation") &&
      this.$route.params.tip == "activate"
    ) {
      this.$router.replace({ path: "/re_suc/activation" });
      localStorage.removeItem("isActivation");
    }
  },
  created() {
    this.chBg("#fff");
    this.addText();
  },
  mounted: function() {},
  methods: {
    addText: function() {
      var tipId = this.$route.params.tip;
      for (var i = 0; i < this.id.length; i++) {
        if (this.id[i] == tipId) {
          this.tip = this.text[i];
          this.titleTip = this.titleText[i];
        }
      }
      if (
        localStorage.getItem("companyOpenData") &&
        this.$route.params.tip == "activate"
      ) {
        this.tip = "开户申请成功";
        this.titleTip = "开户申请成功";
        this.comp = true;
      } else if (
        localStorage.getItem("companyOpenData") &&
        this.$route.params.tip == "activation"
      ) {
        this.tip = "激活申请成功";
        this.titleTip = "激活申请成功";
        this.comp = true;
      }
    },
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    back: function() {
      let thatData = this;
      if (localStorage.getItem("userOpenData")) {
        thatData.$router.push({ path: "/info" });
      } else if (localStorage.getItem("companyOpenData")) {
        if (thatData.$route.params.tip == "activate") {
          thatData.$router.push({ path: "/loan_nocg" });
        } else if (thatData.$route.params.tip == "activation") {
          thatData.$router.push({ path: "/loan_com_info" });
        }
      } else {
        thatData.$router.push({ path: "/login" });
      }
      localStorage.removeItem("userOpenData");
      localStorage.removeItem("companyOpenData");
    }
  }
};
</script>
<style lang="css" scoped>
.success .suc_box {
  width: 21.33%;
  padding-top: 58px;
  margin: 0 auto;
}

.success .suc_box .suc_bg {
  width: 100%;
  height: 80px;
  background: url(/static/img/mobile_recharge_suc_01.png) no-repeat center;
  background-size: contain;
}

.success .suc_box .suc_bg .suc_center {
  width: 51.9%;
  height: 80px;
  margin: 0 auto;
  background: url(/static/img/mobile_recharge_suc_02.png) no-repeat center;
  background-size: contain;
  animation: suc 0.3s linear;
}

.success .suc_text {
  padding-top: 0.43rem;
  padding-bottom: 0.84rem;
}

.success .suc_text p {
  width: 3.68rem;
  margin: auto;
  line-height: 0.4rem;
  font-size: 0.3rem;
  color: #333;
  text-align: center;
}

.success .back button {
  display: block;
  outline: none;
  width: 6.5rem;
  margin: auto;
  height: 0.88rem;
  font-size: 16px;
  border: none;
  border-radius: 0.44rem;
  text-align: center;
}

.success .back button.color {
  border: none;
  color: #fff;
  background: linear-gradient(left, #fe7229, #ff5637);
}

.success .back button.empty {
  margin-top: 0.38rem;
  border: 1px solid #ddd;
  color: #545454;
  background: #fff;
}

@keyframes suc {
  0% {
    width: 0;
  }

  100% {
    width: 51.9%;
  }
}
</style>

