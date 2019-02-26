<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :pulling-text="'下拉刷新'" :loosing-text="'释放即可刷新'" :loading-text="'刷新中...'">
        <div class="founds-records" :style="{'min-height':height + 'px'}">
            <div class="types-of-line border-one-half-bottom in-padding">
                <span class="type-title">类型筛选</span>
                <a href="javascript:;" class="check-types" @click="showTypeList = !showTypeList">{{onType}}<img src="/static/img/wap_assets_center_05.png" :class="{'click':showTypeList}"></a>
                <div class="types-list mui-content" v-show="showTypeList">
                <ul class="mui-row">
                    <li class="mui-col-xs-4" v-for="(type,index) in typeList" :key="index">
                    <a href="javascript:;" :class="{'active':onType == type}" @click="clickType(type)">{{type}}</a>
                    </li>
                </ul>
                </div>
            </div>
            <div class="block" v-show="showTypeList" @touchstart="showTypeList = !showTypeList"></div>
            <div class="list-content">
                <van-list v-model="listLoading" :finished="listFinished" @load="listLoad" :loading-text="'加载中...'" v-if="listData.length != 0">
                    <van-cell v-for="(data,index) in arrayData" :key="index" :name="index">
                        <div class="date-line in-padding">
                            <p>{{data[0].time2.substring(0,4)}}年{{data[0].time2.substring(5,7)}}月</p>
                        </div>
                        <div class="data-line in-padding" :class="{'border-one-half-bottom': index + 1 != data.length}" v-for="(line,index) in data" :key="index">
                            <router-link :to="'/assets_funds_records_detail/' + line.id">
                                <p class="top"><span class="left-top">{{line.type}}</span><span class="right-top" :class="{'plus':line.amount.substr(0,1) == '+','minus':line.amount.substr(0,1) == '-'}">{{line.amount}}</span></p>
                                <p class="bottom"><span class="left-bottom">{{line.time}}</span><span class="right-bottom">{{line.balance}}</span></p>
                            </router-link>
                        </div>
                    </van-cell>
                </van-list>
                <div v-else class="empty">
                    <img src="/static/img/wap_invest_my_coupon_05.png">
                    <p>暂时没有此类记录</p>
                </div>
                <!-- <div class="load" v-show="listData.length != 0">
                    <p class="load-more" @click="lock || postList()" v-if="pageNum < totalPage">点击加载更多</p>
                    <p class="no-more" v-else>已经全部加载</p>
                </div> -->
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
      showTypeList: false,
      onType: "全部",
      typeList: [
        "全部",
        "投资",
        "本金回款",
        "利息回款",
        "利息管理费",
        "充值",
        "提现",
        "购买债权",
        "债权转让",
        "债权转让折扣",
        "债权转让手续费",
        "奖励",
        "退款",
        "垫付利息",
        "其他"
      ],
      listData: [],
      arrayData: [],
      pageNum: 0,
      totalPage: 1,
      height: 0,
      listLoading: false,
      listFinished: false
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.postList();
    this.autoHeight();
  },
  mounted() {},
  methods: {
    listLoad() {
      setTimeout(() => {
        this.postList();
      }, 800);
    },
    onRefresh() {
      this.pageNum = 0;
      this.totalPage = 1;
      setTimeout(() => {
        this.postList(1);
        this.isLoading = false;
        //this.listLoad();
      }, 500);
    },
    autoHeight() {
      this.height = document.documentElement.clientHeight - 8;
    },
    postList(type) {
      let thatData = this;

      if (thatData.pageNum < thatData.totalPage) {
        let data = {
          functionMode: thatData.onType,
          pageNum: ++thatData.pageNum
        };

        this.$http
          .post("/api/assets/transactionList", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              if (type == 1) {
                thatData.listData = [];
              }
              for (var z = 0; z < resData.result.list.length; z++) {
                thatData.listData.push(resData.result.list[z]);
              }
              thatData.arrayFunction();
              thatData.totalPage = resData.result.pageEntity.totalPage * 1;
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
    },
    arrayFunction() {
      let thatData = this;

      let d = [];
      let a = 0;
      d[a] = [thatData.listData[0]];
      for (var i = 1; i < thatData.listData.length; i++) {
        let t = thatData.listData[i]["time2"].split("-");
        let f = thatData.listData[i - 1]["time2"].split("-");
        if (t[1] == f[1]) {
          d[a].push(thatData.listData[i]);
        } else {
          a = a + 1;
          d[a] = [];
          d[a].push(thatData.listData[i]);
        }
      }
      thatData.arrayData = d;
    },
    clickType(type) {
      let thatData = this;

      thatData.showTypeList = !thatData.showTypeList;
      thatData.onType = type;
      thatData.listData = [];
      thatData.pageNum = 0;
      thatData.totalPage = 1;
      thatData.postList();
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_assets_funds_records.css";
</style>
