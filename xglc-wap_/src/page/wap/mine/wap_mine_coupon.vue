<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="my-coupon">
      <van-tabs
        @click="switchTab"
        class="top-tab"
        v-model="vanTabsActive"
        :color="'#ff5637'"
        :line-width="80"
      >
        <van-tab :title="'投资红包(' + redEnv.tzhbNum + ')'"></van-tab>
        <van-tab :title="'返现券(' + cashBack.fxqNum + ')'"></van-tab>
        <van-tab :title="'加息券(' + coupon.jxqNum + ')'"></van-tab>
      </van-tabs>
      <van-swipe
        @change="switchTab"
        ref="swipeCenter"
        :show-indicators="false"
        :loop="false"
        :duration="300"
      >
        <van-swipe-item>
          <div class="content-tab" :style="'height:' + centerTabHeight + 'px'">
            <div class="red-envelope">
              <van-list
                v-model="redLoading"
                :finished="redFinished"
                @load="redLoad"
                :loading-text="'加载中...'"
                v-if="redEnv.redpackListEntity.length != 0"
              >
                <van-cell
                  v-for="(entity,index) in redEnv.redpackListEntity"
                  :name="index"
                  :key="index"
                  class="content-box"
                >
                  <div
                    class="center-data clear"
                    :class="{fail:entity.status != 1,newTag:entity.newTag > 0}"
                  >
                    <div class="left">
                      <p>
                        <span class="unit">￥</span>
                        <span class="money">{{entity.amount}}</span>
                      </p>
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
                  </div>
                  <div class="footer-date">
                    <p>
                      {{entity.validTime}}
                      <span v-show="entity.validTips">{{entity.validTips}}</span>
                    </p>
                  </div>
                  <img
                    v-show="entity.status == 0"
                    class="fail-img"
                    src="/static/img/wap_invest_my_coupon_06.png"
                  >
                  <img
                    v-show="entity.status == 2"
                    class="fail-img"
                    src="/static/img/wap_invest_my_coupon_07.png"
                  >
                </van-cell>
              </van-list>
              <div v-else class="empty" @click="postRed()" :style="'height:' + emptyHeight + 'px'">
                <img src="/static/img/wap_invest_my_coupon_05.png">
                <p class="empty-title">暂无可用</p>
                <p class="empty-tip">点击屏幕，重新加载</p>
              </div>
              <!-- <div class="load" v-show="redEnv.redpackListEntity.length != 0">
                <p class="load-more" @click="lock || postRed()" v-if="redPageNum < redTotalPage">点击加载更多</p>
                <p class="no-more" v-else>已经全部加载</p>
              </div>-->
            </div>
            <p class="rule">
              <router-link to="/coupon_descrip">如何使用</router-link>
              <span class="center-line">|</span>
              <router-link to="/mine_coupon_fail/1">查看已失效投资红包></router-link>
            </p>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="content-tab" :style="'height:' + centerTabHeight + 'px'">
            <div class="cash-back">
              <ul v-if="cashBack.voucherListEntity.length != 0">
                <li class="content-box">
                  <div class="center-data">
                    <div class="top">
                      <p>
                        <span class="unit">￥</span>
                        <span class="money">{{cashBack.voucherListEntity[0].surplusValue}}</span>返现券可用
                        <span class="top-tips">{{cashBack.voucherListEntity[0].useScaleDesc}}返现</span>
                      </p>
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
                  </div>
                  <div class="expired-tips" v-show="cashBack.voucherListEntity[0].voucherBar">
                    <p>{{cashBack.voucherListEntity[0].voucherBar}}</p>
                  </div>
                </li>
              </ul>
              <div
                v-else
                class="empty"
                @click="postCashBack()"
                :style="'height:' + emptyHeight + 'px'"
              >
                <img src="/static/img/wap_invest_my_coupon_05.png">
                <p class="empty-title">暂无可用</p>
                <p class="empty-tip">点击屏幕，重新加载</p>
              </div>
            </div>
            <p class="rule">
              <router-link to="/coupon_descrip">如何使用</router-link>
              <span class="center-line">|</span>
              <router-link to="/cashback_detail">查看返现券明细></router-link>
            </p>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="content-tab" :style="'height:' + centerTabHeight + 'px'">
            <div class="incre-coupon">
              <van-list
                v-model="couLoading"
                :finished="couFinished"
                @load="couLoad"
                :loading-text="'加载中...'"
                v-if="coupon.jiaXiListEntity.length != 0"
              >
                <van-cell
                  v-for="(entity,index) in coupon.jiaXiListEntity"
                  :name="index"
                  :key="index"
                  class="content-box"
                >
                  <div
                    class="center-data clear"
                    :class="{fail:entity.status != 1,newTag:entity.newTag > 0}"
                  >
                    <div class="left">
                      <p>
                        <span class="unit">+</span>
                        <span class="percent">{{entity.rate.replace("%","")}}</span>
                        <span class="unit">%</span>
                      </p>
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
                  </div>
                  <div class="footer-date">
                    <p>
                      {{entity.validTime}}
                      <span v-show="entity.validTips">{{entity.validTips}}</span>
                    </p>
                  </div>
                  <img
                    v-show="entity.status == 0"
                    class="fail-img"
                    src="/static/img/wap_invest_my_coupon_06.png"
                  >
                  <img
                    v-show="entity.status == 2"
                    class="fail-img"
                    src="/static/img/wap_invest_my_coupon_07.png"
                  >
                </van-cell>
              </van-list>
              <div
                v-else
                class="empty"
                @click="postCoupon()"
                :style="'height:' + emptyHeight + 'px'"
              >
                <img src="/static/img/wap_invest_my_coupon_05.png">
                <p class="empty-title">暂无可用</p>
                <p class="empty-tip">点击屏幕，重新加载</p>
              </div>
              <!-- <div class="load" v-show="coupon.jiaXiListEntity.length != 0">
                <p class="load-more" @click="lock || postCoupon()" v-if="couPageNum < couTotalPage">点击加载更多</p>
                <p class="no-more" v-else>已经全部加载</p>
              </div>-->
            </div>
            <p class="rule">
              <router-link to="/coupon_descrip">如何使用</router-link>
              <span class="center-line">|</span>
              <router-link to="/mine_coupon_fail/2">查看已失效加息券></router-link>
            </p>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="go-use" v-show="redEnv.redpackListEntity.length != 0 && vanTabsActive == 0">
        <a @click="goUse()">使用优惠券</a>
      </div>
      <div class="go-use" v-show="cashBack.voucherListEntity.length != 0 && vanTabsActive == 1">
        <a @click="goUse()">使用优惠券</a>
      </div>
      <div class="go-use" v-show="coupon.jiaXiListEntity.length != 0 && vanTabsActive == 2">
        <a @click="goUse()">使用优惠券</a>
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
        tzhbNum: "",
        redpackListEntity: []
      },
      cashBack: {
        fxqNum: "",
        voucherListEntity: []
      },
      coupon: {
        jxqNum: "",
        jiaXiListEntity: []
      },
      redLoading: false,
      redFinished: false,
      couLoading: false,
      couFinished: false,
      //tabPage: 1, //1切换红包 2切换返现券 3切换加息券
      vanTabsActive: 0,
      emptyHeight: 0,
      centerTabHeight: 0
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.$withApp("postApp", {
      status: 0,
      result: {
        transferName: "getTokenFromApp",
        transferData: {}
      },
      msg: "success"
    }).then(data => {
      if (data == "wap") {
        this.postRed();
        this.postCashBack();
        this.postCoupon();
      } else {
        data = JSON.parse(data);
        let dataRes = data.result;
        localStorage.setItem("token", dataRes.transferData.token);
        base.data.token = dataRes.transferData.token;
        this.postRed();
        this.postCashBack();
        this.postCoupon();
      }
    });
  },
  mounted() {
    $("#app").css("padding-bottom", "45px");
    this.setEmptyHeight();
  },
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
    switchTab(index) {
      //从顶部tab栏切换优惠券列表
      this.$refs.swipeCenter.swipeTo(index);
      this.vanTabsActive = index;
    },
    goUse() {
      //点击“使用优惠券”按钮
      let _this = this;
      _this
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToBorrowList",
            transferData: {
              productTypeIndex: "1"
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            this.$router.push({ path: "/product_list" });
          }
        });
    },
    setEmptyHeight() {
      //自动调节为空优惠券列表的显示高度
      this.emptyHeight = document.documentElement.clientHeight - 135;
      //自动调节scroll盒子的高度
      this.centerTabHeight = document.documentElement.clientHeight - 99;
    },
    postRed: function() {
      //请求红包

      let thatData = this;
      if (thatData.redPageNum < thatData.redTotalPage) {
        let envelopeData = {
          cardtype: "2",
          pageNum: thatData.redPageNum + 1,
          isused: "1"
        };
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
              thatData.redEnv.tzhbNum = resData.result.tzhbNum;
              thatData.redTotalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.redpackListEntity.length > 0) {
                thatData.redPageNum++;
                for (
                  var i = 0;
                  i < resData.result.redpackListEntity.length;
                  i++
                ) {
                  thatData.redEnv.redpackListEntity.push(
                    resData.result.redpackListEntity[i]
                  );
                }
              }
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
    postCashBack: function() {
      //请求返现券
      let thatData = this;
      thatData.lock = true;
      let cashBackData = {
        cardtype: "5",
        pageNum: 1,
        isused: "1"
      };
      this.$http
        .post(
          "/api/assets/assetsCouponList",
          this.$qs.stringify(cashBackData),
          {
            headers: base.ajaxHeadersWithToken(cashBackData)
          }
        )
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.cashBack.fxqNum = resData.result.fxqNum;
            if (resData.result.voucherListEntity.length > 0) {
              thatData.cashBack.voucherListEntity =
                resData.result.voucherListEntity;
            }
          } else if (resData.status == -3) {
            //thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postCoupon: function() {
      //请求加息券
      let thatData = this;
      if (thatData.couPageNum < thatData.couTotalPage) {
        let couponData = {
          cardtype: "3",
          pageNum: thatData.couPageNum + 1,
          isused: "1"
        };
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
              thatData.coupon.jxqNum = resData.result.jxqNum;
              thatData.couTotalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.jiaXiListEntity.length > 0) {
                thatData.couPageNum++;
                for (
                  var i = 0;
                  i < resData.result.jiaXiListEntity.length;
                  i++
                ) {
                  thatData.coupon.jiaXiListEntity.push(
                    resData.result.jiaXiListEntity[i]
                  );
                }
              }
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
