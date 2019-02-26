<!--
  desc:汇总
-->
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="入催批次">
        <el-date-picker v-model="searchForm.startDate" type="date" :editable="false" :picker-options="pickerOptions1" placeholder="选择日期"></el-date-picker> ~
        <el-date-picker v-model="searchForm.endDate" type="date" :editable="false" :picker-options="pickerOptions2" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="催收机构">
          <el-select v-model="searchForm.companyId" placeholder="请选择" filterable clearable>
            <el-option v-for="item in thirdCompanyList_" :label="item.companyName" :key="item.companyId" :value="item.companyId"></el-option>
          </el-select>
      </el-form-item>
      
        <el-form-item label="催收人员" prop="outsourceId" v-show="false">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in prevThirdPersonList" :label="item.dicItemName" :key="index" :value="item.dicItemValue"></el-option>
          </el-select>
        </el-form-item>

      <el-form-item label="用户ID" v-show="false">
          <el-input v-model="searchForm.outsourceId"></el-input>
      </el-form-item>
      <el-form-item label="催收阶段">
          <el-select v-model="searchForm.stage" placeholder="请选择" filterable clearable>
              <el-option v-for="item in thirdCompanyListStage" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemName"></el-option>
          </el-select>
      </el-form-item>         
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetPage">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 设置目标完成率栏 -->
    <el-row :span="24" class="setBar">
      <el-col :span="4"><el-button type="success" @click="setTarget">设置目标完成率</el-button></el-col>
      <!-- <el-col :span="4"><el-button type="text">是否显示汇总栏</el-button>  <el-switch @change="switchchange" v-model="showtotalrow" on-color="#13ce66" off-color="#ff4949"></el-switch></el-col> -->
      <el-col :span="3"><el-button type="text">分案总量：{{dailyFinishCase}}</el-button></el-col>
      <el-col :span="3"><el-button type="text">完成总量：{{dailyCaseTotal}}</el-button></el-col>
      <el-col :span="4"><el-button type="text">实际完成率：{{dailyFinishCaseRate}}%</el-button></el-col>
    </el-row>

    <!--列表-->
    <el-tabs type="border-card">
      <el-tab-pane label="批次汇总">
        <el-table :data="gridData" highlight-current-row v-loading="gridLoading" :row-class-name="tableRowClassName">
          <el-table-column label="入催批次" prop="batchEntry" width="200"></el-table-column>
          <el-table-column label="催收机构" prop="companyName"></el-table-column>
          <el-table-column label="排名" prop="rank"></el-table-column>
          <el-table-column label="分案量" prop="collectionCount"></el-table-column>
          <el-table-column label="回收量" prop="finishCount"></el-table-column>
          <el-table-column label="目标回收率%" prop="targetFinisRate"></el-table-column>
          <el-table-column label="实际回收率%" prop="actualFinisRate"></el-table-column>
          <el-table-column label="目标差值%" prop="targetDifferenceRate"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="批次明细">
        <el-table :data="detailGridData" highlight-current-row v-loading="gridLoading" :row-class-name="tableRowClassName">
          <el-table-column label="入催批次" prop="batchEntry" width="200"></el-table-column>
          <el-table-column label="催收机构" prop="companyName"></el-table-column>
          <el-table-column label="催收阶段" prop="stage"></el-table-column>
          <el-table-column label="排名" prop="rank"></el-table-column>
          <el-table-column label="分案量" prop="collectionCount"></el-table-column>
          <el-table-column label="回收量" prop="finishCount"></el-table-column>
          <el-table-column label="目标回收率%" prop="targetFinisRate"></el-table-column>
          <el-table-column label="实际回收率%" prop="actualFinisRate"></el-table-column>
          <el-table-column label="目标差值%" prop="targetDifferenceRate"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 设置目标完成率弹框 -->
    <el-dialog title="设置目标完成率" v-model="commonRadioDigVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="commonRadioForm" ref="commonRadioForm">
         <el-row>
           <el-col v-for="item in commonRadioForm.ratelsit" :key="item.dicItemId" :span="10" :offset="1">
              <el-form-item>
                <el-input v-model="item.dicItemValue" type='number'>
                  <el-button slot="prepend">{{item.dicItemName.slice(0,5)}}</el-button>
                  <el-button slot="append">%</el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="commonRadioDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="commonRadioFormSubmit" :loading="commonRadioFormLoading">确 定</el-button>
      </div>
    </el-dialog>
 
  </section>
