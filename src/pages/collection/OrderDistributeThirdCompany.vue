/**
* Created by alan on 17-6-23.
*/
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.uuid" width="200"></el-input>
        </el-form-item>
        <el-form-item label="订单标签" prop="status">
          <el-select v-model="searchForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in orderTagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收公司" prop="outsourceId">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" clearable>
            <el-option v-for="item in thirdCompanyList" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否被分配" prop="" label-width="90">
          <el-select v-model="searchForm.thirdDistribute" placeholder="请选择" clearable>
            <el-option  label="是" key="" value="1"></el-option>
            <el-option  label="否" key="" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isAgain" placeholder="请选择" clearable>
            <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>


         <el-form-item label="复借次数区间" label-width="100px">
          <el-input v-model="searchForm.repeTitionsMin" :maxlength="4" style="width: 100px;" placeholder="复借次数下限"></el-input>
          -
          <el-input v-model="searchForm.repeTitionsMax" :maxlength="4" style="width: 100px;" placeholder="复借次数上限"></el-input>
        </el-form-item>
        <el-form-item label="申请期限">
          <el-select v-model="searchForm.borrowingTerm" placeholder="请选择" clearable>
            <el-option v-for="item in applyTimeList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="search" type="info" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column label="订单编号" prop="uuid" width="180">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="80">
        </el-table-column>
    <!--     <el-table-column label="手机号" prop="mobileNumber" width="130">
        </el-table-column> -->
        <el-table-column label="复借订单" prop="isAgain">
          <template scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm">
        </el-table-column>
        <el-table-column label="订单标签" prop="orderTag" min-width="116">
          <template slot-scope="scope">
            <span>{{getOrderTag(scope.row.orderTag)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="催收公司" prop="outsourceId" min-width="116">
          <template slot-scope="scope">
            <span>{{getThirdCompany(scope.row.outsourceId)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期天数" prop="overDueDay">
        </el-table-column>
        <el-table-column inline-template label="操作" width="100">
          <div>
            <el-button size="small" @click="check(row)">详情</el-button>
          </div>
        </el-table-column>
      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>

    <el-form :inline="true" :model="distributeForm" class="toolbar" label-position="right" label-width="70px">
      <el-form-item label="催收公司" prop="status">
        <el-select v-model="distributeForm.thirdCompanyTag" placeholder="请选择" clearable>
          <el-option v-for="item in thirdCompanyList" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="distribute" type="info" v-loading="distributeLoading">分配</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  export default {
    data () {
      return {
        sex: enums.sex,
        searchForm:{
          uuid:'',
          /*realName:'',
           mobile:'',
           username:'',*/
          outsourceId:'',
          orderTag:'',
          thirdDistribute:'',
          status:'8',
          isAgain: '',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''
        },
        distributeForm:{
          thirdCompanyTag:'',
        },
        distributeLoading:false,
        //订单状态
        applyTimeList:enums.applyTimeList,
        orderStatus:enums.orderPro,
        orderTagList:enums.orderTagList,
        isAgainOrder:enums.isAgainOrder,
        thirdCompanyList:[],
        distributeData:[],
        selectData:{},
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 20,
        dataTotal: 0,
        thirdCompanyPersonList: [] //最底层催收人员
      }
    },
    methods: {
      getCollectionList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'THIRD_COMPANY'}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        },response => {});
      },
      getCollecttionPerson() {
        this.$http.post('manage/collectionUserList',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyPersonList = body.data;
          }else{
            this.thirdCompanyPersonList = [];
          }
        },response => {});
      },
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getThirdCompany(type){
        // return enums.getThirdCompanyList(type);
         let re = '';
          this.thirdCompanyPersonList.forEach(obj => {
            if (obj.code == type) {
              re = obj.name;
              return
            }
          });
          return re
      },
      getSex(val) {
        return enums.getSex(val)
      },
      getAgain(val){
        return (val==1)?'是' : '否';
      },
      search() {
        this.pageIndex = 1;

       
        
        if(this.searchForm.repeTitionsMin && !DataUtil.isInteger(this.searchForm.repeTitionsMin)){
          this.$message.error('请输入正整数格式');
          return;
        }
        if(this.searchForm.repeTitionsMax && !DataUtil.isInteger(this.searchForm.repeTitionsMax)){
          this.$message.error('请输入正整数格式');
          return;
        }
        if(this.searchForm.repeTitionsMin && parseInt(this.searchForm.repeTitionsMin)>9999){
          this.$message.error('输入值超过最大次数');
          return;
        }
        if(this.searchForm.repeTitionsMax && parseInt(this.searchForm.repeTitionsMax)>9999){
          this.$message.error('输入值超过最大次数');
          return;
        }
        if(this.searchForm.repeTitionsMin&&this.searchForm.repeTitionsMax && parseInt(this.searchForm.repeTitionsMin) > parseInt(this.searchForm.repeTitionsMax)){
          this.$message.error('逾期天数上限应大于等于逾期天数下限，请重新输入');
          return;
        } 


        this.bindGrid()
      },
      check(row){
        window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
        // let w = window.open(location.origin);
        // // let w = window.open('about:blank');
        // setTimeout(()=>{
        //     w.location.href = '/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid
        // },1000);
      },
      judgeSelect(row){
        if(row.thirdDistribute == 1){
            return false;
        }else {
            return true;
        }
      },
      handleSelectionChange(val){
          console.log(val);
          this.selectData = val;
      },
      distribute(){
        if(!this.distributeForm.thirdCompanyTag){
            this.$message.error("请选择催收公司");
            return false;
        }
        //:selectable=judgeSelect
        let result = [];
        this.selectData.forEach((data) =>{
            //if(data.thirdDistribute == 0){
                let temp = {};
                temp.uuid = data.uuid;
                temp.uuidString = data.userUuid;
                temp.outsourceId = this.distributeForm.thirdCompanyTag;
                result.push(temp);
            //}
        });
        if(result.length <= 0){
          this.$message.error("请选择催收订单");
          return false;
        }
        console.log(result);
        this.distributeLoading = true;
        this.$http.post('manage/distributeOrder2ThirdCompany',result).then(response =>{
            this.distributeLoading = false;
            let {body} = response;
            if(1 == body.code){
              this.bindGrid();
            }
        })
      },
      pageSizeChange(val) {
        console.log(val);
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        //this.$store.dispatch('setOrderListAllIndex',val)
        this.bindGrid()
      },
      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize
        }, this.searchForm);
        this.$http.post('manage/overDueOrderListByTag', _data).then(response => {
          if (1 == response.body.code) {
            this.gridLoading = false;
            if(response.body.data){
              this.gridData = response.body.data.data;
              this.dataTotal = response.body.data.recordsTotal;
            }else {
              this.gridData = [];
              this.dataTotal = 0;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.gridLoading = false;
        });
      }
    },
    mounted() {
      this.bindGrid();
      this.getCollectionList();
      this.getCollecttionPerson();
    }
  }
</script>
