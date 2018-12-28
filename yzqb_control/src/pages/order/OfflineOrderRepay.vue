/**
* Created by alan on 18-3-09.
*/
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.uuid" width="200"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
            <el-option v-for="item in qudaolist" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemValue.split('#')[0]"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="注册日期">
          <div class="block">
            <el-date-picker
              v-model="searchForm.startTime"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker> ~
            <el-date-picker
              v-model="searchForm.endTime"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>-->
         <!-- <el-form-item label="复借次数区间" label-width="100px">
          <el-input v-model="searchForm.repeTitionsMin" :maxlength="4" style="width: 100px;" placeholder="复借次数下限"></el-input>
          -
          <el-input v-model="searchForm.repeTitionsMax" :maxlength="4" style="width: 100px;" placeholder="复借次数上限"></el-input>
        </el-form-item>
        <el-form-item label="申请期限">
          <el-select v-model="searchForm.borrowingTerm" placeholder="请选择" clearable>
            <el-option v-for="item in applyTimeList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="">
          <el-button @click="search" type="info" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" >
        <el-table-column label="订单编号" prop="uuid" width="180">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="80">
        </el-table-column>
        <el-table-column label="手机号" prop="mobileNumber" width="130"></el-table-column>

        <el-table-column label="借款金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="借款期限" prop="borrowingTerm">
        </el-table-column>
        <el-table-column label="应还日期" prop="refundTime" min-width="116">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.refundTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期天数" prop="overDueDay">
        </el-table-column>

        <el-table-column label="提交时间" prop="updateTime" min-width="116">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="应还金额" prop="refundMoney">
        </el-table-column>
        <el-table-column label="来源" prop="channel">
          <template slot-scope="scope">
            {{getChannelName(scope.row.channel)}}
          </template>
        </el-table-column>
        <el-table-column inline-template label="操作" width="100">
          <div>
            <el-button size="small" @click="check(row)">查看</el-button>
          </div>
        </el-table-column>

      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
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
          realName:'',
          mobile:'',
          username:'',
          status:'',
          startTime:'',
          endTime: '',
          // repeTitionsMin:"",
          // repeTitionsMax:"",
          // borrowingTerm:''
        },
        //订单状态
        // applyTimeList:enums.applyTimeList,
        qudaolist: [],
        orderStatus:enums.orderPro,
        isAgainOrder:enums.isAgainOrder,
        gridLoading: false,
        gridData: [],
        pageIndex: this.$store.getters.getOrderListAllIndex,
        pageSize: 10,
        dataTotal: 0
      }
    },
    methods: {
      getChannelName(type) {
        let re = '';
        this.qudaolist.forEach(obj => {
          if (obj.dicItemValue.split('#')[0] == type) {
            re = obj.dicItemName;
            return
          }
        });
        return re
      },
      getQudaoList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          this.qudaolist = body.data;
        },response=>{});
      },
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getSex(val) {
        return enums.getSex(val)
      },
      search() {
        this.pageIndex = 1;

        // if(this.searchForm.repeTitionsMin && !DataUtil.isInteger(this.searchForm.repeTitionsMin)){
        //   this.$message.error('请输入正整数格式');
        //   return;
        // }
        // if(this.searchForm.repeTitionsMax && !DataUtil.isInteger(this.searchForm.repeTitionsMax)){
        //   this.$message.error('请输入正整数格式');
        //   return;
        // }
        // if(this.searchForm.repeTitionsMin && parseInt(this.searchForm.repeTitionsMin)>9999){
        //   this.$message.error('输入值超过最大次数');
        //   return;
        // }
        // if(this.searchForm.repeTitionsMax && parseInt(this.searchForm.repeTitionsMax)>9999){
        //   this.$message.error('输入值超过最大次数');
        //   return;
        // }
        // if(this.searchForm.repeTitionsMin&&this.searchForm.repeTitionsMax && parseInt(this.searchForm.repeTitionsMin) > parseInt(this.searchForm.repeTitionsMax)){
        //   this.$message.error('逾期天数上限应大于等于逾期天数下限，请重新输入');
        //   return;
        // }

        this.bindGrid()
      },
      check(row){
        window.open('/#/OfflineOrderRepayDetail?userUuid='+row.userUuid+
          '&uuid='+row.uuid+"&realName="+row.realName+"&mobileNumber="+row.mobileNumber+"&amountApply="+row.amountApply+
        "&borrowingTerm="+row.borrowingTerm+"&refundTime="+row.refundTime+"&lendingTime="+row.lendingTime+"&createTime="+row.createTime+"&overDueDay="+row.overDueDay+"&updateTime="+row.updateTime+"&refundMoney="+(row.refundMoney || ""));
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.$store.dispatch('setOrderListAllIndex',val)
        this.bindGrid()
      },
      getOrderStatus() {
        this.$http.post('dicItem/getDicItemsByDicCode.json', {dicCode:'ORDER_STATE'}).then(response => {
          if (1 == response.body.code) {
            this.orderStatus = response.body.result;
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize
        }, this.searchForm);
        this.$http.post('manage/offlineOrderList', _data).then(response => {
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
    mounted: function () {
      this.bindGrid();
      this.getQudaoList();
      //this.getOrderStatus();

    }
  }
</script>
