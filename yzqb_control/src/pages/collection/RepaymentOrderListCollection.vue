/**
* Created by alan on 17-5-29.
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
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isAgain" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in isAgainOrder" :label="item.name" :key="index" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="放款时间">
          <el-date-picker
            v-model="searchForm.value4"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="还款时间">
          <el-date-picker
            v-model="searchForm.value5"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="委外分配时间">
          <el-date-picker
            v-model="searchForm.value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="催收公司" prop="outsourceIds">
          <el-select v-model="searchForm.outsourceIds" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in prevThirdCompanyPersonList" @click.native="changInput" :label="item.companyResponsel.dicItemName" :key="index" :value="item.companyResponsel.dicItemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人员" prop="outsourceId">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in prevThirdPersonList" :label="item.dicItemName" :key="index" :value="item.dicItemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数">
            <el-input v-model="searchForm.overdueDayMin" :maxlength="4" placeholder="请输入" style="width: 100px;"></el-input>
          -
            <el-input v-model="searchForm.overdueDayMax" :maxlength="4" placeholder="请输入" style="width: 100px;"></el-input>
          &nbsp;天
        </el-form-item>
         <el-form-item label="订单状态">
          <el-select v-model="searchForm.statusString" placeholder="请选择" clearable>
            <el-option label="正常已还款" key="6" value="6"></el-option>
            <el-option label="逾期已还款" key="9" value="9"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="逾期最小天数" label-width="100">
          <el-input v-model="searchForm.overdueDayMin"></el-input>
        </el-form-item>
        <el-form-item label="逾期最大天数" label-width="100">
          <el-input v-model="searchForm.overdueDayMax"></el-input>
        </el-form-item> -->
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
          <el-button @click="search" type="primary" style="width: 100px">查询</el-button>
          <el-button @click="resetPage" style="width: 100px">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <template>
      
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane 
          v-for="(item,index) in tabList" 
          :key="index" 
          :label="item.dicItemName" 
          :tag_name="item.dicItemName">
          <div style="line-height:60px;">
            <p>委外单数:<span>{{tableInfoTips.orderSize}}</span>单&nbsp;&nbsp;&nbsp;&nbsp;催回单数:<span>{{tableInfoTips.repaymentSize}}</span>单&nbsp;&nbsp;&nbsp;&nbsp;催回率：{{parseFloat(tableInfoTips.repaymentRate*100).toFixed(2)}}%</p>
          </div>
          <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @row-click="rowClick" @sort-change='sortChange'>
            <el-table-column label="订单编号" prop="uuid" width="150">
            </el-table-column>
            <el-table-column label="姓名" prop="realName" width="80">
            </el-table-column>
    <!--         <el-table-column label="手机号" prop="mobileNumber" max-width="130">
            </el-table-column> -->
            <el-table-column label="复借订单" prop="isAgain">
            <template slot-scope="scope">
                <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" prop="status">
              <template slot-scope="scope">
                <span>{{getOrderType(scope.row.status)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请金额" prop="amountApply">
            </el-table-column>
            <el-table-column label="申请期限" prop="borrowingTerm" max-width="10">
            </el-table-column>
            <el-table-column label="放款时间" prop="createTime" min-width="106">
              <template slot-scope="scope">
                <span>{{getUnixTime(scope.row.lendingTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="还款时间" prop="updateTime" min-width="106">
              <template slot-scope="scope">
                <span>{{getUnixTime(scope.row.refundTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="逾期天数" prop="overDueDay" max-width="10" sortable>
            </el-table-column>
            <el-table-column label="委外分配时间" prop="thirdDistributeTime" min-width="106">
              <template slot-scope="scope">
                <span>{{getUnixTime(scope.row.thirdDistributeTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="催收公司" prop="outsourceId" min-width="106">
              <template scope="scope">
                <span>{{getPrevThirdCompanyThis(scope.row.outsourceId)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="催收人员" prop="outsourceId" min-width="106">
              <template scope="scope">
                <span>{{getPrevThirdStaff(scope.row.outsourceId)}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      <!-- <el-tab-pane label="D0" tag_name="D0">
        <div style="line-height:60px;">
          <p>委外单数:<span>{{tableInfoTips.orderSize}}</span>单&nbsp;&nbsp;&nbsp;&nbsp;催回单数:<span>{{tableInfoTips.repaymentSize}}</span>单&nbsp;&nbsp;&nbsp;&nbsp;催回率：{{parseFloat(tableInfoTips.repaymentRate*100).toFixed(2)}}%</p>
        </div>
          <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @row-click="rowClick" @sort-change='sortChange'>
          <el-table-column label="订单编号" prop="uuid" width="150">
          </el-table-column>
          <el-table-column label="姓名" prop="realName" width="80">
          </el-table-column>
           <el-table-column label="手机号" prop="mobileNumber" max-width="130">
          </el-table-column> 
          <el-table-column label="复借订单" prop="isAgain">
          <template slot-scope="scope">
              <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" prop="status">
            <template slot-scope="scope">
              <span>{{getOrderType(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请金额" prop="amountApply">
          </el-table-column>
          <el-table-column label="申请期限" prop="borrowingTerm" max-width="10">
          </el-table-column>
          <el-table-column label="放款时间" prop="createTime" min-width="106">
            <template slot-scope="scope">
              <span>{{getUnixTime(scope.row.lendingTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="还款时间" prop="updateTime" min-width="106">
            <template slot-scope="scope">
              <span>{{getUnixTime(scope.row.refundTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="逾期天数" prop="overDueDay" max-width="10" sortable>
          </el-table-column>
          <el-table-column label="委外分配时间" prop="thirdDistributeTime" min-width="106">
            <template slot-scope="scope">
              <span>{{getUnixTime(scope.row.thirdDistributeTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="催收公司" prop="outsourceId" min-width="106">
            <template scope="scope">
              <span>{{getPrevThirdCompanyThis(scope.row.outsourceId)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="催收人员" prop="outsourceId" min-width="106">
            <template scope="scope">
              <span>{{getPrevThirdStaff(scope.row.outsourceId)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="D1_D30" tag_name="D1_D30">
        <div style="line-height:60px;">
          <p>委外单数:<span>{{tableInfoTips.orderSize}}</span>单&nbsp;&nbsp;&nbsp;&nbsp;催回单数:<span>{{tableInfoTips.repaymentSize}}</span>单&nbsp;&nbsp;&nbsp;&nbsp;催回率：{{parseFloat(tableInfoTips.repaymentRate*100).toFixed(2)}}%</p>
        </div>
          <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @row-click="rowClick" @sort-change='sortChange'>
          <el-table-column label="订单编号" prop="uuid" width="150">
          </el-table-column>
          <el-table-column label="姓名" prop="realName" width="80">
          </el-table-column>
           <el-table-column label="手机号" prop="mobileNumber" max-width="130">
          </el-table-column> 
          <el-table-column label="复借订单" prop="isAgain">
          <template slot-scope="scope">
              <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" prop="status">
            <template slot-scope="scope">
              <span>{{getOrderType(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请金额" prop="amountApply">
          </el-table-column>
          <el-table-column label="申请期限" prop="borrowingTerm" max-width="10">
          </el-table-column>
          <el-table-column label="放款时间" prop="createTime" min-width="106">
            <template slot-scope="scope">
              <span>{{getUnixTime(scope.row.lendingTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="还款时间" prop="updateTime" min-width="106">
            <template slot-scope="scope">
              <span>{{getUnixTime(scope.row.refundTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="逾期天数" prop="overDueDay" max-width="10" sortable>
          </el-table-column>
          <el-table-column label="委外分配时间" prop="thirdDistributeTime" min-width="106">
            <template slot-scope="scope">
              <span>{{getUnixTime(scope.row.thirdDistributeTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="催收公司" prop="outsourceId" min-width="106">
            <template scope="scope">
              <span>{{getPrevThirdCompanyThis(scope.row.outsourceId)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="催收人员" prop="outsourceId" min-width="106">
            <template scope="scope">
              <span>{{getPrevThirdStaff(scope.row.outsourceId)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
    </el-tabs>
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
          isAgain:'',
          statusString: '',
          overdueDayMin: '',
          overdueDayMax: '',
          outsourceIds:'',
          outsourceId:'',
          outsourceIdString:'',
          repaymentTag:'ALL',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''
        },
        tabList:[{
          // dicItemName:'全部',
          dicItemName:'ALL',

        }],
        applyTimeList:enums.applyTimeList,
        distributeOrderNum:0,getBackOrderNum:0,getBackRate:"70%",
        
        //订单状态
        orderStatus:enums.orderPro,
        isAgainOrder:enums.isAgainOrder,
        orderTagList:enums.orderTagList,
        isTestOrderList:enums.isTestOrderList,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        thirdCompanyList:[],
        getPrevThirdCompanyList:[],
        prevThirdPersonList:[],
        postId:0,
        prevThirdCompanyPersonList:[],
        prevThirdPersonList: [],
        prevThirdCompanyPersonLists: [],
        tableInfoTips:[],
      }
    },
    methods: {
      sortChange(column, prop, order) {
        switch (column.order){
            case 'ascending': this.searchForm.orderByoverdueDay = 'ASC'; break
            case 'descending': this.searchForm.orderByoverdueDay = 'DESC'; break
            default: this.searchForm.orderByoverdueDay = ''
        }
        this.bindGrid();
      },
      changInput(){
        console.log(this.searchForm.outsourceIds);
      },
      getInfoTips(type){
        this.$http.post('/manage/collectionRepaymentOrderInfo',{tag:type}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.tableInfoTips = body.data;
          }else{
            this.tableInfoTips = [];
          }
        },response => {});
      },
      handleClick(tab, e) {//点击选项卡
      console.log(e);
      console.log(tab);
        // if(parseInt(tab.index)===0){
        //   this.searchForm.repaymentTag = 'ALL';
        //   this.getInfoTips('ALL');
        // }else if(parseInt(tab.index)===1){
        //   this.searchForm.repaymentTag = "D0";
        //   this.getInfoTips('D0');
        // }else if(parseInt(tab.index)===2){
        //   this.searchForm.repaymentTag = "D1_D30";
        //   this.getInfoTips('D1_D30');
        // }
        this.searchForm.repaymentTag = tab.$attrs.tag_name;
        this.getInfoTips(tab.$attrs.tag_name);
        
        this.bindGrid();
      },
      getPrevThirdCompanyThis(type){
        let re = '';
        let _this = this;
        let _re = '';
        if(type===0){
          re = '--';
          return re
        }
        for(var k=0;k<_this.prevThirdCompanyPersonList.length;k++){
          if (parseInt(_this.prevThirdCompanyPersonList[k].companyResponsel.dicItemValue) == type) {
            re = _this.strTrim(_this.prevThirdCompanyPersonList[k].companyResponsel.dicItemName);
            return re;
          }
        }
        // this.prevThirdCompanyPersonList.forEach(obj => {
        //   if (parseInt(obj.companyResponsel.dicItemValue) == type) {
        //     re = _this.strTrim(obj.companyResponsel.dicItemName);
        //     return
        //   }
        // });
        if(!re){
          // alert(1111);
          let temp_index = '';
          let flag = 0;


        
        
            for(var k=0;k<_this.prevThirdCompanyPersonList.length;k++){
              
                  temp_index = k;
                  for(var j=0;j<_this.prevThirdCompanyPersonList[k].dicItemList.length;j++){
                      if (parseInt(_this.prevThirdCompanyPersonList[k].dicItemList[j].dicItemValue) == type) {

                        re = _this.strTrim(_this.prevThirdCompanyPersonList[k].companyResponsel.dicItemName);
                        
                        flag = 1;
                        return re;
                      }
                    }
                  
                  if(flag){
                    return re;
                  }
            }

          // this.prevThirdCompanyPersonList.forEach((obj,i) => {
          //   temp_index = i;
          //   obj.dicItemList.forEach((val,index)=>{
          //     if(parseInt(val.dicItemValue) == type){
          //       flag = 1;
          //       return false;
          //       // re = prevThirdCompanyPersonList[temp_index].companyResponsel.dicItemName;
          //     }
          //   });
          //   if(flag){
          //     alert(666);
          //     return;
          //   }
          // });
          console.log(temp_index);
          // re = _this.prevThirdCompanyPersonList[temp_index].companyResponsel.dicItemName;
          // return _re;
        }
        return re
      },
      getPrevThirdStaff(type){
        let re = '';
        let _this = this;
        if(type===0){
          re = '--';
          return re
        }
        this.prevThirdPersonList.forEach(obj => {
          if (parseInt(obj.dicItemValue) == type) {
            re = _this.strTrim(obj.dicItemName);
            return
          }
        });
        return re
      },
      getCollectionList() {       //催收岗位
        // this.$http.post('manage/collectionUserList',{}).then(response => {
        //   let {body} = response;
        //   if(body.code == 1){
        //     this.thirdCompanyPersonList = body.data;
        //   }else{
        //     this.thirdCompanyPersonList = [];
        //   }
        // },response => {});


        
        this.$http.post('manage/collectionUserList',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyPersonList = body.data;
          }else{
            this.thirdCompanyPersonList = [];
          }
        },response => {});

        this.$http.post('manage/getCompayUserInfo',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.prevThirdCompanyPersonList = body.data;
            this.prevThirdCompanyPersonList.forEach((v,i)=>{
              v.dicItemList.forEach((val,index)=>{
                this.prevThirdPersonList.push(val);
              });
            });
            console.log(this.prevThirdCompanyPersonList);
          }else{
            this.prevThirdCompanyPersonList = [];
            this.prevThirdPersonList = [];
          }
        },response => {});

        // this.$http.post('manage/getCompayInfo',{}).then(response => {
        //   let {body} = response;
        //   if(body.code == 1){
        //     this.prevThirdCompanyPersonLists = body.data;
        //   }else{
        //     this.prevThirdCompanyPersonLists = [];
        //   }
        // },response => {});

        this.$http.post("manage/companyListByDicCode",{disCode:"DAY0_THIRD_COMPANY"}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        })

        // this.$http.post("manage/companyListByDicCode",{disCode:"DAY0_THIRD_COMPANY"}).then(response => {
        //   let {body} = response;
        //   if(body.code == 1){
        //     this.thirdCompanyList = body.data;
        //   }else{
        //     this.thirdCompanyList = [];
        //   }
        // })
        
        this.$http.post('manage/getCompayInfo',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.prevThirdCompanyPersonLists = body.data;
          }else{
            this.prevThirdCompanyPersonLists = [];
          }
        },response => {});
      },
      getOrderType(type){
        return enums.getOrderPro(type);
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
        
            console.log(this.prevThirdCompanyPersonList[0].companyResponsel.dicItemValue+this.prevThirdCompanyPersonList[1].companyResponsel.dicItemValue+this.prevThirdCompanyPersonList[2].companyResponsel.dicItemValue+'-------');
        this.bindGrid()
      },
      
      resetPage(){
        
        this.searchForm={
          uuid:'',
          realName:'',
          mobile:'',
          isAgain:'',
          statusString: '',
          overdueDayMin: '',
          overdueDayMax: '',
          outsourceIds:'',
          outsourceId:'',
          outsourceIdString:'',
          repaymentTag:'ALL',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''
        }
        // window.location.reload();
        
        this.bindGrid();
      },
      rowClick(row){
        window.open('/#/OrderInfoControl?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
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
      resetMonth(v){
        let m = v.getMonth()+1;
        if(m<10){
          m = '0'+m;
        }
        return m;
      },
      bindGrid() {
        console.log(this.searchForm.outsourceIds);
        this.searchForm.outsourceIdString = '';
        if(this.searchForm.outsourceId){
          // alert(this.searchForm.outsourceId);
          this.searchForm.outsourceIdString = '';
        }else if(this.searchForm.outsourceIds){
          let _this = this;
          _this.prevThirdCompanyPersonList.forEach((v,i)=>{
            console.log(v.companyResponsel.dicItemValue + _this.searchForm.outsourceIds);
            if(v.companyResponsel.dicItemValue === _this.searchForm.outsourceIds){
              v.dicItemList.forEach((val,index)=>{
                _this.searchForm.outsourceIdString += val.dicItemValue+',';
              });
            }
          });
          
        }
        if(this.searchForm.outsourceIds){
        this.searchForm.outsourceIdString = this.searchForm.outsourceIdString.slice(0,this.searchForm.outsourceIdString.length-1);
          if(!this.searchForm.outsourceIdString){
            this.searchForm.outsourceIdString = this.searchForm.outsourceIds;
          }else{
            this.searchForm.outsourceIdString = this.searchForm.outsourceIdString+','+this.searchForm.outsourceIds;
          }
        }
        // alert(this.searchForm.outsourceIdString);
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
          this.searchForm.lendingTimeBegin = v.getFullYear()+'-'+m+'-'+v.getDate();
          this.searchForm.lendingTimeEnd = _v.getFullYear()+'-'+_m+'-'+_v.getDate();
          // this.searchForm.createTimeBegin = this.searchForm.value4[0];
          // this.searchForm.createTimeTimeEnd = this.searchForm.value4[1];
          // return;
        }else{
          this.searchForm.lendingTimeBegin = '';
          this.searchForm.lendingTimeEnd = '';
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
          this.searchForm.refundTimeBegin = v.getFullYear()+'-'+m+'-'+v.getDate();
          this.searchForm.refundTimeEnd = _v.getFullYear()+'-'+_m+'-'+_v.getDate();
          // return;
        }else{
          this.searchForm.refundTimeBegin = '';
          this.searchForm.refundTimeEnd = '';
        }
        
        if(this.searchForm.value6&&this.searchForm.value6.length>0&&this.searchForm.value6[0]){
          // this.searchForm.value5.forEach((v,i)=>{
          //   let m = v.getMonth()+1;
          //   if(m<10){
          //     m = '0'+m;
          //   }
          //   //alert(m);
          //   this.searchForm.value5[i]=v.getFullYear()+'-'+m+'-'+v.getDate();
          // });
          let v = this.searchForm.value6[0];
          let _v = this.searchForm.value6[1];
          let m = this.resetMonth(v);  
          let _m = this.resetMonth(_v);  
          this.searchForm.thirdDistributeTimeBegin = v.getFullYear()+'-'+m+'-'+v.getDate();
          this.searchForm.thirdDistributeTimeEnd = _v.getFullYear()+'-'+_m+'-'+_v.getDate();
          // return;
        }else{
          this.searchForm.thirdDistributeTimeBegin = '';
          this.searchForm.thirdDistributeTimeEnd = '';
        }

        // if(this.searchForm.overdueDayMin && this.searchForm.overdueDayMax){
        //   if(this.searchForm.overdueDayMin < 0 || this.searchForm.overdueDayMax < 0 || Number(this.searchForm.overdueDayMin) >= Number(this.searchForm.overdueDayMax)){
        //     this.$message.error("请先正确填写天数");
        //     return false;
        //   }
        // };
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          // outsourceIdString: ''
        }, this.searchForm);
        this.$http.post('manage/collectionRepaymentOrder', _data).then(response => {
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
      },
      getTabList(){
        this.$http.post("manage/dicItemListByDicCode",{dicCode:"COLLECTION_POST"}).then(response => {
          let {body} = response;
          if(body.code == 1){
            // this.tabList = body.data;
            body.data.forEach((v,i)=>{
              this.tabList.push(v);
            });
          }else{
            this.tabList = [{
              dicItemName:'ALL',
              tag_name:'ALL'
            }];
          }
        })
      },
      strTrim(str){
        if(str){
          let string_r = '';
          string_r=str.replace(/\(/g,""); //替换（为
          string_r=str.replace(/\)/g,"");//替换（为
          string_r=str.replace(/\（/g,""); //替换（为
          string_r=str.replace(/\）/g,"");//替换（为
          return string_r;
        }
      },
    },
    mounted: function () {
      this.getTabList();
      this.bindGrid();
      this.getCollectionList();
      this.getInfoTips('ALL');
      // setTimeout(()=>{
      //   console.log(this.tabList);
      // },3000);  
    }
  }
</script>
