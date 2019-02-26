<template>
  <div>
    <div v-wechat-title="$route.meta.title = titleTip"></div>
    <wap-alert ref="alert"></wap-alert>
    <div class="my-coupon">
      <div class="top-margin"></div>
      <div class="content-tab">
        <div class="red-envelope" v-show="tabPage == 1">
          <van-list v-model="redLoading" :finished="redFinished" @load="redLoad" :loading-text="'加载中...'" v-if="redEnv.redpackListEntity.length != 0">
            <van-cell v-for="(entity,index) in redEnv.redpackListEntity" :key="index" :name="index" class="content-box" :class="{'fail':entity.status != 1}">
              <div class="center-data clear">
                <div class="left">
                  <p><span class="unit">￥</span><span class="money">{{entity.amount}}</span></p>
                </div>
                <div class="right">
                  <p class="title">{{entity.usableRange}}</p>
                  <ul>
                    <li>
                      <p>投资满{{entity.minUseAmount}}可用</p>
                    </li>
                    <li>
                      <p>{{entity.useScope}}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="footer-date">
                <p>{{entity.validTime}}</p>
              </div>
              <img v-show="entity.status == 0" class="fail-img" src="/static/img/wap_invest_my_coupon_06.png">
              <img v-show="entity.status == 2" class="fail-img" src="/static/img/wap_invest_my_coupon_07.png">
            </van-cell>
          </van-list>
          <div v-else class="empty">
            <img src="/static/img/wap_invest_my_coupon_05.png">
            <p class="empty-title">暂无数据</p>
            <p class="empty-tip">点击屏幕，重新加载</p>
          </div>
          <!-- <div class="load" v-show="redEnv.redpackListEntity.length != 0">
            <p class="load-more" @click="lock || postRed()" v-if="redPageNum < redTotalPage">点击加载更多</p>
            <p class="no-more" v-else>已经全部加载</p>
          </div> -->
        </div>
        <div class="incre-coupon" v-show="tabPage == 2">
          <van-list v-model="couLoading" :finished="couFinished" @load="couLoad" :loading-text="'加载中...'" v-if="coupon.jiaXiListEntity.length != 0">
            <van-cell v-for="(entity,index) in coupon.jiaXiListEntity" class="content-box" :key="index" :name="index" :class="{'fail':entity.status != 1}">
              <div class="center-data clear">
                <div class="left">
                  <p><span class="unit">+</span><span class="percent">{{entity.rate.replace("%","")}}</span><span class="unit">%</span></p>
                </div>
                <div class="right">
                  <p class="title">{{entity.title}}</p>
                  <ul>
                    <li>
                      <p>投资满{{entity.minUseAmount}}可用,最多{{entity.maxFaxNum}}元可加息,最长加息{{entity.maxFaxTime}}天</p>
                    </li>
                    <li>
                      <p>{{entity.useScope}}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="footer-date">
                <p>{{entity.validTime}}</p>
              </div>
              <img v-show="entity.status == 0" class="fail-img" src="/static/img/wap_invest_my_coupon_06.png">
              <img v-show="entity.status == 2" class="fail-img" src="/static/img/wap_invest_my_coupon_07.png">
            </van-cell>
          </van-list>
          <div v-else class="empty">
            <img src="/static/img/wap_invest_my_coupon_05.png">
            <p class="empty-title">暂无数据</p>
            <p class="empty-tip">点击屏幕，重新加载</p>
          </div>
          <!-- <div class="load" v-show="coupon.jiaXiListEntity.length != 0">
            <p class="load-more" @click="lock || postCoupon()" v-if="couPageNum < couTotalPage">点击加载更多</p>
            <p class="no-more" v-else>已经全部加载</p>
          </div> -->
          <!-- <p v-show="coupon.jiaXiListEntity.length != 0" class="rule">
            <router-link to="/coupon_descrip">优惠券规则说明></router-link>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      redPageNum: 0,
      redTotalPage: 1,
      couPageNum: 0,
      couTotalPage: 1,
      redEnv: {
        redpackListEntity: []
      },
      coupon: {
        jiaXiListEntity: []
      },
      redLoading: false,
      redFinished: false,
      couLoading: false,
      couFinished: false,
      tabPage: 0, //1切换红包 2切换加息券
      titleTip: ""
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.getUrlTable();
  },
  mounted() {},
  methods: {
    redLoad() {
      setTimeout(() => {
        this.postRed();
      }, 800);
    },
    couLoad() {
      setTimeout(() => {
        this.postCoupon();
      }, 800);
    },
    getUrlTable() {
      this.tabPage = this.$route.params.tableType;
      if (this.tabPage == 1) {
        this.postRed();
        this.titleTip = "已失效投资红包";
      } else if (this.tabPage == 2) {
        this.postCoupon();
        this.titleTip = "已失效加息券";
      }
    },
    postRed: function() {
      let thatData = this;

      if (thatData.redPageNum < thatData.redTotalPage) {
        let envelopeData = {
          cardtype: "2",
          pageNum: thatData.redPageNum + 1,
          isused: "2"
        };
        // 请求红包
        this.$http
          .post(
            "/api/assets/assetsCouponList",
            this.$qs.stringify(envelopeData),
            {
              headers: base.ajaxHeadersWithToken(envelopeData)
            }
          )
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              thatData.redPageNum++;
              thatData.redEnv.tzhbNum = resData.result.tzhbNum;
              for (
                var i = 0;
                i < resData.result.redpackListEntity.length;
                i++
              ) {
                thatData.redEnv.redpackListEntity.push(
                  resData.result.redpackListEntity[i]
                );
              }
              thatData.redTotalPage = resData.result.pageEntity.totalPage * 1;
              thatData.redLoading = false;
            } else if (resData.status == -3) {
              thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
            } else if (resData.status == -5) {
              thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
            } else {
              mui.toast(resData.msg, { duration: 1000, type: "div" });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        thatData.redLoading = false;
        thatData.redFinished = true;
      }
    },
    postCoupon: function() {
      let thatData = this;

      if (thatData.couPageNum < thatData.couTotalPage) {
        let couponData = {
          cardtype: "3",
          pageNum: thatData.couPageNum + 1,
          isused: "2"
        };
        // 请求加息券
        this.$http
          .post(
            "/api/assets/assetsCouponList",
            this.$qs.stringify(couponData),
            {
              headers: base.ajaxHeadersWithToken(couponData)
            }
          )
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              thatData.couPageNum++;
              thatData.coupon.jxqNum = resData.result.jxqNum;
              for (var i = 0; i < resData.result.jiaXiListEntity.length; i++) {
                thatData.coupon.jiaXiListEntity.push(
                  resData.result.jiaXiListEntity[i]
                );
              }
              thatData.couTotalPage = resData.result.pageEntity.totalPage * 1;
              thatData.couLoading = false;
            } else if (resData.status == -3) {
              //thatData.$refs.alert.loginExpired() //登陆过期 激活提示函数 并跳转到登录页
            } else {
              mui.toast(resData.msg, { duration: 1000, type: "div" });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        thatData.couLoading = false;
        thatData.couFinished = true;
      }
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_invest_my_coupon.css";
</style>
