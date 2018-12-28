<template>

  <div id="getUserLastSmsCode">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table :data="tableName" height="280" border>
          <el-table-column prop="name" label="表名"></el-table-column>
          <el-table-column inline-template label="操作">
            <el-button size="small" type="primary" @click="check(row)">查看表结构</el-button>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="12">
        <el-table :data="columnInfo" height="280" v-loading="columnInfoLoad" border>
          <el-table-column prop="column_name" label="字段名"></el-table-column>
          <el-table-column prop="column_comment" label="备注"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 10px;margin-right: 10px;">
      <el-form-item label="sql:">
        <el-input v-model="form.fileUrl" type="textarea" :autosize="{ minRows: 5}" :maxlength="800" placeholder="sql不要加上(;等特殊字符)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindGrid">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="sqlResultTable">
      <el-table :data="tableData" style="width: 100%" v-loading="gridLoading" stripe border :height="height">

        <el-table-column v-for="(item, index) in contentsTitle" :prop="item" :label="item" width="140">

        </el-table-column>

      </el-table>
    </div>

  </div>
</template>

<script>
  import DataUtil from '../../common/dataUtil' //
  export default {
    data() {
      //
      return {
        height:'600',
        gridLoading: false,
        tableData: [],
        form: {
          fileUrl:''
        },
        contentsTitle:[],
        columnInfo:[],
        columnInfoLoad:false,
        tableName:[{name:'bfTempOrder'}, {name:'bigAccountHistory'}, {name:'bigAccountOrderFund'}, {name:'bigAccountOrderOrder'},
          {name:'btOrder'}, {name:'btOrderStepHistory'},{name:'btOrderUserDetail'},{name:'btUserBank'},{name:'btUserCardInfo'},{name:'orderUfData'},
          {name:'caseDistributionBase'}, {name:'lotteryAward'}, {name:'lotteryDraw'}, {name:'lotteryResult'},
          {name:'manCollectionSysUser'}, {name:'manLoanDataStatistics'}, {name:'manOrderDetail'},
          {name:'manOrderDistributeRule'}, {name:'manOrderThirdHistory'}, {name:'manSysPermission'}, {name:'manSysRole'},
          {name:'manSysRolePermission'}, {name:'manSysUserRole'}, {name:'manTodayDataStatistics'},
          {name:'mobileDeviceInfo'}, {name:'orderAbnormalInfo'}, {name:'orderBfData'}, {name:'orderBlacklist'},
          {name:'orderBlacklistTemp'}, {name:'orderDataDailyCount'}, {name:'orderHistory'},
          {name:'orderNotComplate'}, {name:'orderNotComplateHistory'}, {name:'orderOfflineRefundLog'},
          {name:'orderOrder'}, {name:'orderRemark'}, {name:'orderStepHistory'},{name:'orderUfCounterFee'},
          {name:'orderThirdCost'}, {name:'orderThirdFund'}, {name:'orderTongdunScore'}, {name:'orderUfBodyData'},
          {name:'orderUfTotalCounterFee'}, {name:'orderUserAction'}, {name:'orderUserDetail'}, {name:'orderUserImage'},
          {name:'phoneNumber'}, {name:'productAmountTemp'}, {name:'sancitie'}, {name:'shareDict'},
          {name:'sysAdvertisingPage'}, {name:'sysAlipayAccount'},{name:'sysAlipayData'},
          {name:'sysAppH5'}, {name:'sysAppVersion'}, {name:'sysAutoReviewRule'}, {name:'sysBankDefine'}, {name:'sysBanner'}, {name:'sysCity'},
          {name:'sysCouponGiveStat'}, {name:'sysCouponRule'}, {name:'sysCouponUseStat'}, {name:'sysDialedNumber'}, {name:'sysDic'},
          {name:'sysDicItem'}, {name:'sysDistrict'}, {name:'sysEventInfo'},{name:'sysTotalAccountHistory'},
          {name:'sysHardestHitProvinceCity'}, {name:'sysHardestHitProvinceCityCopy'}, {name:'sysHomeCollection'},
          {name:'sysInstalledApps'}, {name:'sysMarketingMobileInfo'}, {name:'sysMarketingSmsMessageInfo'},
          {name:'sysParam'}, {name:'sysPaymentChannel'}, {name:'sysProduct'}, {name:'sysTotalAccountHistoryTemp'},
          {name:'sysProductTemplate'}, {name:'sysProvince'}, {name:'sysReconciliationHistroiy'},
          {name:'sysRuleCalTemp'}, {name:'sysSendMsgCal'}, {name:'sysSensitiveWord'},
          {name:'sysStoreProduct'}, {name:'sysStoreProductType'}, {name:'sysSupperBfBankDefine'},
          {name:'sysTestDataLog'}, {name:'sysTotalAccount'},{name:'sysSmsMessageHistory'}, {name:'sysSmsMessageInfo'},
          {name:'sysTotalThirdFee'}, {name:'sysUser'}, {name:'sysWeekOfYear'}, {name:'tempOrderThirdDataTongdunZhima'},
          {name:'thirdZhimaCodeDesc'}, {name:'thirdZhimaFeedBack'}, {name:'thirdZhimaIsMatched'}, {name:'thirdZhimaIsRisk'},
          {name:'thirdZhimaIsVerifyCode'}, {name:'ufSysTotalAccountHistory'}, {name:'ufTempOrder'}, {name:'userAccount'},
          {name:'userAccountHistory'}, {name:'userBank'}, {name:'userBlackList'}, {name:'userCreditCompletion'},
          {name:'userFeedBack'}, {name:'userIdCardInfo'}, {name:'userInviteRecord'}, {name:'userLoginDeviceInfoHistory'},
          {name:'userProductInfo'}, {name:'userProductTemp'}, {name:'userRefuseList'}, {name:'userRuleInfo'},
          {name:'userSignupDeviceInfoHistory'}, {name:'userThirdBlackList'},{name:'userUser'}, {name:'user_borrow_rank_zhengql'},{name:'useruser_hongshen'},
          {name:'yqgManOrderDetail'},{name:'yqgOrderOrder'},{name:'yqgOrderUserDetail'},{name:'yqgUserBank'},{name:'yqgUserUser'},
        ]
      }
    },
    methods: {
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      check(name){
        this.columnInfoLoad = true;
        this.$http.post('manage/sqlColumnsInfo',{fileUrl:name.name}).then(response =>{
          this.columnInfoLoad = false;
          let {body} = response;
          if (1 == body.code) {
            this.columnInfo = body.data;
          }
        })
      },
      bindGrid() {
        let sqlString = this.form.fileUrl;

        let inj_str = ['exec','insert','delete','update','declare',';'];
        if(sqlString == '' ){
          this.$message.info("sql语句有问题，请先检查");
        }
        if(!(/limit/ig.test(this.form.fileUrl))){
          sqlString += " limit 200";
        }

        this.gridLoading = true;
        this.$http.post('manage/sqlResultList', {uuid:DataUtil.sid(),fileUrl:sqlString}).then(response => {
          this.gridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            if(body.data){
              let tempObj = body.data[0];
              let titleArray = [];
              for(let key in tempObj){
                titleArray.push(key);
              }
              console.log(titleArray);
              this.contentsTitle = titleArray;
              this.tableData = body.data;
            }else {
              this.tableData = {};
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {

        });
      }
    },
    mounted() {

    }
  }
</script>
<style>
  #getUserLastSmsCode {
    margin-top: 20px;
  }
  .el-table td, .el-table th{
    height: 10px !important; ;
  }
  .sqlResultTable .el-table .cell{line-height: 16px;}
</style>
