/**
* Created by alan on 17-5-11.
*/
<template>
  <section>
    <div style="height: 20px;"></div>
    <el-row>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">累积放款金额</span>（万元）
              <p class="bigAmount">{{parseFloat(amountTotal.sumLoanAmount || '0.00').toFixed(2)}}</p>
            </div>
          </div>
          <div style="padding: 14px;">
            <el-button type="text" class="button" @click="searchDetailData">查看详情>></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">累积放款订单</span>（笔）
              <p class="bigAmount">{{amountTotal.loanOrderCount || '0.00'}}</p>
            </div>
          </div>
          <div style="padding: 14px;">
            <!--<el-button type="text" class="button">查看详情>></el-button>-->
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">在贷余额</span>（万元）
              <p class="bigAmount">{{parseFloat(amountTotal.loaningAmount || '0.00').toFixed(2)}}</p>
            </div>
          </div>
          <div style="padding: 14px;">
          <!--  <el-button type="text" class="button">查看详情>></el-button>-->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="height: 20px;"></div>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="放款">
          <el-table :data="loanDaily" highlight-current-row border stripe>
            <el-table-column prop="sumLoanAmount" label="今日放款金额（万元）"></el-table-column>
            <el-table-column prop="loanOrderCount" label="今日放款订单数（笔）"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="还款">
          <el-table :data="repaymentDaily" highlight-current-row border stripe>
            <el-table-column prop="sumLoanAmount" label="今日还款金额（万元）"></el-table-column>
            <el-table-column prop="loanOrderCount" label="今日还款订单数（笔）"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="逾期">
          <el-table :data="overDueDaily" highlight-current-row border stripe>
            <el-table-column prop="sumLoanAmount" label="今日逾期金额（万元）"></el-table-column>
            <el-table-column prop="loanOrderCount" label="今日逾期订单数（笔）"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <div style="height: 20px;"></div>
    <el-row>
      <el-col :span="12">
        <div id="dailyLoanChartLine" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="dailyOrderchartLine" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>

    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="开始日期">
        <div class="block">
          <el-date-picker
            v-model="searchForm.beginDate"
            type="date"
            :picker-options="pickerOptions1"
            :editable="false"
            placeholder="请选择">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="结束日期">
        <div class="block">
          <el-date-picker
            v-model="searchForm.endDate"
            type="date"
            :picker-options="pickerOptions1"
            :editable="false"
            placeholder="请选择">
          </el-date-picker>
        </div>
      </el-form-item>


      <el-form-item label="渠道">
        <el-select v-model="searchForm.channelId" placeholder="请选择" filterable clearable>
          <el-option v-for="item in qudaoData" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info" v-loading="searchLoading">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="height: 20px;"></div>
    <el-row>
      <el-table :data="userData" highlight-current-row v-loading="gridLoading" class="grid" border>
        <el-table-column label="渠道名称" prop="channelName">
        </el-table-column>
        <el-table-column label="创建订单数(笔)" prop="orderCreateCount">
        </el-table-column>
        <el-table-column label="放款订单数(笔)" prop="orderCount">
        </el-table-column>
        <el-table-column label="放款金额(万元)" prop="orderSum">
        </el-table-column>
      </el-table>
    </el-row>

  </section>
</template>

