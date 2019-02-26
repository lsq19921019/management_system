<template>
  <div id="getUserLastSmsCode">
  <el-form ref="form" :model="form" :inline="true" label-width="80px" class="demo-form-inline">
    <el-form-item label="订单号">
      <el-input v-model="form.uuid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="bindGrid">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%" v-loading="gridLoading">
      <el-table-column prop="uuid" label="订单编号"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="mobileNumber" label="手机号"></el-table-column>
      <el-table-column prop="amountApply" label="借款金额"></el-table-column>
      <el-table-column prop="borrowingTerm" label="借款期限"></el-table-column>
      <el-table-column prop="refundTime" label="应还日期">
          <template scope="scope">
            <span>{{getTimeDate(scope.row.refundTime)}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="refundMoney" label="应还金额"></el-table-column>
      <el-table-column prop="surplusMoney" label="剩余应还"></el-table-column>
      <el-table-column prop="status	" label="订单状态">
          <template scope="scope">
            <span>{{getOrderStatus(scope.row.status)}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="channel" label="来源">
          <template scope="scope">
            <span>{{getChannelType(scope.row.channel)}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="control_btn" label="操作" v-if="showBtnControl">
          <template scope="scope">
            <el-button size="small" :freezeBtn="freezeBtn" :loading="ManualSetOrderLoading" @click="open1()">{{btn_name}}</el-button>
          </template>
      </el-table-column>

      <!-- <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="smsCode" label="验证码"></el-table-column> -->
  </el-table>
  
    <el-dialog title="手动结清记录：" v-model="ManualSetOrderDialogVisible" size="tiny">
      
      <div style="padding:10px 0;">
        还有<span style="color:red;">{{surplusMoney}}</span>元未还，您确定要手动结清订单吗？
      </div>
      <div>
        <el-input v-model="setOrderPwd" placeholder="请输入密码" type="password"></el-input>
      </div>
      <div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="ManualSetOrderDialogVisible = false">关闭</el-button>
        <el-button type="success" @click="open2(surplusMoney,uuid);">确定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  import enums from '../../common/Enum'
  export default {
    data() {
      return {
        showBtnControl:true,
        gridLoading: false,
        tableData: [],
        form: {
          uuid: ''
        },
        uuid: '',
        surplusMoney: '',
        setOrderPwd:'',
        responseData:{},
        showResponseDataFormVisible:false,
        freezeBtn:false,
        ManualSetOrderLoading:false,
        btn_name:'手动结清',
        ManualSetOrderDialogVisible:false,
      }
    },
    methods: {
      open1(){
this.ManualSetOrderDialogVisible = true;
      },
      open2(surplusMoney,uuid) {
        // let text_info = '还有 '+surplusMoney+'元未还，您确定要手动结清订单吗？';
        // let this_ = this;
        //   // if(this_.freezeBtn){
        //   //     // this.$message({
        //   //     //   type: 'info',
        //   //     //   message: '订单处理中'
        //   //     // });
        //   //   return;
        //   // }
        // this.$confirm(text_info, '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   dangerouslyUseHTMLString:true,
        //   type: 'warning'
        // }).then(() => {
          if(!this.setOrderPwd){
            this.$message.error('密码不能为空!');
            return;
          }
          this.$http.post('manage/manualSetOrderToStatus',{sessionId :DataUtil.sid(),uuid:uuid,pwd:this.setOrderPwd}).then(response=>{
            // this.freezeBtn = true;
            // this.btn_name = '订单已处理';
            if (1 == response.body.code) {
              this.$message({
                type: 'success',
                message: '结清成功!'
              });
              this.bindGrid();
              this.showBtnControl = false;
              this.ManualSetOrderDialogVisible = false;
              this.setOrderPwd = '';
            }else{
              this.$message.error(response.body.message);
            }
            this.setOrderPwd = '';
          });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消'
        //   });          
        // });
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
        if(!this.form.uuid){
            this.$message.error('订单号不能为空!');
            return;
        }
        let _data = Object.assign({},this.form);
        this.gridLoading = true;
        this.$http.post('manage/manualSetOrder', _data).then(response => {
          this.gridLoading = false;
          if (1 == response.body.code) {
            if(response.body.data){
              // let _this = this;
              // let r_list = [];
              // this.tableData = response.body.data;
              if(response.body.data.status===5||response.body.data.status===8){
                this.showBtnControl = true;
              }else{
                this.showBtnControl = false;
              }
              this.tableData = [];
              this.tableData.push(response.body.data);
              this.surplusMoney = response.body.data.surplusMoney;
              this.uuid = response.body.data.uuid;
              // console.log(tableData);
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
      },
      getOrderStatus(status){
          return enums.getOrderPro(status);
      },
    },
    mounted() {
      this.getQudaoList();
    }
  }
</script>
<style>
  #getUserLastSmsCode {
    margin-top: 20px;
  }
</style>