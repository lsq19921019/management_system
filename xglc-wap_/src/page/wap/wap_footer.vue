<template>
  <div>
    <div class="footer border-one-half-top">
      <div class="mui-row">
        <router-link to="/invest_index" class="mui-col-xs-3 icon-btn" :class="{active:invest}">
          <img src="/static/img/wap_footer_01.png?v=1" v-if="invest">
          <img src="/static/img/wap_footer_02.png?v=1" v-else>
          <span class="icon-text">首页</span>
        </router-link>
        <router-link to="/product_list" class="mui-col-xs-3 icon-btn" :class="{active:product}">
          <img src="/static/img/wap_footer_03.png?v=1" v-if="product">
          <img src="/static/img/wap_footer_04.png?v=1" v-else>
          <span class="icon-text">产品</span>
        </router-link>
        <router-link to="/assets_center" class="mui-col-xs-3 icon-btn" :class="{active:assets}">
          <img src="/static/img/wap_footer_05.png?v=1" v-if="assets">
          <img src="/static/img/wap_footer_06.png?v=1" v-else>
          <span class="icon-text">资产</span>
        </router-link>
        <router-link to="/mine_center" class="mui-col-xs-3 icon-btn" :class="{active:mine}">
          <img src="/static/img/wap_footer_07.png?v=1" v-if="mine">
          <img src="/static/img/wap_footer_08.png?v=1" v-else>
          <span class="icon-text">我的</span>
        </router-link>
        <div class="ip-x mui-col-xs-12" style="height: 24px;background: #fff;" v-if="ipX"></div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../static/js/iconfont.js";
export default {
  data() {
    return {
      invest: false,
      product: false,
      assets: false,
      mine: false,
      ipX: false
    };
  },
  destroyed() {
    $("#app").css("padding-bottom", "");
  },
  created() {
    this.checkIpX();
  },
  mounted() {
    $("#app").css("padding-bottom", "53px");
  },
  methods: {
    activeInvest: function() {
      this.invest = true;
    },
    activeProduct: function() {
      this.product = true;
    },
    activeAssets: function() {
      this.assets = true;
    },
    activeMine: function() {
      this.mine = true;
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
<style scoped>
.footer {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.footer .icon-btn {
  height: 52px;
  text-align: center;
  color: #a3a2a8;
}

.footer .icon-btn.active {
  color: #ff5637;
}

.footer .icon-btn img {
  height: 21px;
  width: 22px;
  display: block;
  margin: 0 auto;
  padding-top: 7px;
  /* padding: 5px 0; */
}

.footer .icon-btn .icon-text {
  display: block;
  font-size: 20px;
  line-height: 16px;
  padding-top: 5px;
  transform: scale(0.5, 0.5);
}
</style>
