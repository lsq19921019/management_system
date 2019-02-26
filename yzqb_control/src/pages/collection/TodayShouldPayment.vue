/**
* Created by alan on 17-6-23.
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
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.uuid" width="200"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="订单标签" prop="status">
          <el-select v-model="searchForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in orderTagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人员" prop="outsourceId">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" filterable clearable>
            <el-option v-for="item in prevThirdPersonList" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue"></el-option>
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
        <el-form-item label="渠道来源">
          <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
            <el-option v-for="item in qudaolist" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemValue.split('#')[0]"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="info" style="width: 100px">查询</el-button>
          <el-button @click="resetPage" style="width: 100px">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" style="width:100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="订单编号" prop="uuid" width="166">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" width="80">
        </el-table-column>
        <el-table-column label="复借订单" prop="isAgain">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是('+scope.row.sucLendTimes+'次)':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="复借次数" prop="repeTitions" width="100">
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply" width="100">
        </el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm" width="100">
        </el-table-column>
        <el-table-column label="订单标签" prop="orderTag" min-width="106">
          <template slot-scope="scope">
            <span>{{getOrderTag(scope.row.orderTag)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="测试订单" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.isTestOrder==1? 'success' : 'danger'" close-transition>{{scope.row.isTestOrder==1?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <!--<el-table-column label="上阶段催收公司" prop="outsourceId" min-width="106">-->
          <!--<template scope="scope">-->
            <!--<span>{{getPrevThirdCompany(scope.row.lastOutSourceId)}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
        <el-table-column label="渠道" prop="channel" min-width="100">
          <template scope="scope">{{getChannelType(scope.row.channel)}}</template>
        </el-table-column>
        <el-table-column label="放款时间" prop="lendingTime" min-width="200">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.lendingTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期天数" prop="overDueDay" width="100">
        </el-table-column>
        <el-table-column label="操作" min-width="166">
          <template scope="scope">
            <el-button size="small" @click="check(scope.row)">详情</el-button>
            <el-button size="small" @click="test(scope.row)">测试</el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>

    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>

    <el-form :inline="true" :model="distributeForm" class="toolbar" label-position="right" label-width="70px">
      <el-form-item label="催收公司" prop="status">
        <el-select v-model="distributeForm.thirdCompanyTag" placeholder="请选择" filterable clearable>
          <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="distribute" type="info" v-loading="distributeLoading">分配</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="autoDistribute" type="info" :loading="autoDistributeLoading">自动分配</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="listDistribute" type="info" :loading="listDistributeLoading">批量分配</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="批量分单" v-model="editFormDigListVisible" :close-on-click-modal="false" size="normal">
              <div style="margin:0 0 15px;">D0 待分配订单： <el-tag type="success">{{distributeCompanyList.orderSize}}</el-tag>  单，已选择： <el-tag type="success">{{hasDistribute}}</el-tag> 单，剩余： <el-tag type="success">{{remainOrder}}</el-tag> 单</div>
     
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


    <!-- <el-dialog title="批量分单" v-model="editFormDigVisible" :close-on-click-modal="false" size="large">
       <div style="margin:0 0 15px;">已分配 <el-tag type="success">{{orderD0Assign.assignSum}}</el-tag> 单，其中新户 <el-tag type="success">{{orderD0Assign.assign0Count}}</el-tag> 单，复借1次 <el-tag type="success">{{orderD0Assign.assign1Count}}</el-tag> 单，复借2次 <el-tag type="success">{{orderD0Assign.assign2Count}}</el-tag> 单，复借3次 <el-tag type="success">{{orderD0Assign.assign3Count}}</el-tag> 单，复借3次以上 <el-tag type="success">{{orderD0Assign.assign4Count}}</el-tag> 单</div>
      <div style="margin:0 0 15px;">待分配 <el-tag type="danger">{{orderD0Assign.unAssignSum}}</el-tag> 单，其中新户 <el-tag type="danger">{{orderD0Assign.unAssign0Count}}</el-tag> 单，复借1次 <el-tag type="danger">{{orderD0Assign.unAssign1Count}}</el-tag> 单，复借2次 <el-tag type="danger">{{orderD0Assign.unAssign2Count}}</el-tag> 单，复借3次 <el-tag type="danger">{{orderD0Assign.unAssign3Count}}</el-tag> 单，复借3次以上 <el-tag type="danger">{{orderD0Assign.unAssign4Count}}</el-tag> 单</div>
             <div style="margin:0 0 15px;">D0 待分配订单： <el-tag type="success">{{orderD0Assign.assignSum}}</el-tag>  单，已选择： <el-tag type="success">{{orderD0Assign.assign0Count}}</el-tag> 单，剩余： <el-tag type="danger">{{orderD0Assign.assign1Count}}</el-tag> 单</div>
      <el-table :data="userListData" highlight-current-row v-loading="editGridLoading" class="grid" max-height="360">
        <el-table-column label="催收人员" prop="realName" ></el-table-column>
        <el-table-column label="已分配新户订单数" prop="assign0Count"></el-table-column>
        <el-table-column label="已分配复借1次订单数" prop="assign1Count"></el-table-column>
        <el-table-column label="已分配复借2次订单数" prop="assign2Count"></el-table-column>
        <el-table-column label="已分配复借3次订单数" prop="assign3Count"></el-table-column>
        <el-table-column label="已分配复借3次以上订单数" prop="assign4Count"></el-table-column>
        <el-table-column label="新增分配新户订单数">
          <template scope="scope">
            <el-input v-model="scope.row.unAssign0Count"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增分配复借1次订单数">
          <template scope="scope">
            <el-input v-model="scope.row.unAssign1Count"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增分配复借2次订单数">
          <template scope="scope">
            <el-input v-model="scope.row.unAssign2Count"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增分配复借3次订单数">
          <template scope="scope">
            <el-input v-model="scope.row.unAssign3Count"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增分配复借3次以上订单数">
          <template scope="scope">
            <el-input v-model="scope.row.unAssign4Count"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="editFormListSubmit" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog> -->

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
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  import orderDetailpage from '../../components/orderDetail'
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






        searchForm:{
          mobile:'',
          orderTag:'',
          realName: '',
          username: '',
          uuid: '',
          outsourceId: '',
          thirdDistribute: '',
          isAgain:'',
          repeTitionsMin:"",
          repeTitionsMax:"",
          isTestOrder: "",
          borrowingTerm:''
        },
        applyTimeList:enums.applyTimeList,
        numTest:/^[0-9]\d*$/, //是否是數字;
        distributeCompanyList:{},
        hasDistribute:0,
        remainOrder:0,
        computeTotalOrders:0,
        checkStatus:true,
        itemList:[{name:'6666',val:'6666',num:'6666',rate:'6666'},{name:'7777',val:'7777',num:'777',rate:'777'},{name:'888',val:'888',num:'888',rate:'888'}],
        distributeForm:{
          thirdCompanyTag:'',
        },
        distributeLoading:false,
        //订单状态
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
        // editFormDigVisible: false,
        editFormDigListVisible: false,
        userListData: [],
        // autoDistributeLoading: false,
        listDistributeLoading: false,

        orderD0Assign:{
          assignSum: 0,
          assign0Count: 0,
          assign1Count: 0,
          assign2Count: 0,
          assign3Count: 0,
          assign4Count: 0,
          unAssignSum: 0,
          unAssign0Count: 0,
          unAssign1Count: 0,
          unAssign2Count: 0,
          unAssign3Count: 0,
          unAssign4Count: 0
        },
        editGridLoading: false,
        confirmLoading: false,
        postId:0,
        thirdCompanyList:[],
        getPrevThirdCompanyList:[],
        prevThirdPersonList:[],
        postId:0,
        prevThirdCompanyPersonList:[],
        prevThirdPersonList: [],
        prevThirdCompanyPersonLists: [],

        //设置测试订单
       setTestFormDigVisible: false,
       setTestForm: {
        isTestOrder: '',
        orderNo: '',
        userUuid: ''
       },
       setTestconfirmLoading: false,
        thirdCompanyPersonList:[],
        prevThirdCompanyPersonList:[],
        qudaolist: [],
        disabledInput:false
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
        // alert(row.userUuid+"===="+row.uuid);
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




      checkData(){
      },
      getUnixTime(time,row){
        if(row){
          if(row.createTime===row.lendingTime){
            return '-';
          }
        }
        return DataUtil.formatUnixTime(time);
      },
      getCollectionList() {       //催收岗位
        // this.$http.post('manage/dicItemListByDicCode',{dicCode:'COLLECTION_POST'}).then(response => {
        //   let {body} = response;
        //   this.postId = body.data[0].id;
        //   this.$http.post('manage/searchCollectionUserList',{postId:this.postId}).then(response =>{
        //     let {body} = response;
        //     if(body.code == 1){
        //       this.thirdCompanyList = body.data;
        //     }else{
        //       this.thirdCompanyList = [];  //collectionUserList
        //     }
        //   },response=>{});
        // },response =>{});
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
            console.log(this.prevThirdPersonList);
          }else{
            this.prevThirdCompanyPersonList = [];
            this.prevThirdPersonList = [];
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

        this.$http.post("manage/companyListByDicCode",{disCode:"DAY0_THIRD_COMPANY"}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        })
      },
      getQudaoList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          this.qudaolist = body.data || [];
        },response=>{});
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
      getOrderTag(type){       //列表订单标签
        return enums.getOrderTagList(type);
      },
      getSex(val) {
        return enums.getSex(val)
      },
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
      //  getThirdCompany(type){    //列表催收人员
      //    let re = '';
      //    let _this = this;
      //     this.thirdCompanyPersonList.forEach(obj => {
      //       if (obj.code == type) {
      //         re = _this.strTrim(obj.name);
      //         return
      //       }
      //     });
      //     return re
      // },
      search() {     //查询
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
          // this.searchForm.repeTitionsMin = '';
          // this.searchForm.repeTitionsMax = '';
          return;
        }
        this.bindGrid()
      },
      resetPage(){
        
        this.searchForm={
          mobile:'',
          orderTag:'',
          realName: '',
          username: '',
          uuid: '',
          outsourceId: '',
          thirdDistribute: '',
          isAgain:'',
          repeTitionsMin:"",
          repeTitionsMax:"",
          isTestOrder: "",
          borrowingTerm:''
        }
        // window.location.reload();
        
        this.bindGrid();
      },
      check(row){    //进详情页
          this.addTab(this.editableTabsValue2,row) ;
        // window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid);
      },
      handleSelectionChange(val){
          this.selectData = val;
      },
      distribute(){              //手动分配
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
        })
      },
      autoDistribute(row) {      //自动分配返显
        this.editFormDigVisible = true;
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
      },
      listDistribute(row){      //自动分配返显
        this.bindGrid();
        this.getQudaoList();
        this.getCollectionList();
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
        let totalOrders = 0;
        let _this = this;
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
        this.confirmLoading = true;
        this.$http.post("manage/getWillOverDueOrderSubUpdate",arrList).then(response => {
          setTimeout(()=>{
          this.confirmLoading = false;
          },1500);
          let {body} = response;
          if(body.code == 1){
              this.$message({
                type: 'success',
                message: '分配成功'
              });
              window.location.reload();
              _this.editFormDigListVisible = false;
          }else{
            this.$message.error(body.message);
          }
        },response =>{
          setTimeout(()=>{
          this.confirmLoading = false;
          },1500);
        });
        arrList = [];
        totalOrders = 0;
      },
      editFormSubmit() {       //自动分配数据提交
        let _unAssign0Count = 0,_unAssign1Count = 0,_unAssign2Count = 0,_unAssign3Count = 0,_unAssign4Count = 0;

        for(let i=0;i<this.userListData.length;i++){
          if(this.userListData[i].unAssign0Count === '' || this.userListData[i].unAssign1Count === ''|| this.userListData[i].unAssign2Count === ''|| this.userListData[i].unAssign3Count === ''|| this.userListData[i].unAssign4Count === ''){
            this.$message.error('所有分配订单数不能为空');
            return;
          }else{
            _unAssign0Count += parseInt(this.userListData[i].unAssign0Count);   //计算每列单数总和
            _unAssign1Count += parseInt(this.userListData[i].unAssign1Count);
            _unAssign2Count += parseInt(this.userListData[i].unAssign2Count);
            _unAssign3Count += parseInt(this.userListData[i].unAssign3Count);
            _unAssign4Count += parseInt(this.userListData[i].unAssign4Count);
          }
        }
        console.log(this.userListData);
        if(_unAssign0Count > this.orderD0Assign.unAssign0Count || _unAssign1Count > this.orderD0Assign.unAssign1Count || _unAssign2Count > this.orderD0Assign.unAssign2Count || _unAssign3Count > this.orderD0Assign.unAssign3Count || _unAssign4Count > this.orderD0Assign.unAssign4Count){
          this.$message.error('剩余待分配订单数不足，请重新分配');
          return;
        }
        let _data = {
          userAssignList:this.userListData
        };
        this.confirmLoading = true;
        this.$http.post('manage/orderD0unAssignCountListUpdateBatch',_data).then(response =>{
          this.confirmLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.$message({
              type: 'success',
              message: '分配成功'
            });
            this.editFormDigVisible = false;
            this.bindGrid();
          }else{
            this.$message.error(body.message);
          }
        },response =>{this.confirmLoading = false;});
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
      bindGrid() {           //列表
      
        
          this.searchForm.outsourceIdString = '';
        if(this.searchForm.outsourceId){
          // alert(this.searchForm.outsourceId);
          this.searchForm.outsourceIdString = '';
        }else if(this.searchForm.outsourceIds){
          let _this = this;
          _this.prevThirdCompanyPersonList.forEach((v,i)=>{
            if(v.companyResponsel.dicItemValue = _this.searchForm.outsourceIds){
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
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize
        }, this.searchForm);
        _data.username = this.searchForm.realName;
        this.$http.post('manage/willOverDueOrderByTag', _data).then(response => {
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
      test(row){
        this.setTestFormDigVisible = true;
        this.setTestForm.isTestOrder = row.isTestOrder;
        this.setTestForm.orderNo = row.uuid;
        this.setTestForm.userUuid = row.userUuid;
      },
      setTestFormSubmit(){
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
      gettWillOverList(){
        this.$http.post("manage/getWillOverDueOrderSub",{disCode:"DAY0_THIRD_COMPANY"}).then(response => {
          let {body} = response;
          if(body.code == 1){
            console.log(body);
            this.distributeCompanyList = body.data;
            // this.remainOrder = this.distributeCompanyList.orderSize;
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
      if (!String.prototype.trim){
 
      /*---------------------------------------
        * 清除字符串两端空格，包含换行符、制表符
        *---------------------------------------*/
      String.prototype.trim = function () { 
        return this.replace('(', "");
      }
        
      }
      this.bindGrid();
      this.getQudaoList();
      this.getCollectionList();
      this.gettWillOverList();
    }
  }
</script>
<style scoped>
  .line{
    text-align: center;
  }
</style>
