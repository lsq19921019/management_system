/**
* Created by alan on 17-6-1.
*/
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="110px">
      <el-row>
        <el-form-item label="通讯录手机号">
          <el-input v-model="searchForm.contactMobile" width="200"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="info" style="width: 170px" :loading="searchLoading">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @row-click="rowClick">
        <el-table-column label="订单编号" prop="uuid" width="180">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="80">
        </el-table-column>
        <el-table-column label="性别" prop="realName" width="80">
        </el-table-column>
        <!--<el-table-column label="手机号" prop="mobileNumber" width="130">
        </el-table-column>-->
        <el-table-column label="订单状态" prop="status">
          <template scope="scope">
            <span>{{getOrderType(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="复借订单" prop="isAgain">
         <template scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm">
        </el-table-column>
        <el-table-column label="订单标签" prop="orderTag" min-width="116">
          <template scope="scope">
            <span>{{getOrderTag(scope.row.orderTag)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="应还款时间" prop="refundTime" min-width="116">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.refundTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期天数" prop="overDueDay">
        </el-table-column>
      </el-table>
    </template>
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
          contactMobile:'',
          username:'',
          orderTag:'',
          isAgain: ''
        },
        //订单状态
        isAgainOrder:enums.isAgainOrder,
        orderStatus:enums.orderPro,
        orderTagList:enums.orderTagList,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        searchLoading: false
      }
    },
    methods: {
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      getSex(val) {
        return enums.getSex(val)
      },
      search() {
        this.pageIndex = 1;
        this.bindGrid()
      },
      rowClick(row){
        window.open('#/OrderInfoControl?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },
      bindGrid() {
        this.searchLoading = true;
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          sessionId:DataUtil.sid(),
          outsourceId: DataUtil.id()
        }, this.searchForm);
        this.$http.post('manage/userFindForThirdCompanyService', _data).then(response => {
          this.searchLoading = false;
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
          this.searchLoading = false;
        });
      }
    },
    mounted: function () {
      // this.bindGrid();
    }
  }
</script>
