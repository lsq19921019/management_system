<!--
  create : dxc 2018-09-19
  desc : 资产-已开启续投
  update : 
  desc : 
-->
<template>
  <div class="on_auto">
      <wap-alert ref="alert"></wap-alert>
      <div class="content_list">
            <van-list v-model="listLoading" :finished="listFinished" @load="listLoad" :loading-text="'加载中...'" v-if="reinvestList.length != 0">
                <van-cell v-for="(reinvest,index) in  reinvestList" :key="index" :name="index" @click="goInvestDetail(reinvest.planRecordId)">
                    <div class="list_title border-one-half-bottom">
                        <p class="c333"><span class="pr">{{reinvest.dcbTitle}}<i class="border_tips act" v-if="reinvest.showXT">续投</i></span><span class="ce8ae31">{{reinvest.statusText}}</span></p>
                    </div>
                    <div class="list_detail">
                        <p class="c666">{{reinvest.investAmount}}<span>{{reinvest.investTime}}</span></p>
                        <p class="c999">加入金额(元)<span>加入时间</span></p>
                    </div>
                </van-cell>
            </van-list>
            <div v-else class="empty" :style="'height:' + emptyHeight + 'rem'">
                <img src="/static/img/wap_assets_auto_continue_01.png">
                <p class="c666 empty_title">暂无已开启续投的产品</p>
            </div>
            <!-- <div class="load" v-show="reinvestList.length != 0">
                <p class="c999 load_more" @click="lock || postReinvestList()" v-if="pageNum < totalPage">点击加载更多</p>
                <p class="cccc no_more">已经全部加载</p>
            </div> -->
        </div>
  </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      lockContinue: 0,
      reinvestList: [],
      pageNum: 0,
      totalPage: 1,
      emptyHeight: 0,
      listLoading: false,
      listFinished: false
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.postReinvestList();
  },
  mounted() {},
  methods: {
    listLoad() {
      setTimeout(() => {
        this.postReinvestList();
      }, 800);
    },
    goInvestDetail(id) {
      this.$router.push({ path: "/assets_adddetails_g/" + id });
    },
    postReinvestList() {
      let thatData = this;

      if (thatData.pageNum < thatData.totalPage) {
        let data = {
          openStatus: "1",
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
              thatData.reinvest = resData.result;
              thatData.totalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.entityList.length > 0) {
                for (var i = 0; i < resData.result.entityList.length; i++) {
                  thatData.reinvestList.push(resData.result.entityList[i]);
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
.on_auto {
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
          i {
            top: 0;
            right: -0.98rem;
          }
          span:last-child {
            float: right;
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