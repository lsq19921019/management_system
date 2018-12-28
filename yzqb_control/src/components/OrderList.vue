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
      <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.uuid"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="订单标签" prop="status">
          <el-select v-model="searchForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in orderTagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收公司" prop="outsourceIds">
          <el-select v-model="searchForm.outsourceIds" placeholder="请选择" @change="getPersonByCollectionList(searchForm.outsourceIds,1)" clearable>
          <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人员" prop="outsourceId">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" filterable clearable>
            <el-option v-for="item in requestPersonList" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否被分配" prop="" label-width="90">
          <el-select v-model="searchForm.thirdDistribute" placeholder="请选择" clearable>
            <el-option  label="是" key="" value="1"></el-option>
            <el-option  label="否" key="" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isAgain" placeholder="请选择" clearable>
            <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试订单" prop="" label-width="90">
          <el-select v-model="searchForm.isTestOrder" placeholder="请选择" clearable>
            <el-option  label="是" key="" value="1"></el-option>
            <el-option  label="否" key="" value="0"></el-option>
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
        <el-form-item label="应还款时间">
          <el-date-picker
            v-model="searchForm.value5"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="逾期天数">
            <el-input v-model="searchForm.overdueDayMin" :maxlength="4" placeholder="请输入" style="width: 100px;"></el-input>
          -
            <el-input v-model="searchForm.overdueDayMax" :maxlength="4" placeholder="请输入" style="width: 100px;"></el-input>
          &nbsp;天
        </el-form-item>
        <el-form-item label="渠道来源">
          <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
            <el-option v-for="item in qudaolist" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemValue.split('#')[0]"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上阶段催收公司">
          <!-- <el-select v-model="searchForm.lastOutSourceId" placeholder="请选择" clearable> -->
          <el-select v-model="lastCompanyId" placeholder="请选择" clearable @change="getPersonByCollectionList(lastCompanyId,2)">
            <el-option v-for="item in prevThirdCompanyPersonList" :label="item.companyResponsel.dicItemName" :key="item.companyResponsel.dicItemValue" :value="item.companyResponsel.dicItemValue"></el-option>
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

        <el-form-item label=" ">
          <el-button @click="search" type="info" style="width: 100px">查询</el-button>
          <el-button @click="resetPage" style="width: 100px">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <!-- <el-table style="width:100%;" :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @selection-change="handleSelectionChange" @sort-change='sortChange' @row-click="check"> -->
      <el-table style="width:100%;" :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @selection-change="handleSelectionChange" @sort-change='sortChange'>  
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="订单编号" prop="uuid"  width="160">
        </el-table-column>
        <el-table-column label="姓名" prop="realName"  width="80">
        </el-table-column>
    <!--     <el-table-column label="手机号" prop="mobileNumber"  width="130">
        </el-table-column> -->
        <el-table-column label="复借订单" prop="isAgain" min-width="100">
          <template scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply" min-width="100">
        </el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm" min-width="100">
        </el-table-column>
        <el-table-column label="订单标签" prop="orderTag" min-width="106">
          <template scope="scope">
            <span>{{getOrderTag(scope.row.orderTag)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="测试订单" min-width="100">
          <template scope="scope">
            <el-tag :type="scope.row.isTestOrder==1? 'success' : 'danger'" close-transition>{{scope.row.isTestOrder==1?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="上阶段催收公司" prop="lastOutSourceId" min-width="166">
          <template scope="scope">
            <span>{{getPrevThirdCompanyThis(scope.row.lastOutSourceId)}}</span>
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
        <el-table-column label="逾期天数" prop="overDueDay" min-width="150" sortable>
        </el-table-column>
        <el-table-column label="渠道" prop="channel" min-width="150">
          <template scope="scope">{{getChannelType(scope.row.channel)}}</template>
        </el-table-column>
        <el-table-column label="申请时间" prop="createTime" min-width="200">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="放款时间" prop="lendingTime" min-width="200">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.lendingTime,scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="应还款时间" prop="refundTime" min-width="200">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.refundTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160">
          <template scope="scope">
            <!-- <el-button size="small" @click="check(scope.row)">详情</el-button> -->
            <el-button size="small" @click="test(scope.row)">测试</el-button>
            <el-button size="small" @click="check(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->

    <el-form :inline="true" :model="distributeForm" class="toolbar" label-position="right" label-width="70px">
      <el-form-item label="催收公司" prop="status">
        <el-select v-model="distributeForm.thirdCompanyTag" placeholder="请选择" filterable clearable>
          <!-- <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option> -->
          <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="distribute" type="info" :loading="distributeLoading">分配</el-button>
      </el-form-item>
      <el-form-item v-if="this.dialogTitle == 'D1~D7'">
        <el-button @click="testAssginDistribute" type="info" :loading="autoDistributeLoading">自动测试订单分配</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="autoDistribute" type="info" :loading="autoDistributeLoading">自动分配</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="listDistribute" type="info" :loading="listDistributeLoading">批量分配</el-button>
      </el-form-item>
    </el-form>
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>


    <el-dialog title="批量分单" v-model="editFormDigListVisible" :close-on-click-modal="false" size="normal">
              <div style="margin:0 0 15px;">{{dialogTitle}} 待分配订单： <el-tag type="success">{{distributeCompanyList.orderSize}}</el-tag>  单，已选择： <el-tag type="success">{{hasDistribute}}</el-tag> 单，剩余： <el-tag type="success">{{remainOrder}}</el-tag> 单</div>
     
          <div style="overflow:hidden;margin-bottom:20px;" v-for="(item,index) in distributeCompanyList.company" :key="index">
            <div style="float:left;padding:0 20px;">
              <div style="line-height:36px;background-color:#eee;padding-left:10px;">{{item.companyName}}</div>  
              <div>坐席数：<span style="display:inline-block;min-width:60px;">{{item.companyEmployeeSize}}</span> 累计催回率：<span style="display:inline-block;min-width:60px;">{{item.finishCaseRate}}</span></div>  
            </div>
            <div style="float:left;">
              <input v-model="item.subOrder" width="400" class="inputNum el-input__inner" maxlength='6' @input="computeOrder" style="float:left;"/>
            </div> 
            <div style="float:left;line-height:36px;">&nbsp;&nbsp;单</div>
          </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigListVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="editFormListSubmit" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="commonForm.title" v-model="editFormDigVisible" :close-on-click-modal="false">
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

    <el-dialog title="测试订单设置" v-model="setTestFormDigVisible" :close-on-click-modal="false" size="tiny">
      <div>
        <el-form :model="setTestForm" label-position="left" label-width="0px">
          <el-row>
            <el-col :span="16" :offset="4">
            <el-form-item>设置为测试订单</el-form-item>
              <el-form-item>
                <el-radio-group v-model="setTestForm.isTestOrder">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="setTestFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="setTestFormSubmit" :loading="setTestconfirmLoading">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="测试订单分配" v-model="testAssignFormDigVisible" :close-on-click-modal="false">
      <div style="margin:0 0 15px;">已分配 <el-tag type="success">{{assignSum}}</el-tag> 单，待分配 <el-tag type="danger">{{unAssignSum}}</el-tag> 单</div>
      <el-table :data="userAssignList" highlight-current-row v-loading="testAssignGridLoading" class="grid" max-height="360">
        <el-table-column label="催收人员" prop="realName" >
        </el-table-column>
        <el-table-column label="已分配测试订单数" prop="assignCount">
        </el-table-column>
        <el-table-column label="未分配测试订单数" prop="unAssignCount" >
          <template scope="scope">
            <el-input v-model="scope.row.unAssignCount"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="testAssignFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="testAssignFormSubmit" :loading="testAssignconfirmLoading">确 定</el-button>
      </div>
    </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
  import enums from '../common/Enum'
  import DataUtil from '../common/dataUtil'
  import orderDetailpage from '../components/OrderDetail'
  export default {
    props: ['dialogTitle','postId','itemValue'],
    data() {
      return {
        requestPersonList:'',
        
        //tab切换
        editableTabsValue2: '1',
        editableTabs2: [{
          seen:false,
          title: '订单列表',
          name: '1',
          close:false
        }],
        tabIndex: 1,



        searchForm: {
          uuid: '',
          orderTag: '',
          outsourceId: '',
          thirdDistribute: '',
          isAgain: '',
          isTestOrder: '',
          lastOutSourceId:'',
          // outsourceIds: '',
          outsourceIdString: '',
          overdueDayMin:'',
          overdueDayMin:'',
          outsourceIds:'',
          outsourceId:'',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''

        },
        temp_form_data:{},
        applyTimeList:enums.applyTimeList,
        lastCompanyId:'',
        numTest:/^[0-9]\d*$/, //是否是數字;
        distributeCompanyList:{},
        hasDistribute:0,
        remainOrder:0,
        computeTotalOrders:0,
        checkStatus:true,
        editFormDigListVisible:false,
        orderTagList:enums.orderTagList,
        thirdCompanyList: [],
        allpersonList:[],
        gridData: [],
        gridLoading: false,
        pageIndex: 1,
        pageSize: 20,
        dataTotal: 0,
        distributeForm:{
          thirdCompanyTag:'',
        },
        distributeLoading: false,
        commonForm:{
          title: ''
        },
        isAgainOrder:enums.isAgainOrder,
        editFormDigVisible: false,
        confirmLoading: false,
        editForm: {
          code: ''
        },
        autoDistributeLoading: false,
        userListData: [],
        editGridLoading: false,
        selectData: [],
        distributeCount:0,
        oldDistributeCount: 0,
        newDistributeCount: 0,
        needDistributeCount: 0,
        oldNeedDistributeCount: 0,
        newNeedDistributeCount: 0,
        setTestFormDigVisible: false,
        setTestForm: {
          isTestOrder: '',
          orderNo: '',
          userUuid: ''
        },
        setTestconfirmLoading: false,
        qudaolist: [],
        assignSum:0,     //测试订单分配
        unAssignSum: 0,
        userAssignList: [],
        testAssignFormDigVisible: false,
        testAssignGridLoading: false,
        testAssignconfirmLoading: false,
        getPrevThirdCompanyList:[],
        prevThirdPersonList:[],
        prevThirdCompanyPersonList:[],
        prevThirdPersonList: [],
        prevThirdCompanyPersonLists: [],
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




      sortChange(column, prop, order) {
        switch (column.order){
            case 'ascending': this.searchForm.orderByoverdueDay = 'ASC'; break
            case 'descending': this.searchForm.orderByoverdueDay = 'DESC'; break
            default: this.searchForm.orderByoverdueDay = ''
        }
        this.bindGrid();
      },
      
      listDistribute(row){      //自动分配返显
        this.getCollecttionPerson();
        this.getCollectionList();
        this.bindGrid();
        this.getQudaoList();
        this.gettWillOverList();
        setTimeout(()=>{
            this.hasDistribute = 0;
            // this.computeTotalOrders = 0;
            this.remainOrder = 0;
          this.editFormDigListVisible = true;
          this.editGridLoading = true;
          this.$http.post('manage/findOrderD0AssignCountList',{}).then(response => {
            this.editGridLoading = false;
            let {body} = response;
            if(body.code == 1){
              this.userListData = [];
              this.orderD0Assign = body.data.orderD0Assign;
              this.userListData = body.data.userAssignList;
            }else{
              this.$message.error(body.message);
            }
          },response =>{});
        },300);
      },
      
      openAlert() {
        this.$alert('当前暂无待分配订单', ' ', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      },
      computeOrder(){
        // value=value.replace(/[^\d]/g,'');
        // if(this.computeTotalOrders>=parseInt(this.distributeCompanyList.orderSize)){
        //   return;
        // }
        // console.log(event.target.value);
        this.hasDistribute = 0;
        this.computeTotalOrders = 0;
        this.remainOrder = 0;
        let _this = this;
        _this.checkStatus = true;
         _this.distributeCompanyList.company.forEach((v,i)=>{
            //  alert(v.subOrder);
            v.subOrder = v.subOrder.toString();
           if(!v.subOrder){
             v.subOrder = v.subOrder.replace(/[^\d]/g,'');
            // alert(document.querySelectorAll('.inputNum')[i].childNodes[2].value);
           }else if(!_this.numTest.test(v.subOrder)){
             v.subOrder = v.subOrder.replace(/[^\d]/g,'');
             _this.checkStatus = false;
             _this.$message.error('格式不正确！');
            // alert(document.querySelectorAll('.inputNum')[i].childNodes[2].value);
           }
           if(!v.subOrder){
             return false;
           }else{
            this.hasDistribute += parseInt(v.subOrder);
            this.computeTotalOrders += parseInt(v.subOrder);
           }
         });
         if(this.hasDistribute>parseInt(this.distributeCompanyList.orderSize)){
            this.remainOrder = 0;
            this.hasDistribute = this.distributeCompanyList.orderSize;
         }else{
            this.remainOrder = this.distributeCompanyList.orderSize-this.hasDistribute;
         }
         
            
      },
      editFormListSubmit() {       //批量分配数据提交
        // numTest.test();
        if(parseInt(this.distributeCompanyList.orderSize)===0){
          this.openAlert();
          return;
        }
        let arrList = [];
        let _this = this;
        let totalOrders = 0;
         this.distributeCompanyList.company.forEach((v,i)=>{
           if(!v.subOrder){
             v.subOrder = 0;
           }
           totalOrders += parseInt(v.subOrder);
           arrList.push({companyId:v.companyId,subOrder:v.subOrder});
         });
         if(totalOrders!=parseInt(this.distributeCompanyList.orderSize)||!this.checkStatus){
           this.$message.error('訂單分配錯誤，請重新分配');
           return;
         }
         console.log(arrList);
        //  return;
        
        let manOrderListSearchResquest = this.temp_form_data;
        this.confirmLoading = true;
        this.$http.post("manage/getOverDueOrderUpdate",{companySubOrderList:arrList,manOrderListSearchResquest:manOrderListSearchResquest,disCode:'THIRD_COMPANY'}).then(response => {
          setTimeout(()=>{
            this.confirmLoading = true;
          },1500);
          let {body} = response;
          if(body.code == 1){
              this.$message({
                type: 'success',
                message: '分配成功'
              });
              window.location.reload();
            _this.editFormDigListVisible=false;
          }else{
            this.$message.error(body.message);
          }
        },response =>{
          setTimeout(()=>{
            this.confirmLoading = true;
          },1500);
        });
        arrList = [];
        totalOrders = 0;
      },
      getUnixTime(time,row){
        if(row){
          if(row.createTime===row.lendingTime){
            return '-';
          }
        }
        return DataUtil.formatUnixTime(time);
      },
      getChannelType(type){
        //return enums.getChannelType(channel);
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
          this.qudaolist = body.data || [];
        },response=>{});
      },
      getCollecttionPerson() {
        this.$http.post('manage/collectionUserList',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.allpersonList = body.data;
          }else{
            this.allpersonList = [];
          }
        },response => {});
      },
      getCollectionList() {
        this.$http.post('manage/innerOutCollectionUserList',{postId:this.postId}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        },response => {});

        
        this.$http.post('manage/getCompayInfo',{}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.prevThirdCompanyPersonLists = body.data;
          }else{
            this.prevThirdCompanyPersonLists = [];
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
            console.log(this.prevThirdPersonList);
          }else{
            this.prevThirdCompanyPersonList = [];
            this.prevThirdPersonList = [];
          }
        },response => {});


        // this.$http.post('manage/getCompayUserInfo',{}).then(response => {
        //   let {body} = response;
        //   if(body.code == 1){
        //     this.getPrevThirdCompanyList = body.data;
        //   }else{
        //     this.getPrevThirdCompanyList = [];
        //   }
        // },response => {});
      },
      
      getPersonByCollectionList(person_id,tag) {
        this.$http.post('manage/dicItemListByDicCodeCollection',{dicCode:person_id}).then(response => {
          let {body} = response;
          if(body.code == 1){
            if(tag===1){
              this.requestPersonList = body.data;
            }else if(tag===2){
              this.lastRequestPersonList = body.data;
            }
            if(tag===1){
            this.searchForm.outsourceId = '';
            }
            
            // this.thirdCompanyList.push({
            //   dicItemValue:DataUtil.id(),
            //   dicItemName:DataUtil.userName()
            // });
            
          }else{
            if(tag===1){
              this.requestPersonList = [];
            }else if(tag===2){
              this.lastRequestPersonList = [];
            }
          }

        },response => {});
      },
      handleSelectionChange(val){
        this.selectData = val;
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
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      // getThirdCompany(type){
      //  let re = '';
      //    let _this = this;
      //   this.allpersonList.forEach(obj => {
      //     if (obj.code == type) {
      //         re = _this.strTrim(obj.name);
      //       return
      //     }
      //   });
      //   return re
      // },
      // getPrevThirdCompany(type){
      //     console.log(type);
      //  let re = '';
      //    let _this = this;
      //   if(type===0){
      //     re = '--';
      //     return re
      //   }
      //   this.prevThirdCompanyPersonList.forEach(obj => {
      //     if (parseInt(obj.dicCode) == type) {
      //         console.log(obj.dicName);
      //       re = _this.strTrim(obj.dicName);
      //       return
      //     }
      //   });
      //   return re
      // },
      // getPrevThirdCompanyThis(type){
      //   let re = '';
      //   let _this = this;
      //   if(type===0){
      //     re = '--';
      //     return re
      //   }
      //   this.prevThirdCompanyPersonLists.forEach(obj => {
      //     if (parseInt(obj.dicItemValue) == type || parseInt(obj.dicCode) == type) {
      //       re = _this.strTrim(obj.dicName);
      //       return
      //     }
      //   });
      //   return re
      // },
      
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
        this.prevThirdCompanyPersonLists.forEach(obj => {
          if (parseInt(obj.dicItemValue) == type) {
            re = _this.strTrim(obj.dicItemName);
            return
          }
        });
        return re
      },
      // getPrevThirdStaff(type){
      //   let re = '';
      //   let _this = this;
      //   if(type===0){
      //     re = '--';
      //     return re
      //   }
      //   this.getPrevThirdCompanyList.forEach(obj => {
      //     if (parseInt(obj.dicItemValue) == type) {
      //       re = _this.strTrim(obj.dicItemName);
      //       return
      //     }
      //   });
      //   return re
      // },
      check(row){
        // window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid);
          this.addTab(this.editableTabsValue2,row) ;
        // let w = window.open(location.href);
        // let w = window.open(location.origin);
        // // let w = window.open('about:blank');
        // setTimeout(()=>{
        //     w.location.href = '/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid;
        // },1000);
      },
      test(row){
        this.setTestFormDigVisible = true;
        this.setTestForm.isTestOrder = row.isTestOrder;
        this.setTestForm.orderNo = row.uuid;
        this.setTestForm.userUuid = row.userUuid;
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
        this.bindGrid()
      },
      resetPage(){
        // window.location.reload();
        
        this.searchForm={
          uuid: '',
          orderTag: '',
          outsourceId: '',
          thirdDistribute: '',
          isAgain: '',
          isTestOrder: '',
          lastOutSourceId:'',
          repeTitionsMin:"",
          repeTitionsMax:"",
          borrowingTerm:''
        }
        this.lastCompanyId = '';
        this.bindGrid();
      },
      resetMonth(v){
        let m = v.getMonth()+1;
        if(m<10){
          m = '0'+m;
        }
        return m;
      },
      bindGrid() {
        this.searchForm.outsourceIdString = '';

        if(this.searchForm.outsourceIds){
          let _this = this;
          // this.searchForm.outsourceIdString = [];
          this.requestPersonList.forEach(function(v,i){
            _this.searchForm.outsourceIdString += v.dicItemValue+',';
          });
          this.searchForm.outsourceIdString = this.searchForm.outsourceIdString.slice(0,this.searchForm.outsourceIdString.length-1);
          this.searchForm.outsourceIdString = this.searchForm.outsourceIdString+','+this.searchForm.outsourceIds;
        }
        // console.log(this.searchForm.outsourceIds);
        // this.searchForm.outsourceIdString = '';
        // if(this.searchForm.outsourceId){
        //   // alert(this.searchForm.outsourceId);
        //   this.searchForm.outsourceIdString = '';
        // }else if(this.searchForm.outsourceIds){
        //   let _this = this;
        //   _this.prevThirdCompanyPersonList.forEach((v,i)=>{
        //     console.log(v.companyResponsel.dicItemValue + _this.searchForm.outsourceIds);
        //     if(v.companyResponsel.dicItemValue === _this.searchForm.outsourceIds){
        //       v.dicItemList.forEach((val,index)=>{
        //         _this.searchForm.outsourceIdString += val.dicItemValue+',';
        //       });
        //     }
        //   });
          
        // }
        // console.log(this.searchForm.outsourceIdString);
        // if(this.searchForm.outsourceIds){
        //   this.searchForm.outsourceIdString = this.searchForm.outsourceIdString.slice(0,this.searchForm.outsourceIdString.length-1);
        //   if(!this.searchForm.outsourceIdString){
        //     this.searchForm.outsourceIdString = this.searchForm.outsourceIds;
        //   }else{
        //     this.searchForm.outsourceIdString = this.searchForm.outsourceIdString+','+this.searchForm.outsourceIds;
        //   }
        // }
        //   // this.searchForm.outsourceIdString = '';
        // // if(this.searchForm.outsourceId){
        // //   // alert(this.searchForm.outsourceId);lastOutSourceId
        //   this.searchForm.lastOutSourceId = '';
        // if(this.lastCompanyId){
        //   let _this = this;
        //   _this.prevThirdCompanyPersonList.forEach((v,i)=>{
            
        //     if(v.companyResponsel.dicItemValue === _this.lastCompanyId){
        //       v.dicItemList.forEach((val,index)=>{
        //         _this.searchForm.lastOutSourceId += val.dicItemValue+',';
        //       });
        //     }
        //   });
        // }
        // this.searchForm.lastOutSourceId = '';
        // if(this.lastCompanyId){
        //   this.searchForm.lastOutSourceId = this.searchForm.lastOutSourceId.slice(0,this.searchForm.lastOutSourceId.length-1);
        //   // if(this.searchForm.lastOutSourceId){
        //     if(!this.searchForm.lastOutSourceId){
        //       this.searchForm.lastOutSourceId = this.lastCompanyId;
        //     }else{
        //       this.searchForm.lastOutSourceId = this.searchForm.lastOutSourceId+','+this.lastCompanyId;
        //     }
        //   // }
        // }
        this.searchForm.lastOutSourceId = '';
        if(this.lastCompanyId){
          let _this = this;
          // this.searchForm.outsourceIdString = [];
          this.lastRequestPersonList.forEach(function(v,i){
            _this.searchForm.lastOutSourceId += v.dicItemValue+',';
          });
          this.searchForm.lastOutSourceId = this.searchForm.lastOutSourceId.slice(0,this.searchForm.lastOutSourceId.length-1);
          this.searchForm.lastOutSourceId = this.searchForm.lastOutSourceId+','+this.lastCompanyId;
        }
// alert(this.searchForm.lastOutSourceId);
        // if(this.searchForm.lastOutSourceId){
        //   let _this = this;
        //   _this.prevThirdCompanyPersonList.forEach((v,i)=>{
            
        //     if(v.companyResponsel.dicItemValue === _this.searchForm.lastOutSourceId){
        //       v.dicItemList.forEach((val,index)=>{
        //         _this.searchForm.outsourceIdString += val.dicItemValue+',';
        //       });
        //     }
        //   });
        // }


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
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          overDueTag:this.itemValue
          // overdueDayMin: this.itemValue.split('#')[0],
          // overdueDayMax: this.itemValue.split('#')[1]
        }, this.searchForm);
        if(_data.outsourceId){
          _data.outsourceIds = '';
          _data.outsourceIdString = '';
        }
        let _data_ = Object.assign({
          // pageNo:this.pageIndex,
          // pageSize:this.pageSize,
          overDueTag:this.itemValue
          // overdueDayMin: this.itemValue.split('#')[0],
          // overdueDayMax: this.itemValue.split('#')[1]
        }, this.searchForm);
        this.temp_form_data = _data_;
        this.$http.post('manage/overDueOrderListByTag', _data).then(response => {
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
      distribute() {
        if(!this.distributeForm.thirdCompanyTag){
          this.$message.error("请选择催收人员");
          return false;
        }
        let result = [];
        this.selectData.forEach((data) =>{
          let temp = {};
          temp.uuid = data.uuid;
          temp.uuidString = data.userUuid;
          temp.outsourceId = this.distributeForm.thirdCompanyTag;
          result.push(temp);
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
        });
      },
      autoDistribute(row) {              //自动分配
        this.editFormDigVisible = true;
        this.commonForm.title = '订单分配（'+this.dialogTitle+'）';
        this.editGridLoading = true;
        this.$http.post('manage/overDueOrderDistributeCountListByPostId',{postId:this.postId,section:this.itemValue}).then(response => {
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
          section: this.itemValue,
          staff:this.userListData
        };
        this.confirmLoading = true;
        this.$http.post('manage/overDueOrderAutoDistributeByNum',_data).then(response =>{
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
     setTestFormSubmit(){                   //设置测试订单
        let _data = Object.assign({},this.setTestForm);
        this.setTestconfirmLoading = true;

        this.$http.post('manage/setTestOrder',_data).then(response=>{
          this.setTestconfirmLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.setTestFormDigVisible = false;
            this.bindGrid();
          }else{
            this.$message.error(body.message);
          }
        },response=>{this.setTestconfirmLoading = false;});
      },
      testAssginDistribute(row) {                    //自动测试订单分配
        this.testAssignFormDigVisible = true;
        this.testAssignGridLoading = true;
        this.$http.post('manage/findTestOrderD1t7AssignCount',{}).then(response => {
          this.testAssignGridLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.userAssignList = [];
            this.assignSum = body.data.orderD1t7Assign.assignSum;
            this.unAssignSum = body.data.orderD1t7Assign.unAssignSum;

            this.userAssignList = body.data.userAssignList;
          }else{
            this.$message.error(body.message);
          }
        },response =>{});
      },
      testAssignFormSubmit() {
        let _newtotalNum=0;
        // this.testAssignconfirmLoading = true;
        // alert(666666);
        for(let i=0;i<this.userAssignList.length;i++){
          if(this.userAssignList[i].unAssignCount === ''){
            this.$message.error('所有分配订单数不能为空');
            return;
          }else{
            _newtotalNum += parseInt(this.userAssignList[i].unAssignCount);
          }
        }
        if(_newtotalNum > this.unAssignSum){
          this.$message.error('剩余待分配订单数不足，请重新分配');
          return;
        }

        let _data = {
          userAssignList:this.userAssignList
        };
        this.testAssignconfirmLoading = true;
        this.$http.post('manage/testOrderD1t7AssignCountUpdateBatch',_data).then(response =>{
          // setTimeout(()=>{
          //   this.testAssignconfirmLoading = false;
          // },1500);
          this.testAssignconfirmLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.testAssignFormDigVisible = false;
            this.$message({
              type: 'success',
              message: '分配成功'
            });
            this.bindGrid();
          }else{
            this.$message.error(body.message);
          }
        },response =>{this.testAssignconfirmLoading = false;});
      },

      
      gettWillOverList(){
        let manOrderListSearchResquest = this.temp_form_data;
        this.$http.post("manage/getOverDueOrderSub",{disCode:"THIRD_COMPANY",manOrderListSearchResquest:manOrderListSearchResquest}).then(response => {
          let {body} = response;
          if(body.code == 1){
            console.log(body);
            this.distributeCompanyList = body.data;
            this.remainOrder = this.distributeCompanyList.orderSize;
            // if(body.code == 1){
            //   this.thirdCompanyList = body.data;
            // }else{
            //   this.thirdCompanyList = [];
            // }
          }else{
            this.$message.error(body.message);
          }
        },response =>{this.confirmLoading = false;});
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
    mounted() {
      
				// alert(666);
      this.getCollecttionPerson();
      this.getCollectionList();
      this.bindGrid();
      this.getQudaoList();
      this.gettWillOverList();
      let _this = this;
      setTimeout(function(){
        console.log(_this.temp_form_data);
      },3000);
      // alert(this.dialogTitle);
    }
  }
</script>
<style></style>
