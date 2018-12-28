/**
* Created by alan on 17-5-11.
*/
<template>
  <section>
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
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in orderStatus" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isAgain" placeholder="请选择" clearable>
            <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源">
          <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
            <el-option v-for="item in qudaolist" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemValue.split('#')[0]"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="searchForm.value4"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="放款时间">
          <el-date-picker
            v-model="searchForm.value5"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否已确认用款">
          <el-select v-model="searchForm.orderStep" placeholder="请选择" clearable>
            <el-option v-for="item in isConfirmSelection" :label="item.name" :key="item.code" :value="item.code"></el-option>
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
        <el-form-item label="">
          <el-button @click="search" type="info" style="width: 170px">查询</el-button>
          <el-button @click="resetPage" style="width: 100px">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="订单编号" prop="uuid" width="180">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="80">
        </el-table-column>
        <!--       <el-table-column label="手机号" prop="mobileNumber" width="130">
              </el-table-column> -->
        <el-table-column label="复借订单" prop="isAgain">
          <template scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="status">
          <template slot-scope="scope">
            <span>{{getOrderType(scope.row.status)}}<a :href="'/#/OrderDetail?seen=true&userUuid='+scope.row.userUuid+
          '&uuid='+scope.row.uuid" target='_blank' :id="'click_'+scope.row.uuid+'_'+scope.row.userUuid"></a></span>
          </template>
        </el-table-column>
        <el-table-column label="是否已确认用款" prop="orderStep">
          <template slot-scope="scope">
            <span>{{getOrderStep(scope.row.orderStep)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm">
        </el-table-column>
        <el-table-column label="申请时间" prop="createTime" min-width="116">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="放款时间" prop="lendingTime" min-width="116">
          <template slot-scope="scope">
            <span>{{getUnixTime(scope.row.lendingTime,scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" prop="channel">
          <template slot-scope="scope">
            {{getChannelName(scope.row.channel)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="">
          <template scope="scope">
            <el-button size="small" @click="check(scope.row)">详情</el-button>
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
    <!--工具条-->
    
  </section>
</template>

<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  import orderDetailpage from '../../components/OrderDetail'
  export default {
    data () {
      return {
        sex: enums.sex,



        //tab切换
        editableTabsValue2: '1',
        editableTabs2: [{
          seen:false,
          title: '订单列表',
          name: '1',
          close:false
        }],
        tabIndex: 1,




        searchForm:{
          uuid:'',
          realName:'',
          mobile:'',
          username:'',
          status:'',
          isAgain:'',
          channel: '',
          value4:'',
          value5:'',
          orderStep:'',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''
        },
        //订单状态
        qudaolist: [],
        applyTimeList:enums.applyTimeList,
        isConfirmSelection:enums.isConfirmSelection,
        orderStatus:enums.orderPro,
        isAgainOrder:enums.isAgainOrder,
        gridLoading: false,
        gridData: [],
        pageIndex: this.$store.getters.getOrderListAllIndex,
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


      resetPage(){
        
        this.searchForm={
          uuid:'',
          realName:'',
          mobile:'',
          username:'',
          status:'',
          isAgain:'',
          channel: '',
          value4:'',
          value5:'',
          orderStep:'',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''
        }
        this.bindGrid();
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





      getChannelName(type) {
        let re = '';
        this.qudaolist.forEach(obj => {
          if (parseInt(obj.dicItemValue.split('#')[0]) === parseInt(type)) {
            re = obj.dicItemName;
            return re;
          }
        });
        return re
      },
      getQudaoList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          if(body.code == 1){
            this.qudaolist = body.data || [];
          }
        },response=>{});
      },
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      getOrderStep(step){
        return enums.getIsUse(step);
      },
        
      getUnixTime(time,row){
        if(row){
          if(row.createTime===row.lendingTime){
            return '-';
          }
        }
        return DataUtil.formatUnixTime(time);
      },
      getSex(val) {
        return enums.getSex(val)
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

        this.bindGrid(1);
      },
      check(row){
          this.addTab(this.editableTabsValue2,row);
        // let w = window.open(location.href);
        // let w = window.open(location.origin);
        // // let w = window.open('about:blank');
        // setTimeout(()=>{
        //     w.location.href = '/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid;
        // },1000);
        // window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+"&uuid="+row.uuid);
      }, 
      clickA(a,b){
        window.open('/#/OrderDetail?seen=true&userUuid='+a+"&uuid="+b);
      },
      rowClick(row){
        // let w = window.open(location.href);
        // let w = window.open(location.origin);
        // // let w = window.open('about:blank');
        // setTimeout(()=>{
        //     w.location.href = '/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid;
        // },1000);
        window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
        // window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+"&uuid="+row.uuid);
        // let a = document.getElementById('click_'+row.uuid+'_'+row.userUuid)
        // let e = document.createEvent('MouseEvents');
        // e.initEvent( 'click', true, true );
        // a.dispatchEvent(e);
        // document.getElementById('click_'+row.uuid+'_'+row.userUuid).click();
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
      resetMonth(v){
        let m = v.getMonth()+1;
        if(m<10){
          m = '0'+m;
        }
        return m;
      },
      bindGrid(searchType) {
        // alert(this.searchForm.isConfirmUse);
        this.gridLoading = true;
        if(this.searchForm.value4&&this.searchForm.value4.length>0&&this.searchForm.value4[0]){
          // this.searchForm.value4.forEach((v,i)=>{
          //   let m = v.getMonth()+1;
          //   //alert(m);
          //   if(m<10){
          //     m = '0'+m;
          //   }
          //   this.searchForm.value4[i]=v.getFullYear()+'-'+m+'-'+v.getDate();
          // });
          let v = this.searchForm.value4[0];
          let _v = this.searchForm.value4[1];
          let m = this.resetMonth(v);  
          let _m = this.resetMonth(_v);  
          this.searchForm.createTimeBegin = v.getFullYear()+'-'+m+'-'+v.getDate();
          this.searchForm.createTimeEnd = _v.getFullYear()+'-'+_m+'-'+_v.getDate();
          // this.searchForm.createTimeBegin = this.searchForm.value4[0];
          // this.searchForm.createTimeEnd = this.searchForm.value4[1];
          // return;
        }else{
          this.searchForm.createTimeBegin = '';
          this.searchForm.createTimeEnd = '';
        }
        if(this.searchForm.value5&&this.searchForm.value5.length>0&&this.searchForm.value5[0]){
          // this.searchForm.value5.forEach((v,i)=>{
          //   let m = v.getMonth()+1;
          //   if(m<10){
          //     m = '0'+m;
          //   }
          //   //alert(m);
          //   this.searchForm.value5[i]=v.getFullYear()+'-'+m+'-'+v.getDate();
          // });
          let v = this.searchForm.value5[0];
          let _v = this.searchForm.value5[1];
          let m = this.resetMonth(v);  
          let _m = this.resetMonth(_v);  
          this.searchForm.lendingTimeBegin = v.getFullYear()+'-'+m+'-'+v.getDate();
          this.searchForm.lendingTimeEnd = _v.getFullYear()+'-'+_m+'-'+_v.getDate();
          // return;
        }else{
          this.searchForm.lendingTimeBegin = '';
          this.searchForm.lendingTimeEnd = '';
        }
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize
        }, this.searchForm);
        this.$http.post('manage/orderList', _data).then(response => {
          if (1 == response.body.code) {
            this.gridLoading = false;
            if(response.body.data){
              this.gridData = response.body.data.data;
              this.dataTotal = response.body.data.recordsTotal;

              // this.gridData.forEach((v,i)=>{
              //   if(v.createTime===v.lendingTime){
              //     v.lendingTime='-'
              //   }
              // });
              console.log(this.gridData);
              console.log(this.dataTotal);
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
        // if(searchType===1){
          // this.searchForm.value4 = [];
          // this.searchForm.value5 = [];
          //   this.searchForm.lendingTimeBegin = '';
          //   this.searchForm.lendingTimeEnd = '';
          //   this.searchForm.createTimeBegin = '';
          //   this.searchForm.createTimeEnd = '';
        // }
      }
    },
    mounted: function () {
      this.bindGrid();
      this.getQudaoList();
      //this.getOrderStatus();

    }
  }
</script>
