<!-- 投资-产品详情 -->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="inv-tendet">
      <div class="title border-one-half-bottom">
        <p>基本信息</p>
      </div>
      <div class="basic-info in-padding" style="padding-top: 10px;padding-bottom: 10px;">
        <div class="info-list clear">
          <div class="full"><span>名称</span><span>{{planTitle}}</span></div>
        </div>
        <div class="info-list clear">
          <div class="full"><span>期限</span><span>{{lockPeriod}}</span></div>
        </div>
        <div class="info-list clear">
          <div class="full"><span>起息时间</span><span>{{interestDate}}</span></div>
        </div>
        <div class="info-list clear">
          <div class="full"><span>出借范围</span><span>{{matchRules}}</span></div>
        </div>
        <div class="info-list clear">
          <div class="full"><span>还款方式</span><span>{{repaymentType}}</span></div>
        </div>
        <div class="info-list clear" v-if="riskgrade">
          <div class="full"><span>加入建议</span><span>建议风险测评等级为“<span v-if="riskgrade * 1 == 1">谨慎型</span><span v-else-if="riskgrade * 1 == 2">稳健型</span><span v-else-if="riskgrade * 1 == 3">平衡型</span><span v-else-if="riskgrade * 1 == 4">成长型</span><span v-else-if="riskgrade * 1 == 5">进取型</span>”及以上的出借人加入</span></div>
        </div>
      </div>
      <div class="title border-one-half-bottom">
        <p>产品介绍</p>
      </div>
      <div class="pro-descrip in-padding">
        <div class="text-line">
          <p>{{productIntru}}</p>
        </div>
      </div>
      <div class="title border-one-half-bottom">
        <p>产品原理</p>
      </div>
      <div class="pro-princ in-padding">
        <div class="text-line">
          <p v-html="productReason"></p>
        </div>
      </div>
      <div class="title border-one-half-bottom" v-if="riskgrade">
        <p>风险等级</p>
      </div>
      <div class="pro-princ in-padding" v-if="riskgrade">
        <div class="text-line">
          <p v-if="riskgrade * 1 == 1">低风险级别<br>理财投资本金没有风险，理财投资收益具有一定的不确定性；或者理财投资本金遭受损失的可能性极低，在本金未遭受损失的前提下，实现理财投资收益的可能性很高。</p>
          <p v-else-if="riskgrade * 1 == 2">较低风险级别<br>理财投资本金遭受损失的可能性较低，在本金未遭受损失的前提下，实现理财投资收益的可能性较高。</p>
          <p v-else-if="riskgrade * 1 == 3">中等风险级别<br>理财投资本金的安全具有一定的不确定性，理财投资收益具有较大的不确定性。</p>
          <p v-else-if="riskgrade * 1 == 4">较高风险级别<br>理财投资本金和理财投资收益都面临较大的不确定性。</p>
          <p v-else-if="riskgrade * 1 == 5">高风险级别<br>理财投资本金和理财投资收益都面临极大的不确定性。</p>
        </div>
      </div>
      <div class="title border-one-half-bottom">
        <p>常见问题</p>
      </div>
      <div class="com-problem in-padding">
        <div class="problem-line" v-for="(question,index) in interlocutions" :key="index">
          <p class="question"><img src="/static/img/wap_invest_tendetail.png">{{question.question}}</p>
          <p class="answer" v-html="question.answer"></p>
        </div>
      </div>
      <div class="title border-one-half-bottom">
        <p>温馨提示</p>
      </div>
      <div class="cozy-prompt in-padding" style="padding-bottom: 0;padding-top: 12px;">
        <div class="text border-one-half-bottom">
          <p>合理把控风险，理性决策投资</p>
        </div>
        <div class="prompt">
          <router-link to="/risk_warning">查看《风险提示书》<img src="/static/img/wap_invest_index_01.png"></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      planId: "",
      planTitle: "", //基本信息 - 名称
      lockPeriod: "", //基本信息 - 期限
      interestDate: "", //基本信息 - 起息时间
      matchRules: "", //基本信息 - 匹配规则
      repaymentType: "", //基本信息 - 还款方式
      planType: "", //常见问题的key
      productIntru: "", //产品介绍
      productReason: "", //产品原理
      riskgrade: "", //风险等级
      interlocutions: {} //常见问题
    };
  },
  components: {
    wapAlert
  },
  created: function() {
    this.getUrlData();
    this.postData();
  },
  mounted: function() {},
  methods: {
    getUrlData: function() {
      let thatData = this;
      thatData.planId = thatData.$route.params.planId;
    },
    postData: function() {
      let thatData = this;

      let data = {
        planId: thatData.planId
      };

      this.$http
        .post("/api/finance/planProductDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.planTitle = resData.result.planTitle;
            thatData.lockPeriod = resData.result.lockPeriod;
            thatData.interestDate = resData.result.interestDate;
            thatData.matchRules = resData.result.matchRules;
            thatData.repaymentType = resData.result.repaymentType;
            thatData.planType = resData.result.planType;
            thatData.productIntru = resData.result.productIntru;
            thatData.productReason = resData.result.productReason;
            thatData.riskgrade = resData.result.riskgrade;
            thatData.postQuestion();
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postQuestion: function() {
      let thatData = this;

      let data = {
        planType: thatData.planType
      };

      this.$http
        .post("/api/help/interlocution", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.interlocutions = resData.result.interlocutions;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
@import "../../../style/css/wap_invest_tendetail.css";
</style>
