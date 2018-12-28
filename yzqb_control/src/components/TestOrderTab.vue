<template>
  <section>
      <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.uuid"></el-input>
        </el-form-item>
        <el-form-item label="订单标签" prop="status">
          <el-select v-model="searchForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in orderTagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人员" prop="outsourceId">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" filterable clearable>
            <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isAgain" placeholder="请选择" clearable>
            <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="info" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="订单编号" prop="uuid"></el-table-column>
        <el-table-column label="姓名" prop="realName"></el-table-column>
        <el-table-column label="复借订单" prop="isAgain">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isAgain==1? 'success' : 'danger'" close-transition>{{scope.row.isAgain==1?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" prop="amountApply"></el-table-column>
        <el-table-column label="申请期限" prop="borrowingTerm"></el-table-column>
        <el-table-column label="订单标签" prop="orderTag" min-width="116">
          <template slot-scope="scope">
            <span>{{getOrderTag(scope.row.orderTag)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="催收人员" prop="outsourceId" min-width="116">
          <template slot-scope="scope">
            <span>{{getThirdCompany(scope.row.outsourceId)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="逾期天数" prop="overDueDay"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button size="small" @click="check(scope.row)">详情</el-button>
            <el-button size="small" @click="test(scope.row)">测试</el-button>
            </template>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>

    <el-dialog title="测试订单设置" v-model="setTestFormDigVisible" :close-on-click-modal="false" size="tiny">
      <div>
        <el-form :model="setTestForm" label-position="left" label-width="0px">
          <el-row>
            <el-col :span="16" :offset="4">
            <el-form-item prop="status">设置为测试订单</el-form-item>
              <el-form-item prop="status">
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

  </section>
</template>
<script>
  import enums from '../common/Enum'
  import DataUtil from '../common/dataUtil'
  export default {
    props: ['dialogTitle','postId','itemValue'],
    data() {
      return {
        searchForm: {
          uuid: '',
          orderTag: '',
          outsourceId: '',
          isAgain: ''
        },
        orderTagList:enums.orderTagList,
        thirdCompanyList: [],
        allpersonList:[],
        gridData: [],
        gridLoading: false,
        pageIndex: 1,
        pageSize: 20,
        dataTotal: 0,
        isAgainOrder:enums.isAgainOrder,

        setTestFormDigVisible: false,
        setTestconfirmLoading: false,
        setTestForm: {
          isTestOrder: '',
          orderNo: '',
          userUuid: ''
        }
      }
    },
    methods: {
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
      getThirdCompany(type){
       let re = '';
        this.allpersonList.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },
      check(row){
        // let w = window.open(location.href);
        // let w = window.open(location.origin);
        // // let w = window.open('about:blank');
        // setTimeout(()=>{
        //     w.location.href = '/#/OrderDetail?seen=true&userUuid='+row.userUuid+
        //   '&uuid='+row.uuid;
        // },1000);
        window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },
      search() {
        this.pageIndex = 1;
        this.bindGrid()
      },
      bindGrid() {
        this.gridLoading = true;
        let _url = '';
        let _data = {};
        let _data0 = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          overdueDayMin: this.itemValue.split('#')[0],
          overdueDayMax: this.itemValue.split('#')[1],
          isTestOrder: 1
        }, this.searchForm);

        let _data1 = {
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          isTestOrder: 1,
          orderTag: '',
          uuid: '',
          outsourceId: '',
          isAgain: ''
        };

        console.log(this.itemValue);
        this.itemValue.split('#')[0] == 0 ? _url = 'manage/willOverDueOrderByTag' : _url = 'manage/overDueOrderListByTag';   //判断是否是D0
        this.itemValue.split('#')[0] == 0 ? _data = Object.assign({},_data1) : _data = Object.assign({},_data0);
        this.$http.post(_url, _data).then(response => {
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
      }
    },
    mounted() {
      this.getCollecttionPerson();
      this.getCollectionList();
      this.bindGrid();
    }
  }
</script>
<style></style>