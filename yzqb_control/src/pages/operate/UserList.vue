/**
* Created by alan on 17-5-8.
*/
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
      <el-form-item label="渠道来源">
         <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
            <el-option v-for="item in qudaolist" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemValue.split('#')[0]"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="注册日期">
        <div class="block">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            :picker-options="pickerOptions1"
            :editable="false"
            placeholder="选择日期">
          </el-date-picker> ~
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            :picker-options="pickerOptions2"
            :editable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="姓名" prop="realName" >
        </el-table-column>
<!--         <el-table-column label="手机号" prop="mobileNumber">
        </el-table-column> -->
        <el-table-column label="注册时间" prop="createTime">
          <template slot-scope="scope">
            {{formatTime(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="渠道来源" prop="channel">
          <template slot-scope="scope">
            {{getChannelName(scope.row.channel)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="small" @click="check(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
      </el-pagination>
    </template>
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
        searchForm:{
          realName:'',
          mobile:'',
          startTime:'',
          endTime:'',
          channel: ''
        },
        qudaolist: [],
        gridLoading: false,
        gridData: [],
        pageIndex: this.$store.getters.getUserListIndex,
        pageSize: 10,
        dataTotal: 20,
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
      getChannelName(type) {
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
      formatTime(time){
          return DataUtil.formatUnixTime(time);
      },
      search() {
        this.bindGrid()
      },
      check(row){
        // location.href='/UserDetail?&uuid='+row.uuid;
        window.open('/#/UserDetail?&uuid='+row.uuid);
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.$store.dispatch('getUserListIndex',val);
        this.bindGrid();
      },
      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize}, this.searchForm,{
          startTime:DataUtil.formatTime(this.searchForm.startTime)||'',
          endTime:DataUtil.formatTime(this.searchForm.endTime)||''
        });
        this.$http.post('manage/userUserList', _data).then(response => {
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
      this.bindGrid();
      this.getQudaoList();
    }
  }
</script>
