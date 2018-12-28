<template>
  <section>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" border>
        <el-table-column label="月份" prop="lendingMonth"></el-table-column>
        <el-table-column label="放款总金额（万元）" prop="amountApplySum"></el-table-column>
       	<el-table-column label="自有资金（万元）" prop="amountpayChannel0"></el-table-column>
        <el-table-column label="大账户（万元）" prop="amountpayChannel1"></el-table-column>
       	<el-table-column label="口袋理财（万元）" prop="amountpayChannel2"></el-table-column>
        <!--<el-table-column label="宝付（万元）" prop="amountpayChannel3"></el-table-column>-->
        <el-table-column label="操作" prop="createTime">
          <template slot-scope="scope">
            <el-button size="small" @click="checkdetail(scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog :title="dialogTitle" v-model="commonRadioDigVisible" :close-on-click-modal="false">
      <el-table :data="detailData" highlight-current-row v-loading="detailgridLoading" border>
        <el-table-column label="日期" prop="lendingDate"></el-table-column>
        <el-table-column label="放款总金额（万元）" prop="amountApplySum"></el-table-column>
        <el-table-column label="自有资金（万元）" prop="amountpayChannel0"></el-table-column>
        <el-table-column label="大账户（万元）" prop="amountpayChannel1"></el-table-column>
        <el-table-column label="口袋理财（万元）" prop="amountpayChannel2"></el-table-column>
        <!--<el-table-column label="宝付（万元）" prop="amountpayChannel3"></el-table-column>-->
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commonRadioDigVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data () {
      return {
        gridLoading: false,
        detailgridLoading: false,
        gridData: [],
        detailData: [],
        commonRadioDigVisible: false,
        dialogTitle: ''
      }
    },
    methods: {
      formatTime(time){
          return DataUtil.formatUnixTime(time);
      },
      bindGrid() {
        this.gridLoading = true;
        let _data = {
          lendingMonth: ""
        };
        this.$http.post('manage/loanDataAmountDetail', _data).then(response => {
         	this.gridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.gridData = body.data;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.gridLoading = false;
        })
      },
      checkdetail(row) {
        this.commonRadioDigVisible = true;
        this.dialogTitle = row.lendingMonth;
        this.getDatailData(row)
      },
      getDatailData(row) {
        this.detailgridLoading = true;
        let _data = {
          lendingMonth: row.lendingMonth
        };
        this.$http.post('manage/loanDataAmountDetail', _data).then(response => {
          this.detailgridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.detailData = body.data;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.detailgridLoading = false;
        })
      }
    },
    mounted: function () {
      this.bindGrid()
    }
  }
</script>
<style scoped>
</style>
