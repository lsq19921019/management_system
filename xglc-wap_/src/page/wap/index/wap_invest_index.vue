<!-- 投资-理财首页 -->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :pulling-text="'下拉刷新'" :loosing-text="'释放即可刷新'" :loading-text="'刷新中...'">
      <div class="inv-index">
        <div class="top-banner">
          <div v-if="showSwiper" v-swiper:mySwiper="swiperBanner" class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(bannerData,index) in banner" :key="index">
                <a :href="bannerData.bannerLink">
                <img :src="bannerData.imagePath">
              </a>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="user-mode">
          <div class="formal-user" v-if="newUser.isTender">
            <a :href="indexList.yqyjLink" class="left">
          <img src="/static/img/wap_invest_index_05.png"><span>邀请有奖</span>
          </a>
            <router-link to="/mine_coupon" class="right">
              <img src="/static/img/wap_invest_index_07.png"><span><span class="number" v-show="indexList.discountsNum > 0">{{indexList.discountsNum}}</span>我的优惠券</span>
            </router-link>
            <div class="clear"></div>
          </div>
          <div class="new-user" v-else>
            <div class="icon-line" @click="goNew()">
              <div class="icon-box opacity">
                <img src="/static/img/wap_invest_index_08.png">
                <p>注册领红包</p>
              </div>
              <div class="arrow">
                <img src="/static/img/wap_invest_index_11.png">
                <p></p>
              </div>
              <div class="icon-box" :class="{'opacity':newUser.isLogin}">
                <img src="/static/img/wap_invest_index_09.png">
                <p>开通存管户</p>
              </div>
              <div class="arrow">
                <img src="/static/img/wap_invest_index_11.png">
            </div>
                <div class="icon-box" :class="{'opacity':newUser.isOpen}">
                  <img src="/static/img/wap_invest_index_10.png">
                  <p>新手专享</p>
                </div>
                <div class="clear"></div>
              </div>
              <div class="btn-line">
                <a @click="btnUserLink()">{{indexList.buttonDesc}}</a>
              </div>
            </div>
          </div>
          <div class="center-borrow">
            <ul>
              <li v-for="(listData,index) in indexList.moduleList" :key="index">
                <!-- 推荐标的模块 -->
                <div v-if="listData.moduleType == 1" @click="$router.push({path:'/invest_tenindex/' + listData.id })" class="in-padding recom-list" :class="{'m-b':index == indexList.moduleList.map(item=>item.moduleType).lastIndexOf('1'),'border-one-half-bottom':index != indexList.moduleList.map(item=>item.moduleType).lastIndexOf('1')}">
                  <p class="borrow-title">{{listData.title}}<span v-if="listData.labels.length > 0" v-for="(labels,index) in listData.labels" :key="index" class="right-label">{{labels}}</span></p>
                  <div class="left-income">
                    <span class="num">{{listData.yield}}<span class="num-s" v-if="listData.jxStatus == 1">{{listData.jxYield}}</span></span>
                    <span class="text">{{listData.yieldText}}</span>
                  </div>
                  <div class="right-btn">
                    <span class="mui-btn">立即加入</span>
                  </div>
                  <div class="clear"></div>
                </div>
                <!-- 图文模块 -->
                <div class="img-text border-one-half-bottom" v-else-if="listData.moduleType == 3">
                  <a href="javascript:;" v-if="!listData.link">
                <div class="left-text">
                  <h5>{{listData.title}}</h5>
                  <p>{{listData.text}}</p>
                </div>
                <div class="right-img">
                  <img :src="listData.imgPath">
                </div>
                <div class="clear"></div>
              </a>
                  <a :href="listData.link" v-else>
                <div class="left-text">
                  <h5>{{listData.title}}</h5>
                  <p>{{listData.text}}</p>
                </div>
                <div class="right-img">
                  <img :src="listData.imgPath">
                </div>
                <div class="clear"></div>
              </a>
                </div>
                <!-- 纯图模块 -->
                <div class="pure-img" :class="{'border-one-half-bottom':index != 0,'m-b':index == 0}" v-else-if="listData.moduleType == 4">
                  <a href="javascript:;" v-if="!listData.link">
                <img :src="listData.imgPath">
              </a>
                  <a :href="listData.link" v-else>
                <img :src="listData.imgPath">
              </a>
                </div>
              </li>
            </ul>
          </div>
          <div class="footer-about-us">
            <div class="mui-row">
              <router-link to="/about_xg" class="mui-col-xs-4 icon-box">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-guanyuxiaoge"></use>
                </svg>
                <p class="about_title">关于小鸽</p>
                <p class="about_explain">银行系高管团队</p>
              </router-link>
              <router-link to="/sec_ass" class="mui-col-xs-4 icon-box">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-anquanbaozhang1"></use>
                </svg>
                <p class="about_title">安全保障</p>
                <p class="about_explain">AAA级信用企业</p>
              </router-link>
              <router-link to="/sec_ass" class="mui-col-xs-4 icon-box">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yinhangcunguan"></use>
                </svg>
                <p class="about_title">银行存管</p>
                <p class="about_explain">保障资金安全</p>
              </router-link>
            </div>
          </div>
          <div class="footer-bank">
            <div class="mui-row">
              <div class="mui-col-xs-6 border_right">
                <router-link class="footer_left" to="/disclosure"><img src="/static/img/wap_invest_index_12.png">信息披露</router-link>
              </div>
              <div class="mui-col-xs-6">
                <router-link class="footer_right" to="/lender_education"><img src="/static/img/wap_invest_index_13.png">出借人教育</router-link>
              </div>
            </div>
            <p class="bottom">银行存管系统全程监管中，市场有风险，投资需谨慎</p>
          </div>
        </div>
    </van-pull-refresh>
    <wap-footer ref="footer"></wap-footer>
  </div>
