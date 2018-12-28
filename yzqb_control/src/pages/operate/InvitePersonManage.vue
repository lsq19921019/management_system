<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker v-model="searchForm.startTime" type="date" :editable="false" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker> ~
        <el-date-picker v-model="searchForm.endTime" type="date" :editable="false" placeholder="选择日期" :picker-options="pickerOptions2"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
      </el-form-item>
<!--       <el-form-item>
        <el-button @click="exportExl" type="info">导出</el-button>
      </el-form-item> -->
    </el-form>

    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading">
        <el-table-column label="用户UUID" prop="uuid" min-width="160"></el-table-column>
        <el-table-column label="姓名" prop="realName"></el-table-column>
       	<el-table-column label="成功注册人数" prop="registerCount"></el-table-column>
        <el-table-column label="成功借款人数" prop="loanCount"></el-table-column>
       	<el-table-column label="还款人数" prop="repaymentCount"></el-table-column>
        <el-table-column label="操作" prop="createTime">
          <template slot-scope="scope">
            <el-button size="small" @click="checkdetail(scope.row)">明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

          <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>

    <el-dialog title="明细" v-model="commonRadioDigVisible" :close-on-click-modal="false" size="large">
      <el-table :data="detailData" highlight-current-row v-loading="detailgridLoading"  @row-click="rowClick">
        <el-table-column label="用户UUID" prop="uuid"></el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            {{formatTime(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="放款时间">
          <template slot-scope="scope">
            {{formatTime(scope.row.lendingTime)}}
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderNo"></el-table-column>
        <el-table-column label="是否逾期">
          <template slot-scope="scope">
            <el-tag :type="scope.row.overDue==1? 'danger' : 'success'" close-transition>{{scope.row.overDue==1?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="还款时间">
          <template slot-scope="scope">
            {{formatTime(scope.row.refundTime)}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pager"  @current-change="pageIndexChange1" :current-page="pageIndex1" :page-size="pageSize1"
                   layout="total, prev, pager, next, jumper" :total="dataTotal1">
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="" @click="commonRadioDigVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="commonRadioDigVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
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
      }
      return {
        seen: false,
        searchForm:{
          realName:'',
          startTime:'',
          mobile: '',
          endTime:''
        },
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        pageIndex1: 1,
        pageSize1: 10,
        dataTotal1: 0,
        gridLoading: false,
        detailgridLoading: false,
        otherUuid: '',
        gridData: [],
        detailData: [],
        commonRadioDigVisible: false,
        commonRadioForm: {
          dicCode: ''
        },
        commonRadioFormLoading: false,
        pickerOptions1: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "endTime", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "startTime", "e")
          }
        }
      }
    },
    methods: {
      formatTime(time){
          return DataUtil.formatUnixTime(time);
      },
      rowClick(row){
        window.open('/#/OrderInfoControl?seen=true&userUuid='+row.uuid+
          '&uuid='+row.orderNo);
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
      pageIndexChange1(val) {
        this.pageIndex1 = val;
        this.getDatailData();
      },
      exportExl() {},
      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize}, this.searchForm,{
          startTime:DataUtil.formatTime(this.searchForm.startTime)||'',
          endTime:DataUtil.formatTime(this.searchForm.endTime)||''
        });
        this.$http.post('manage/userInviteRecordList', _data).then(response => {
         	this.gridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.gridData = body.data.data;
            this.dataTotal = body.data.recordsTotal;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.gridLoading = false;
        })
      },

      getDatailData(row) {
        this.detailgridLoading = true;
        let _data = {
          pageNo:this.pageIndex1,
          pageSize:this.pageSize1,
          uuid: this.otherUuid};
        this.$http.post('manage/userInviteOrderRecordList', _data).then(response => {
          this.detailgridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.detailData = body.data.data;
            this.dataTotal1 = body.data.recordsTotal;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.detailgridLoading = false;
        })
      },

      checkdetail(row) {
        this.commonRadioDigVisible = true;
        this.otherUuid = row.uuid;
        this.getDatailData();
      }
    },
    mounted: function () {
      this.bindGrid()
    }
  }
</script>
<style scoped>
.dialog-footer{
  clear: both;
}
</style>
