<template>
  <div>
    <div class="tips">
      <div class="center_img">
        <img v-show="level == 1" src="/static/img/mobile_risk_ok_01.png">
        <img v-show="level == 2" src="/static/img/mobile_risk_ok_02.png">
        <img v-show="level == 3" src="/static/img/mobile_risk_ok_03.png">
        <img v-show="level == 4" src="/static/img/mobile_risk_ok_04.png">
        <img v-show="level == 5" src="/static/img/mobile_risk_ok_05.png">
      </div>
      <h2 class="type">测评结果：{{titleMsg}}</h2>
      <p class="type_text">{{typeMsg}}</p>
      <button @click="backApp" class="btn">去出借</button>
      <div class="return">
        <router-link class="back" to="/riskass" replace>重新测评</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      titleMsg: "",
      typeMsg: "",
      level: 0,
      type: ["谨慎型", "稳健型", "平衡型", "成长型", "进取型"],
      typeText: [
        "您适合低风险级别的产品",
        "您适合低风险-较低风险级别的产品",
        "您适合低风险-中等风险级别的产品",
        "您适合低风险-较高风险级别的产品",
        "您适合低风险-高风险级别的产品"
      ]
      //token: ""
    };
  },
  beforeDestroy() {
    $("body").css("background", "#f2f2f2");
  },
  created() {
    this.showMsg();
  },
  mounted() {
    $("body").css("background", "#fff");
  },
  methods: {
    showMsg: function() {
      this.level = this.$route.params.level * 1;
      this.titleMsg = this.type[this.$route.params.level * 1 - 1];
      this.typeMsg = this.typeText[this.$route.params.level * 1 - 1];
    },
    backApp: function() {
      let thatData = this;
      thatData
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToBorrowList",
            transferData: {
              productTypeIndex: "1"
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            if (localStorage.getItem("riskFrom") == "mine") {
              thatData.$router.push({ path: "/product_list" });
              localStorage.removeItem("riskFrom");
            } else if (localStorage.getItem("riskFrom") == "x") {
              localStorage.removeItem("riskFrom");
              thatData.$router.go(-1);
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.tips {
  text-align: center;
  .center_img {
    width: 3.68rem;
    margin: auto;
    padding-top: 1.66rem;
    img {
      width: 100%;
      display: block;
    }
  }
  .type {
    padding-top: 1.06rem;
    font-size: 0.48rem;
    line-height: 0.45rem;
    font-weight: normal;
    text-align: center;
    color: #333;
  }
  .type_text {
    padding-top: 0.26rem;
    font-size: 0.28rem;
    line-height: 0.27rem;
    text-align: center;
    color: #999;
  }
  .btn {
    width: 6.5rem;
    height: 0.88rem;
    font-size: 0.32rem;
    color: #fff;
    border: none;
    border-radius: 0.44rem;
    background: linear-gradient(left, #ff7550, #ff5637);
    margin: 1.76rem auto 0;
  }
  .return {
    width: 6.5rem;
    height: 0.88rem;
    margin: 0.3rem auto 0;
    a {
      display: block;
      font-size: 0.32rem;
      line-height: 0.88rem;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 0.44rem;
    }
  }
}
</style>
