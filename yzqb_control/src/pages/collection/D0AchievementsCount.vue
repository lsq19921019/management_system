<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="结算日期">
        <el-date-picker v-model="searchForm.startDay" type="date" :editable="false" :picker-options="pickerOptions1" placeholder="选择日期"></el-date-picker> ~
        <el-date-picker v-model="searchForm.endDay" type="date" :editable="false" :picker-options="pickerOptions2" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="催收公司" prop="id">
          <el-select v-model="searchForm.id" placeholder="请选择" filterable clearable>
            <el-option v-for="item in thirdCompanyList" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
      </el-form-item>
<!--       <el-form-item>
        <el-button @click="exportExl" type="info">导出</el-button>
      </el-form-item> -->
    </el-form>

    <el-row :span="24" class="setBar">
      <el-col :span="4"><el-button type="success" @click="setTarget">设置目标完成率</el-button></el-col>
      <el-col :span="3"><el-button type="text">分案总量：{{dailyCaseTotal}}</el-button></el-col>
      <el-col :span="3"><el-button type="text">完成总量：{{dailyFinishCase}}</el-button></el-col>
      <el-col :span="4"><el-button type="text">实际完成率：{{dailyFinishCaseRate}}%</el-button></el-col>
      <el-col :span="3"><el-button type="text">目标剩余量：{{dailyTargetRemain}}</el-button></el-col>
      <el-col :span="3"><el-button type="text">目标完成率：{{dailyTargetRate}}%</el-button></el-col>
    </el-row>
    <!--列表-->
    <el-tabs type="border-card">
      <el-tab-pane label="分项">
        <el-table :data="gridData" highlight-current-row v-loading="gridLoading">
          <el-table-column label="日期" prop="searchTime" width="120px"></el-table-column>
          <el-table-column label="催收公司" prop="companyName"></el-table-column>
          <el-table-column label="账号" prop="name"></el-table-column>
          <el-table-column label="分案总量" prop="dailyCaseTotal"></el-table-column>
          <el-table-column label="目标" prop="offDutyFinishCase"></el-table-column>
          <el-table-column label="剩余量" prop="dailyTargetRemain"></el-table-column>
          <el-table-column label="完成量" prop="dailyFinishCase"></el-table-column>
          <el-table-column label="回收率%" prop="dailyFinishCaseRate"></el-table-column>
          <el-table-column label="个人与目标差额" prop="actualTargetBalance"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="总计">
        <el-table :data="gridDataTotal" highlight-current-row v-loading="gridLoading">
          <el-table-column label="日期" prop="searchTime" width="120px"></el-table-column>
          <el-table-column label="催收公司" prop="companyName"></el-table-column>
          <el-table-column label="账号" prop="name"></el-table-column>
          <el-table-column label="分案总量" prop="dailyCaseTotal"></el-table-column>
          <el-table-column label="目标" prop="offDutyFinishCase"></el-table-column>
          <el-table-column label="剩余量" prop="dailyTargetRemain"></el-table-column>
          <el-table-column label="完成量" prop="dailyFinishCase"></el-table-column>
          <el-table-column label="回收率%" prop="dailyFinishCaseRate"></el-table-column>
          <el-table-column label="个人与目标差额" prop="actualTargetBalance"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <template>

    </template>


    <el-dialog title="目标完成率" v-model="commonRadioDigVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="commonRadioForm" ref="commonRadioForm">
        <el-form-item>
          <el-input v-model="commonRadioForm.dicItemValue"><template slot="append">%</template></el-input>
        </el-form-item>
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
  export default {
    data () {
      let compareDate = (time, form, txt, type) => {
        let _cp1 = time.getTime() >= Date.now()
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
        dailyCaseTotal: '',
        dailyFinishCase: '',
        dailyTargetRate: '',
        dailyTargetRemain: '',
        dailyFinishCaseRate: '',
        seen: true,
        searchForm:{
          id:'',
          startDay:'',
          endDay:'',
          flag:0
        },
        gridLoading: false,
        gridData: [],
        gridDataTotal: [],
        thirdCompanyList: [],
        commonRadioDigVisible: false,
        commonRadioForm: {
          dicCode: ''
        },
        commonRadioFormLoading: false,
        pickerOptions1: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "endDay", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "startDay", "e")
          }
        }
      }
    },
    methods: {
      getCollectionList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'DAY0_THIRD_COMPANY'}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }

          /*this.postId = body.data[0].id;
          this.$http.post('manage/searchCollectionUserList',{postId:this.postId}).then(response =>{
            let {body} = response;
            if(body.code == 1){
              this.thirdCompanyList = body.data;
            }else{
              this.thirdCompanyList = [];
            }
          },response=>{});*/
        },response =>{});

        /*this.$http.post('manage/dicItemListByDicCode',{dicCode:'COLLECTION_POST'}).then(response => {
          let {body} = response;
          this.postId = body.data[0].id;
          this.$http.post('manage/searchCollectionUserList',{postId:this.postId}).then(response =>{
            let {body} = response;
            if(body.code == 1){
              this.thirdCompanyList = body.data;
            }else{
              this.thirdCompanyList = [];
            }
          },response=>{});
        },response =>{});*/
      },
      formatTime(time){
          return DataUtil.formatUnixTime(time);
      },
      search() {
        this.bindGrid()
      },
      getCompleteRate() {
        this.$http.post('manage/dicItemListByDicCode',{"dicCode":"COLLECTION_TARGET_RATE"}).then(response=>{
          this.commonRadioForm = response.body.data[0];
        },response=>{});
      },
      exportExl() {},
      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({}, this.searchForm,{
          startDay:DataUtil.formatTime(this.searchForm.startDay)|| DataUtil.formatTime(new Date()),
          endDay:DataUtil.formatTime(this.searchForm.endDay)||DataUtil.formatTime(new Date())
        });
        let diffDay = DataUtil.dateDiff(_data.endDay,_data.startDay);
        diffDay > 1 ? this.seen = false : this.seen = true;
        this.$http.post('manage/collectionAchievementCountTotal',_data).then(response=>{
          let {body} = response;
          if(body.code ==1){
            this.dailyCaseTotal = body.data.dailyCaseTotal;
            this.dailyFinishCase = body.data.dailyFinishCase;
            this.dailyFinishCaseRate = body.data.dailyFinishCaseRate;
            this.dailyTargetRemain = body.data.dailyTargetRemain;
            this.dailyTargetRate = body.data.dailyTargetRate;
          }else{}
        },response=>{});
        /*按催收账号累加*/
        _data.flag = 0;
        this.$http.post('manage/collectionAchievementCountList', _data).then(response => {
         	this.gridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.gridData = body.data;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.gridLoading = false;
        });
        /*按催收公司累加*/
        _data.flag = 1;
        this.$http.post('manage/collectionAchievementCountList', _data).then(response => {
          this.gridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.gridDataTotal = body.data;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.gridLoading = false;
        });
      },
      setTarget() {
        this.commonRadioDigVisible = true;
        this.getCompleteRate();
      },
      commonRadioFormSubmit() {
       if(this.commonRadioForm.dicItemValue == ''){
          this.$message.error('请设置完成率~');
          return;
        }
        let _data = {
          id: this.commonRadioForm.id,
          dicCode: this.commonRadioForm.dicItemValue
        }
        this.commonRadioFormLoading = true;
        this.$http.post('manage/sysDicItemValueEdit',_data).then(response=>{
          this.commonRadioFormLoading = false;
          let {body} = response;
          if(body.code == 1){
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
    }
  }
</script>
<style scoped>
  .setBar{
    padding: 0px 10px;
    line-height: 60px;
  }
</style>
