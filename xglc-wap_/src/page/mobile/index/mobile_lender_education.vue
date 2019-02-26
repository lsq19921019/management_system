<template>
  <div>
    <div class="lender-edu" :style="{height:height + 'px'}">
      <div class="open-text">
        <p>《网络借贷信息中介机构业务活动管理暂行办法》第九条规定网络借贷信息中介机构应当履行下列义务：“持续开展网络借贷知识普及和风险教育活动，加强信息 披露工作，引导出借人以小额分散的方式参与网络借贷，确保出借人充分知悉借贷风险”。平台根据监管规定开立专门的出借人教育专栏，并分为“法律法规”和“风险提示”栏目，供平台用户了解学习。
        </p>
      </div>
      <div class="href-line">
        <div class="padding-in" @click="$router.push({ path: '/laws_regula' })">
          <div class="line">
            <span>法律法规</span><img src="/static/img/wap_invest_index_01.png">
          </div>
        </div>
        <div class="padding-in" @click="$router.push({ path: '/regula_auth' })">
          <div class="line">
            <span>监管机构</span><img src="/static/img/wap_invest_index_01.png">
          </div>
        </div>
        <div class="padding-in" @click="$router.push({ path: '/risk_warning' })">
          <div class="line" style="border-bottom: none;">
            <span>风险提示</span><img src="/static/img/wap_invest_index_01.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: "",
    }
  },
  mounted() {
    this.autoBg()
  },
  methods: {
    autoBg: function() {
      this.height = document.documentElement.clientHeight
    },
  }
}

</script>
<style scoped>
@import "../../../style/css/mobile_lender_education.css";

</style>
