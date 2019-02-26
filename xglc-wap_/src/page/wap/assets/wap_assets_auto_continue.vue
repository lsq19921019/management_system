<!--
  create : dxc 2018-09-19
  desc : 资产-自动续投
  update : 
  desc : 
-->
<template>
  <div class="auto_continue">
    <wap-alert ref="alert"></wap-alert>
    <div
      class="lock_amount"
      @click="$router.push({ path: '/assets_detail' })"
      v-if="reinevstFreezeAmount * 1 > 0"
    >
      <p>
        您有{{reinevstFreezeAmount}}元回款本金续投冻结中
        <img src="/static/img/wap_assets_auto_continue_02.png">
      </p>
    </div>
    <div class="ad_banner" v-show="reinvestList.length > 0">
      <a :href="reinvest.advClickRedirectUrl ? reinvest.advClickRedirectUrl : 'javascript:;'">
        <img :src="reinvest.advImgUrl">
      </a>
    </div>
    <div class="continue_title" v-show="reinvestList.length > 0">
      <p class="c999">以下产品可开启自动续投
        <span>（权益标不参与返现活动）</span>
      </p>
    </div>
    <div class="continue_list">
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        @load="listLoad"
        :loading-text="'加载中...'"
        v-if="reinvestList.length != 0"
      >
        <van-cell
          v-for="(reinvest,index) in  reinvestList"
          :key="index"
          :name="index"
          @click="goInvestDetail(reinvest.planRecordId)"
        >
          <div class="list_title border-one-half-bottom">
            <p class="c333">
              <span class="pr">
                {{reinvest.dcbTitle}}
                <i class="border_tips act" v-if="reinvest.showXT">续投</i>
              </span>
              <span class="ce8ae31">{{reinvest.statusText}}</span>
            </p>
          </div>
          <div class="list_detail pr">
            <p class="c666 mui-row">
              <span class="mui-col-xs-4">{{reinvest.investAmount}}</span>
              <span class="mui-col-xs-4">{{reinvest.investTime}}</span>
            </p>
            <p class="c999 mui-row">
              <span class="mui-col-xs-4">加入金额(元)</span>
              <span class="mui-col-xs-4">加入时间</span>
              <span class="mui-col-xs-4">开启续投</span>
            </p>
            <div
              class="switch"
              @click.stop="autoChange(reinvest.planRecordId,reinvest.checkType*1,index)"
            >
              <van-switch active-color="#44db5e" size="28px" :value="reinvest.checkType == 1"/>
            </div>
          </div>
        </van-cell>
      </van-list>
      <div v-else class="empty" :style="'height:' + emptyHeight + 'px'">
        <img src="/static/img/wap_assets_auto_continue_01.png">
        <p class="c666 empty_title">暂无可开启续投的产品</p>
        <button @click="goPlanList()">立即加入</button>
      </div>
      <div class="load" v-show="reinvestList.length != 0">
        <!-- <p class="c999 load_more" @click="lock || postReinvestList()" v-if="pageNum < totalPage">点击加载更多</p>
        <p class="cccc no_more">已经全部加载</p>-->
      </div>
      <p class="rule">
        <a v-if="!isApp" @click="rule()">续投规则
          <span class="center-line">|</span>
        </a>
        <router-link to="/assets_on_auto_continue">已开启续投产品</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      lockContinue: 0,
      reinvest: {},
      reinvestList: [],
      pageNum: 0,
      totalPage: 1,
      emptyHeight: 0,
      isApp: true,
      listLoading: false,
      listFinished: false,
      reinevstFreezeAmount: 0
    };
  },
  components: {
    wapAlert
  },
  beforeDestroy() {
    this.removeAppRight();
  },
  created() {
    this.getAppToken();
    this.getContinue();
    this.setEmptyHeight();
  },
  mounted() {},
  methods: {
    getContinue() {},
    listLoad() {
      setTimeout(() => {
        this.postReinvestList();
      }, 800);
    },
    removeAppRight() {
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
    autoChange(id, type, index) {
      let thatData = this;
      if (type == 0) {
        mui.confirm(
          "开启后，回款的本金将续投相同期限的G自动服务，出借的项目回款日前5天内不可关闭，是否开启？",
          "开启确认",
          ["再想想", "开启"],
          function(e) {
            if (e.index == 1) {
              thatData.postChange(id, 1).then(data => {
                if (data[0]) {
                  let listArr = thatData.reinvestList[index];
                  listArr.checkType = 1;
                  thatData.$set(thatData.reinvestList, index, listArr);
                } else {
                  mui.alert(data[1], " ");
                }
              });
            }
          }
        );
      } else if (type == 1) {
        mui.confirm(
          "关闭后，该笔G自动服务的本金回款不再自动续投，是否关闭？",
          "关闭确认",
          ["再想想", "关闭"],
          function(e) {
            if (e.index == 1) {
              thatData.postChange(id, 0).then(data => {
                if (data[0]) {
                  let listArr = thatData.reinvestList[index];
                  listArr.checkType = 0;
                  thatData.$set(thatData.reinvestList, index, listArr);
                } else {
                  mui.alert(data[1], " ");
                }
              });
            }
          }
        );
      }
    },
    goInvestDetail(id) {
      this.$router.push({ path: "/assets_adddetails_g/" + id });
    },
    rule() {
      mui.alert(
        "<p style='text-align: left;'>1、开启后，加入的本金回款后将自动续投同期限的G自动服务；<br>2、开启后可在加入记录详情页关闭自动续投。</p>",
        "自动续投规则"
      );
    },
    setEmptyHeight() {
      //自动调节为空优惠券列表的显示高度
      this.emptyHeight = document.documentElement.clientHeight - 46;
    },
    getAppToken() {
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
            _this.postReinvestList();
            _this.isApp = false;
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            localStorage.setItem("token", dataRes.transferData.token);
            base.data.token = dataRes.transferData.token;
            _this.postReinvestList();
            return _this.$withApp("takeAppTable", {
              status: 0,
              result: {
                transferName: "showRightButtonAlert",
                transferData: {
                  rightButtonText: "续投规则", //导航栏按钮文字
                  messageTitle: "自动续投规则", //弹窗标题
                  messageText:
                    "1、开启后，加入的本金回款后将自动续投同期限的G自动服务；\n2、开启后可在加入记录详情页关闭自动续投。", //弹窗文字
                  closeButtonText: "确定" //关闭按钮文字
                }
              },
              msg: "success"
            });
          }
        });
      /* .then(data => {
          if (data == "wap") {
          } else {
            return _this.$withApp("getAppLockContinue", {
              status: 0,
              result: {},
              msg: "success"
            });
          }
        })
        .then(data => {
          if (data == "wap") {
            if (localStorage.getItem("userLockContinue")) {
              this.lockContinue = localStorage.getItem("userLockContinue") * 1;
            }
          } else {
            data = JSON.parse(data);
            this.lockContinue = data.result.lockContinue;
          }
        }); */
    },
    postChange(id, type) {
      let thatData = this;
      let data = {
        tdprId: id,
        type: type
      };
      return new Promise((resolve, reject) => {
        this.$http
          .post("/api/invest/changePlanStatus", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)

            let resData = response.data;
            if (resData.status == 0) {
              if (resData.result.status) {
                resolve([1, ""]);
              } else {
                resolve([0, resData.result.resultMsg]);
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
      });
    },
    postReinvestList() {
      let thatData = this;

      if (thatData.pageNum < thatData.totalPage) {
        let data = {
          openStatus: "0",
          pageNum: ++thatData.pageNum
        };

        this.$http
          .post("/api/assets/userReinvestList", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              thatData.reinevstFreezeAmount =
                resData.result.reinevstFreezeAmount;
              thatData.reinvest = resData.result;
              thatData.totalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.entityList.length > 0) {
                for (var i = 0; i < resData.result.entityList.length; i++) {
                  thatData.reinvestList.push(resData.result.entityList[i]);
                  thatData.reinvestList[i].checkType = 0;
                }
              }
              thatData.listLoading = false;
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
        thatData.listLoading = false;
        thatData.listFinished = true;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.auto_continue {
  .lock_amount {
    background: #ffebe7;
    padding: 0.24rem 0.3rem;
    p {
      font-size: 0.26rem;
      line-height: 0.25rem;
      color: #ae6262;
    }
    img {
      width: 0.16rem;
      float: right;
      position: relative;
      top: -0.03rem;
    }
  }
  .ad_banner {
    img {
      width: 100%;
      display: block;
    }
  }
  .continue_title {
    padding: 0.26rem 0.3rem 0.12rem;
    p {
      font-size: 0.28rem;
      line-height: 0.27rem;
    }
    span {
      color: #ff9c1c;
    }
  }
  .continue_list {
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
          span:nth-child(2) {
            text-align: center;
          }
          span:nth-child(3) {
            text-align: right;
          }
        }
        p:first-child {
          padding-bottom: 0.3rem;
        }
        p:nth-child(2) {
          font-size: 0.24rem;
        }
        .switch {
          position: absolute;
          top: 0.1rem;
          right: 0.3rem;
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
    .rule {
      text-align: center;
      padding-top: 0.16rem;
      padding-bottom: 0.16rem;
      color: #ff9c1c;
      a {
        font-size: 0.24rem;
        line-height: 0.4rem;
        color: #ff9c1c;
      }
      .center-line {
        font-size: 0.24rem;
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