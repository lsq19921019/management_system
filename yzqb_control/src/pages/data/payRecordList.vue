<template>
  <div id="getUserLastSmsCode">
  <el-form ref="form" :model="form" :inline="true" label-width="80px" class="demo-form-inline">
    <el-form-item label="订单号">
      <el-input v-model="form.orderNo" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="bindGrid">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%" v-loading="gridLoading">
      <el-table-column prop="shopOrderNo" label="订单编号"></el-table-column>
      <el-table-column prop="createTime" label="创建时间">
          <template scope="scope">
            <span>{{getTimeDate(scope.row.createTime)}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="tradeStateCN" label="操作状态"></el-table-column>
      <el-table-column prop="transSerialNo" label="请求流水号">
      </el-table-column>
      <el-table-column prop="typeCN" label="操作类型"></el-table-column>
      <el-table-column prop="responseData" label="响应参数">
          <template scope="scope">
            <el-button size="small" @click="showResponseDataForm(scope.row.responseData)">详情</el-button>
          </template>
      </el-table-column>

      <!-- <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="smsCode" label="验证码"></el-table-column> -->
  </el-table>
  
    <el-dialog title="响应参数" v-model="showResponseDataFormVisible" :close-on-click-modal="false" size="normal">
      <div style="width:500px;word-break:break-all">
          {{responseData}}
          <!-- <div v-for="(item,index) in responseData" :key="index">
            {{getRowData(item)[0]}}:{{getRowData(item)[1]}}
          </div> -->
          <!-- <el-table :data="responseData" style="width: 100%" v-loading="gridLoading">
              <el-table-column label="参数名称">
                  <template scope="scope">
                    <span>{{getRowData(scope.row)[0]}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="参数值">
                  <template scope="scope">
                    <span>{{getRowData(scope.row)[1]}}</span>
                  </template>
              </el-table-column> -->
              <!-- <el-table-column prop="mobile" label="手机号码"></el-table-column>
              <el-table-column prop="smsCode" label="验证码"></el-table-column> -->
          <!-- </el-table> -->
          <!-- {{responseData}} -->
          <!-- <el-row v-for="(item,index) in responseData" :key="index">
            <el-form-item>{{item.key}}:{{item.val}}</el-form-item>
          </el-row>
          <el-row>
            <el-form-item>2</el-form-item>
          </el-row>
          <el-row>
            <el-form-item>3</el-form-item>
          </el-row>
          <el-row>
            <el-form-item>4</el-form-item>
          </el-row> -->
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        gridLoading: false,
        tableData: [],
        form: {
          orderNo: ''
        },
        responseData:{},
        showResponseDataFormVisible:false
      }
    },
    methods: {
      getRowData(item){
        // item = item.replace('\"/g','');
        return item.split(':');
      },
      showResponseDataForm(res){
          // alert(res);
          if(res){
            // res = JSON.parse(res).substring(1)
            // alert(JSON.parse(res).substring(1,JSON.parse(res).length-1));
            // let arrStr = JSON.parse(res).substring(1,JSON.parse(res).length-1);
            // let t_arr = arrStr.split(',');
            // console.log(t_arr);
            // this.responseData = JSON.parse(res);
              this.responseData = res;
          }else{
            this.responseData = '';
          }
        this.showResponseDataFormVisible = true;
      },
      getTimeDate(time){
        return DataUtil.formatUnixTime(time);
      },
      bindGrid() {
        if(!this.form.orderNo){
            this.$message.error('订单号不能为空!');
            return;
        }
        let _data = Object.assign({},this.form);
        this.gridLoading = true;
        this.$http.post('manage/payRecordList', _data).then(response => {
          this.gridLoading = false;
          if (1 == response.body.code) {
            if(response.body.data){
              // let _this = this;
              // let r_list = [];
              this.tableData = response.body.data;
              // this.tableData[0].createTime=DataUtil.formatUnixTime(this.tableData[0].createTime);
              // this.responseData = JSON.parse(JSON.parse(this.tableData[0].responseData));
              // this.responseData = JSON.parse(this.tableData[0].responseData);
              
              // this.responseData = this.responseData.splice(1,this.responseData.length-2);
              // this.responseData.forEach((value, key) => {
              //   r_list.push({
              //     key:key,
              //     val:value
              //   });
              // });
              // this.responseData = r_list;
            }else {
              this.tableData = [];
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
            this.$message.error(response.body.message);
              this.tableData = {};
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
</style>