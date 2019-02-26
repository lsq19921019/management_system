<template>
  <div class="security">
    <div class="floor floor1">
      <p class="title">五维保障，为资金安全稳健护航</p>
      <p class="subtitle">专注小额分散，坚持合规运营</p>
      <div
        class="w675 text"
      >小鸽理财一直严选优质资产，专注小额分散，借贷交易真实合法，项目披露尽职合规。首选有资产（房、车等）的优质借款人，借款金额均符合监管限额要求，借款人主要分在江浙沿海、珠三角等经济发达地区、省份，真正做到小额分散，从源头管控风险。</div>
      <div>
        <img src="./images/1.jpg">
      </div>
    </div>
    <div class="floor floor2">
      <p class="title">严查慎贷 全程风控</p>
      <div class="w675">
        <div
          class="text"
        >小鸽理财专注互联网投融资信息中介服务，资深银行系风控团队把关，央行及8大征信机构验核，坚决防范欺诈风险和信用风险，签署第三方机构担保和代偿协议，多重交叉审核确保标的资产安全可控。</div>
      </div>
      <div class="w675 text_img">
        <p class="ti_p">1、风控流程：每个项目都经由风控团队层层审核</p>
        <div class="ti_tree">
          <p>借款人发起申请</p>
          <p>合作机构内部初审</p>
          <p>征信及反欺诈系统调查</p>
          <p>小鸽风控人工复审</p>
          <p>合作机构签署担保函</p>
          <p>放款前复核</p>
          <p>贷后管理</p>
        </div>
        <p class="ti_p">2、风险防范：通过人脸识别、大数据等金融科技手段识别借款人真实身份、真实场景（交易）、真实还款意愿，规避诈骗风险</p>
        <div class="dls">
          <dl>
            <dt>
              <img src="./images/3.jpg">
            </dt>
            <dd>百度人脸识别</dd>
          </dl>
          <dl>
            <dt>
              <img src="./images/4.jpg">
            </dt>
            <dd>活体识别技术</dd>
          </dl>
          <dl>
            <dt>
              <img src="./images/5.jpg">
            </dt>
            <dd>鹏元征信大数据
              <br>征信报告
            </dd>
          </dl>
          <dl>
            <dt>
              <img src="./images/6.jpg">
            </dt>
            <dd>同盾科技第三方
              <br>数据查询服务
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="floor floor3">
      <p class="title">技术保障 信息安全</p>
      <div class="w675">
        <ul>
          <li>
            <i>1</i>等保三级备案，技术实力强劲
          </li>
          <li>
            <i>2</i>数据全程加密，确保出借人信息不受侵犯
          </li>
          <li>
            <i>3</i>交易电子数据保全，把交易合同锁进保险箱
          </li>
        </ul>
      </div>
    </div>
    <div class="floor floor4">
      <p class="title">权威机构认证 实力雄厚</p>
      <div class="swiper">
        <!-- start -->
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <!-- <swiper-slide><img src="./images/9.png" preview="0" preview-text="电商协会互金研究院会员"><span>电商协会互金研究院会员</span></swiper-slide>
                    <swiper-slide><img src="./images/28.png" preview="0" preview-text="电商协会互金研究院会员证"><span>电商协会互金研究院会员证</span></swiper-slide>
                    <swiper-slide><img src="./images/29.png" preview="0" preview-text="企业信用等级证书"><span>企业信用等级证书</span></swiper-slide>
          <swiper-slide><img src="./images/30.png" preview="0" preview-text="企业信用评级AAA证书"><span>企业信用评级AAA证书</span></swiper-slide>-->
          <swiper-slide>
            <img src="./images/22.jpg" preview="0" preview-text="胡润新金融最具潜力企业">
            <span>胡润新金融最具潜力企业</span>
          </swiper-slide>
          <swiper-slide>
            <img src="./images/40.png" preview="0" preview-text="2018年度全国网贷百强企业">
            <span>2018年度全国网贷百强企业</span>
          </swiper-slide>
          <swiper-slide>
            <img src="./images/31.png" preview="0" preview-text="深圳互金商会会员">
            <span>深圳互金商会会员</span>
          </swiper-slide>
        </swiper>
        <!-- end -->
      </div>
    </div>
    <div class="floor floor5">
      <p class="title">法律保障 规避风险</p>
      <div>
        <strong>1.合规保障</strong>
        小鸽理财所有项目在借贷关系合法性、收益合法性、居间服务合
        法性及电子合同合法性方面都严格遵守国家相关法律规定。在平
        台设立、银行存管、产品设计、运营管理、信息披露、产品宣传
        等方面严格遵守银监会及其他相关监管部门的规章。
      </div>
      <div>
        <strong>2.司法保障</strong>
        借款人和投资人在小鸽理财进行借贷，是受到法律法规、司法解释保护的一种合法借贷关系。如有纠纷，根据属地原则，皆由深圳地区司法机构管辖。
      </div>
      <div>
        <strong>3.合同保障</strong>
        在确认项目投资后，平台将与投资人签订电子版借款协议/服务协议，明确投资人、借款人以及平台本身的权利、义务及责任，确保投资人的利益受到法律保护。
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1
      }
    };
  },
  methods: {},
  components: {
    swiper,
    swiperSlide
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
ul,
li {
  list-style: none;
}
$fc333: #333;
.w675 {
  width: 6.75rem;
  margin: auto;
}
.security {
  font-size: 0.28rem;
  color: #404451;
  line-height: 1.5;
  .floor {
    border-bottom: 0.2rem solid #f2f2f2;
    padding: 0.5rem 0;
    background: #fff;
  }
  .title {
    font-size: 0.34rem;
    color: $fc333;
    text-align: center;
    font-weight: bold;
    padding: 0.1rem 0;
  }
  .subtitle {
    font-size: 0.24rem;
    color: $fc333;
    text-align: center;
    padding-top: 0.15rem;
    padding-bottom: 0.4rem;
  }
  .text {
    color: #404451;
    line-height: 0.52rem;
  }
  .floor2 {
    .text {
      padding-top: 0.25rem;
    }
    .text_img {
      padding: 0.2rem 0;
      .ti_tree {
        background: url(./images/2.jpg) left top no-repeat;
        background-size: 1.3rem 10.2rem;
        height: 10.2rem;
        p {
          line-height: 1.45rem;
          padding-left: 1.5rem;
          font-weight: bold;
        }
      }
      .dls {
        height: 5.4rem;
        dl {
          text-align: center;
          height: 1.9rem;
          float: left;
          width: 50%;
          dt {
            width: 1.52rem;
            display: block;
            margin: auto;
          }
          dd {
            margin-left: 0;
            line-height: 1.2;
          }
        }
      }
    }
  }
  .floor3 {
    ul {
      padding-left: 0;
      li {
        padding-left: 0.45rem;
        position: relative;
        line-height: 0.52rem;
        i {
          display: block;
          width: 0.32rem;
          height: 0.29rem;
          background: url(./images/7.png);
          background-size: 0.32rem 0.29rem;
          position: absolute;
          left: 0;
          top: 0.08rem;
          text-align: center;
          color: #fff;
          line-height: 0.29rem;
          font-size: 0.2rem;
          font-style: normal;
        }
      }
    }
  }

  .floor4 {
    .swiper {
      padding-top: 0.4rem;
      line-height: 2;
      padding-bottom: 0.2rem;
    }
    .swiper-container {
      text-align: center;
    }
    .swiper-container .swiper-wrapper .swiper-slide {
      width: 4.64rem;
    }
    .swiper-container .swiper-wrapper .swiper-slide img {
      width: 100%;
      height: 3.07rem;
    }
  }

  .floor5 {
    .title {
      padding-bottom: 0.2rem;
    }
    div {
      width: 6.75rem;
      margin: auto;
      strong {
        display: block;
        padding: 0.15rem 0;
      }
    }
  }
}
</style>