<template>
  <div>
    <div class="about-us">
      <div class="center">
        <img src="/static/img/vest_logo.png">
        <p>小鸽理财福利版</p>
        <p>V1.0.0</p>
      </div>
      <div class="footer">
        <p>{{company}}</p>
        <p>Copyright&copy;2018小鸽理财版权所有</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      company: "深圳市温馨港湾网络技术有限公司",
      id: ["1", "2", "3", "4", "5", "6", "7", "8","9"],
      text: ["深圳市千文贸易有限公司", "深圳市壹佳置业有限公司", "福建省致云融资租赁有限公司", "深圳市鸿明源有限公司", "深圳市大牛窝装饰有限公司", "深圳市申易实业有限公司", "小鸽理财", "敦化江南村镇银行股份有限公司","包头青山河套村镇银行股份有限公司"]
    }
  },
  methods: {
    changeCompany: function() {
      var companyId = this.$route.query.companyId
      if (companyId != 0 || companyId != undefined) {
        for (var i = 0; i < this.id.length; i++) {
          if (this.id[i] == companyId) {
            this.company = this.text[i]
          }
        }
      } else {}
    }
  },
  created() {
    this.changeCompany()
  }
}

</script>
<style lang="css" scoped>
.about-us {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #f8f8f9;
}

.about-us .center {
  text-align: center;
  padding-top: 70px;
}

.about-us .center img {
  width: 28.2%;
  border-radius: 23.5%;
}

.about-us .center p {
  font-size: 13px;
  line-height: 28px;
  color: #222;
}

.about-us .footer {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 14px;
}

.about-us .footer p {
  font-size: 12px;
  line-height: 26px;
  color: #999;
}

</style>
