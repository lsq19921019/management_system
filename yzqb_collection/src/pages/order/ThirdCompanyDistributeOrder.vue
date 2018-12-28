/**
* Created by alan on 17-6-23.预期订单分配
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
        <order-detailpage v-if='item.seen' :seen="item.seen" :uuid="item.uuid" :userUuid="item.userUuid"></order-detailpage>
        <div v-else>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.uuid" width="200"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="searchForm.realName" width="200"></el-input>
        </el-form-item>        
        <el-form-item label="订单标签" prop="status">
          <el-select v-model="searchForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in orderTagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人员" prop="outsourceId">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" clearable>
            <el-option v-for="item in thirdCompanyList" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isAgain"  style='width:160px' placeholder="请选择" clearable>
            <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否被分配" prop="status" label-width="90px">
          <el-select v-model="searchForm.thirdDistribute" placeholder="请选择" clearable>
            <el-option v-for="item in isDisSel" :label="item.value" :key="item.key" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="逾期天数">
              <el-input v-model="searchForm.overdueDayMin" :maxlength="4" placeholder="请输入天数" style="width: 100px;"></el-input> ~ 
              <el-input v-model="searchForm.overdueDayMax" :maxlength="4" placeholder="请输入天数" style="width: 100px;"></el-input>
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
        <el-form-item label="应还款时间" label-width="100px">
          <el-date-picker
            v-model="value4"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item> 
        <el-form-item label=" ">
          <el-button @click="search" type="info" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :selectable="judgeSelect"></el-table-column>
        <el-table-column label="订单编号" prop="uuid" width="180">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="80">
        </el-table-column>
        <!--<el-table-column label="手机号" prop="mobileNumber" width="130">
        </el-table-column>-->
        <el-table-column label="复借订单" prop="isAgain">
          <template scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply">
        </el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm">
        </el-table-column>
        <el-table-column label="应还款时间" prop="refundTime">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.refundTime)}}</span>
          </template>          
        </el-table-column>        
        <el-table-column label="订单标签" prop="orderTag" min-width="116">
          <template scope="scope">
            <span>{{getOrderTag(scope.row.orderTag)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="催收人员" prop="outsourceId" min-width="116">
          <template scope="scope">
            <span>{{getThirdCompany(scope.row.outsourceId)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期天数" prop="overDueDay">
        </el-table-column>
        <el-table-column inline-template label="操作" width="100">
          <div> 
            <el-button size="small" @click="check(row)">详情</el-button>
          </div>
        </el-table-column>
      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>

    <el-form :inline="true" :model="distributeForm" class="toolbar" label-position="right" label-width="70px">
      <el-form-item label="催收人员" prop="status">
        <el-select v-model="distributeForm.thirdCompanyTag" placeholder="请选择" clearable>
          <el-option v-for="item in thirdCompanyList" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="distribute" type="info" :loading="distributeLoading">分配</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="autoDistribute" type="info" :loading="autoDistributeLoading">自动分配</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="订单分配" v-model="editFormDigVisible" :close-on-click-modal="false">
      <div style="margin:0 0 15px;">已分配 <el-tag type="success">{{distributeCount}}</el-tag> 单，其中老户 <el-tag type="success">{{oldDistributeCount}}</el-tag> 单，新户 <el-tag type="success">{{newDistributeCount}}</el-tag> 单</div>
      <div style="margin:0 0 15px;">待分配 <el-tag type="danger">{{needDistributeCount}}</el-tag> 单，其中老户 <el-tag type="danger">{{oldNeedDistributeCount}}</el-tag> 单，新户 <el-tag type="danger">{{newNeedDistributeCount}}</el-tag> 单</div>
      <el-table :data="userListData" highlight-current-row v-loading="editGridLoading" class="grid" max-height="360">
        <el-table-column label="催收人员" prop="name" >
        </el-table-column>
        <el-table-column label="已分配老户订单数" prop="oldDistributeCount">
        </el-table-column>
        <el-table-column label="已分配新户订单数" prop="newDistributeCount">
        </el-table-column>
        <el-table-column label="新增分配老户订单数" prop="oldNeedDistributeCount" >
          <template scope="scope">
            <el-input v-model="scope.row.oldNeedDistributeCount"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增分配新户订单数" prop="newNeedDistributeCount" >
          <template scope="scope">
            <el-input v-model="scope.row.newNeedDistributeCount"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  import orderDetailpage from '../../components/OrderInfoControl'
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
          orderTag:'',
          isAgain: '',
          mobile: '',
          userName: '',
          outsourceId:'',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:'',
          overdueDayMin:'',  //逾期天数极小值
          overdueDayMax:'',  //逾期天数极大值
          refundTimeBegin:'', //应还款开始时间
          refundTimeEnd:'',  //应还款结束时间
          isDis:''   
        },
        isDisSel:[{key:'1',value:'否'},{key:'2',value:'是'}],
        distributeForm:{
          thirdCompanyTag:'',
        },
        distributeLoading:false,
        //订单状态
        applyTimeList:enums.applyTimeList,
        isAgainOrder:enums.isAgainOrder,
        orderStatus:enums.orderPro,
        orderTagList:enums.orderTagList,
        thirdCompanyList:[],
        distributeData:[],
        selectData:{},
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 20,
        dataTotal: 0,
        autoDistributeLoading: false,
        editFormDigVisible: false,
        editGridLoading: false,
        confirmLoading: false,
        userListData: [],
        distributeCount:0,
        oldDistributeCount: 0,
        newDistributeCount: 0,
        needDistributeCount: 0,
        oldNeedDistributeCount: 0,
        newNeedDistributeCount: 0,
        value4:''

      }
    },
    components:{
      orderDetailpage
    },
    methods: {


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


      // getCollectionList() {
      //   this.$http.post('manage/dicItemListByDicCode',{dicCode:DataUtil.id()}).then(response => {
      //     let {body} = response;
      //     if(body.code == 1){
      //       this.thirdCompanyList = body.data;
      //       // this.thirdCompanyList.push({
      //       //   dicItemValue:DataUtil.id(),
      //       //   dicItemName:DataUtil.userName()
      //       // });
            
      //     }else{
      //       this.thirdCompanyList = [];
      //     }

      //   },response => {});
      // },
      getCollectionList() {
        this.$http.post('manage/dicItemListByDicCodeCollection',{dicCode:DataUtil.id()}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
            // this.thirdCompanyList.push({
            //   dicItemValue:DataUtil.id(),
            //   dicItemName:DataUtil.userName()
            // });
            
          }else{
            this.thirdCompanyList = [];
          }

        },response => {});
      },
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      getThirdCompany(type){
        let re = '';
        this.thirdCompanyList.forEach(obj => {
          if (obj.dicItemValue == type) {
            re = obj.dicItemName;
            return
          }
        });
        return re
      },
      getSex(val) {
        return enums.getSex(val)
      },
      getAgain(val){
        return (val==1)?'是' : '否';
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
        if(this.searchForm.overdueDayMin && !DataUtil.isInteger(this.searchForm.overdueDayMin)){
          this.$message.error('请输入正整数格式');
          return;
        }
        if(this.searchForm.overdueDayMax && !DataUtil.isInteger(this.searchForm.overdueDayMax)){
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
          this.$message.error('复借次数区间应大于等于逾期天数下限，请重新输入');
          return;
        }
        if(this.searchForm.overdueDayMin&&this.searchForm.overdueDayMin&&this.searchForm.overdueDayMin && parseInt(this.searchForm.overdueDayMin) > parseInt(this.searchForm.overdueDayMax)){
          this.$message.error('逾期天数区间应大于等于逾期天数下限，请重新输入');
          return;
        }
        this.bindGrid()
      },
      check(row){
        // window.open('#/OrderInfoControl?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid);
          this.addTab(this.editableTabsValue2,row) ;
      },
      judgeSelect(row){
        if(row.outsourceId != DataUtil.id()){
            return false;     //不可选
        }else {
            return true;      //可选
        }
      },
      handleSelectionChange(val){
          this.selectData = val;
      },
      distribute(){
        if(!this.distributeForm.thirdCompanyTag){
            this.$message.error("请选择催收人员");
            return false;
        }
        let result = [];
        this.selectData.forEach((data) =>{
          if(data.outsourceId == DataUtil.id()){
              let temp = {};
              temp.uuid = data.uuid;
              temp.uuidString = data.userUuid;
              temp.outsourceId = this.distributeForm.thirdCompanyTag;
              result.push(temp);
          }
        });
        if(result.length <= 0){
          this.$message.error("请选择催收订单");
          return false;
        }
        this.distributeLoading = true;
        this.$http.post('manage/distributeOrder2ThirdCompany',result).then(response =>{
            this.distributeLoading = false;
            let {body} = response;
            if(1 == body.code){
              this.bindGrid();
            }
        })
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
      bindGrid() {
        this.gridLoading = true;
        if(this.value4&&this.value4.length>0&&this.value4[0]){
            let v = this.value4[0];
            let _v = this.value4[1];
            let m = this.resetMonth(v);  
            let _m = this.resetMonth(_v);  
            this.searchForm.refundTimeBegin = v.getFullYear()+'-'+m+'-'+v.getDate();
            this.searchForm.refundTimeEnd = _v.getFullYear()+'-'+_m+'-'+_v.getDate();
          }else{
            this.searchForm.refundTimeBegin = '';
            this.searchForm.refundTimeEnd = '';
        }        
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          // realName:DataUtil.sid()
        }, this.searchForm);
        _data.userName = this.searchForm.realName
        this.$http.post('manage/thirdCompanyOrderList', _data).then(response => {
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
      autoDistribute(row) {
        this.editFormDigVisible = true;
        this.editGridLoading = true;
        this.$http.post('manage/overDueOrderDistributeCountListByDisCold',{disCode:DataUtil.id(),}).then(response => {
          this.editGridLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.userListData = [];
            this.distributeCount = body.data.distributeCount;
            this.oldDistributeCount = body.data.oldDistributeCount;
            this.newDistributeCount = body.data.newDistributeCount;
            this.needDistributeCount = body.data.needDistributeCount;
            this.oldNeedDistributeCount = body.data.oldNeedDistributeCount;
            this.newNeedDistributeCount = body.data.newNeedDistributeCount;
            this.userListData = body.data.result;
          }else{
            this.$message.error(body.message);
          }
        },response =>{});
      },
      editFormSubmit() {
        let _oldtotalNum = 0,_newtotalNum=0;
        for(let i=0;i<this.userListData.length;i++){
          if(this.userListData[i].oldNeedDistributeCount === '' || this.userListData[i].newNeedDistributeCount === ''){
            this.$message.error('所有分配订单数不能为空');
            return;
          }else{
            this.userListData[i].orderCount = this.userListData[i].oldNeedDistributeCount;
            this.userListData[i].newOrderCount = this.userListData[i].newNeedDistributeCount;
            _oldtotalNum += parseInt(this.userListData[i].oldNeedDistributeCount);
            _newtotalNum += parseInt(this.userListData[i].newNeedDistributeCount);
          }
        }
        if(_oldtotalNum > this.oldNeedDistributeCount || _newtotalNum > this.newNeedDistributeCount){
          this.$message.error('剩余待分配订单数不足，请重新分配');
          return;
        }

        let _data = {
          disCode: DataUtil.id(),
          staff:this.userListData
        };
        this.confirmLoading = true;
        this.$http.post('manage/overDueDicOrderAutoDistributeByNum',_data).then(response =>{
          this.confirmLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.editFormDigVisible = false;
            this.$alert('分单完成，剩余未分配订单：老户'+body.data.oldNeedDistributeCount+'单，新户'+body.data.newNeedDistributeCount+'单', '分单成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'success',
                  message:'分单成功'
                });
              }
            });
            this.bindGrid();
          }else{
            this.$message.error(body.message);
          }
        },response =>{this.confirmLoading = false;});
      },
      resetMonth(v){
        let m = v.getMonth()+1;
        if(m<10){
          m = '0'+m;
        }
        return m;
      },
    },
    mounted() {
      this.bindGrid();
      this.getCollectionList();
    }
  }
</script>
