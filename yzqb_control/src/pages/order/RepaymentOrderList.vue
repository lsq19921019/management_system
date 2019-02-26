/**
* Created by alan on 17-5-29.
*/
<template>
  <section>
    <!--工具条-->
    <el-tabs v-model="editableTabsValue2" type="card" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable ="item.close"
      >
        <!-- {{item.content}} -->
        <order-detailpage v-if='item.seen' :seen="item.seen" :uuid="item.uuid" :userUuid="item.userUuid" @getOrderDetail="getOrderDetail"></order-detailpage>
        <div v-else>
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
         <el-form-item label="订单状态">
          <el-select v-model="searchForm.statusString" placeholder="请选择" clearable>
            <el-option label="正常已还款" key="6" value="6"></el-option>
            <el-option label="逾期已还款" key="9" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isAgain" placeholder="请选择" clearable>
            <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期最小天数" label-width="100">
          <el-input v-model="searchForm.overdueDayMin"></el-input>
        </el-form-item>
        <el-form-item label="逾期最大天数" label-width="100">
          <el-input v-model="searchForm.overdueDayMax"></el-input>
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
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @row-click="rowClick">
        <el-table-column label="订单编号" prop="uuid" width="160">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="80">
        </el-table-column>
<!--         <el-table-column label="手机号" prop="mobileNumber" max-width="130">
        </el-table-column> -->
        <el-table-column label="复借订单" prop="isAgain">
         <template scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="status">
          <template scope="scope">
            <span>{{getOrderType(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm" max-width="10">
        </el-table-column>
        <el-table-column label="申请时间" prop="createTime" min-width="116">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="还款时间" prop="updateTime" min-width="116">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.updateTime)}}</span>
          </template>
        </el-table-column>
         <el-table-column label="逾期天数" prop="overDueDay" max-width="10">
<!--           <template scope="scope">
            <span>{{(scope.row.overDueDay < -1) ? -1:scope.row.overDueDay}}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="测试订单">
          <template scope="scope">
            <el-tag :type="scope.row.isTestOrder==1? 'success' : 'danger'" close-transition>{{scope.row.isTestOrder==1?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  import orderDetailpage from '../../components/OrderDetail'
  export default {
    data () {
      return {



        //tab切换
        editableTabsValue2: '1',
        editableTabs2: [{
          seen:false,
          title: '订单列表',
          name: '1',
          close:false
        }],
        tabIndex: 1,



        sex: enums.sex,
        searchForm:{
          uuid:'',
          realName:'',
          mobile:'',
          username:'',
          isAgain:'',
          statusString: '',
          overdueDayMin: '',
          overdueDayMax: '',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''
        },
        //订单状态
        applyTimeList:enums.applyTimeList,
        isAgainOrder:enums.isAgainOrder,
        orderStatus:enums.orderPro,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0
      }
    },
    components:{
      orderDetailpage
    },
    methods: {



      getOrderDetail(data){
        this.addTab(this.editableTabsValue2,data);
      },

        //tab切换
      addTab(targetName,row) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: '订单详情',
          name: newTabName,
          // content: 'New Tab content',
          seen:true,
          uuid:row.uuid,
          userUuid:row.userUuid,
          close:true,
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        // alert(this.editableTabsValue2);
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
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

        
        if(this.searchForm.overdueDayMin && !DataUtil.isInteger_(this.searchForm.overdueDayMin)){
          this.$message.error('请输入整数格式');
          return;
        }
        if(this.searchForm.overdueDayMax && !DataUtil.isInteger_(this.searchForm.overdueDayMax)){
          this.$message.error('请输入整数格式');
          return;
        }
        
        
        if(this.searchForm.overdueDayMax && parseInt(this.searchForm.overdueDayMax)>9999 || parseInt(this.searchForm.overdueDayMax)<-100){
          this.$message.error('输入值超过最大天数');
          return;
        }
        if(this.searchForm.overdueDayMin && parseInt(this.searchForm.overdueDayMin)>9999 || parseInt(this.searchForm.overdueDayMin)<-100){
          this.$message.error('输入值超过最大天数');
          return;
        }
        if(this.searchForm.overdueDayMin&&this.searchForm.overdueDayMax && parseInt(this.searchForm.overdueDayMin) > parseInt(this.searchForm.overdueDayMax)){
          this.$message.error('复借次数上限应大于等于复借次数下限，请重新输入');
          // this.searchForm.overdueDayMin = '';
          // this.searchForm.overdueDayMax = '';
          return;
        }
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
      rowClick(row){
        // window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid);
          this.addTab(this.editableTabsValue2,row);

      },
      pageSizeChange(val) {
        console.log(val);
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.$store.dispatch('setOrderListAllIndex',val)
        this.bindGrid()
      },
      bindGrid() {
        // if(this.searchForm.overdueDayMin && this.searchForm.overdueDayMax){
        //   if(this.searchForm.overdueDayMin < 0 || this.searchForm.overdueDayMax < 0 || Number(this.searchForm.overdueDayMin) >= Number(this.searchForm.overdueDayMax)){
        //     this.$message.error("请先正确填写天数");
        //     return false;
        //   }
        // };
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize
        }, this.searchForm);
        this.$http.post('manage/repaymentOrderList', _data).then(response => {
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
    }
  }
</script>