</template>

<script>
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'
  export default {
    data () {
      let compareDate = (time, form, txt, type) => {
        let _cp1 = time.getTime() >= (Date.now())
        let _cp2 = false
        let _input = this[form][txt]
        if (_input) {
          let _time = Date.parse(new Date(_input))
          if ((type == "s" && time.getTime() > _time) || (type == "e" && time.getTime() < _time)) {
            _cp2 = true
          }
        }
        return _cp1 || _cp2
      }
      return {
        showtotalrow: true,
        dailyCaseTotal: '',
        dailyFinishCase: '',
        dailyFinishCaseRate: '',
        searchForm:{
          companyId:'',
          startDate:'',
          endDate:'',
          userId: '',
          realName: '',
          outsourceIds:'',
          outsourceId:'',
          outsourceIdString:'',
        },
        thirdCompanyList_:[],
        thirdCompanyList:[],
        getPrevThirdCompanyList:[],
        prevThirdPersonList:[],
        postId:0,
        prevThirdCompanyPersonList:[],
        prevThirdPersonList: [],
        prevThirdCompanyPersonLists: [],
        tableInfoTips:[],
        gridLoading: false,
        allData:{},
        gridData: [],       //批次汇总
        detailGridData: [],  //批次明细
        thirdCompanyListStage: [],
        thirdCompanyList: [],
        commonRadioDigVisible: false,
        commonRadioForm: {
          ratelsit: []
        },
        commonRadioFormLoading: false,
        pickerOptions1: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "endDate", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "startDate", "e")
          }
        }
      }
    },
    methods: {
      
      getPrevThirdCompanyThis(type){
        let re = '';
        let _this = this;
        let _re = '';
        if(type===0){
          re = '--';
          return re
        }
        for(var k=0;k<_this.prevThirdCompanyPersonList.length;k++){
          if (parseInt(_this.prevThirdCompanyPersonList[k].companyResponsel.dicItemValue) == type) {
            re = _this.strTrim(_this.prevThirdCompanyPersonList[k].companyResponsel.dicItemName);
            return re;
          }
        }
        if(!re){
          // alert(1111);
          let temp_index = '';
          let flag = 0;
            for(var k=0;k<_this.prevThirdCompanyPersonList.length;k++){
              
                  temp_index = k;
                  for(var j=0;j<_this.prevThirdCompanyPersonList[k].dicItemList.length;j++){
                      if (parseInt(_this.prevThirdCompanyPersonList[k].dicItemList[j].dicItemValue) == type) {

                        re = _this.strTrim(_this.prevThirdCompanyPersonList[k].companyResponsel.dicItemName);
                        
                        flag = 1;
                        return re;
                      }
                    }
                  
                  if(flag){
                    return re;
                  }
            }

          // this.prevThirdCompanyPersonList.forEach((obj,i) => {
          //   temp_index = i;
          //   obj.dicItemList.forEach((val,index)=>{
          //     if(parseInt(val.dicItemValue) == type){
          //       flag = 1;
          //       return false;
          //       // re = prevThirdCompanyPersonList[temp_index].companyResponsel.dicItemName;
          //     }
          //   });
          //   if(flag){
          //     alert(666);
          //     return;
          //   }
          // });
          console.log(temp_index);
          // re = _this.prevThirdCompanyPersonList[temp_index].companyResponsel.dicItemName;
          // return _re;
        }
        return re
      },
      getPrevThirdStaff(type){
        let re = '';
        let _this = this;
        if(type===0){
          re = '--';
          return re
        }
        this.prevThirdPersonList.forEach(obj => {
          if (parseInt(obj.dicItemValue) == type) {
            re = _this.strTrim(obj.dicItemName);
            return
          }
        });
        return re
      },
      getCollectionList_() {      
        this.$http.post('manage/collectionUserList',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyPersonList = body.data;
          }else{
            this.thirdCompanyPersonList = [];
          }
        },response => {});

        this.$http.post('manage/getCompayUserInfo',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.prevThirdCompanyPersonList = body.data;
            this.prevThirdCompanyPersonList.forEach((v,i)=>{
              v.dicItemList.forEach((val,index)=>{
                this.prevThirdPersonList.push(val);
              });
            });
          }else{
            this.prevThirdCompanyPersonList = [];
            this.prevThirdPersonList = [];
          }
        },response => {});
        this.$http.post("manage/companyListByDicCode",{disCode:"DAY0_THIRD_COMPANY"}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        })
        
        this.$http.post('manage/getCompayInfo',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.prevThirdCompanyPersonLists = body.data;
          }else{
            this.prevThirdCompanyPersonLists = [];
          }
        },response => {});
      },
      resetPage(){
        this.searchForm={
          companyId:'',
          startDate:'',
          endDate:'',
          userId: '',
          realName: ''
        }
        // window.location.reload();
        
        this.bindGrid();
      },
      tableRowClassName(row, index) {
        if (row.batchEntry === "汇总") {
          return 'info-row';
        }
        return '';
      },
      getCollectionList() {   //催收机构
          this.$http.post('manage/companyList',{}).then(response =>{
            let {body} = response;
            if(body.code == 1){
              this.thirdCompanyList_ = body.data;
            }else{
              this.thirdCompanyList_ = [];
            }
          },response=>{});
      },
      // 催收阶段接口
      getDicItem(){
          let _this = this;
          this.$http.post('manage/dicItemListByDicCode',{dicCode:'COLLECTION_POST'}).then(response =>{
            let {body} = response;         
            if(body.code == 1){ 
              _this.thirdCompanyListStage = body.data
               _this.thirdCompanyListStage = _this.thirdCompanyListStage.slice(1);
            }else{
               
            }
          },response=>{});        
      },
      switchchange(res) {
        this.gridData = [];
        this.detailGridData = [];
        this.tableDataEdit(res);
      },

      tableDataEdit(res){       //table数据处理

        if(res == true){     //显示汇总行
            // 批次汇总数据处理
            this.allData.datelist.forEach(obj => {
              obj.childrenList.forEach(e =>{
                  this.gridData.push(e);
              });
              obj.batchEntry = '汇总';
              this.gridData.push(obj);
            });

            // 批次明细数据处理
            this.allData.dateDetailList.forEach(obj => {
              obj.childrenList.forEach(e =>{
                  this.detailGridData.push(e);
              });
              obj.batchEntry = '汇总';
              obj.stage = '';
              this.detailGridData.push(obj);
            });

        }else{                    //不显示汇总行
          // 批次汇总数据处理
          this.allData.datelist.forEach(obj => {
            obj.childrenList.forEach(e =>{
                this.gridData.push(e);
            });
          });

          // 批次明细数据处理
          this.allData.dateDetailList.forEach(obj => {
            obj.childrenList.forEach(e =>{
                this.detailGridData.push(e);
            });
          });
        }
      },

      bindGrid() {
        this.searchForm.outsourceIdString = '';
        if(this.searchForm.outsourceId){
          this.searchForm.outsourceIdString = '';
        }else if(this.searchForm.outsourceIds){
          let _this = this;
          _this.prevThirdCompanyPersonList.forEach((v,i)=>{
            if(v.companyResponsel.dicItemValue === _this.searchForm.outsourceIds){
              v.dicItemList.forEach((val,index)=>{
                _this.searchForm.outsourceIdString += val.dicItemValue+',';
              });
            }
          });
          
        }
        if(this.searchForm.outsourceIds){
        this.searchForm.outsourceIdString = this.searchForm.outsourceIdString.slice(0,this.searchForm.outsourceIdString.length-1);
          if(!this.searchForm.outsourceIdString){
            this.searchForm.outsourceIdString = this.searchForm.outsourceIds;
          }else{
            this.searchForm.outsourceIdString = this.searchForm.outsourceIdString+','+this.searchForm.outsourceIds;
          }
        }
        this.gridLoading = true;
        this.gridData = [];
        this.detailGridData = [];
        let _data = Object.assign({}, this.searchForm,{            
            startDate:DataUtil.formatTime(this.searchForm.startDate)|| "",
            endDate:DataUtil.formatTime(this.searchForm.endDate)||""
        });
        this.$http.post('manage/collectionPerformanceStatisticsSum', _data).then(response => {
          this.gridLoading = false;
          if (1 == response.body.code) {
            this.gridData = response.body.data.batchSum; //ff
            this.detailGridData = response.body.data.batchItem; //ff
            this.allData = response.body.data;
            this.dailyCaseTotal = response.body.data.dataCountAll.finishCountAll; //ff
            this.dailyFinishCase = response.body.data.dataCountAll.collectionCountAll; //ff
            this.dailyFinishCaseRate = response.body.data.dataCountAll.actualFinisRateAll; //ff

            this.tableDataEdit(true);
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.gridLoading = false;
        });
      },

      search() {
        this.bindGrid()
      },
      exportExl() {
        window.open(Config.host + "/manage/collectionPerformanceStatisticsSumExcel?sessionId="+DataUtil.sid()+"&startDate="+DataUtil.formatTime(this.searchForm.startDate)+"&endDate="+DataUtil.formatTime(this.searchForm.endDate)+"&companyId="+this.searchForm.companyId);
      },
      setTarget() {
        this.commonRadioDigVisible = true;
        this.getCompleteRate();
      },
      getCompleteRate() {
        this.$http.post('manage/setTargetCompletionRate',{"setTargetType":""}).then(response=>{
          let {body} = response;
          if(body.code == 1){
            this.commonRadioForm.ratelsit = body.data;
          }else{
            this.$message.error(body.message)
          }

        },response=>{});
      },
      commonRadioFormSubmit() {
        let submitobj = {
          tmpdicItemIds: [],
          tmpdicItemValues: []
        }

        for(let i=0;i<this.commonRadioForm.ratelsit.length;i++){
          if(this.commonRadioForm.ratelsit[i].dicItemValue == ""){
            this.$message.error('请输入目标完成率~');
            return;
          }
          submitobj.tmpdicItemIds.push(this.commonRadioForm.ratelsit[i].dicItemId);
          submitobj.tmpdicItemValues.push(this.commonRadioForm.ratelsit[i].dicItemValue);
        }

        let _data = {
          dicItemIds: submitobj.tmpdicItemIds.join(','),
          dicItemValues: submitobj.tmpdicItemValues.join(',')
        }
        this.commonRadioFormLoading = true;
        this.$http.post('manage/saveSetTargetCompletionRate',_data).then(response=>{
          this.commonRadioFormLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.bindGrid();
            this.commonRadioDigVisible = false;
          }else{
            this.$message.error(body.message);
          }
        },response=>{this.commonRadioFormLoading = false;});
      }
    },
    mounted: function () {
      this.getCollectionList();
      this.bindGrid();
      this.getDicItem();
      this.getPrevThirdCompanyThis();
      this.getCollectionList_()
    }
  }
</script>
<style>
  .setBar{
    padding: 0px 10px;
    line-height: 60px;
  }
  .el-table .info-row {
    background: #edf7ff;
  }
</style>
