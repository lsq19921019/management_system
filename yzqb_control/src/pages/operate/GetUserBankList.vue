<template>
  <section>
  <el-tabs type="border-card">

    <el-tab-pane label="查询银行卡列表">
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
          <el-table-column label="姓名" prop="bankCardName" ></el-table-column>
          <el-table-column label="开户银行名称" prop="bankName"></el-table-column>
          <el-table-column label="银行卡号" prop="bankNumberNo"></el-table-column>
          <el-table-column label="用户渠道" prop="remark">
            <template slot-scope="scope">
              {{formatChannel(scope.row.remark)}}
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>

    <el-tab-pane label="订单状态管理">
      <!--工具条-->
      <el-form :inline="true" :model="orderStateForm" class="toolbar">
        <el-form-item label="订单编号">
          <el-input v-model="orderStateForm.uuid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="bindorderStateData" type="info">查询</el-button>
        </el-form-item>
      </el-form>
       <!--列表-->
      <template>
        <el-table :data="orderStateData" highlight-current-row v-loading="orderStateLoading" class="grid">
          <el-table-column label="订单编号" prop="uuid" ></el-table-column>
          <el-table-column label="手机号" prop="mobile"></el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <span>{{getOrderType(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付通道状态">
              <template slot-scope="scope">
                {{getPayChannelStatus(scope.row.status+''+scope.row.payStatus)}}
              </template>
          </el-table-column>
          <el-table-column label="订单渠道" prop="channel">
            <template slot-scope="scope">
              {{formatChannel(scope.row.channel)}}
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
  </el-tabs>

  </section>
</template>
<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        searchForm: {
          mobile: ''
        },
        orderStateForm: {
          uuid: ''
        },
        payChannelList: [],
        gridData: [],
        orderStateData: [],
        qudaolist:[],
        gridLoading: false,
        orderStateLoading: false
      }
    },
    methods: {
      formatChannel(type){
        //return enums.getChannelType(data);
        let re = '';
        this.qudaolist.forEach(obj => {
          if (obj.dicItemValue.split('#')[0] == type) {
            re = obj.dicItemName;
            return
          }
        });
        return re
      },
      getPyaChannelList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'PAY_CHANNEL_STATUS'}).then(response=>{
          let {body} = response;
          this.payChannelList = body.data;
        },response=>{});
      },
      getQudaoList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          this.qudaolist = body.data || [];
        },response=>{});
      },
      getPayChannelStatus(type) {    //获取支付通道状态
        console.log(type);
         let re = '';
          this.payChannelList.forEach(obj => {
            if (obj.dicItemValue.split('#')[0] == type) {
              re = obj.dicItemName;
              return
            }
          });
          return re
      },
      getOrderType(type){
          return enums.getOrderPro(type);
      },
      bindGrid() {                    //银行卡列表
        this.gridData = [];
        let _data = Object.assign({},this.searchForm);
        this.gridLoading = true;

        this.$http.post('manage/userBankInfoByMobile', _data).then(response => {
          let {body} = response;
          this.gridLoading = false;
          if (1 == body.code) {
              this.gridData = response.body.data;
          } else {
            this.$message.error(body.message);
          }
        }, response => {

        });
      },
      bindorderStateData() {      //订单状态
        this.orderStateData = [];
        let _data = Object.assign({},this.orderStateForm);
        this.orderStateLoading = true;

        this.$http.post('manage/getOrderMsgByUuid', _data).then(response => {
          let {body} = response;
          this.orderStateLoading = false;
          if (1 == body.code) {
              this.orderStateData.push(body.data.data);
          } else {
            this.$message.error(body.message);
          }
        }, response => {

        });
      }
    },
    mounted() {
      this.getPyaChannelList();
      this.getQudaoList();
    }
  }
</script>
<style>
</style>
