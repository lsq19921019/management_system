<template>
  <div>
    <div class="guide">
      <div class="banner">
        <img src="/static/img/mobile_novice_guide_01.jpg">
      </div>
      <div class="step-1">
        <div class="title">
          <img src="/static/img/mobile_novice_guide_02.jpg">
        </div>
        <div class="guide-swiper">
          <img src="/static/img/mobile_novice_guide_step_1_01.jpg">
        </div>
      </div>
      <div class="step-2">
        <div class="title">
          <img src="/static/img/mobile_novice_guide_03.png">
        </div>
        <div class="guide-swiper">
          <div v-swiper:swiperII="swiperOption2">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(stepval2,index) in step2" :key="index">
                <img :src="stepval2">
              </div>
            </div>
          </div>
          <div class="swiper-pagination-2"></div>
        </div>
      </div>
      <div class="step-3">
        <div class="title">
          <img src="/static/img/mobile_novice_guide_04.jpg">
        </div>
        <div class="guide-swiper">
          <div v-swiper:swiperIII="swiperOption3">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(stepval3,index) in step3" :key="index">
                <img :src="stepval3">
              </div>
            </div>
          </div>
          <div class="swiper-pagination-3"></div>
        </div>
      </div>
      <div class="step-4">
        <div class="title">
          <img src="/static/img/mobile_novice_guide_05.jpg">
        </div>
        <div class="guide-swiper">
          <div v-swiper:swiperIV="swiperOption4">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(stepval4,index) in step4" :key="index">
                <img :src="stepval4">
              </div>
            </div>
          </div>
          <div class="swiper-pagination-4"></div>
        </div>
      </div>
      <div class="footer">
        <a @click="toProduct()">立即投资</a>
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
      step2: [
        "/static/img/mobile_novice_guide_step_2_01.png",
        "/static/img/mobile_novice_guide_step_2_02.png",
        "/static/img/mobile_novice_guide_step_2_03.png",
        "/static/img/mobile_novice_guide_step_2_04.png"
      ],
      step3: [
        "/static/img/mobile_novice_guide_step_3_01.png",
        "/static/img/mobile_novice_guide_step_3_02.png",
        "/static/img/mobile_novice_guide_step_3_03.png",
        "/static/img/mobile_novice_guide_step_3_04.png"
      ],
      step4: [
        "/static/img/mobile_novice_guide_step_4_01.png",
        "/static/img/mobile_novice_guide_step_4_02.png",
        "/static/img/mobile_novice_guide_step_4_03.png"
      ],
      swiperOption2: {
        loop: true,
        pagination: {
          el: ".swiper-pagination-2"
        }
      },
      swiperOption3: {
        loop: true,
        pagination: {
          el: ".swiper-pagination-3"
        }
      },
      swiperOption4: {
        loop: true,
        pagination: {
          el: ".swiper-pagination-4"
        }
      }
    };
  },
  mounted() {},
  methods: {
    toProduct() {
      this.$withApp("takeAppOpen", {
        status: 0,
        result: {
          transferName: "goToBorrowList",
          transferData: {
            productTypeIndex: "1" //要跳转到产品列表打开的产品类型table，以目前app产品类型为例，定存宝x为1、散标为2、债权为3，排序不受产品名称更换增减影响。示例为跳转到定存宝x。
          }
        },
        msg: "success"
      }).then(data => {
        if (data == "wap") {
          location.href = "/product_list";
        }
      });
    }
  }
};
</script>
<style>
@import "../../../style/css/mobile_novice_guide.css";
</style>
