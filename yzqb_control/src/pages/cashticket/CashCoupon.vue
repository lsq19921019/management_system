<template>
  <section>
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="订单编号">
        <el-input v-model="searchForm.orderNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchForm.realName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.mobileNumber" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="实际还款日期">
        <el-date-picker type="date" placeholder="起始日期" v-model="searchForm.realityDateBegin" :editable="false"></el-date-picker> ~
        <el-date-picker type="date" placeholder="结束日期" v-model="searchForm.realityDateEnd" :editable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" @click="bindGrid">查询</el-button>
        <el-button type="primary" @click="excelExport">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="gridData" style="width: 100%" v-loading="gridLoading">
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <!-- <el-table-column prop="mobileNumber" label="手机号"></el-table-column> -->
      <el-table-column prop="applyAmount" label="应还款金额"></el-table-column>
      <el-table-column prop="realityAmount" label="实际还款金额"></el-table-column> 
      <el-table-column prop="realityDate" label="实际还款日期">
        <template slot-scope="scope">
          <span>{{getUnixTime(scope.row.realityDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cutAmount" label="现金券减免金额"></el-table-column>
      <el-table-column prop="cardNo" label="券编号"></el-table-column>
      <el-table-column prop="cardName" label="券名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
      <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'

  export default {
    data() {
      return {
        searchForm: {
          orderNo:'',
          userName:'',
          mobileNumber:'',
          realityDateBegin:'',
          realityDateEnd:'',
          // state: ''
        },
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        gridData: []
      }
    },
    methods: {
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      bindGrid() {
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize
        }, this.searchForm);
        _data.realityDateBegin = DataUtil.formatTime(this.searchForm.realityDateBegin) || '';
        _data.realityDateEnd = DataUtil.formatTime(this.searchForm.realityDateEnd) || '';
        if(this.searchForm.realityDateBegin > this.searchForm.realityDateEnd){
          this.$message.error('起始时间不能大于结束时间~');
          return;
        }
        this.gridLoading = true;
        this.$http.post('manage/sysCouponUseStat.json', _data).then(response => {
          this.gridLoading = false;
          if (1 == response.body.code) {
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
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.bindGrid()
      },
      excelExport(){
        window.open(Config.host + "/manage/sysCouponUseStatExcel?sessionId="+DataUtil.sid());
      }
    },
    mounted() {
      this.bindGrid();
    }
  }
</script>
<style>
</style>