<script>
  import echarts from 'echarts'
  import DataUtil from '../../common/dataUtil'
  export default{
    data(){
      return {
        amountTotal: {},
        loanDaily: [],
        repaymentDaily: [],
        overDueDaily: [],
        chartLine: {},
        weeklyLoanAmount: [],   //一周放款统计
        userData: [],
        qudaoData:[],
        gridLoading:false,
        searchForm:{
          beginDate: '',
          endDate: '',
          channelId: ''
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        searchLoading:false
      }
    },
    methods: {
      searchDetailData() {   //查看放款数据详情
        window.open('/#/DetailLoanData');
      },
      getLoanData(){
        this.$http.post('manage/loanDataAmountCount', {}).then(response => {
          let {body} = response;
          if (1 == body.code && body.data) {
            this.amountTotal = body.data;
          }
        });
        /*查询今日放款数据*/
        this.$http.post('manage/dailyLoanAmount', {}).then(response => {
          let {body} = response;
          if (1 == body.code && body.data) {
            let arr = [];
            arr.push(body.data);
            this.loanDaily = arr;
          }
        });
        /*查询今日还款数据*/
        this.$http.post('manage/repaymentDailyAmount', {}).then(response => {
          let {body} = response;
          if (1 == body.code && body.data) {
            let arr = [];
            arr.push(body.data);
            this.repaymentDaily = arr;
          }
        });
        this.$http.post('manage/overdueDailyAmount', {}).then(response => {
          let {body} = response;
          if (1 == body.code && body.data) {
            let arr = [];
            arr.push(body.data);
            this.overDueDaily = arr;
          }
        });
      },
      drawLineChart(){
        this.dailyLoanChartLine = echarts.init(document.getElementById('dailyLoanChartLine'));
        this.dailyOrderchartLine = echarts.init(document.getElementById('dailyOrderchartLine'));
        /*一周数据统计*/
        this.dailyLoanChartLine.showLoading();
        this.dailyOrderchartLine.showLoading();
        this.$http.post('manage/weeklyLoanAmount', {}).then(response => {
          let {body} = response;
          this.dailyLoanChartLine.hideLoading();
          this.dailyOrderchartLine.hideLoading();
          if (1 == body.code && body.data) {
            let result = body.data;
            let weeklyLoanAmountList = [];
            let weeklyLoanCountList = [];
            let weeklyDate = this.get7DaysBefore();
            for (let i = result.length - 1; i >= 0; i--) {
              weeklyLoanAmountList.push(result[i].sumLoanAmount);
              weeklyLoanCountList.push(result[i].loanOrderCount);
            }

            this.dailyLoanChartLine.setOption({
              title: {
                text: '每日放款金额(万元)'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['每日放款金额(万元)']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: weeklyDate
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name: '每日放款金额(万元)',
                  type: 'line',
                  stack: '总量',
                  data: weeklyLoanAmountList
                }
              ]
            });

            this.dailyOrderchartLine.setOption({
              title: {
                text: '每日放款订单数'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['每日放款订单数']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: weeklyDate
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name: '每日放款订单数',
                  type: 'line',
                  stack: '总量',
                  data: weeklyLoanCountList
                }
              ]
            });
          }
        });

      },
      get7DaysBefore(){
        let myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 6);
        let dateArray = [];
        let dateTemp;
        let flag = 1;
        for (let i = 0; i <= 6; i++) {
          dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
          dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
        }
        return dateArray;
      },
      getQudaoList() {     //获取所有投放渠道
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          this.postData = [];
          for(var i=0;i<body.data.length;i++){
            body.data[i].detailData = {};
            let _status = body.data[i].dicItemValue.split('#');
            if(_status[1] == 1){
              this.qudaoData.push(body.data[i]);
            }
          }

          for(let i=0; i<this.qudaoData.length; i++){         //获取渠道参数数组
            this.postData.push({"beginDate":DataUtil.formatTime(this.searchForm.beginDate || new Date()),"endDate":DataUtil.formatTime(this.searchForm.endDate || new Date()),"channelId":this.qudaoData[i].dicItemValue.split("#")[0],"channel":this.qudaoData[i].dicItemName})
          }
          this.bindUserData(this.postData);
        },response=>{});
      },
      bindUserData(_data) {
        this.gridLoading = true;
        this.$http.post('manage/getOrderChannelLoanInfo',_data).then(response=>{
          this.gridLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.userData = body.data;
          }else{
            //this.$message.error(body.message);
          }
        },response=>{this.gridLoading = false;});
      },
      search(){       //按日期查询渠道注册量
        if(!this.searchForm.endDate　&& !this.searchForm.startDate){
          this.$message.error("请选择时间");
          return false;
        }
        //console.log(DataUtil.formatTime(this.searchForm.endDate));
        //console.log(DataUtil.dateDiff(DataUtil.formatTime(this.searchForm.endDate)+"",DataUtil.formatTime(this.searchForm.startDate)+""));
        if(this.searchForm.channelId){        //选择了渠道
          for(let i=0; i<this.qudaoData.length; i++){
            if(this.searchForm.channelId == this.qudaoData[i].dicItemValue){
              this.bindUserData([{"beginDate":DataUtil.formatTime(this.searchForm.beginDate || new Date()),"endDate":DataUtil.formatTime(this.searchForm.endDate || new Date()),"channelId":this.qudaoData[i].dicItemValue.split("#")[0],"channel":this.qudaoData[i].dicItemName}]);
              return;
            }
          }
        }

        this.postData = [];        //没选择渠道
        for(let i=0; i<this.qudaoData.length; i++){
          this.postData.push({"beginDate":DataUtil.formatTime(this.searchForm.beginDate || new Date()),"endDate":DataUtil.formatTime(this.searchForm.endDate || new Date()),"channelId":this.qudaoData[i].dicItemValue.split("#")[0],"channel":this.qudaoData[i].dicItemName})
        }
        this.bindUserData(this.postData);
      }

  },
  mounted() {
    this.getLoanData();
    this.drawLineChart();
    this.getQudaoList();
  }
  }
</script>
<style scoped>
  .button {
    padding: 0;
    float: right;
  }

  .dataContet {
    height: 180px;
  }

  .text-center {
    text-align: center;
  }

  .bigText {
    font-size: 20px;
    font-weight: bolder;
  }

  .bigAmount {
    font-size: 40px;
    font-weight: bolder;
    padding-top: 39px;
  }
</style>
