<!--
    create:luofeifei 2018-12-5
    desc:业绩汇总统计
-->
<template>
    <section>
        <!--工具条-->
        <el-form :inline="true" :model="searchForm" class="toolbar">
            <el-form-item label="入催批次">
                <el-date-picker v-model="searchForm.startDate" type="date" :editable="false"  :picker-options="pickerOptions1" placeholder="选择日期"></el-date-picker> ~ 
                <el-date-picker v-model="searchForm.endDate" type="date" :editable="false"  :picker-options="pickerOptions2" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="用户ID">
                <el-input v-model="searchForm.userId"></el-input>
            </el-form-item>
            <el-form-item label="催收阶段">
                <el-select v-model="searchForm.stage" placeholder="请选择" filterable clearable>
                    <el-option v-for="item in thirdCompanyListStage" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemName"></el-option>
                </el-select>
            </el-form-item>  
            <!--按钮-->
            <el-form-item>
                <el-button type="info" @click="look">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetPage">重置</el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <div style="margin-top:15px;">
            <el-tabs type="border-card">
                <el-tab-pane label="全部">
                    <el-table :data="gridData" highlight-current-row v-loading="gridLoading">
                        <el-table-column label="日期" prop="batchEntity" width="200"></el-table-column>
                        <el-table-column label="催收阶段" prop="collectStage" width="150"></el-table-column>
                        <el-table-column label="ID" prop="userId" width="120"></el-table-column>
                        <el-table-column label="姓名" prop="username" width="240"></el-table-column>
                        <el-table-column label="总排名" prop="rank" width="120"></el-table-column>
                        <el-table-column label="目标回收率%" prop="targetCollectionRate" width="180"></el-table-column>
                        <el-table-column label="实际回收率%" prop="actiualCollectionRate" width="180"></el-table-column>
                        <el-table-column label="目标差值%" prop="targetGap"></el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="本公司">
                    <el-table :data="gridData1" highlight-current-row v-loading="gridLoading">
                        <el-table-column label="日期" prop="batchEntity" width="200"></el-table-column>
                        <el-table-column label="催收阶段" prop="collectStage" width="150"></el-table-column>
                        <el-table-column label="公司内排名" prop="innerRank" width="150"></el-table-column>
                        <el-table-column label="ID" prop="userId" width="120"></el-table-column>
                        <el-table-column label="姓名" prop="username" width="240"></el-table-column>
                        <el-table-column label="总排名" prop="rank" width="120"></el-table-column>
                        <el-table-column label="目标回收率%" prop="targetCollectionRate" width="180"></el-table-column>
                        <el-table-column label="实际回收率%" prop="actiualCollectionRate" width="180"></el-table-column>
                        <el-table-column label="目标差值%" prop="targetGap"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>  
    </section>
</template>

<script>
    import DataUtil from '../../common/dataUtil'
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
                    //搜索数据
                    searchForm:{
                        startDate:'',
                        endDate:'',
                        userId: '',
                        realName:'',
                        dicItemName:'',
                        stage:'',
                        pageNum:1
                    },
                    dataTotal:0,
                    pageSize:10,
                    gridLoading: false,
                    gridData:[],
                    gridData1:[],
                    thirdCompanyList:[],
                    thirdCompanyListStage:[],
                    pickerOptions1: {
                        disabledDate(time) {
                            return compareDate(time, "searchForm", "startDate", "s")
                        }
                    },
                    pickerOptions2: {
                        disabledDate(time) {
                            return compareDate(time, "searchForm", "endDate", "e")
                        }
                    }
                }
        },
        //  方法集合
        methods: {
            resetPage(){
                this.searchForm={
                    startDate:'',
                    endDate:'',
                    userId: '',
                    realName:'',
                    dicItemName:'',
                    stage:'',
                    pageNum:1
                }
                // window.location.reload();
                
                this.bindGrid();
            },            
            bindGrid() {
                this.gridData = [];
                let _data = Object.assign({}, this.searchForm,{
                    startDate:DataUtil.formatTime(this.searchForm.startDate)||"",
                    endDate:DataUtil.formatTime(this.searchForm.endDate)||""                  
                });
                this.$http.post('manage/performanceStatisticsSum', _data).then(response => {
                    this.gridData = response.data.data
                    let { body } = response;
                    if (1 == body.code) {
                        
                    } else {
                        
                    }
                }).catch((e) =>{

                });
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
            bindGrid1() {
                this.gridData = [];
                let _data = Object.assign({}, this.searchForm,{companyTab:true});
                this.$http.post('manage/performanceStatisticsSum', _data).then(response => {
                    this.gridData1 = response.data.data
                    let { body } = response;
                    if (1 == body.code) {
                        
                    } else {
                        
                    }
                }).catch((e) =>{

                });
            },
            //  查询      
            look(){
                let _this = this;
                this.gridData = [];
                let _data = Object.assign({}, this.searchForm,{
                    startDate:DataUtil.formatTime(this.searchForm.startDate)|| "",
                    endDate:DataUtil.formatTime(this.searchForm.endDate)||""                       
                });
                this.$http.post('manage/performanceStatisticsSum',_data).then(resData =>{
                    this.gridData = resData.data.data
                    let { body } = resData;
                    if (1 == body.code) {
                        
                    } else {
                        
                    }                    
                })

                this.gridData1 = [];
                let _data1 = Object.assign({}, this.searchForm,{
                    startDate:DataUtil.formatTime(this.searchForm.startDate)|| "",
                    endDate:DataUtil.formatTime(this.searchForm.endDate)||"",
                    companyTab:true          
                });
                this.$http.post('manage/performanceStatisticsSum',_data1).then(resData =>{
                    this.gridData1 = resData.data.data
                    let { body } = resData;
                    if (1 == body.code) {
                        
                    } else {
                        
                    }                    
                })                
            }
        },
        mounted: function () {
            this.bindGrid();
            this.bindGrid1();
            this.getDicItem(); //催收阶段接口
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
