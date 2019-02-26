<template>
  <div id="getUserLastSmsCode">
  <el-form ref="form" :model="form" :inline="true" label-width="80px" class="demo-form-inline">
    <el-form-item label="手机号码">
      <el-input v-model="form.mobile" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="bindGrid">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%" v-loading="gridLoading">
      <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="createTime" label="登录时间"></el-table-column>
      <el-table-column prop="smsCode" label="验证码"></el-table-column>
  </el-table>
  </div>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        gridLoading: false,
        tableData: [],
        form: {
          mobile: ''
        }
      }
    },
    methods: {
      bindGrid() {
        let _data = Object.assign({},this.form);
        this.gridLoading = true;
        this.$http.post('manage/getUserLastSmsCode', _data).then(response => {
          this.gridLoading = false;
          if (1 == response.body.code) {
            if(response.body.data){
              this.tableData = response.body.data;
              this.tableData[0].createTime=DataUtil.formatUnixTime(this.tableData[0].createTime)
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