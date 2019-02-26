<template>
  <div>
    <div class="detail">
      <div class="basic-info in-padding">
        <div class="title">
          <p>基本信息</p>
        </div>
        <div class="info-list pt">
          <div class="full clear"><span>项目名称</span><span>{{borrowTitle}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>借款金额</span><span>{{borrowAmount}}元</span></div>
        </div>
        <div class="info-list" v-show="loanDate" v-if="formBor">
          <div class="full clear"><span>借款日期</span><span>{{loanDate}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>期限</span><span>{{deadLineDesc}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>年化利率</span><span>{{annualRate}}</span></div>
        </div>
        <div class="info-list" v-show="interestDate" v-if="formBor">
          <div class="full clear"><span>起息日</span><span>{{interestDate}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>还款方式</span><span>{{paymentModeDesc}}</span></div>
        </div>
        <div class="info-list" v-if="formBor">
          <div class="full clear"><span>已还本金</span><span>{{returnPrincipal}}元</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>借款用途</span><span>{{useOfLoan}}</span></div>
        </div>
        <div class="info-list" v-show="loanType == '4'">
          <div class="full clear"><span>信用风险缓释措施</span><span>{{safeguard}}</span></div>
        </div>
        <div class="info-list" v-show="deadLineDescNum <= 50">
          <div class="full clear"><span>还款说明</span><span>短期授信额度借款项目，按实际使用期限进行还款</span></div>
        </div>
        <div class="info-list pb" v-show="payment">
          <div class="full clear"><span>还款来源</span><span>{{payment}}</span></div>
        </div>
      </div>
      <div class="introduction in-padding">
        <div class="title">
          <p>项目介绍</p>
        </div>
        <div class="int-text">
          <p>{{proIntroduce}}</p>
        </div>
      </div>
      <div class="introduction in-padding" v-show="riskLevel">
        <div class="title">
          <p>项目风险等级</p>
        </div>
        <div class="int-text">
          <p v-if="riskLevel * 1 == 1">低风险级别<br>理财投资本金没有风险，理财投资收益具有一定的不确定性；或者理财投资本金遭受损失的可能性极低，在本金未遭受损失的前提下，实现理财投资收益的可能性很高。</p>
          <p v-else-if="riskLevel * 1 == 2">较低风险级别<br>理财投资本金遭受损失的可能性较低，在本金未遭受损失的前提下，实现理财投资收益的可能性较高。</p>
          <p v-else-if="riskLevel * 1 == 3">中等风险级别<br>理财投资本金的安全具有一定的不确定性，理财投资收益具有较大的不确定性。</p>
          <p v-else-if="riskLevel * 1 == 4">较高风险级别<br>理财投资本金和理财投资收益都面临较大的不确定性。</p>
          <p v-else-if="riskLevel * 1 == 5">高风险级别<br>理财投资本金和理财投资收益都面临极大的不确定性。</p>
        </div>
      </div>
      <div class="er-info in-padding" v-show="borrowway=='1'&&loanType!='4'">
        <div class="title">
          <p>借款人信息</p>
        </div>
        <div class="info-list pt">
          <div class="full clear"><span>姓名</span><span>{{realName}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>年龄</span><span>{{age}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>性别</span><span>{{sex}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>婚姻</span><span>{{maritalStatus}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>有无房产</span><span><span v-if="assetsT * 1 == 1">有</span><span v-else>无</span></span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>有无车产</span><span><span v-if="assetsT * 1 == 1">无</span><span v-else>有</span></span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>居住地址</span><span>{{address}}</span></div>
        </div>
        <div class="info-list" v-show="industry">
          <div class="full clear"><span>所属行业</span><span>{{industry}}</span></div>
        </div>
        <div class="info-list" v-show="income">
          <div class="full clear"><span>收入情况</span><span>{{income}}</span></div>
        </div>
        <div class="info-list" v-show="labilities">
          <div class="full clear"><span>负债情况</span><span>{{labilities}}</span></div>
        </div>
        <div class="info-list" v-show="creditOverdueNumber">
          <div class="full clear"><span>征信情况</span><span>{{creditOverdueNumber}}</span></div>
        </div>
        <div class="info-list pb" v-show="loanSituation">
          <div class="full clear"><span>在其他网贷平台借款情况</span><span>{{loanSituation}}</span></div>
        </div>
      </div>
      <div class="com-info in-padding" v-show="borrowway=='2'||loanType=='4'">
        <div class="title">
          <p>企业信息</p>
        </div>
        <div class="info-list pt">
          <div class="full clear">
            <span>企业名称</span><span>{{companyName}}</span>
          </div>
        </div>
        <div class="info-list">
          <div class="full clear">
            <span>营业执照编号</span><span>{{companyNo}}</span>
          </div>
        </div>
        <div class="info-list">
          <div class="full clear">
            <span>法人代表姓名</span><span>{{realName}}</span>
          </div>
        </div>
        <div class="info-list" v-show="industry">
          <div class="full clear"><span>所属行业</span><span>{{industry}}</span></div>
        </div>
        <div class="info-list" v-show="income">
          <div class="full clear"><span>营收情况</span><span>{{income}}</span></div>
        </div>
        <div class="info-list" v-show="labilities">
          <div class="full clear"><span>负债情况</span><span>{{labilities}}</span></div>
        </div>
        <div class="info-list" v-show="creditOverdueNumber">
          <div class="full clear"><span @click="tips">征信情况<img src="/static/img/wap_invest_confir_transfer_03.png"></span><span>{{creditOverdueNumber}}</span></div>
        </div>
        <div class="info-list pb" v-show="loanSituation">
          <div class="full clear"><span>在其他网贷平台借款情况</span><span>{{loanSituation}}</span></div>
        </div>
      </div>
      <div class="estate-info in-padding" v-show="assetsT=='1'&&loanType!='4'">
        <div class="title">
          <p>房产信息</p>
        </div>
        <div class="info-list pt">
          <div class="full clear"><span>所处位置</span><span>{{col1Value}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>房屋面积</span><span>{{col2Value}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>评估价值</span><span>{{col3Value}}</span></div>
        </div>
        <div class="info-list pb">
          <div class="full clear"><span>产权性质</span><span>商品房</span></div>
        </div>
      </div>
      <div class="car-info in-padding" v-show="assetsT=='2'&&loanType!='4'">
        <div class="title">
          <p>车产信息</p>
        </div>
        <div class="info-list pt">
          <div class="full clear"><span>车辆品牌</span><span>{{col1Value}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>车牌号</span><span>{{col2Value}}</span></div>
        </div>
        <div class="info-list pb">
          <div class="full clear"><span>评估价值</span><span>{{col3Value}}</span></div>
        </div>
      </div>
      <div class="car-info in-padding" v-show="assetsT=='3'&&loanType!='4'">
        <div class="title">
          <p>车辆信息</p>
        </div>
        <div class="info-list">
          <div class="full clear"><span>两地牌车牌号</span><span>{{col1Value}}</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>以租代购合同价格</span><span>{{col2Value}}</span></div>
        </div>
      </div>
      <div class="estate-info in-padding">
        <div class="title">
          <p>借款记录</p>
        </div>
        <!-- <div class="info-list">
          <div class="full clear"><span>累计借款笔数</span><span>{{accumulativeNum}}笔</span></div>
        </div> -->
        <div class="info-list pt">
          <div class="full clear"><span>已还清笔数</span><span>{{reimbursementNum}}笔</span></div>
        </div>
        <div class="info-list">
          <div class="full clear"><span>待还款笔数</span><span>{{repaymentsNum}}笔</span></div>
        </div>
        <div class="info-list pb">
          <div class="full clear"><span>历史逾期笔数</span><span>{{overdueNum}}笔</span></div>
        </div>
      </div>
      <div v-if="formBor">
          <div v-show="borrowStatus * 1 == 4 || borrowStatus * 1 == 5">
            <div class="estate-info in-padding" v-show="fundUtilization || financialSituation || repaymentAbility || complaint || administrativeSanction || majorInformation">
                <div class="title">
                <p>项目贷后情况</p>
                </div>
                <div class="info-list pt" v-show="fundUtilization">
                <div class="full clear"><span>借款资金运用情况</span><span>{{fundUtilization}}</span></div>
                </div>
                <div class="info-list" v-show="financialSituation">
                <div class="full clear"><span>借款人经营状况及财务状况</span><span>{{financialSituation}}</span></div>
                </div>
                <div class="info-list" v-show="repaymentAbility">
                <div class="full clear"><span>借款人还款能力变化</span><span>{{repaymentAbility}}</span></div>
                </div>
                <div class="info-list" v-show="complaint">
                <div class="full clear"><span>借款人涉诉情况</span><span>{{complaint}}</span></div>
                </div>
                <div class="info-list" v-show="administrativeSanction">
                <div class="full clear"><span>借款人受行政处罚情况</span><span>{{administrativeSanction}}</span></div>
                </div>
                <div class="info-list pb" v-show="majorInformation">
                <div class="full clear"><span>可能影响借款人还款的重大情况</span><span>{{majorInformation}}</span></div>
                </div>
            </div>
          </div>
      </div>
      <div class="risk-ctr in-padding">
        <div class="title">
          <p>资质审核<span class="right_title" v-if="imageNum * 1 > 0" @click="goDetailImg()">资料展示<img src="/static/img/wap_invest_index_01.png"></span></p>
        </div>
        <div style="padding-top:.12rem;"></div>
        <div class="icon-box">
            <p v-for="(audit,index) in riskAudit" :key="index"><img src="/static/img/mobile_project_details_icon.png">{{audit}}</p>
            <div style="clear:both;"></div>
        </div>
      </div>
      <div class="risk-ctr in-padding">
        <div class="title">
          <p>温馨提示</p>
          <p class="subtitle">合理把控风险，理性决策投资</p>
        </div>
        <div class="to-riskwarn">
          <router-link to="/risk_warning">查看《风险提示书》<img src="/static/img/wap_invest_index_01.png"></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      borrowStatus: "", //1 默认等待资料 2 正在招标中 3 已满标 4 还款中 5 已还完 6 流标
      borrowTitle: "", //项目名称
      borrowAmount: "", //借款金额
      loanDate: "", //借款日期
      deadLineDesc: "", //借款期限
      deadLineDescNum: "", //借款期限
      annualRate: "", //年化利率
      interestDate: "", //起息日
      paymentModeDesc: "", //还款方式
      returnPrincipal: "0", //已还本金
      useOfLoan: "", //借款用途
      payment: "", //还款来源
      safeguard: "", //信用风险缓释措施

      proIntroduce: "", //项目介绍文案

      riskLevel: "", //项目风险等级

      loanType: "", //贷款类型

      borrowway: "", //借款人 1个人 2企业
      realName: "", //借款人 个人姓名 企业法人代表
      age: "", //借款人 个人年龄
      sex: "", //借款人 个人性别
      maritalStatus: "", //借款人 个人婚姻状况
      address: "", //借款人 个人居住地址

      companyName: "", //借款人 企业名称
      companyNo: "", //借款人 企业营业执照编号

      industry: "", //所属行业
      income: "", //收入情况/营收情况
      labilities: "", //负债情况
      creditOverdueNumber: "", //征信情况
      loanSituation: "", //在其他网贷平台借款情况

      assetsT: "", //抵押方式 1房产2车产
      col1Value: "", //房产地址 or 车辆品牌
      col2Value: "", //建筑面积 or 车牌号
      col3Value: "", //评估价格
      col4Value: "", //房产 产权性质
      formBor: true, //是否从待出接页面跳转

      //accumulativeNum: "", //累计借款笔数
      reimbursementNum: "", //已还清笔数
      repaymentsNum: "", //待还款笔数
      overdueNum: "", //历史逾期笔数

      fundUtilization: "", //借款资金运用情况
      financialSituation: "", //借款人经营状况及财务状况
      repaymentAbility: "", //借款人还款能力变化
      complaint: "", //借款人涉诉情况
      administrativeSanction: "", //借款人受行政处罚情况
      majorInformation: "", //可能影响借款人还款的重大情况

      imageNum: "", //图片数量

      riskAudit: [] //风险措施
    };
  },
  created() {
    this.chBg("#f2f2f2");
    this.isBor();
  },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  methods: {
    goDetailImg() {
      location.href = "/pro_det_img?borrowId=" + this.$route.query.borrowId;
    },
    tips() {
      mui.alert("指近6个月内借款人征信报告中的逾期情况", "征信情况");
    },
    //是否从待出接页面跳转
    isBor: function() {
      let that = this;
      if (this.$route.query.type == 1) {
        that.formBor = false;
      }
    },
    postData: function() {
      let that = this;
      var borrowId = this.$route.query.borrowId;

      var data = {
        borrowId: borrowId
      };

      this.$http
        .post("/api/borrow/borrowDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            that.proIntroduce = resData.result.proIntroduce;
            that.useOfLoan = resData.result.useOfLoan;
            that.borrowStatus = resData.result.borrowStatus;
            that.borrowTitle = resData.result.borrowTitle;
            that.borrowAmount = resData.result.borrowAmount;
            that.loanDate = resData.result.loanDate;
            that.deadLineDesc = resData.result.deadLineDesc;
            if (that.deadLineDesc.indexOf("天") > 0) {
              that.deadLineDescNum = parseInt(that.deadLineDesc);
            } else if (that.deadLineDesc.indexOf("月") > 0) {
              that.deadLineDescNum = parseInt(that.deadLineDesc) * 30;
            }
            that.annualRate = resData.result.annualRate;
            that.interestDate = resData.result.interestDate;
            that.paymentModeDesc = resData.result.paymentModeDesc;
            that.returnPrincipal = resData.result.returnPrincipal;
            that.payment = resData.result.payment;
            that.riskLevel = resData.result.riskLevel;
            that.industry = resData.result.industry;
            that.income = resData.result.income;
            that.labilities = resData.result.labilities;
            that.creditOverdueNumber = resData.result.creditOverdueNumber;
            that.loanSituation = resData.result.loanSituation;
            //that.accumulativeNum = resData.result.accumulativeNum;
            that.reimbursementNum = resData.result.reimbursementNum;
            that.repaymentsNum = resData.result.repaymentsNum;
            that.overdueNum = resData.result.overdueNum;
            that.fundUtilization = resData.result.fundUtilization;
            that.financialSituation = resData.result.financialSituation;
            that.repaymentAbility = resData.result.repaymentAbility;
            that.complaint = resData.result.complaint;
            that.administrativeSanction = resData.result.administrativeSanction;
            that.majorInformation = resData.result.majorInformation;
            that.imageNum = resData.result.imageNum;

            if (resData.result.loanType == "小微企业贷") {
              that.loanType = "4";
              that.safeguard = resData.result.safeguard;
            }

            if (resData.result.borrowway == "1") {
              that.borrowway = "1";
              that.age = resData.result.age;
              that.sex = resData.result.sex;
              that.address = resData.result.address;
              that.maritalStatus = resData.result.maritalStatus;
            } else if (resData.result.borrowway == "2") {
              that.borrowway = "2";
              that.companyName = resData.result.companyName;
              that.companyNo = resData.result.companyNo;
            }
            that.realName = resData.result.realName;

            if (resData.result.loanType == "房贷") {
              that.assetsT = "1";
            } else if (resData.result.loanType == "车贷") {
              that.assetsT = "2";
            } else if (resData.result.loanType == "汽车租金贷") {
              that.assetsT = "3";
            }
            that.col1Value = resData.result.col1Value;
            that.col2Value = resData.result.col2Value;
            that.col3Value = resData.result.col3Value;
            that.col4Value = resData.result.col4Value;

            that.riskAudit = resData.result.authArray;
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    chBg: function(bg) {
      this.postData();
      document.body.style.backgroundColor = bg;
    }
  }
};
</script>
<style>
@import "../../../style/css/mobile_project_details.css";
</style>
