<!--
  create : dxc 2018-09-12
  desc : 资产-充值记录
  update : lff 10/16
  desc :  
-->
<template>
    <div class="re_record">
        <wap-alert ref="alert"></wap-alert>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :pulling-text="'下拉刷新'" :loosing-text="'释放即可刷新'" :loading-text="'刷新中...'" :style="{'min-height' : height + 'px'}">
            <div class="total_success">
                <p><span>累计充值成功</span>：{{ payup }}</p>
            </div>
            <van-list v-model="listLoading" :finished="listFinished" @load="listLoad" :loading-text="'加载中...'" class="month_list">
                <van-cell class="month_list_item" v-for="(item,index) in payList" :key="index" :name="index">
                    <div v-if="item.id==0" class="month_title" :class="isTitleTop==true?'isFixed':''">
                        <p class="title_date">{{ item.mouth }}</p>
                        <p class="title_money">充值成功：{{ item.amount }}</p>
                    </div>
                    <div v-else class="detail_line_item" @click="toDetail(item.id)">
                        <div class="status">
                            <span>{{ item.status }}</span>
                            <span :class="item.status=='充值失败'?'c545454':'money'">{{ item.amount }}</span>
                        </div>
                        <div class="detail_time">
                            <p>{{ item.date }}</p>
                        </div>
                    </div>
                </van-cell>          
            </van-list>
        </van-pull-refresh>
        <!-- <p class="load-more" v-show="pageNum < totalPage" @click="moreWaitBor()">点击加载更多</p>
        <p class="no-more" v-show="pageNum >= totalPage">没有更多数据了</p> -->
    </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      isLoading: false,
      payup: 0,
      pageNum: 0, //当前页
      totalPage: 1, //总页数
      payList: [],
      listLoading: false,
      listFinished: false,
      height: 0,
      //   mouthlist:[],
      isTitleTop: false
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.paySum();
    this.chongzhi();
    this.autoHeight();
  },
  mounted() {
    $("#app").css("padding-bottom", "0");
  },
  methods: {
    listLoad() {
      setTimeout(() => {
        this.chongzhi();
      }, 800);
    },
    onRefresh() {
      this.pageNum = 0;
      this.totalPage = 1;
      this.listFinished = false;
      this.listLoading = true;
      setTimeout(() => {
        this.paySum();
        this.chongzhi(1);
        this.isLoading = false;
      }, 500);
    },
    autoHeight() {
      this.height = document.documentElement.clientHeight;
    },
    //    <-------- 累计充值 ------->
    paySum() {
      let _this = this;
      let data = {};
      this.$http
        .post("/api/assets/rechargeRecordSum", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          let resData = response.data;
          _this.payup = resData.result.data.sumamount;
        });
    },
    //    <-------- 充值记录 ------->
    chongzhi(type) {
      let thatData = this;
      if (thatData.pageNum < thatData.totalPage) {
        let data = {
          pageNum: ++thatData.pageNum
        };
        this.$http
          .post("/api/assets/rechargeRecords", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(res)
            let resData = response.data;
            if (resData.status == 0) {
              if (type == 1) {
                thatData.payList = [];
              }
              for (var i = 0; i < resData.result.data.length; i++) {
                thatData.payList.push(resData.result.data[i]);
              }
              thatData.totalPage = resData.result.pageEntity.totalPage; //总页数
              thatData.listLoading = false;
            }
          });
      } else {
        thatData.listLoading = false;
        thatData.listFinished = true;
      }
    },
    //    <-------- 跳转详情 ------->
    toDetail(id) {
      this.$router.push({ path: "/recDetail", query: { id: id } });
    }
  }
};
</script>
<style lang='scss' scoped>
.re_record {
  .total_success {
    position: fixed;
    z-index: 999;
    width: 100%;
    font-size: 0.28rem;
    color: rgba(84, 84, 84, 1);
    line-height: 1;
    background: #fff;
    height: 0.98rem;
    padding-left: 0.3rem;
    display: flex;
    align-items: center;
  }
  .month_list {
    padding-top: 0.98rem;
  }
  .month_list .month_list_item {
    .month_title {
      padding: 0.2rem 0.3rem;
      .title_date {
        font-size: 0.28rem;
        color: rgba(84, 84, 84, 1);
        line-height: 1;
      }
      .title_money {
        font-size: 0.24rem;
        color: rgba(153, 153, 153, 1);
        line-height: 1;
        margin-top: 0.18rem;
      }
    }
    .detail_line_item {
      padding: 0.2rem 0.3rem;
      position: relative;
      background: rgba(255, 255, 255, 1);
      &::after {
        content: "";
        bottom: 0;
        left: 0.3rem;
        position: absolute;
        width: 13.8rem;
        height: 1px;
        border-bottom: 1px solid #ddd;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
    .status {
      font-size: 0.28rem;
      color: rgba(84, 84, 84, 1);
      line-height: 1;
      display: flex;
      justify-content: space-between;
      .money {
        font-size: 0.28rem;
        color: rgba(255, 86, 55, 1);
        line-height: 1;
      }
    }
    .detail_time {
      font-size: 0.24rem;
      color: rgba(153, 153, 153, 1);
      line-height: 1;
      margin-top: 0.22rem;
    }
  }
}
.isFixed {
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 999;
}
.c545454 {
  color: #545454;
}
p.load-more {
  font-size: 12px;
  line-height: 38px;
  text-align: center;
  color: #999;
  position: relative;
}

p.no-more {
  font-size: 12px;
  line-height: 38px;
  text-align: center;
  color: #ccc;
  position: relative;
}
</style>