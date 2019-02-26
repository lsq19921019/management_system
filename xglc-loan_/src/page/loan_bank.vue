<template>
  <div>
    <div class="list">
      <p class="title">限额不够用，可在我的-银行卡页面更换银行卡充值</p>
      <ul>
        <li v-for="(bankVal,index) in bankList" :key="index">
          <div class="bank-img">
            <img :src="bankVal.bankLogo">
          </div>
          <div class="bank-text">
            <p class="bank-title">{{bankVal.bankName}}</p>
            <p class="bank-num">单笔{{bankVal.limitOne}}，单日{{bankVal.limitDay}}</p>
          </div>
          <div style="clear: both;"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bankList: []
    }
  },
  created() {
    //this.chBg("#fcfcfc")
  },
  mounted() {
    this.getBank()
  },
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg
    },
    getBank: function() {
      var that = this

      var data = {}

      this.$http.post('/api/assets/bankLimitsList', this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response.data)
          let resData = response.data
          if (resData.status == 0) {
            for (var i = 0; i < resData.result.bankLimitsResultEntity.length; i++) {
              let bankName = resData.result.bankLimitsResultEntity[i]
              that.bankList.push(bankName)
            }
          } else {
            mui.alert(response.data.msg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}

</script>
<style scoped>
@import '../style/css/loan_bank.css'

</style>