</template>
<script>
import wapFooter from "../wap_footer.vue";
import wapAlert from "../wap_alert.vue";

import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr"; //图片轮播组件
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

export default {
  data() {
    return {
      banner: [],
      newUser: {
        isLogin: false,
        isOpen: false,
        isTender: false,
        newUserLink: "/start_reg"
      },
      indexList: {},
      cgtStatus: "", //开户信息
      showSwiper: false,
      swiperBanner: {
        loop: true,
        autoplay: {
          delay: 4000, //4秒切换一次
          disableOnInteraction: false
        },
        autoHeight: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      isLoading: false
    };
  },
  components: {
    "wap-footer": wapFooter,
    "wap-alert": wapAlert
  },
  created: function() {
    this.checkUserLogin();
    this.postBanner();
  },
  mounted: function() {
    this.$refs.footer.activeInvest();
  },
  methods: {
    btnUserLink() {
      if (
        this.newUser.newUserLink == "/start_reg" ||
        this.newUser.newUserLink == "/mine_open_account"
      ) {
        localStorage.setItem("from", location.href);
      }
      this.$router.push({ path: this.newUser.newUserLink });
    },
    onRefresh() {
      setTimeout(() => {
        this.checkUserLogin();
        this.postBanner();
        this.isLoading = false;
      }, 500);
    },
    goNew: function() {
      location.href = "/nov_gui";
    },
    userMode: function() {
      let thatData = this;
      if (localStorage.getItem("token")) {
        thatData.newUser.isLogin = true;
        thatData.newUser.newUserLink = "/mine_open_account";
        if (thatData.cgtStatus != 1) {
          thatData.newUser.isOpen = true;
          let templateId;
          for (var i = 0; i < thatData.indexList.moduleList.length; i++) {
            if (thatData.indexList.moduleList[i].moduleType == 1) {
              templateId = thatData.indexList.moduleList[i].id;
              break;
            }
          }
          thatData.newUser.newUserLink = "/invest_tenindex/" + templateId;
          if (thatData.indexList.isNewUser == 0) {
            thatData.newUser.isTender = true;
          }
        }
      }
    },
    checkUserLogin() {
      if (localStorage.getItem("token")) {
        this.postData();
      } else {
        this.postDataNoLogin();
      }
    },
    postData: function() {
      let thatData = this;

      let data = {
        clientType: "3"
      };

      this.$http
        .post("/api/find/indexNew", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.indexList = resData.result;
            thatData.cgtStatus = resData.cgtStatus;
            thatData.userMode();
          } else if (resData.status == -3 || resData.status == -5) {
            thatData.$refs.alert.deleteLocalStorage();
            location.reload();
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postDataNoLogin: function() {
      let thatData = this;

      let data = {
        clientType: "3"
      };

      this.$http
        .post("/api/find/indexNew", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
            
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.indexList = resData.result;
            thatData.userMode();
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postBanner: function() {
      let thatData = this;

      let data = {
        //clientType: "3",
      };

      this.$http
        .post("/api/find/banner", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.banner = resData.result.bannerList;
            thatData.showSwiper = true;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_invest_index.css";
</style>
<style>
.swiper-pagination-bullet-active {
  opacity: 0.8;
  background: #fff;
}
</style>
