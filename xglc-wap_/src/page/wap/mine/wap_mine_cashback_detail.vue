<!--
    create : dxc 2018-08-28
    desc : 我的优惠券 - 返现券明细
    update : 
    desc : 
-->
<template>
    <div class="cashback_detail">
        <wap-alert ref="alert"></wap-alert>
        <div class="cashback_list" v-if="cashback.assetsVoucherResultEntities.length != 0">
            <div class="header_bg p_r">
                <div class="header_money">
                    <p class="money ta_c color_fff">{{cashback.fxqUnusedValue}}</p>
                    <p class="money_title ta_c color_fff">返现券可用金额(元)<img    src="/static/img/mobile_repay_calend.png" @click="muiAlert(cashback.backPreDesc)"></p>
                </div>
                <div class="header_money_data bd_rs">
                    <div class="mui-row">
                        <div class="mui-col-xs-6 money_data_left p_r">
                            <p class="data_money ta_c">{{cashback.fxqUseValue}}</p>
                            <p class="money_title ta_c color_999">已用金额(元)</p>
                        </div>
                        <div class="mui-col-xs-6 money_data_right">
                            <p class="data_money ta_c">{{cashback.fxqExpiredValue}}</p>
                            <p class="money_title ta_c color_999">已过期金额(元)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center_list">
                <ul>
                    <li class="bd_rs p_r" :class="{'newTag':cash.newTag > 0}" v-for="(cash,index) in cashback.assetsVoucherResultEntities"  :key="index">
                        <div class="top p_r">
                            <p>{{cash.remark}}</p>
                        </div>
                        <div class="bottom">
                            <div class="mui-row">
                                <div class="mui-col-xs-4 l_">
                                    <p class="bottom_money">{{cash.amount}}</p>
                                    <p class="bottom_title money_title color_999">面值(元)</p>
                                </div>
                                <div class="mui-col-xs-4 c_">
                                    <p class="bottom_money">{{cash.usedValue}}</p>
                                    <p class="bottom_title money_title color_999">已用金额(元)</p>
                                </div>
                                <div class="mui-col-xs-4 r_">
                                    <p class="bottom_money">{{cash.validTime}}</p>
                                    <p class="bottom_title money_title color_999">过期时间</p>
                                </div>
                            </div>
                        </div>
                        <img v-show="cash.status == 3" class="fail_img" src="/static/img/wap_invest_my_coupon_06.png">
                        <img v-show="cash.status == 6" class="fail_img" src="/static/img/wap_invest_my_coupon_07.png">
                    </li>
                </ul>
                <div class="load" v-show="cashback.assetsVoucherResultEntities.length != 0">
                    <p class="load-more" @click="lock || postDetail()" v-if="pageNum < totalPage">点击加载更多</p>
                    <p class="no-more" v-else>已经全部加载</p>
                </div>
            </div>
        </div>
        <div v-else class="empty" @click="postDetail()" :style="'height:' + emptyHeight + 'rem'">
            <img src="/static/img/wap_invest_my_coupon_05.png">
            <p class="empty-title">暂无数据</p>
            <p class="empty-tip">点击屏幕，重新加载</p>
        </div>
    </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      lock: false,
      emptyHeight: 0,
      pageNum: 0,
      totalPage: 0,
      cashback: {
        assetsVoucherResultEntities: []
      }
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.postDetail();
  },
  mounted() {
    this.setEmptyHeight();
  },
  methods: {
    muiAlert(text) {
      //头部小问号点击弹窗
      mui.alert(text, " ", "知道了");
    },
    setEmptyHeight() {
      //自动调节为空优惠券列表的显示高度
      this.emptyHeight = (document.documentElement.clientHeight - 89) * 2 / 100;
    },
    postDetail() {
      //请求明细列表
      let thatData = this;
      thatData.lock = true;
      let data = {
        pageNum: thatData.pageNum + 1
      };
      this.$http
        .post("/api/assets/myBackPreVoucher", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            if (resData.result.assetsVoucherResultEntities.length > 0) {
              thatData.pageNum++;
              thatData.cashback.backPreDesc = resData.result.backPreDesc;
              thatData.cashback.fxqExpiredValue =
                resData.result.fxqExpiredValue;
              thatData.cashback.fxqUnusedValue = resData.result.fxqUnusedValue;
              thatData.cashback.fxqUseValue = resData.result.fxqUseValue;
              for (
                var i = 0;
                i < resData.result.assetsVoucherResultEntities.length;
                i++
              ) {
                thatData.cashback.assetsVoucherResultEntities.push(
                  resData.result.assetsVoucherResultEntities[i]
                );
              }
              thatData.totalPage = resData.result.pageEntity.totalPage * 1;
              thatData.lock = false;
            }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.cashback_detail {
  .header_bg {
    background: url(/static/img/wap_mine_cashback_detail_01.png) repeat-y center;
    background-size: contain;
    .header_money {
      padding-top: 0.72rem;
      padding-bottom: 1.27rem;
      p.money {
        font-size: 0.7rem;
        line-height: 0.52rem;
        font-weight: bold;
      }
      p.money_title {
        padding-top: 0.24rem;
      }
      p.money_title img {
        width: 0.26rem;
        padding-left: 0.08rem;
        position: relative;
        top: 0.03rem;
      }
    }
    .header_money_data {
      position: absolute;
      bottom: -0.69rem;
      left: 50%;
      transform: translateX(-50%);
      width: 7rem;
      background: #fff;
      .money_data_left,
      .money_data_right {
        padding-top: 0.36rem;
        padding-bottom: 0.36rem;
        p.data_money {
          font-size: 0.3rem;
          line-height: 0.23rem;
          color: #545454;
          font-weight: bold;
        }
        p.money_title {
          padding-top: 0.24rem;
        }
      }
      .money_data_left::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 0.52rem;
        width: 0.01rem;
        background: #ddd;
      }
    }
  }
  .center_list {
    padding-top: 0.73rem;
    padding-bottom: 0.46rem;
    width: 7rem;
    margin: auto;
    li {
      margin-top: 0.2rem;
      background: #fff;
      .top {
        padding: 0.27rem;
        border-bottom: 1px dashed #e2e2e2;
        p {
          font-size: 0.3rem;
          line-height: 0.28rem;
          color: #333;
        }
      }
      .top::before {
        content: "";
        background: url(/static/img/wap_invest_my_coupon_02.png) no-repeat
          center;
        background-size: cover;
        height: 0.2rem;
        width: 0.09rem;
        position: absolute;
        left: 0;
        bottom: -0.1rem;
      }
      .top::after {
        content: "";
        background: url(/static/img/wap_invest_my_coupon_03.png) no-repeat
          center;
        background-size: cover;
        height: 0.2rem;
        width: 0.09rem;
        position: absolute;
        right: 0;
        bottom: -0.1rem;
      }
      .bottom {
        padding: 0.43rem 0.27rem;
        .l_ {
          text-align: left;
        }
        .c_ {
          text-align: center;
        }
        .r_ {
          text-align: right;
        }
        .bottom_money {
          font-size: 0.28rem;
          line-height: 0.22rem;
          color: #666;
        }
        .bottom_title {
          padding-top: 0.31rem;
        }
      }
      img.fail_img {
        width: 1.18rem;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
      }
    }
    li.newTag {
      background: #fff url(/static/img/wap_invest_my_coupon_09.png) no-repeat
        right top;
      background-size: 0.66rem 0.68rem;
    }
  }
  .empty {
    padding-top: 2.08rem;
    box-sizing: border-box;
    img {
      display: block;
      width: 32.8%;
      margin: 0 auto;
    }
    p.empty-title {
      font-size: 0.34rem;
      color: #666;
      line-height: 0.33rem;
      text-align: center;
      padding-top: 0.21rem;
    }
    p.empty-tip {
      font-size: 0.28rem;
      color: #aaa;
      line-height: 0.29rem;
      text-align: center;
      padding-top: 0.26rem;
    }
  }
  .load {
    .load-more {
      font-size: 12px;
      line-height: 38px;
      text-align: center;
      color: #999;
    }
    .no-more {
      font-size: 12px;
      line-height: 38px;
      text-align: center;
      color: #ccc;
    }
  }
  .color_fff {
    color: #fff;
  }
  .color_999 {
    color: #999;
  }
  .ta_c {
    text-align: center;
  }
  .bd_rs {
    border-radius: 0.04rem;
  }
  .p_r {
    position: relative;
  }
  .money_title {
    font-size: 0.24rem;
    line-height: 0.23rem;
  }
}
</style>