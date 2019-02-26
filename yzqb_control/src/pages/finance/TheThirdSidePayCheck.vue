/**
* Created by xiaowei on 17-5-11.
*/
<template>
	  <section>
  	  <!-- 工具条 -->
			<el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
	      <el-row>
	        <el-form-item label="订单编号">
	           <el-input v-model="searchForm.orderNo" width="200"></el-input>
	        </el-form-item>
	   			<el-form-item label="姓名">
	  				<el-input v-model="searchForm.realName"></el-input>
	        </el-form-item>
	       	<el-form-item label="交易时间">
		        <div class="block">
		          <el-date-picker v-model="searchForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
		          </el-date-picker> ~
		          <el-date-picker v-model="searchForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
		          </el-date-picker>
		        </div>
		    	</el-form-item>
					<el-form-item label="交易类型">
						<el-select v-model="searchForm.type" placeholder="请选择" clearable>
	          	<el-option v-for="item in orderStatus" :label="item.name" :key="item.code" :value="item.code"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="支付类型">
	          <el-select v-model="searchForm.payChannelType" placeholder="请选择" clearable>
	          	<el-option v-for="item in zhifuStatus" :label="item.name" :key="item.code" :value="item.code"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item>
	          <el-button @click="search" type="info" style="width: 100px">查询</el-button>
	          <el-button @click="exportExl" type="success" style="width:100px">导出</el-button>
	        </el-form-item>
	     	</el-row>
	  	</el-form>

   		<!--列表-->
    	<template>
	      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
	        <el-table-column label="ID" prop="id"></el-table-column>
	        <el-table-column label="交易金额" prop="amountApply"></el-table-column>
	        <el-table-column label="交易后余额" prop="lastTotalAmountApply"></el-table-column>
	        <el-table-column label="审核服务费" prop="reviewFee"></el-table-column>
	        <el-table-column label="征信服务费" prop="infoFee"></el-table-column>
	        <el-table-column label="账户管理费" prop="accountFee"></el-table-column>
	        <el-table-column label="逾期账户管理费" prop="overdueFee"></el-table-column>
	        <el-table-column label="逾期账户滞纳金" prop="overdueFeeAmount"></el-table-column>
	        <el-table-column label="利息" prop="interest"></el-table-column>
	        <el-table-column label="交易时间" prop="updatetime"></el-table-column>
	        <el-table-column label="交易类型" prop="type" >
            <template slot-scope="scope">
              <span>{{getOrderType(scope.row.type)}}</span>
            </template>
          </el-table-column>
	        <el-table-column label="支付类型" prop="payChannelType">
            <template slot-scope="scope">
              <span>{{getPayChannelType(scope.row.payChannelType)}}</span>
            </template>
          </el-table-column>
	        <el-table-column label="订单号" prop="orderNo"></el-table-column>
	        <el-table-column label="姓名" prop="uerName"></el-table-column>
	        <el-table-column label="支付宝账号" prop="aliPayAccount"></el-table-column>
	        <el-table-column label="备注" prop="remark"></el-table-column>
	      </el-table>
    	</template>

    	<!--分页-->
    	<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    	</el-pagination>

  </section>
</template>


<script>
     import DataUtil from '../../common/dataUtil'
     import Config from '../../common/config'

     export default {
     	data() {
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
	      	}
         	return {
           		searchForm:{
		          	userName:'',
		          	startTime:'',
		          	endTime:'',
		          	orderNo:'',
		          	type:'',
		          	payChannelType:''
             	},
		      	orderStatus : [{
		          code: '0',
		          name: '充值'
		        }, {
		          code: '1',
		          name: '放款'
		        }, {
		          code: '2',
		          name: '还款'
		        }],
		        zhifuStatus : [{
		          code: '1',
		          name: '联动优势'
		        }, {
		          code: '2',
		          name: '支付宝'
		        }, {
		          code: '3',
		          name: '宝付'
		        },{
		          code: '4',
		          name: '线下还款'
		        },{
		          code: '5',
		          name: '宝付陈展新账户'
		        }],
             	pickerOptions1:{
		          disabledDate(time) {
		            return compareDate(time, "searchForm", "endTime", "s")
		          }
		        },
		        pickerOptions2: {
		          disabledDate(time) {
		            return compareDate(time, "searchForm", "startTime", "e")
		          }
		        },
               gridLoading: false,

        		gridData: [],
	       	 pageIndex: 1,
	        pageSize: 10,
	        dataTotal: 0
            }
        },

     methods:{
     	pageSizeChange(val) {
 		  	this.pageSize = val;
	        this.pageIndex = 1;
	        this.bindGrid()
     	},
       getOrderType(val){
         let re = '';
         this.orderStatus.forEach(function (obj) {
           if(obj.code == val){
             re = obj.name;
             return;
           }
         });
         return re;
       },
       getPayChannelType(val){
         let re = '';
         this.zhifuStatus.forEach(function (obj) {
           if(obj.code == val){
             re = obj.name;
             return;
           }
         });
         return re;
       },
     	pageIndexChange(val) {
     		this.pageIndex = val;
	        this.bindGrid();
     	},
      	search() {
          	this.pageIndex = 1;
          	this.bindGrid()
       	},
      	exportExl() {
      	 	if(!(this.searchForm.startTime!= "" && this.searchForm.endTime != "")){
	          this.$message({
	            message: '仅支持导出一周内的数据~',
	            type: 'warning'
	          });
	          return;
	        }

	        if(DataUtil.JudgeDate(this.searchForm.startTime,this.searchForm.endTime,7)){
	          this.$message({
	            message: '仅支持导出一周内的数据~',
	            type: 'warning'
	          });
	          return;
	        }

        window.open(Config.host + "/manage/sysTotalAccountHistoryExcel?sessionId="+DataUtil.sid()+"&orderNo="+this.searchForm.orderNo+"&type="+this.searchForm.type+"&startTime="+DataUtil.formatTime(this.searchForm.startTime)+"&endTime="+DataUtil.formatTime(this.searchForm.endTime)+"&payChannelType="+this.searchForm.payChannelType+"&userName="+this.searchForm.userName);
    },
        bindGrid() {
	        this.gridLoading = true;

	        let _data = Object.assign({
	          pageNo:this.pageIndex,
	          pageSize:this.pageSize
	        }, this.searchForm);

	        this.$http.post('manage/sysTotalAccountHistoryList', _data).then(response => {

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

 	mounted:function(){
 		this.bindGrid();
 	}



     }

</script>
