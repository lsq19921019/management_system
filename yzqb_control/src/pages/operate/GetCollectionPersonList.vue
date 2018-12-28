<template>
  <section>
      <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="手机号">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="bindGrid" type="info">查询</el-button>
      </el-form-item>
    </el-form>
     <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="订单号" prop="uuid" ></el-table-column>
        <el-table-column label="申请时间" prop="createTime">
          <template scope="scope">
            {{formatTime(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="催收人员" prop="remark"></el-table-column>
        <el-table-column label="渠道" prop="channel">
          <template scope="scope">
            {{formatChannel(scope.row.channel)}}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  import Enums from '../../common/Enum'
  export default {
    data() {
      return {
        searchForm: {
          mobile: ''
        },
        gridData: [],
        qudaolist: [],
        gridLoading: false
      }
    },
    methods: {
      formatTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getQudaoList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          this.qudaolist = body.data || [];
        },response=>{});
      },
      formatChannel(type){
        //return Enums.getChannelType(data);
          let re = '';
          this.qudaolist.forEach(obj => {
            if (obj.dicItemValue.split('#')[0] == type) {
              re = obj.dicItemName;
              return
            }
          });
          return re
      },
      bindGrid() {
        this.gridData = [];
        let _data = Object.assign({},this.searchForm);
        this.gridLoading = true;

        this.$http.post('manage/getOrderCollectionInfoByMobile', _data).then(response => {
          let {body} = response;
          this.gridLoading = false;
          if (1 == body.code) {
              this.gridData = response.body.data;
          } else {
            this.$message.error(body.message);
          }
        }, response => {

        });
      }
    },
    mounted() {
      this.getQudaoList();
    }
  }
</script>
<style>
</style>
