<template>
  <div>
    <div class="com-qua">
      <img src="/static/img/27.png" class="img-box">
      <div class="main-box">
        <p class="tit-p">公司介绍</p>
        <p class="s-p">{{company}}（以下简称我司）成立于2013年12月，注册资本5000万元，是一家专注于为有资产的优质客户提供抵押或信用贷款的网络借贷信息中介服务平台，总部位于深圳市南山区。我司融合“互联网+金融”,一直以来秉持规范、安全、透明、诚信的经营准则，为用户提供T+1高效安全的互联网投融资信息中介服务。</p>
        <div class="clear" style="height:40px;"></div>
      </div>
      <div class="clear" style="height:10px;background:#f0f0f0"></div>
      <div class="main-box" style="width:92%;">
        <p class="tit-p">我们的优势</p>
        <div class="clear" style="height:10px;"></div>
        <div class="icon-box">
          <div class="icon-border"></div>
          <img src="/static/img/21.png">
          <p>国有银行背景风控团队</p>
        </div>
        <div class="icon-box">
          <img src="/static/img/22.png">
          <p>优质授信资料</p>
        </div>
        <div class="line"></div>
        <div class="icon-box">
          <div class="icon-border"></div>
          <img src="/static/img/23.png">
          <p>第三方机构担保和代偿</p>
        </div>
        <div class="icon-box">
          <img src="/static/img/24.png">
          <p>小额分散投资</p>
        </div>
        <div class="line"></div>
        <div class="icon-box">
          <div class="icon-border"></div>
          <img src="/static/img/25.png">
          <p>阿里金融云安全</p>
        </div>
        <div class="icon-box">
          <img src="/static/img/26.png">
          <p>权威征信和法务合作机构</p>
        </div>
        <div class="clear" style="height:20px;"></div>
      </div>
      <div class="clear" style="height:10px;background:#f0f0f0"></div>
      <div class="main-box">
        <p class="tit-p">办公环境</p>
        <img src="/static/img/29.png" class="img-box">
        <br>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      company: "深圳市温馨港湾网络技术有限公司",
      id: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      text: ["深圳市千文贸易有限公司", "深圳市壹佳置业有限公司", "福建省致云融资租赁有限公司", "深圳市鸿明源有限公司", "深圳市大牛窝装饰有限公司", "深圳市申易实业有限公司", "小鸽理财", "敦化江南村镇银行股份有限公司", "包头青山河套村镇银行股份有限公司", ]
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
  mounted() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.changeCompany()
  }
}

</script>
<style lang="css" scoped>
.com-qua {
  background: #fff;
}

.clear {
  width: 100%;
  clear: both;
}

.img-box {
  display: block;
  width: 100%;
}

.img-box2 {
  display: block;
  width: 80%;
  margin: 0 auto;
}

.main-box {
  width: 90%;
  margin: 0 auto;
}

.tit-p {
  text-align: center;
  color: #2e2e2e;
  font-size: 17px;
  line-height: 40px;
  position: relative;
  margin: 15px 0 20px 0;
}

.tit-p:after {
  content: "";
  width: 36px;
  height: 3px;
  background: #566394;
  position: absolute;
  left: 50%;
  bottom: -4px;
  margin-left: -18px;
}

.s-p {
  text-align: justify;
  line-height: 26px;
  font-size: 15px;
  color: #5d5d5d;
}

.p {
  padding-top: 20px;
  position: relative;
}

.icon-box {
  width: 50%;
  float: left;
  text-align: center;
  position: relative;
}

.icon-border {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  right: 0;
  background: #dadada;
}

.icon-box img {
  width: 45%;
  margin-top: 5px;
}

.icon-box p {
  width: 92%;
  margin: 10px auto;
  font-size: 14px;
  color: #4c4c4c;
  line-height: 25px;
}

@media screen and (max-width: 320px) {
  .icon-box p {
    font-size: 12px;
  }
}

.line {
  width: 100%;
  height: 1px;
  clear: both;
  background: #dadada;
}

</style>
