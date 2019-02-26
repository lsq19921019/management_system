<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="match-detail">
      <div class="top-money">
        <h5>{{investAmount}}元</h5>
        <p class="title">加入金额</p>
        <p class="wait" v-show="waitMatchAmount"><img src="/static/img/wap_invest_match_details.png">{{waitMatchAmount}}</p>
      </div>
      <div class="person-list">
        <div class="list-title mui-row">
          <span class="mui-col-xs-3">借款人</span>
          <span class="mui-col-xs-4">出借金额(元)</span>
          <span class="mui-col-xs-2">期限</span>
          <span class="mui-col-xs-3">出借日期</span>
        </div>
        <ul>
          <li v-for="(entities,index) in detailListEntities" :key="index">
            <div :class="{'border-one-half-bottom':index!=detailListEntities.length-1}">
              <div class="investor-line mui-row">
                <span class="mui-col-xs-3">{{entities.borrower}}</span>
                <span class="mui-col-xs-4">{{entities.amount}}</span>
                <span class="mui-col-xs-2">{{entities.lockperiod}}</span>
                <span class="mui-col-xs-3">{{entities.matchDate}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="more">
          <p class="load-more" @click="lock || postData()" v-if="pageNum < totalPage">点击加载更多</p>
          <p class="no-more" v-else>已经全部加载</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from '../wap_alert.vue';
export default {
  data() {
    return {
      planRecordId: "",
      waitMatchAmount: "",
      investAmount: "",
      pageNum: 0,
      totalPage: 0,
      lock: false,
      detailListEntities: [],
    }
  },
  components: {
    wapAlert
  },
  created: function() {
    this.saveId()
    this.postData()
  },
  mounted: function() {},
  methods: {
    saveId: function() {
      let thatData = this
      thatData.planRecordId = thatData.$route.params.planRecordId
    },
    postData: function() {
      let thatData = this
      thatData.lock = true
      let data = {
        planRecordId: thatData.planRecordId,
        pageNum: thatData.pageNum + 1,
      }

      this.$http.post('/api/finance/planXMatchTrendDetail', this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            thatData.pageNum++
              for (var i = 0; i < resData.result.detailListEntities.length; i++) {
                thatData.detailListEntities.push(resData.result.detailListEntities[i])
              }
            thatData.totalPage = resData.result.pageEntity.totalPage * 1
            thatData.waitMatchAmount = resData.result.waitMatchAmount
            thatData.investAmount = resData.result.investAmount
            thatData.lock = false
          } else {
            mui.toast(resData.msg, { duration: 1000, type: 'div' })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
}

</script>
<style scoped>
@import "../../../style/css/wap_invest_match_details.css";

</style>
