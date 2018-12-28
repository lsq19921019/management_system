<template>
  <div id="getUserLastSmsCode">
    <el-form ref="form" :model="form" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="form.uuid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindGrid">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" v-loading="gridLoading">
      <el-table-column label="订单编号" prop="uuid" width="180">
      </el-table-column>
      <el-table-column label="姓名" prop="realName" width="180">
      </el-table-column>
      <el-table-column label="手机号" prop="mobileNumber" width="180">
      </el-table-column>
      <el-table-column label="复借订单" prop="isAgain">
        <template scope="scope">
          <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="status">
        <template scope="scope">
          <span>{{getOrderType(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请金额" prop="amountApply">
      </el-table-column>
      <el-table-column label="申请期限" prop="borrowingTerm">
      </el-table-column>
      <el-table-column label="申请时间" prop="createTime" min-width="116">
        <template scope="scope">
          <span>{{getUnixTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      //
      return {
        gridLoading: false,
        tableData: [],
        form: {
          uuid: ''
        }
      }
    },
    methods: {
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      bindGrid() {
        let _data = Object.assign({},this.form);
        this.gridLoading = true;
        this.$http.post('manage/orderUserByOrderNo', _data).then(response => {
          this.gridLoading = false;
          if (1 == response.body.code) {
            if(response.body.data){
              this.tableData = response.body.data;
            }else {
              this.tableData = {};
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {

        });
      }
    },
    mounted() {

    }
  }
</script>
<style>
  #getUserLastSmsCode {
    margin-top: 20px;
  }
</style>
