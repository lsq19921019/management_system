<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="my-coupon">
      <van-tabs @click="switchTab" class="top-tab" v-model="vanTabsActive" :color="'#ff5637'" :line-width="80">
        <van-tab :title="'投资红包(' + redEnv.tzhbNum + ')'"></van-tab>
        <van-tab :title="'返现券(' + cashBack.fxqNum + ')'"></van-tab>
        <van-tab :title="'加息券(' + coupon.jxqNum + ')'"></van-tab>
      </van-tabs>
      <van-swipe @change="switchTab" ref="swipeCenter" :show-indicators="false" :loop="false" :duration="300">
        <van-swipe-item>
          <div class="content-tab" :style="'height:' + centerTabHeight + 'px'">
            <div class="red-envelope">
              <van-list v-if="redEnv.tzhbNum != 0">
                <van-cell v-for="(entity,index) in redEnv.redpackListEntity" :key="index" :name="index" @click="selectRed(entity.id)" class="content-box">
                  <div class="center-data clear">
                    <div class="left">
                      <p><span class="unit">￥</span><span class="money">{{entity.amount}}</span></p>
                    </div>
                    <div class="right">
                      <p class="title">{{entity.usableRange}}</p>
                      <ul>
                        <li>
                          <p>投资满{{entity.minUseAmount}}元可用</p>
                        </li>
                        <li>
                          <p>{{entity.useScope}}</p>
                        </li>
                      </ul>
                    </div>
                    <div class="checkbox">
                      <span class="select" v-if="entity.id == userPlanData.voucherId"><img src="/static/img/wap_invest_my_coupon_04.png"></span>
                      <span class="unselect" v-else></span>
                    </div>
                  </div>
                  <div class="footer-date">
                    <p>{{entity.validTime}}<span v-show="entity.validTips">{{entity.validTips}}</span></p>
                  </div>
                </van-cell>
              </van-list>
              <div v-else class="empty" :style="'height:' + emptyHeight + 'px'">
                <img src="/static/img/wap_invest_my_coupon_05.png">
                <p class="empty-title">暂无可用</p>
                <p class="empty-tip">点击屏幕，重新加载</p>
              </div>
              <p v-show="redEnv.tzhbNum != 0" class="rule">
                <router-link to="/coupon_descrip">优惠券规则说明></router-link>
              </p>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="content-tab" :style="'height:' + centerTabHeight + 'px'">
            <div class="cash-back">
              <ul v-if="cashBack.fxqNum != 0" @click="selectCash(cashBack.voucherListEntity[0].id)">
                <li class="content-box">
                  <div class="center-data">
                    <div class="top">
                      <p><span class="unit">￥</span><span class="money">{{cashBack.voucherListEntity[0].surplusValue}}</span>返现券可用<span class="top-tips">{{cashBack.voucherListEntity[0].useScaleDesc}}返现</span></p>
                    </div>
                    <div class="bottom">
                      <ul>
                        <li>
                          <p>{{cashBack.voucherListEntity[0].usableRange.split(" ")[0]}}</p>
                        </li>
                        <li>
                          <p>{{cashBack.voucherListEntity[0].usableRange.split(" ")[1]}}</p>
                        </li>
                        <li>
                          <p>{{cashBack.voucherListEntity[0].usableRange.split(" ")[2]}}</p>
                        </li>
                      </ul>
                    </div>
                    <div class="checkbox">
                      <span class="select" v-if="cashBack.voucherListEntity[0].id == userPlanData.voucherId"><img  src="/static/img/wap_invest_my_coupon_04.png"></span>
                      <span class="unselect" v-else></span>
                    </div>
                  </div>
                  <div class="expired-tips" v-show="cashBack.voucherListEntity[0].voucherBar">
                    <p>{{cashBack.voucherListEntity[0].voucherBar}}</p>
                  </div>
                </li>
              </ul>
              <div v-else class="empty" :style="'height:' + emptyHeight + 'px'">
                <img src="/static/img/wap_invest_my_coupon_05.png">
                <p class="empty-title">暂无可用</p>
                <p class="empty-tip">点击屏幕，重新加载</p>
              </div>
              <p v-show="cashBack.fxqNum != 0" class="rule">
                <router-link to="/coupon_descrip">优惠券规则说明></router-link>
              </p>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="content-tab" :style="'height:' + centerTabHeight + 'px'">
            <div class="incre-coupon">
              <van-list v-if="coupon.jxqNum != '0'">
                <van-cell v-for="(entity,index) in coupon.jiaXiListEntity" :key="index" @click="selectJxq(entity.id)" class="content-box" :name="index">
                  <div class="center-data clear">
                    <div class="left">
                      <p><span class="unit">+</span><span class="percent">{{parseFloat(entity.rate)}}</span><span class="unit">%</span></p>
                    </div>
                    <div class="right">
                      <p class="title">{{entity.title}}</p>
                      <ul>
                        <li>
                          <p>满{{entity.minUseAmount}}元可用,最多{{entity.maxFaxNum}}元可加息,最长加息{{entity.maxFaxTime}}天</p>
                        </li>
                        <li>
                          <p>{{entity.useScope}}</p>
                        </li>
                      </ul>
                    </div>
                    <div class="checkbox">
                      <span class="select" v-if="entity.id == userPlanData.voucherId"><img src="/static/img/wap_invest_my_coupon_04.png"></span>
                      <span class="unselect" v-else></span>
                    </div>
                  </div>
                  <div class="footer-date">
                    <p>{{entity.validTime}}<span v-show="entity.validTips">{{entity.validTips}}</span></p>
                  </div>
                </van-cell>
              </van-list>
              <div v-else class="empty" :style="'height:' + emptyHeight + 'px'">
                <img src="/static/img/wap_invest_my_coupon_05.png">
                <p class="empty-title">暂无可用</p>
                <p class="empty-tip">点击屏幕，重新加载</p>
              </div>
              <p v-show="coupon.jxqNum != 0" class="rule">
                <router-link to="/coupon_descrip">优惠券规则说明></router-link>
              </p>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="not-use">
        <span @click="notUseCou()">不使用优惠券</span>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      userPlanData: {},
      redEnv: {},
      cashBack: {},
      coupon: {},
      tabPage: 1, //1切换红包 2切换返现券 3切换加息券
      vanTabsActive: 0,
      emptyHeight: 0,
      centerTabHeight: 0
    };
  },
  components: {
    wapAlert
  },
  created: function() {
    this.getLocalData();
  },
  mounted: function() {
    $("#app").css("padding-bottom", "45px");
    this.setEmptyHeight();
  },
  methods: {
    switchTab(index) {
      //从顶部tab栏切换优惠券列表
      this.$refs.swipeCenter.swipeTo(index);
      this.vanTabsActive = index;
    },
    setEmptyHeight() {
      //自动调节为空优惠券列表的显示高度
      this.emptyHeight = document.documentElement.clientHeight - 135;
      //自动调节scroll盒子的高度
      this.centerTabHeight = document.documentElement.clientHeight - 99;
    },
    getLocalData: function() {
      //从localStorage拿之前保存的优惠券信息
      let thatData = this;
      thatData.userPlanData = JSON.parse(localStorage.getItem("userPlanData"));
      thatData.redEnv = JSON.parse(localStorage.getItem("redEnv"));
      thatData.coupon = JSON.parse(localStorage.getItem("coupon"));
      thatData.cashBack = JSON.parse(localStorage.getItem("cashBack"));
    },
    notUseCou: function() {
      //选择不使用优惠券
      let thatData = this;
      let userJson = JSON.parse(localStorage.getItem("userPlanData"));
      userJson.voucherId = 0;
      userJson.useCou = false; //是否启用优惠券
      localStorage.setItem("userPlanData", JSON.stringify(userJson));
      //thatData.$router.replace({ path: "/invest_conftrans" })
      thatData.$router.go(-1);
    },
    selectRed: function(id) {
      //选择使用红包
      let thatData = this;
      let userJson = JSON.parse(localStorage.getItem("userPlanData"));
      userJson.voucherId = id;
      userJson.useCou = true; //是否启用优惠券
      userJson.useRed = true; //是否使用红包
      userJson.useFxq = false; //是否使用返现券
      userJson.useJxq = false; //是否使用加息券
      userJson.calcPrompt = true; //激活提示弹窗
      localStorage.setItem("userPlanData", JSON.stringify(userJson));
      //thatData.$router.replace({ path: "/invest_conftrans" })
      thatData.$router.go(-1);
    },
    selectCash: function(id) {
      //选择使用返现券
      let thatData = this;
      let userJson = JSON.parse(localStorage.getItem("userPlanData"));
      userJson.voucherId = id;
      userJson.useCou = true; //是否启用优惠券
      userJson.useRed = false; //是否使用红包
      userJson.useFxq = true; //是否使用返现券
      userJson.useJxq = false; //是否使用加息券
      userJson.calcPrompt = true; //激活提示弹窗
      localStorage.setItem("userPlanData", JSON.stringify(userJson));
      //thatData.$router.replace({ path: "/invest_conftrans" })
      thatData.$router.go(-1);
    },
    selectJxq: function(id) {
      //选择使用加息券
      let thatData = this;
      let userJson = JSON.parse(localStorage.getItem("userPlanData"));
      userJson.voucherId = id;
      userJson.useCou = true; //是否启用优惠券
      userJson.useRed = false; //是否使用红包
      userJson.useFxq = false; //是否使用返现券
      userJson.useJxq = true; //是否使用加息券
      userJson.calcPrompt = true; //激活提示弹窗
      localStorage.setItem("userPlanData", JSON.stringify(userJson));
      //thatData.$router.replace({ path: "/invest_conftrans" })
      thatData.$router.go(-1);
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_invest_my_coupon.css";
</style>
