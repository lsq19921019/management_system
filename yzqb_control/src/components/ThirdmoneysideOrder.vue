<template>
  <section>
    <el-form :inline="true" :model="searchForm" class="toolbar">
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderNo"></el-input>
        </el-form-item>
<!--         <el-form-item label="姓名">
          <el-input v-model="searchForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.mobile"></el-input>
        </el-form-item> -->
        <el-form-item label="放款日期">
          <div class="block">
            <el-date-picker v-model="searchForm.beginLendingTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期"></el-date-picker> ~
            <el-date-picker v-model="searchForm.endLendingTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="应还款日">
          <div class="block">
            <el-date-picker v-model="searchForm.beginRefundTime" type="date" :editable="false" placeholder="选择日期"></el-date-picker> ~
            <el-date-picker v-model="searchForm.endRefundTime" type="date" :editable="false" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="info">查询</el-button>
          <el-button @click="exportExl" type="success">导出</el-button>
        </el-form-item>
      </el-form>

      <!--列表-->
      <template>
        <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
          <el-table-column label="订单号" prop="orderNo" min-width="116"></el-table-column>
          <el-table-column label="借款金额" prop="payAmount" ></el-table-column>
          <el-table-column label="借款期限" prop="borrowingTerm" ></el-table-column>
          <el-table-column label="我方服务费" prop="serviceFeeOur" ></el-table-column>
          <el-table-column label="资金方服务费" prop="serviceFeeOther" ></el-table-column>
          <el-table-column label="我方利息" prop="interestOur" ></el-table-column>
          <el-table-column label="资金方利息" prop="interestOther" ></el-table-column>
          <el-table-column label="代付服务费" prop="loanHandlingCharge" ></el-table-column>
          <el-table-column label="代扣服务费" prop="refundHandlingCharge" ></el-table-column>
          <el-table-column label="2.5/万" prop="extra" v-if="seen"></el-table-column>
          <el-table-column label="放款渠道">
            <template slot-scope="scope">
              {{getChannelName(scope.row.payChannel)}}
            </template>
          </el-table-column>
          <el-table-column label="放款时间" min-width="116">
            <template slot-scope="scope">
              {{formatTime(scope.row.lendingTime)}}
            </template>
          </el-table-column>
          <el-table-column label="应还款日" min-width="116">
            <template slot-scope="scope">
              {{formatTime(scope.row.refundTime)}}
            </template>
          </el-table-column>
          <el-table-column label="使用优惠券" prop="discountAmount" ></el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
        </el-pagination>
      </template>
  </section>
</template>
<script>
  import Config from '../common/config'
  import DataUtil from '../common/dataUtil'
  export default {
    props: ['tabValue'],
    data () {
      let compareDate = (time, form, txt, type) => {
        let _cp1 = time.getTime() >= Date.now()
        let _cp2 = false
        let _input = this[form][txt]
        if (_input) {
          let _time = Date.parse(new Date(_input))
          if ((type == "s" && time.getTime() > _time) || (type == "e" && time.getTime() < _time)) {
            _cp2 = true
          }
        }
        return _cp1 || _cp2
      };

      return {
        seen: true,
        searchForm:{
          orderNo: '',
          realName:'',
          mobile:'',
          beginLendingTime:'',
          endLendingTime: '',
          beginRefundTime:'',
          endRefundTime: ''
        },

        gridLoading: '',
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,

        qudaolist: [{
          code: '1',
          name: '大账户'
        },{
          code: '2',
          name: '口袋理财'
        },{
          code: '3',
          name: '微贷'
        },{
          code: '4',
          name: '合盘贷'
        }],

        pickerOptions1: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "endLendingTime", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "beginLendingTime", "e")
          }
        }
      }
    },
    methods: {
      getChannelName(type) {
         let re = '';
          this.qudaolist.forEach(obj => {
            if (obj.code == type) {
              re = obj.name;
              return
            }
          });
          return re
      },
      formatTime(time){
          return DataUtil.formatUnixTime(time);
      },
      exportExl() {
        if(!(this.searchForm.beginLendingTime != "" && this.searchForm.endLendingTime != "") && !(this.searchForm.beginRefundTime != "" && this.searchForm.endRefundTime != "")){
          this.$message({
            message: '仅支持导出一周内的数据~',
            type: 'warning'
          });
          return;
        }

        if(DataUtil.JudgeDate(this.searchForm.beginLendingTime,this.searchForm.endLendingTime,7) || DataUtil.JudgeDate(this.searchForm.beginRefundTime,this.searchForm.endRefundTime,7)){
          this.$message({
            message: '仅支持导出一周内的数据~',
            type: 'warning'
          });
          return;
        }

        window.open(Config.host + "/manage/getOrderThirdFundListExcel?sessionId="+DataUtil.sid()+"&orderNo="+this.searchForm.orderNo+"&mobile="+this.searchForm.mobile+"&realName="+this.searchForm.realName+"&beginLendingTime="+DataUtil.formatTime(this.searchForm.beginLendingTime)+"&endLendingTime="+DataUtil.formatTime(this.searchForm.endLendingTime)+"&beginRefundTime="+DataUtil.formatTime(this.searchForm.beginRefundTime)+"&endRefundTime="+DataUtil.formatTime(this.searchForm.endRefundTime)+"&payChannel="+this.tabValue);
      },
      search() {
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.bindGrid();
      },

      bindGrid() {
        this.gridLoading = true;

        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize}, this.searchForm);
        _data.beginLendingTime = DataUtil.formatTime(this.searchForm.beginLendingTime)||'',
        _data.endLendingTime = DataUtil.formatTime(this.searchForm.endLendingTime)||'',
        _data.beginRefundTime = DataUtil.formatTime(this.searchForm.beginRefundTime)||'',
        _data.endRefundTime = DataUtil.formatTime(this.searchForm.endRefundTime)||'',
        _data.payChannel = this.tabValue;

        this.tabValue == 1 ? this.seen = true:this.seen = false;   //只有大账户有2.5/万列

        this.$http.post('manage/getOrderThirdFundList', _data).then(response => {
          let {body} = response;
          if (1 == body.code) {
            this.gridLoading = false;
            this.gridData = body.data.data;
            this.dataTotal = body.data.recordsTotal;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.gridLoading = false;
        })
      }
    },
    mounted: function () {
    }
  }
</script>
