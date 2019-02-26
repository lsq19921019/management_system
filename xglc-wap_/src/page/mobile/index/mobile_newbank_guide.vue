<!--
  create : dxc 2018-08-08
  desc : 众邦存管
  update : 
  desc : 
-->
<template>
  <div class="bank_guide" :style="'min-height:' + height + 'px'">
    <div v-if="type == 1" v-wechat-title="$route.meta.title = '银行存管开户指引'"></div>
    <div v-else v-wechat-title="$route.meta.title = '银行存管激活指引'"></div>
    <div class="top_title">
      <p v-if="type == 1">新用户存管开户操作指引</p>
      <p v-else>老用户存管激活操作指引</p>
    </div>
    <div class="guide-swiper">
      <div v-swiper:swiperOpen="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="swiper_title">
              <p class="title_text" v-if="type == 1">
                <span>1</span>登录后在“资产”页面点击开通按钮进入存管开户页面
              </p>
              <p class="title_text" v-else>
                <span>1</span>登录后在“资产”页面点击激活按钮进入存管激活页面
              </p>
            </div>
            <img v-if="type == 1" src="/static/img/mobile_newbank_guide_01.png">
            <img v-else src="/static/img/mobile_newbank_guide_05.png">
          </div>
          <div class="swiper-slide">
            <div class="swiper_title">
              <p class="title_text" v-if="type == 1">
                <span>2</span>填写姓名、身份证号码，点击“下一步”
              </p>
              <p class="title_text" v-else>
                <span>2</span>核对姓名、身份证号码，点击“前往存管页面绑卡激活”
              </p>
            </div>
            <img v-if="type == 1" src="/static/img/mobile_newbank_guide_02.png">
            <img v-else src="/static/img/mobile_newbank_guide_06.png">
          </div>
          <div class="swiper-slide">
            <div class="swiper_title">
              <p class="title_text" v-if="type == 1">
                <span>3</span>填写银行卡、预留手机号、设置交易密码，提交开户
              </p>
              <p class="title_text" v-else>
                <span>3</span>填写银行卡、预留手机号、设置交易密码，提交激活
              </p>
            </div>
            <img v-if="type == 1" src="/static/img/mobile_newbank_guide_03.png">
            <img v-else src="/static/img/mobile_newbank_guide_07.png">
          </div>
          <div class="swiper-slide">
            <div class="swiper_title">
              <p class="title_text" v-if="type == 1">
                <span>4</span>存管账户开通成功
              </p>
              <p class="title_text" v-else>
                <span>4</span>存管账户激活成功
              </p>
            </div>
            <img v-if="type == 1" src="/static/img/mobile_newbank_guide_04.png">
            <img v-else src="/static/img/mobile_newbank_guide_08.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr"; //图片轮播组件
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);
export default {
  data() {
    return {
      titleTip: "",
      swiperOption: {
        //loop: true,
        centeredSlides: true,
        slidesPerView: 1.48,
        spaceBetween: 40,
        slidesOffsetBefore: -22
      },
      height: 0,
      type: 0
    };
  },
  components: {},
  created() {
    this.autoHeight();
  },
  mounted() {
    this.checkIpX();
  },
  methods: {
    checkIpX: function() {
      let wi = document.documentElement.clientWidth;
      let he = document.documentElement.clientHeight;
      if (wi == 375 && he >= 690) {
        this.ipX = true;
        document.getElementById("app").style.paddingBottom = "0px";
      }
    },
    autoHeight: function() {
      this.height = document.documentElement.clientHeight;
      this.type = this.$route.params.type;
      if (this.type == 1) {
        this.titleTip = "银行存管开户指引";
      } else {
        this.titleTip = "银行存管激活指引";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.bank_guide {
  background: #fff;
  .top_title {
    position: absolute;
    top: 0.6rem;
    left: 0.8rem;
    z-index: 9;
    width: 4rem;
    height: 0.6rem;
    background: #f4f4f4;
    border-radius: 0.34rem;
    font-size: 0.3rem;
    line-height: 0.6rem;
    color: #111;
    text-align: center;
  }
  .guide-swiper {
    padding-top: 1.6rem;
    .swiper-container {
      .swiper-slide {
        height: 8.6rem;
        width: 4.8rem;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        box-shadow: 0 0.06rem 0.26rem 0 rgba(0, 0, 0, 0.1);
        border-radius: 0.03rem;
        position: relative;
        .swiper_title {
          width: 3.2rem;
          padding-top: 0.8rem;
          padding-left: 0.4rem;
          margin: auto;
          position: relative;
          span {
            position: absolute;
            left: 0;
            top: 0.79rem;
            width: 0.3rem;
            height: 0.3rem;
            background: #0a3ffa;
            border-radius: 0.06rem;
            font-size: 0.26rem;
            line-height: 0.3rem;
            color: #fff;
            text-align: center;
          }
        }
        img {
          width: 3.4rem;
          height: 6.2rem;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      /* .swiper-slide:nth-child(1) {
        margin-left: 0.8rem;
      }
      .swiper-slide:nth-child(4) {
        margin-right: 1.2rem;
      } */
    }
  }
}
</style>