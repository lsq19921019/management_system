/**
* Created by alan on 17-6-14.
*/
<template>
  <section>
  <el-tabs type="border-card">
    <el-tab-pane label="线下还款">
      <el-row class="toolbar">
        <el-form :inline="true" :model="freeOrderForm" ref="freeOrderForm" label-width="100px">
          <el-form-item label="订单编号" prop="orderNo">
            <el-input  v-model="freeOrderForm.orderNo" :maxlength="20"></el-input>
          </el-form-item><br>
          <el-form-item label="还款支付宝号" prop="aliPayAccount">
            <el-input  v-model="freeOrderForm.aliPayAccount" :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="HandleChangeConfirm" :loading="ChangeLoading" ref="HandleChange">修改订单</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-tab-pane>

  </el-tabs>
  </section>
</template>

<script>
  import DataUtil from '../../common/dataUtil'
  export default {
      data() {
          return {
            addRemarkRule:{},
            freeOrderForm:{
                orderNo:'',
                aliPayAccount:''
            },
            HandleRecharge:{
                orderNo:'',
                amount:''
            },
            ReplacePay:{
                orderNo:''
            },
            sendMsgForm: {
              smsType: '',
              begId: '',
              endId: ''
            },
            toblackUser: {
              uuid: ''
            },
            ChangeLoading:false,
            RechargeLoading:false,
            ReplacePayLoading:false,
            sendMsgLoading: false,
            toblackUserLoading:false
          }
      },
      methods:{
        HandleChangeConfirm(){
          if(!this.freeOrderForm.orderNo || !this.freeOrderForm.aliPayAccount){
            this.$message({
              type: 'error',
              message: '你的输入有误'
            });
            return false;
          }
          this.$confirm('此操作将永久修改订单状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.ChangePasswordConfirm();
          }).catch(() => {});
        },
        HandleRechargeConfirm(){
          if(!this.HandleRecharge.orderNo || !this.HandleRecharge.amount){
            this.$message({
              type: 'error',
              message: '你的输入有误'
            });
            return false;
          }
          this.$confirm('此操作将永久修改订单状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.RechargePasswordConfirm();
          }).catch(() => {});
        },
        ReplacePayConfirm(){
          if(!this.ReplacePay.orderNo){
            this.$message({
              type: 'error',
              message: '你的输入有误'
            });
            return false;
          }
          this.$confirm('此操作将永久修改订单状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.ReplacePayPasswordConfirm();
          }).catch(() => {});
        },
        ChangePasswordConfirm(){
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(!value){
                this.$message({
                  type: 'error',
                  message: '你输入的密码有误: ' + value
                });
                return false;
            }
            this.ChangeLoading = true;
            let _postData = {
              orderNo:this.freeOrderForm.orderNo,
              password:value,
              userName:DataUtil.account(),
              aliPayAccount:this.freeOrderForm.aliPayAccount
            };
            this.$http.post("manage/freeOrderToRepayment",_postData).then( response => {
              let {body} = response;
              this.ChangeLoading = false;
              if(1 == body.code){
                try{
                  let data = JSON.parse(body.data);
                  this.$message({
                    type: 'info',
                    message: data.message
                  });
                }catch(e) {}
                this.$refs.ReplacePay.resetFields();
              }
            }).catch(e => {this.$refs.ReplacePay.resetFields();this.ChangeLoading = false;});
          }).catch(() => {});
        },
        /*RechargePasswordConfirm(){
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(!value){
                this.$message({
                  type: 'error',
                  message: '你输入的密码有误: ' + value
                });
                return false;
            }
            this.RechargeLoading = true;
            let _postData = {
              orderNo:this.HandleRecharge.orderNo,
              password:value,
              userName:DataUtil.account(),
              amount:this.HandleRecharge.amount
            };
            this.$http.post("manage/rechargeFundWithTemp",_postData).then( response => {
              let {body} = response;
              this.RechargeLoading = false;
              if(1 == body.code){
                try{
                  let data = JSON.parse(body.data);
                  this.$message({
                    type: 'info',
                    message: data.message
                  });
                }catch(e) {}
                this.$refs.HandleRecharge.resetFields();
              }
            }).catch(e => {this.$refs.HandleRecharge.resetFields();this.RechargeLoading = false;});
          }).catch(() => {});
        },
        ReplacePayPasswordConfirm(){
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(!value){
                this.$message({
                  type: 'error',
                  message: '你输入的密码有误: ' + value
                });
                return false;
            }
            this.ReplacePayLoading = true;
            let _postData = {
              orderNo:this.ReplacePay.orderNo,
              password:value,
              userName:DataUtil.account()
            };
            this.$http.post("manage/withHoldOrderWithTemp",_postData).then( response => {
              let {body} = response;
              this.ReplacePayLoading = false;
              if(1 == body.code){
                try{
                  let data = JSON.parse(body.data);
                  this.$message({
                    type: 'info',
                    message: data.message
                  });
                }catch(e) {}
                this.$refs.ReplacePay.resetFields();
              }
            }).catch(e => {this.$refs.ReplacePay.resetFields();this.ReplacePayLoading = false;});
          }).catch(() => {});
        },
        sendMsgConfirm(){
          if(!this.sendMsgForm.smsType || !this.sendMsgForm.begId || !this.sendMsgForm.endId){
            this.$message({
              type: 'error',
              message: '你的输入有误'
            });
            return false;
          }
          this.$confirm('此操作将发送短信, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.sendMsgPasswordConfirm();
          }).catch(() => {});
        },*/
        sendMsgPasswordConfirm() {
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(!value){
                this.$message({
                  type: 'error',
                  message: '你输入的密码有误: ' + value
                });
                return false;
            }
            this.sendMsgLoading = true;
            let _postData = Object.assign({},this.sendMsgForm);
            _postData.password = value;
            this.$http.post("manage/sendSmsToUnKnowUser",_postData).then( response => {
              let {body} = response;
              this.sendMsgLoading = false;
              if(1 == body.code){
                try{
                  let data = JSON.parse(body.data);
                  this.$message({
                    type: 'info',
                    message: data.message
                  });
                }catch(e) {}
                this.$refs.sendMsgForm.resetFields();
              }
            }).catch(e => {this.sendMsgLoading = false;});
          }).catch(() => {});
        },
        toblackUserConfirm() {
          if(!this.toblackUser.uuid){
            this.$message({
              type: 'error',
              message: '你的输入有误'
            });
            return false;
          }
          this.$confirm('此操作将拉黑用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.toblackUserPasswordConfirm();
          }).catch(() => {});
        },
        toblackUserPasswordConfirm() {
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(!value){
                this.$message({
                  type: 'error',
                  message: '你输入的密码有误: ' + value
                });
                return false;
            }
            this.toblackUserLoading = true;
            let _postData = Object.assign({},this.toblackUser);
            _postData.userName = DataUtil.userName();
            _postData.password = value;
            this.$http.post("manage/putUser2BlackList",_postData).then( response => {
              let {body} = response;
              this.toblackUserLoading = false;
              if(1 == body.code){
                try{
                  // let data = JSON.parse(body.data);
                  this.$message({
                    type: 'info',
                    message: body.message
                  });
                }catch(e) {}
                this.$refs.toblackUser.resetFields();
              }else{
                this.$message.error(body.message);
              }
            }).catch(e => {this.toblackUserLoading = false;});
          }).catch(() => {});
        },
      },

      mounted(){

      }
  }
</script>

<style>
  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }
  .titlediv {
    color: #48576a;
    font-size: 16px;
    font-family:"SimHei"
  }
  #hidden {
    visibility:hidden;
  }
</style>
