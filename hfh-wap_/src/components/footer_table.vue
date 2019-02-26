<template>
  <div>
    <div class="footer border-one-half-top">
      <div class="mui-row" v-if="!miniTable">
        <router-link to="/index" class="mui-col-xs-4 icon-btn" :class="{active:infor}">
          <img src="/static/img/footer_table_01.png?v=2" v-if="infor">
          <img src="/static/img/footer_table_02.png?v=2" v-else>
          <span class="icon-text">即时资讯</span>
        </router-link>
        <router-link to="/problem_plat" class="mui-col-xs-4 icon-btn" :class="{active:platform}">
          <img src="/static/img/footer_table_03.png?v=2" v-if="platform">
          <img src="/static/img/footer_table_04.png?v=2" v-else>
          <span class="icon-text">问题平台</span>
        </router-link>
        <router-link to="/follow_us" class="mui-col-xs-4 icon-btn" :class="{active:us}">
          <img src="/static/img/footer_table_05.png?v=2" v-if="us">
          <img src="/static/img/footer_table_06.png?v=2" v-else>
          <span class="icon-text">关注我们</span>
        </router-link>
        <div class="ip-x mui-col-xs-12" style="height: 24px;background: #fff;" v-if="ipX"></div>
      </div>
      <div class="mui-row" v-else-if="miniTable">
        <router-link to="/problem_plat" class="mui-col-xs-6 icon-btn" :class="{active:platform}">
          <img src="/static/img/footer_table_03.png?v=2" v-if="platform">
          <img src="/static/img/footer_table_04.png?v=2" v-else>
          <span class="icon-text">问题平台</span>
        </router-link>
        <router-link to="/follow_us" class="mui-col-xs-6 icon-btn" :class="{active:us}">
          <img src="/static/img/footer_table_05.png?v=2" v-if="us">
          <img src="/static/img/footer_table_06.png?v=2" v-else>
          <span class="icon-text">关注我们</span>
        </router-link>
        <div class="ip-x mui-col-xs-12" style="height: 24px;background: #fff;" v-if="ipX"></div>
      </div>
      <div class="alert-box-tip-lod" v-show="lodShow">
        <div class="under"></div>
        <div class="window">
          <div class="coin-img"><img src="/static/img/loading.png"></div>
        </div>
      </div>
      <div class="alert-share-tip-lod" v-show="shlodShow">
        <div class="under"></div>
        <div class="window">
          <div class="coin-img"><img src="/static/img/loading.png"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infor: false,
      platform: false,
      us: false,
      ipX: false,
      lodShow: false,
      shlodShow: false,
      miniTable: false,
    };
  },
  created() {
    // this.isMiniPrograms(); //小程序审核用
    this.checkIpX();
  },
  methods: {
    /*isMiniPrograms: function() { //小程序审核用
      let thatData = this;
      if (thatData.$route.query.view == "miniP") {
        sessionStorage.setItem("miniPrograms", "1");
      }
      if (sessionStorage.getItem("miniPrograms")) {
        thatData.miniTable = true;
      }
    },*/
    activeInfor: function() {
      this.infor = true;
      localStorage.removeItem("problemData")
    },
    activePlatform: function() {
      this.platform = true;
    },
    activeUs: function() {
      this.us = true;
      localStorage.removeItem("problemData")
    },
    loading: function() {
      this.lodShow = true;
      var that = this;
      setTimeout(function() {
        that.lodShow = false;
      }, 1190);
    },
    shareLoading: function() {
      this.shlodShow = true;
      var that = this;
      setTimeout(function() {
        that.shlodShow = false;
      }, 500);
    },
    checkIpX: function() {
      let wi = document.documentElement.clientWidth;
      let he = document.documentElement.clientHeight;
      if (wi == 375 && he >= 690) {
        this.ipX = true;
      }
    }
  }
};
</script>
<style lang="css" scoped>
@import "../style/css/footer_table.css";
</style>
<style lang="css">
#app {
  padding-bottom: 4.1rem;
}
</style>
