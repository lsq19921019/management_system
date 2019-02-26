<template>
  <div>
    <div>
      <img style="display:block;" src="./images/16.png">
    </div>
    <div class="bank">
      <p class="desc">2017年9月，小鸽理财携手上海银行上线资金存管系统。因银行方面业务调整的原因，小鸽理财与上海银行已终止资金存管合作。</p>
      <p
        class="desc_"
      >2018年11月，小鸽理财与武汉众邦银行签订银行存管协议，并于2019年1月12日正式上线新银行存管系统。小鸽理财用户资金全部迁移至武汉众邦银行存管系统开设的对应独立账户，由武汉众邦银行对用户资金进行监督管理，资金交易均由用户授权银行操作执行，保证交易真实有效。小鸽理财将继续秉持合规经营态度，护航平台用户资金安全，为出借人带来更可靠、更便捷的金融服务。</p>
      <div class="pt40">
        <img src="./images/17.png">
      </div>
      <div class="text">
        <p class="title">
          <i></i>关于众邦银行
        </p>
        <p
          class="con"
        >武汉众邦银行于2016年12月6日获中国银监会批准筹建，正式成为国内第11家批筹的民营银行，并且是湖北省首家获批的民营银行，注册资本20亿元。作为专业互联网金融服务的银行，武汉众邦银行以互联网信息技术、大数据和渠道创新为依托，金融业务灵活多元化，专业模式的创新十分契合国内互金行业的发展。</p>
        <div class="img_line">
          <div class="img_box">
            <img src="./images/36.png">
            <p>首批通过P2P网贷机构存管银行“白名单”银行</p>
          </div>
          <div class="img_box">
            <img src="./images/37.png">
            <p>注册资本近20亿元</p>
          </div>
          <div style="clear:both"></div>
        </div>
        <div class="img_line" style="padding-bottom:.95rem">
          <div class="img_box">
            <img src="./images/38.png">
            <p>专业互联网金融服务银行</p>
          </div>
          <div class="img_box">
            <img src="./images/39.png">
            <p>创新互联网+模式</p>
          </div>
          <div style="clear:both"></div>
        </div>
        <p class="title">
          <i></i>合规存管 杜绝资金挪用
        </p>
        <p class="subtitle">1.资金隔离管理</p>
        <p
          class="con"
        >接入存管后，用户信息和资金由众邦银行存管，平台不直接经手客户资金，也无权动用客户在银行存管系统的资金。出借人通过银行存管账户投资成功后，资金将直接进入借款人账户，使资金流转清晰可查，保障交易真实和出借人资金安全。</p>
        <p class="subtitle pt20">2.实名认证体系</p>
        <p class="con">资金提现前必须通过手机认证、实名认证以及银行卡认证等多项严密的认证，以切实确保账户资金只能提现至本人的银行账户，规避了账户资金被他人盗取的风险。</p>
        <p class="subtitle pt20">3.用户授权操作</p>
        <p class="con">存管银行对用户身份及交易授权进行认证后，借款人与出借人的资金变动均由用户授权银行操作，保障用户资金安全。</p>
        <p class="subtitle pt20">4.资金交易透明</p>
        <p class="con">用户在小鸽理财平台内的资金流水均是银行提供，账目清晰透明，具备法律效力，可证明用户与借款人之间的真实借贷行为，全方位保护出借人的资金交易并提供法律保障。</p>
        <p class="title mt40">
          <i></i>常见问题
        </p>

        <p class="subtitle pt10">
          <span>Q：</span>银行存管上线后，用户资金有什么变化？
        </p>
        <p class="con">
          <span>A：</span>用户资金由银行专门管理，只有用户本人才能操作账户上的资金，从根本上杜绝了用户资金被挪用的潜在风险。
        </p>
        <p class="subtitle pt20">
          <span>Q：</span>银行存管上线后，提现会有什么影响？
        </p>
        <p class="con">
          <span>A：</span>银行会在收到申请的当日受理，下一个工作日到账；遇双休日、国家法定节假日，到账日期顺延。
        </p>
        <p class="subtitle pt20">
          <span>Q：</span>银行存管上线后，有哪些银行卡支持绑定？
        </p>
        <p class="con">
          <span>A：</span>当前支持14家银行绑卡开户：工商银行、农业银行、中国银行、建设银行、交通银行、中信银行、光大银行、平安银行、招商银行、兴业银行、浦发银行、邮政储蓄、湖北银行、武汉农村商业银行。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
}
.pt40 {
  padding-top: 0.4rem;
}
.pt20 {
  padding-top: 0.2rem;
}
.mt40 {
  margin-top: 0.4rem;
}
.bank {
  width: 6.76rem;
  padding-left: 0.37rem;
  padding-right: 0.37rem;
  color: #404451;
  line-height: 0.52rem;
  font-size: 0.28rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  background: #fff;
  .desc_ {
    padding-top: 0.46rem;
  }
  .text {
    margin-top: 0.3rem;
    .title {
      font-weight: bold;
      font-size: 0.3rem;
      line-height: 1.5;
      padding: 0.3rem 0;
      color: #333;
      padding-left: 0.2rem;
      position: relative;
      i {
        display: block;
        position: absolute;
        left: 0;
        top: 0.373rem;
        border-radius: 2px;
        width: 4px;
        height: 0.3rem;
        background: #ff704f;
      }
    }
    .con {
      font-size: 0.24rem;
      line-height: 1.7;
      padding-top: 0.15rem;
      span {
        color: #ff704f;
      }
    }
    .img_line {
      width: 100%;
      margin: auto;
      padding-top: .3rem;
      .img_box {
        float: left;
        width: 50%;
        img {
          height: 1.56rem;
          width: 1.56rem;
          margin: auto;
          display: block;
        }
        p {
          font-size: 0.22rem;
          line-height: 0.26rem;
          color: #333;
          text-align: center;
        }
      }
    }
    .subtitle {
      color: #333;
      font-weight: bold;
      span {
        color: #ff704f;
      }
    }
  }
}
</style>
