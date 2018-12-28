/**
* Created by alan on 17-6-8.
*/
<template>
  <section>
    <div style="height: 20px;"></div>
    <el-row>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">复借数据统计</span>
              <p class="bigAmount">今日复借笔数:{{secondLoanCount.todayRepeatOrderCount || '0'}}</p>
              <p class="bigAmount">累计复借笔数:{{secondLoanCount.totalRepeatOrderCount || '0'}}</p>
              <p class="bigAmount">今日复借率:{{(secondLoanCount.todayRepeatOrderRate/1).toFixed(2) || '0'}}</p>
              <p class="bigAmount">平均复借率:{{(secondLoanCount.totalRepeatOrderRate/1).toFixed(2) || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">订单数统计</span>
              <p class="bigAmount">逾期订单数:{{overDueTotal || '0'}}</p>
              <p class="bigAmount">已还款订单数:{{repaymentTotal || '0'}}</p>
              <p class="bigAmount">明日应还订单数:{{willOverDueTotal || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContent">
            <el-button @click="excelExport" type="info" v-loading="excelExportLoading">导出逾期追踪表</el-button>
          </div>
          <div class="dataContent">
            <el-button @click="excelExportHaitian" type="info">昨日催收统计表</el-button>
          </div>
          <div class="dataContent">
            <el-button @click="excelExportXiaohaitian" type="info">今日催收统计表</el-button>

          </div>
          <div class="dataContent">
              <el-button @click="excelExportDailyCaseData" type="info">导出每日分案数据</el-button>
          </div>
          <div class="dataContent">
            <el-button @click="exportWillOverDueUserMobile" type="info">导出day0待还订单</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="height: 20px;"></div>


  </section>
</template>

<script>
  import Config from '../../common/config'
  import DataUtil from '../../common/dataUtil'
  export default{
    data(){
      return{
        channelList:[],
        secondLoanCount:{},   //复借数据统计
        loanDaily:[],         //每日放款数据
        overDueTotal:'',      //逾期订单笔数
        repaymentTotal:'',    //已还款订单数
        willOverDueTotal:'',  //明日将逾期订单数
        amountTotal:{},       //订单累计数据统计
        repaymentDaily:[],
        overDueDaily:[],
        chartLine:{},
        searchForm:{
          time:'',
          channelId:''
        },
        regTotal:{},
        excelExportLoading:false,
        searchLoading:false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      }
    },
    methods:{
      getSecondLoanData(){
        this.$http.post('manage/todayDataStatistics',{}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data){
            this.secondLoanCount = body.data;
          }
        });
        /*查询今日放款数据*/
        this.$http.post('manage/dailyLoanAmount', {}).then(response => {
          let {body} = response;
          if (1 == body.code && body.data) {
            this.loanDaily = body.data;
          }
        });
        let _overDueReq = {
          pageNo:1,
          pageSize:10,
          status:8
        };
        /*订单累计数据*/
        this.$http.post('manage/loanDataAmountCount', {}).then(response => {
          let {body} = response;
          if (1 == body.code && body.data) {
            this.amountTotal = body.data;
          }
        });
        /*逾期订单笔数*/
        this.$http.post('manage/orderList', _overDueReq).then(response => {
          if (1 == response.body.code) {
            if(response.body.data){
              this.overDueTotal = response.body.data.recordsTotal || 0;
              // console.log("overDueTotal = ",this.overDueTotal);
            }
          }
        });
        _overDueReq.status = 6;
        this.$http.post('manage/orderList', _overDueReq).then(response => {
          if (1 == response.body.code) {
            if(response.body.data){
              this.repaymentTotal = response.body.data.recordsTotal || 0;
              // console.log("repaymentTotal = ",this.repaymentTotal);
            }
          }
        });
        this.$http.post('manage/willOverdueOrderList', {}).then(response => {
          if (1 == response.body.code) {
            if(response.body.data){
              this.willOverDueTotal = response.body.data.length || 0;
              // console.log("willOverDueTotal = ",this.willOverDueTotal);
            }
          }
        });
      },
      excelExport(){
          window.open(Config.host + "/manage/overDueOrderChartExcel?sessionId="+DataUtil.sid());
      },
      excelExportHaitian() {
        window.open('http://control.yqguan.com/siyiData/beforeday_work.csv');
      },
      excelExportXiaohaitian() {
        window.open('http://control.yqguan.com/siyiData/day_target.csv');
      },
      excelExportDailyCaseData() {
        window.open(Config.host + "/manage/collectionSituationStatisticsExcel?sessionId="+DataUtil.sid());
      },
      exportWillOverDueUserMobile(){
        window.open(Config.host + "/manage/willOverDueUserMobile?sessionId="+DataUtil.sid());
      },
      search(){
        let _data = {};
        if(!this.searchForm.time || !this.searchForm.channelId){
          this.$message.error("请选择时间和渠道");
          return false;
        }
        _data.time = DataUtil.formatTime(this.searchForm.time || new Date());
        _data.channelId = this.searchForm.channelId;
        this.getRegData(_data);
      },
      getRegData(_data){
        this.searchLoading = true;
        this.$http.post('manage/regAmountByChannelTime',_data).then(response =>{
          this.searchLoading = false;
          let {body} = response;
          if(1 == body.code && body.data){
            this.regTotal = body.data;
          }
        }).catch( e =>{this.searchLoading = false;});

      }

    },
    mounted(){
      this.getSecondLoanData();
    }
  }
</script>
<style scoped>
  .button{
    padding: 0;
    float: right;
  }
  .dataContet{
    height: 185px;
  }
  .dataContent{
    margin-bottom: 10px;
  }
  .text-center{text-align: center;}
  .bigText{font-size: 13px;font-weight: bolder;}
  .bigAmount{font-size: 16px;font-weight: bolder;padding-top: 10px;}
</style>
