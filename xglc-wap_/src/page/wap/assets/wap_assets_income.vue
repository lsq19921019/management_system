<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="income">
      <div class="top-assets margin-b">
        <h5>{{totalProceeds}}</h5>
        <p>累计收益(元)<img src="/static/img/mobile_repay_calend.png" @click="muialert"></p>
      </div>
      <div class="content-data margin-b">
        <p v-for="(income,index) in totalIncome.totalIncomeList" :class="{'border-one-half-bottom':index==0}" :key="index"><span class="left">{{income.key}}</span><span class="right">{{income.value}}</span></p>
      </div>
      <div class="content-data margin-b">
        <p v-for="(income,index) in totalIncome.totalIncomeList2" :class="{'border-one-half-bottom':index==0}" :key="index"><span class="left">{{income.key}}</span><span class="right">{{income.value}}</span></p>
      </div>
      <div class="content-data margin-b">
        <p v-for="(income,index) in totalIncome.totalIncomeList3" :class="{'border-one-half-bottom':index==0}" :key="index"><span class="left">{{income.key}}</span><span class="right">{{income.value}}</span></p>
      </div>
      <div class="content-data margin-b">
        <p v-for="(income,index) in totalIncome.totalIncomeList4" :class="{'border-one-half-bottom':index==0}" :key="index"><span class="left">{{income.key}}</span><span class="right">{{income.value}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from '../wap_alert.vue'
export default {
  data() {
    return {
      totalIncome: {},
      totalProceeds: 0,
    }
  },
  components: {
    wapAlert
  },
  created() {
    this.postData()
    this.totalProceeds = this.$route.query.totalProceeds
  },
  mounted() {

  },
  methods: {
    muialert: function() {
      mui.alert('<p style="text-align:left;">1、累计收益=利息+加息收益+投资红包+加息券+利息奖励+现金红包<br>2、利息包含回款利息、逾期罚息</p>', " ", "确定")
    },
    postData: function() {
      let thatData = this

      let data = {}

      this.$http.post('/api/assets/totalIncomeNew', this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            thatData.totalIncome = resData.result
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
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
@import "../../../style/css/wap_assets_income.css";

</style>
