<!--
  create : dxc 2018-09-17
  desc : 资产-借款项目列表
  update : 
  desc : 
-->
<template>
  <div class="loan_project">
    <wap-alert ref="alert"></wap-alert>
    <div class="top_tips" v-if="$route.params.channel*1 == 1">
      <p>{{borrowNum}}，{{waitBorrow}}</p>
    </div>
    <div class="content_list" :class="{'channel':$route.params.channel*1 == 1}">
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        @load="listLoad"
        :loading-text="'加载中...'"
      >
        <van-cell
          v-for="(matche,index) in loanList"
          :key="index"
          :name="index"
          @click="goLoanDetails(matche.id,matche.type,matche.assRecordId)"
        >
          <div class="list_title border-one-half-bottom">
            <p class="c333">
              {{matche.title}}
              <span class="ce8ae31">{{matche.webStatusDesc}}</span>
            </p>
          </div>
          <div class="list_detail">
            <p class="c666">
              {{matche.investAmount}}
              <span>{{matche.operateDate}}</span>
            </p>
            <p class="c999">
              出借金额(元)
              <span v-if="matche.status*1 == 1">出借时间</span>
              <span
                v-else-if="matche.status*1 == 2 || matche.status*1 == 3 || matche.status*1 == 4"
              >到期时间</span>
              <span v-else-if="matche.status*1 == 5">转让时间</span>
              <span v-else-if="matche.status*1 == 6 || matche.status*1 == 7">结清时间</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      pageNum: 0,
      totalPage: 1,
      borrowNum: "",
      waitBorrow: "",
      loanList: [],
      listLoading: false,
      listFinished: false
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.hiddenRightButton();
    this.postLoanList();
  },
  mounted() {},
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
    listLoad() {
      setTimeout(() => {
        this.postLoanList();
      }, 800);
    },
    goLoanDetails(id, type, recordId) {
      this.$router.push({
        path: "/assets_loandetails_sb/" + id + "/" + type + "/" + recordId
      });
    },
    postLoanList() {
      let thatData = this;
      if (thatData.pageNum < thatData.totalPage) {
        let data = {
          investId: thatData.$route.params.id,
          repayDate: thatData.$route.params.date
            ? thatData.$route.params.date
            : "",
          pageNum: ++thatData.pageNum
        };

        this.$http
          .post("/api/assets/myInvestMatchProj", this.$qs.stringify(data), {
            headers: base.ajaxHeadersWithToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              thatData.borrowNum = resData.result.borrowNum;
              thatData.waitBorrow = resData.result.waitBorrow;
              thatData.totalPage = resData.result.pageEntity.totalPage * 1;
              if (resData.result.matchesList.length > 0) {
                for (var i = 0; i < resData.result.matchesList.length; i++) {
                  thatData.loanList.push(resData.result.matchesList[i]);
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
.loan_project {
  .top_tips {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    padding: 0.22rem 0.38rem;
    background: #ffebe7;
    p {
      font-size: 0.26rem;
      line-height: 0.26rem;
      color: #ae6262;
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
          span {
            float: right;
            font-size: 0.24rem;
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
  }
  .content_list.channel {
    padding-top: 0.7rem;
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
    color: #333;
  }
  .ce8ae31 {
    color: #e8ae31;
  }
}
</style>