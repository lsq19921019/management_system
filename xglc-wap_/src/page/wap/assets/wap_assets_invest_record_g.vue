<!--
  create : dxc 2018-09-15
  desc : 资产-G自动服务投资记录
  update : 
  desc : 
-->
<template>
  <div class="record_g">
    <wap-alert ref="alert"></wap-alert>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :pulling-text="'下拉刷新'"
      :loosing-text="'释放即可刷新'"
      :loading-text="'刷新中...'"
    >
      <div :style="{'min-height':height + 'px'}">
        <div class="header">
          <div class="total_money pa">
            <h2 class="cfff">{{planG.planXAll}}</h2>
            <p class="cfff">待收本息(元)</p>
            <router-link to="/assets_over_list" class="over"></router-link>
          </div>
          <div class="pending_money">
            <div class="mui-row">
              <div class="mui-col-xs-6 right_border pr">
                <h5 class="cfff">{{planG.planXWaitPrincipal}}</h5>
                <p class="cfff">待收本金(元)</p>
              </div>
              <div class="mui-col-xs-6">
                <h5 class="cfff">{{planG.planXWaitInterest}}</h5>
                <p class="cfff">待收利息(元)</p>
              </div>
            </div>
          </div>
        </div>
        <div class="content_list">
          <van-list
            v-model="listLoading"
            :finished="listFinished"
            @load="listLoad"
            :loading-text="'加载中...'"
            v-if="planGRecord.length != 0"
          >
            <van-cell
              v-for="(record,index) in planGRecord"
              :key="index"
              :name="index"
              @click="goInvestDetail(record.investId)"
            >
              <div class="list_title border-one-half-bottom">
                <p class="c333">
                  <span class="pr">
                    {{record.title}}
                    <i
                      class="border_tips act"
                      v-show="record.cornerMark"
                    >{{record.cornerMark}}</i>
                  </span>
                  <span class="ce8ae31" v-if="record.webStatus == 0">出借中</span>
                  <span class="c999" v-else>已结束</span>
                </p>
              </div>
              <div class="list_detail">
                <p class="c666">
                  {{record.investAmount}}
                  <span>{{record.operateDate}}</span>
                </p>
                <p class="c999">
                  加入金额(元)
                  <span>加入时间</span>
                </p>
              </div>
            </van-cell>
          </van-list>
          <div class="empty" v-else :style="'height:' + emptyHeight + 'rem'">
            <img src="/static/img/wap_assets_auto_continue_01.png">
            <p class="c666 empty_title">暂无投资记录</p>
            <button @click="goPlanList()">去投资</button>
          </div>
          <!-- <div class="load" v-show="planGRecord.length != 0">
                        <p class="c999 load_more" @click="lock || postInvestList()" v-if="pageNum < totalPage">点击加载更多</p>
                        <p class="cccc no_more" v-else>已经全部加载</p>
          </div>-->
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      isLoading: false,
      planG: {},
      planGRecord: [],
      pageNum: 0,
      totalPage: 1,
      lock: false,
      emptyHeight: 0,
      height: 0,
      listLoading: false,
      listFinished: false
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.getAppToken();
    this.autoHeight();
    this.setEmptyHeight();
  },
  mounted() {},
  methods: {
    listLoad() {
      setTimeout(() => {
        this.postInvestList();
      }, 800);
    },
    onRefresh() {
      this.pageNum = 0;
      this.totalPage = 1;
      setTimeout(() => {
        this.getAppToken(1);
        this.isLoading = false;
      }, 500);
    },
    autoHeight() {
      this.height = document.documentElement.clientHeight - 61;
    },
    goPlanList() {
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
            _this.$router.push({ path: "/product_list" });
          }
        });
    },
    goInvestDetail(id) {
      this.$router.push({ path: "/assets_adddetails_g/" + id });
    },
    setEmptyHeight() {
      //自动调节为空优惠券列表的显示高度
      this.emptyHeight =
        ((document.documentElement.clientHeight - 198) * 2) / 100;
    },
    getAppToken(type) {
      let _this = this;
      _this
        .$withApp("postApp", {
          status: 0,
          result: {
            transferName: "getTokenFromApp",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            _this.planG = JSON.parse(localStorage.getItem("planG"));
            _this.postInvestList(type);
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            localStorage.setItem("token", dataRes.transferData.token);
            base.data.token = dataRes.transferData.token;
          }
          return _this.$withApp("postApp", {
            status: 0,
            result: {
              transferName: "getPlanBorrowWait",
              transferData: {}
            },
            msg: "success"
          });
        })
        .then(data => {
          if (data == "wap") {
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            _this.planG = dataRes.transferData;
            _this.postInvestList(type);
          }
          return _this.$withApp("takeAppTable", {
            status: 0,
            result: {
              transferName: "hiddenRightBarButton",
              transferData: {}
            },
            msg: "success"
          });
        });
    },
    postInvestList(type) {
      let thatData = this;
      if (thatData.pageNum < thatData.totalPage) {
        let data = {
          status: "0",
          pageNum: ++thatData.pageNum
        };

        this.$http
          .post("/api/assets/myInvestDcb", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              if (type == 1) {
                thatData.planGRecord = [];
              }
              thatData.totalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.assetsDcbResultEntities.length > 0) {
                for (
                  var i = 0;
                  i < resData.result.assetsDcbResultEntities.length;
                  i++
                ) {
                  thatData.planGRecord.push(
                    resData.result.assetsDcbResultEntities[i]
                  );
                }
              }
              thatData.listLoading = false;
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
        thatData.listLoading = false;
        thatData.listFinished = true;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.record_g {
  .header {
    .total_money {
      background: #ff5637;
      padding-top: 0.8rem;
      padding-bottom: 0.81rem;
      text-align: center;
      h2 {
        font-size: 0.7rem;
        line-height: 0.53rem;
        padding-bottom: 0.38rem;
        font-weight: normal;
      }
      p {
        font-size: 0.24rem;
        line-height: 0.24rem;
      }
      .over {
        display: block;
        width: 1.42rem;
        height: 0.5rem;
        position: absolute;
        right: 0;
        top: 0.27rem;
        background: url(/static/img/wap_assets_invest_record_g_01.png) no-repeat
          left center;
        background-size: cover;
      }
    }
    .pending_money {
      background: #f7725a;
      text-align: center;
      padding-top: 0.27rem;
      padding-bottom: 0.28rem;
      h5 {
        font-size: 0.36rem;
        line-height: 0.33rem;
        font-weight: normal;
        padding-bottom: 0.09rem;
      }
      p {
        font-size: 0.24rem;
        line-height: 0.24rem;
      }
      .right_border::after {
        content: "";
        display: block;
        width: 0.01rem;
        height: 0.48rem;
        background: #fff;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .content_list {
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
          span:last-child {
            float: right;
            font-size: 0.24rem;
          }
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
          span {
            float: right;
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
      button {
        font-size: 0.28rem;
        color: #fff;
        width: 1.72rem;
        height: 0.64rem;
        border: none;
        background: linear-gradient(right, #ff5637, #ff7550);
        border-radius: 0.32rem;
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
  .cfff {
    color: #fff;
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
  .ce8ae31 {
    color: #e8ae31;
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