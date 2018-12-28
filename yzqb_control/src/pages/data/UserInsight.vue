/**
* Created by alan on 17-5-22.
*/
<template>
  <section>
    <div style="height: 20px;"></div>
    <el-row>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">当日用户注册数</span>
              <p class="bigAmount">{{amountTotal.registCount || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">当日用户绑卡数量</span>
              <p class="bigAmount">{{amountTotal.userBinBankCardCount || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">当日用户申请流程结束的数量</span>
              <p class="bigAmount">{{amountTotal.applyprocessEndCount || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="height: 20px;"></div>
    <el-row>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">当日审核通过的数量</span>
              <p class="bigAmount">{{amountTotal.auditedCount || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">当日审核不通过的数量</span>
              <p class="bigAmount">{{amountTotal.auditNotThroughCount || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">当日审核通过率</span>
              <p class="bigAmount">{{(Number(amountTotal.auditedCount)/(Number(this.amountTotal.auditNotThroughCount)+Number(this.amountTotal.auditedCount))).toFixed(4) || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="height: 20px;"></div>
    <el-row>
      <el-col :span="20">
        <div id="overDueWeeklyLine" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="注册日期">
        <div class="block">
          <el-date-picker
            v-model="searchForm.time"
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
        <el-form-item label="去除复借订单" prop="isSwitch">
          <el-switch v-model="isSwitch" @change="switchStatus" on-text="是" off-text="否"></el-switch>
        </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info" v-loading="searchLoading">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="height: 20px;"></div>
    <el-row>
      <el-table :data="userData" highlight-current-row v-loading="gridLoading" class="grid" border>
        <el-table-column label="渠道名称" prop="channel">
        </el-table-column>
        <el-table-column label="注册用户数" prop="registerCount">
        </el-table-column>
        <el-table-column label="申请订单数" prop="applyOrder">
        </el-table-column>
        <el-table-column label="提交审核订单数" prop="submitOrder">
        </el-table-column>
        <el-table-column label="审核通过订单数" prop="passOrder">
        </el-table-column>
        <el-table-column label="审核不通过订单数" prop="rejectOrder">
        </el-table-column>
        <el-table-column label="放款订单数" prop="loanOrder">
        </el-table-column>
        <el-table-column label="500订单数" prop="fiveHundredCount">
        </el-table-column>
        <el-table-column label="1000订单数" prop="oneThousandCount">
        </el-table-column>
        <el-table-column label="1500订单数" prop="oneThousandFiveHundredCount">
        </el-table-column>
        <el-table-column label="注册申请转化率" prop="applyChangeRate">
        </el-table-column>
        <el-table-column label="申请漏斗率" prop="applyFilterRate">
        </el-table-column>
        <el-table-column label="审核通过率" prop="passOrderRate">
        </el-table-column>
      </el-table>
    </el-row>
    <div style="height: 20px;"></div>
    <el-button type="info" @click="checkPassOverfourty">审核通过订单年龄超过40岁的人数</el-button>
    <el-button>人数：{{thanfourtyNum}}</el-button>
  </section>
</template>

<script>
  import DataUtil from '../../common/dataUtil'
  import echarts from 'echarts'
  export default{
    data(){
      return{
        gridLoading: false,
        qudaoData:[],
        userData: [],
        postData: [],
        amountTotal:{},
        loanDaily:[],
        repaymentDaily:[],
        overDueDaily:[],
        chartLine:{},
        searchForm:{
          time: '',
          channelId: '',
          isAgain: '',
        },
        isSwitch: true,
        overDueWeeklyLine:{},   //未来7天逾期
        searchLoading:false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        thanfourtyNum: 0,
      }
    },
    methods:{
      switchStatus(){},
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
            this.postData.push({"time":DataUtil.formatTime(this.searchForm.time || new Date()),"channelId":this.qudaoData[i].dicItemValue.split("#")[0],"channel":this.qudaoData[i].dicItemName,'isAgain':1})
          }
          this.bindUserData(this.postData);
        },response=>{});
      },
      bindUserData(_data) {
        this.gridLoading = true;
        this.$http.post('manage/channelOrderCountTogether',_data).then(response=>{
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
        if(this.isSwitch){
          this.searchForm.isAgain = 1;
        }else{
          this.searchForm.isAgain = 0;
        }

        if(!this.searchForm.time){
            this.$message.error("请选择时间");
            return false;
        }
        if(this.searchForm.channelId){        //选择了渠道
          for(let i=0; i<this.qudaoData.length; i++){
            if(this.searchForm.channelId == this.qudaoData[i].dicItemValue){
              this.bindUserData([{"time":DataUtil.formatTime(this.searchForm.time || new Date()),"channelId":this.qudaoData[i].dicItemValue.split("#")[0],"channel":this.qudaoData[i].dicItemName,'isAgain':this.searchForm.isAgain}]);
              return;
            }
          }
        }

        this.postData = [];        //没选择渠道
        for(let i=0; i<this.qudaoData.length; i++){
          this.postData.push({"time":DataUtil.formatTime(this.searchForm.time || new Date()),"channelId":this.qudaoData[i].dicItemValue.split("#")[0],"channel":this.qudaoData[i].dicItemName,'isAgain':this.searchForm.isAgain})
        }
        this.bindUserData(this.postData);
      },
      getLoanData(){
        this.$http.post('manage/todayUserData',{}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data){
            this.amountTotal = body.data;
          }
        });
      },
      drawLineChart(){
        this.overDueWeeklyLine = echarts.init(document.getElementById('overDueWeeklyLine'));
        this.overDueWeeklyLine.showLoading();
        this.$http.post('manage/willOverdueWeeklyOrder', {"pageSize":14}).then(response => {
          this.overDueWeeklyLine.hideLoading();
          let {body} = response;
          if (1 == body.code && body.data) {
            let result = body.data;
            let weeklyDate = this.get14DaysAfter();
            let weeklyOverDueList = [];
            for(let i = 0;i < result.length;i++){
                weeklyOverDueList.push(result[i].count);
            }
            this.overDueWeeklyLine.setOption({
              title: {
                text: '未来14天应还款订单数(笔)'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['当日逾期订单(笔)']
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
                  name: '当日逾期订单(笔)',
                  type: 'line',
                  stack: '总量',
                  data: weeklyOverDueList
                }
              ]
            });
          }
        })
      },
      get14DaysAfter(){
        let myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() + 1);
        let dateArray = [];
        let dateTemp;
        let flag = 1;
        for (let i = 0; i <= 13; i++) {
          dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
          dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
        }
        return dateArray;
      },
      checkPassOverfourty() {
        this.$http.post('manage/passOrderOlderThan40',{}).then(response=> {
          let {body} = response;
          if(body.code == 1){
            this.thanfourtyNum = body.data;
          }else{
            this.$message.error(body.message);
          }
        },response=>{});
      }
    },
    mounted(){
      this.getLoanData();
      this.drawLineChart();
      this.getQudaoList();
    }
  }
</script>
<style scoped>
  .button{
    padding: 0;
    float: right;
  }
  .dataContet{
    height: 100px;
  }
  /*.regDataContet{height: 130px;}*/
  .text-center{text-align: center;}
  .bigText{font-size: 20px;font-weight: bolder;}
  .regTitle{font-size: 15px;font-weight: bolder}
  .bigAmount{font-size: 40px;font-weight: bolder;padding-top: 20px;}
  .regDataContet span{display: inline-block;width: 70%;text-align: right;}
  .marB{margin-bottom: 10px;}
</style>
