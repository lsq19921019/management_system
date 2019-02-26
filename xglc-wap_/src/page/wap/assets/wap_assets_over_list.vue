<!--
  create : dxc 2018-09-18
  desc : 资产-已结束记录
  update : 
  desc : 
-->
<template>
  <div class="over_list">
    <wap-alert ref="alert"></wap-alert>
    <van-tabs
      @click="switchTab"
      class="top_table"
      v-model="vanTabsActive"
      :color="'#ff5637'"
      :line-width="80"
    >
      <van-tab title="G自动服务"></van-tab>
      <van-tab title="原定存宝"></van-tab>
    </van-tabs>
    <van-swipe
      @change="switchTab"
      ref="swipeCenter"
      :show-indicators="false"
      :loop="false"
      :duration="300"
    >
      <van-swipe-item>
        <div class="content_table" :style="'height:' + centerTabHeight + 'px'">
          <van-list
            v-model="gLoading"
            :finished="gFinished"
            @load="gLoad"
            :loading-text="'加载中...'"
            v-if="planGOver.length != 0"
          >
            <van-cell
              v-for="(gOver,index) in planGOver"
              :key="index"
              @click="goInvestDetail(gOver.investId)"
            >
              <div class="list_title border-one-half-bottom">
                <p class="c333">
                  <span class="pr">
                    {{gOver.title}}
                    <i
                      class="border_tips act"
                      v-show="gOver.cornerMark"
                    >{{gOver.cornerMark}}</i>
                  </span>
                </p>
              </div>
              <div class="list_detail">
                <p class="c666 mui-row">
                  <span class="mui-col-xs-5">{{gOver.investAmount}}</span>
                  <span class="mui-col-xs-4">{{gOver.hasInterest}}</span>
                  <span class="mui-col-xs-3">{{gOver.operateDate}}</span>
                </p>
                <p class="c999 mui-row">
                  <span class="mui-col-xs-5">加入金额(元)</span>
                  <span class="mui-col-xs-4">已收利息(元)</span>
                  <span class="mui-col-xs-3">结束时间</span>
                </p>
              </div>
            </van-cell>
          </van-list>
          <div class="empty" v-else :style="'height:' + emptyHeight + 'px'">
            <img src="/static/img/wap_assets_auto_continue_01.png">
            <p class="c666 empty_title">暂无已结束记录</p>
          </div>
          <!-- <div class="load" v-show="planGOver.length != 0">
                        <p class="c999 load_more" @click="lock || postGOverList()" v-if="gPageNum < gTotalPage">点击加载更多</p>
                        <p class="cccc no_more" v-else>已经全部加载</p>
          </div>-->
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="content_table" :style="'height:' + centerTabHeight + 'px'">
          <van-list
            v-model="dcbLoading"
            :finished="dcbFinished"
            @load="dcbLoad"
            :loading-text="'加载中...'"
            v-if="planDcbOver.length != 0"
          >
            <van-cell v-for="(dcbOver,index) in planDcbOver" :key="index">
              <div class="list_title border-one-half-bottom">
                <p class="c333">
                  <span>{{dcbOver.planTitle}}</span>
                </p>
              </div>
              <div class="list_detail">
                <p class="c666 mui-row">
                  <span class="mui-col-xs-5">{{dcbOver.investAmount}}</span>
                  <span class="mui-col-xs-4">{{dcbOver.annualRate}}</span>
                  <span class="mui-col-xs-3">{{dcbOver.paymentMode}}</span>
                </p>
                <p class="c999 mui-row">
                  <span class="mui-col-xs-5">购买金额(元)</span>
                  <span class="mui-col-xs-4">往期年化收益率</span>
                  <span class="mui-col-xs-3">还款方式</span>
                </p>
              </div>
            </van-cell>
          </van-list>
          <div class="empty" v-else :style="'height:' + emptyHeight + 'px'">
            <img src="/static/img/wap_assets_auto_continue_01.png">
            <p class="c666 empty_title">暂无已结束记录</p>
          </div>
          <!-- <div class="load" v-show="planDcbOver.length != 0">
                        <p class="c999 load_more" @click="lock || postDcbOverList()" v-if="dcbPageNum < dcbTotalPage">点击加载更多</p>
                        <p class="cccc no_more" v-else>已经全部加载</p>
          </div>-->
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      vanTabsActive: 0,
      planGOver: [],
      planDcbOver: [],
      gPageNum: 0,
      gTotalPage: 1,
      dcbPageNum: 0,
      dcbTotalPage: 1,
      gLoading: false,
      gFinished: false,
      dcbLoading: false,
      dcbFinished: false,
      emptyHeight: 0,
      centerTabHeight: 0
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.hiddenRightButton();
    this.postGOverList();
    this.postDcbOverList();
  },
  mounted() {
    this.setEmptyHeight();
  },
  methods: {
    hiddenRightButton() {
      let _this = this;
      _this.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "hiddenRightBarButton",
          transferData: {}
        },
        msg: "success"
      });
    },
    gLoad() {
      setTimeout(() => {
        this.postGOverList();
      }, 800);
    },
    dcbLoad() {
      setTimeout(() => {
        this.postDcbOverList();
      }, 800);
    },
    goInvestDetail(id) {
      this.$router.push({ path: "/assets_adddetails_g/" + id });
    },
    switchTab(index) {
      //从顶部tab栏切换优惠券列表
      this.$refs.swipeCenter.swipeTo(index);
      this.vanTabsActive = index;
    },
    setEmptyHeight() {
      //自动调节为空优惠券列表的显示高度
      this.emptyHeight =
        document.documentElement.clientHeight - $(".top_table").innerHeight();
      //自动调节scroll盒子的高度
      this.centerTabHeight =
        document.documentElement.clientHeight - $(".top_table").innerHeight();
    },
    postGOverList() {
      let thatData = this;
      if (thatData.gPageNum < thatData.gTotalPage) {
        let data = {
          status: "3",
          pageNum: ++thatData.gPageNum
        };

        this.$http
          .post("/api/assets/myInvestDcb", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              thatData.gTotalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.assetsDcbResultEntities.length > 0) {
                for (
                  var i = 0;
                  i < resData.result.assetsDcbResultEntities.length;
                  i++
                ) {
                  thatData.planGOver.push(
                    resData.result.assetsDcbResultEntities[i]
                  );
                }
              }
              thatData.gLoading = false;
            } else if (resData.status == -3) {
              thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
            } else if (resData.status == -5) {
              thatData.$refs.alert.loginSwitchDevice(); //登陆过期 激活提示函数 并跳转到登录页
            } else {
              mui.toast(resData.msg, { duration: 1000, type: "div" });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        thatData.gLoading = false;
        thatData.gFinished = true;
      }
    },
    postDcbOverList() {
      let thatData = this;

      if (thatData.dcbPageNum < thatData.dcbTotalPage) {
        let data = {
          isdcbX: "1",
          pageNum: ++thatData.dcbPageNum
        };

        this.$http
          .post("/api/assets/myInvestPlan", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              thatData.dcbTotalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.assetsInvestResultEntity.length > 0) {
                for (
                  var i = 0;
                  i < resData.result.assetsInvestResultEntity.length;
                  i++
                ) {
                  thatData.planDcbOver.push(
                    resData.result.assetsInvestResultEntity[i]
                  );
                }
              }
              thatData.dcbLoading = false;
            } else if (resData.status == -3) {
              thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
            } else {
              mui.toast(resData.msg, { duration: 1000, type: "div" });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        thatData.dcbLoading = false;
        thatData.dcbFinished = true;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.over_list {
  .top_table {
    padding-top: 0.88rem;
    /deep/ .van-tabs__wrap {
      height: 0.88rem;
      .van-tab {
        line-height: 0.88rem;
        font-size: 0.28rem;
        color: #545454;
      }
    }
    /* background: #fff;
    text-align: center;
    .tab-text {
      display: inline-block;
      font-size: 0.28rem;
      line-height: 0.88rem;
      color: #545454;
      border-bottom: 0.04rem solid #fff;
    }
    .tab-text.active {
      color: #ff5637;
      border-bottom: 0.04rem solid #ff5637;
    } */
  }
  .content_table {
    overflow: auto;
    van-cell {
      display: block;
      margin-top: 0.14rem;
      padding-left: 0.3rem;
      background: #fff;
      .list_title {
        padding-top: 0.26rem;
        padding-bottom: 0.26rem;
        padding-right: 0.3rem;
        p {
          font-size: 0.3rem;
          line-height: 0.28rem;
          i {
            top: 0rem;
            right: -0.98rem;
          }
        }
      }
      .list_detail {
        padding-top: 0.3rem;
        padding-bottom: 0.34rem;
        padding-right: 0.34rem;
        p {
          font-size: 0.28rem;
          line-height: 0.22rem;
          span:last-child {
            text-align: right;
          }
        }
        p:first-child {
          padding-bottom: 0.3rem;
        }
        p:last-child {
          font-size: 0.24rem;
        }
      }
    }
    .empty {
      padding-top: 2.02rem;
      box-sizing: border-box;
      text-align: center;
      img {
        display: block;
        width: 37.9%;
        margin: 0 auto;
      }
      .empty_title {
        font-size: 0.28rem;
        line-height: 0.27rem;
        color: #aaa;
        padding-top: 0.46rem;
        padding-bottom: 0.4rem;
      }
    }
    .load {
      .load_more {
        font-size: 0.24rem;
        line-height: 0.76rem;
        text-align: center;
      }
      .no_more {
        font-size: 0.24rem;
        line-height: 0.76rem;
        text-align: center;
      }
    }
  }
  .pr {
    position: relative;
  }
  .c999 {
    color: #999;
  }
  .c666 {
    color: #666;
  }
  .c333 {
    color: #333;
  }
  .cccc {
    color: #ccc;
  }
  .border_tips {
    display: inline-block;
    font-size: 0.24rem;
    line-height: 0.2rem;
    text-align: center;
    font-style: normal;
    color: #666;
    border: 1px solid #999;
    border-radius: 0.04rem;
    padding: 0.08rem 0;
    width: 0.7rem;
    position: absolute;
  }
  .border_tips.act {
    color: #ff5637;
    border: 1px solid #ff5637;
  }
}
</style>