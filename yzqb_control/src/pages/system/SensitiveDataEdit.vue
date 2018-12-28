/**
* Created by alan on 17-6-14.
*/
<template>
  <section>
  <el-tabs type="border-card">
    <el-tab-pane label="线下还款">
      <el-row class="toolbar">
        <el-form :inline="true" :model="freeOrderForm" ref="freeOrderForm" label-width="120px" :rules="freeOrderFormRule">
          <el-form-item label="订单编号" prop="orderNo">
            <el-input  v-model="freeOrderForm.orderNo" :maxlength="60"></el-input>
          </el-form-item><br><br>

          <el-form-item label="还款渠道" prop="offineRefundType">
            <el-select clearable v-model="freeOrderForm.offineRefundType" @change="handlechange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item><br><br>

          <el-form-item label="还款支付宝号" prop="aliPayAccount" v-if="showAccount">
            <el-input  v-model="freeOrderForm.aliPayAccount" :maxlength="60"></el-input>
          </el-form-item>
          <br><br>

          <el-form-item label="附件" prop="uploadFileList">
            <el-upload :action="uploadUrl" :on-success="uploadSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" list-type="picture-card" :disabled="isCanUpload" :file-list="freeOrderForm.uploadFileList">
              <el-button type="text">{{uploadText}}</el-button><span style="margin-left: 10px;color: #99a9bf;">(最多3张)</span>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="HandleChangeConfirm" :loading="ChangeLoading" ref="HandleChange">修改订单</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-tab-pane>

    <el-tab-pane label="拉黑用户">
      <el-row class="toolbar">
        <el-form :inline="true" :model="toblackUser" ref="toblackUser" label-width="100px">
          <el-form-item label="用户手机号" prop="uuid">
            <el-input  v-model="toblackUser.uuid"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toblackUserConfirm" :loading="toblackUserLoading" ref="HandleChange">确定</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-tab-pane>

    <el-tab-pane label="手动代扣">
      <el-row class="toolbar">
        <el-form :inline="true" :model="withHoldOrder" ref="withHoldOrder" label-width="100px">
          <el-form-item label="订单编号" prop="orderNo">
            <el-input  v-model="withHoldOrder.orderNo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="withHoldOrderConfirm" :loading="withHoldOrderLoading" ref="withHoldOrder">确定</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-tab-pane>

  </el-tabs>

    <!-- 图片预览 -->
    <el-dialog v-model="dialogVisible" size="small" class="photo_box">
      <img width="50%" :src="dialogImageUrl" alt="" style="margin-left: 25%;">
    </el-dialog>

  </section>
</template>

<script>
  import Config from '../../common/config'
  import DataUtil from '../../common/dataUtil'
  export default {
      data() {
          return {
            showAccount: false,
            options:[{
              value:1,
              label:'支付宝'
            },{
              value:2,
              label:'微信'
            }],
            addRemarkRule:{},
            freeOrderForm:{
                orderNo:'',
                aliPayAccount:'',
                fileUrl:'',
                offineRefundType:'',
                uploadFileList:[]
            },
            freeOrderFormRule:{
              orderNo:[{
                required: true,
                max: 60,
                message: "请输入订单编号"
              }],
              offineRefundType:[{
                required: true,
                message: '请选择还款渠道',
                // trigger: 'change'
              }],
              aliPayAccount:[{
                required: true,
                max: 60,
                message: "请输入还款支付宝号，不超过60个字符"
              }],
              uploadFileList:[{
                required: true,
                message: "请上传附件"
              }]
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
            withHoldOrder:{
              orderNo:''
            },
            withHoldOrderLoading:false,
            ChangeLoading:false,
            RechargeLoading:false,
            ReplacePayLoading:false,
            sendMsgLoading: false,
            toblackUserLoading:false,
            uploadUrl:Config.host+"/manage/uploadImage?sessionId="+DataUtil.sid(),
            isCanUpload:false,

            uploadText:"上传附件",
            dialogVisible:false,
            dialogImageUrl:"",
            showUpLoadUrl: Config.imageUrl +'offlineRefund/',//上传图片回显
          }
      },
      methods:{
        handlechange(){
          if(this.freeOrderForm.offineRefundType == 1){
            this.showAccount = true;
            this.freeOrderFormRule.aliPayAccount.required = true;
          }else{
            this.showAccount = false;
            this.freeOrderFormRule.aliPayAccount.required = false
          }
        },
        uploadSuccess(resp,file,fileList){
          console.log(resp,file,fileList);
          this.imgUpload(fileList,3);
        },
        handlePictureCardPreview(file){
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        handleRemove(file, fileList){
          console.log(file, fileList);
          this.imgUpload(fileList,3);
        },
        imgUpload(fileList,num){
          if(fileList.length > num){
            fileList.splice(0,fileList.length-num);
          }
          this.freeOrderForm.uploadFileList = fileList;
          this.freeOrderForm.uploadFileList.forEach(e =>{
            e.response ? e.url = this.showUpLoadUrl + e.response.url[0] : e.url = e.url;
          })
        },
        HandleChangeConfirm(){

          this.$refs.freeOrderForm.validate((valid) =>{
            if(valid){
              let _imgList = [];
              this.freeOrderForm.uploadFileList.forEach( e =>{
                _imgList.push(e.url.split(this.showUpLoadUrl)[1])
              });

              let fileUrl = _imgList.join("|");
              this.$confirm('此操作将永久修改订单状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.ChangePasswordConfirm(fileUrl);
              }).catch(() => {});
            }
          });
        },
        ChangePasswordConfirm(fileString){
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
              aliPayAccount:this.freeOrderForm.aliPayAccount,
              fileUrl:fileString,
              offineRefundType: this.freeOrderForm.offineRefundType
            };
            this.$http.post("manage/freeOrderToOffline",_postData).then( response => {
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
        withHoldOrderConfirm(){
          if(!this.withHoldOrder.orderNo){
            this.$message({
              type: 'error',
              message: '你的输入有误'
            });
            return false;
          }

          this.$confirm('此操作将执行手动代扣操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.withHoldOrderPasswordConfirm();
          }).catch(() => {});
        },
        withHoldOrderPasswordConfirm(){
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({value}) =>{
            if(!value){
              this.$message({
                type: 'error',
                message: '你输入的密码有误'
              });
              return false;
            }
            this.withHoldOrderLoading = true;
            let _postData = Object.assign({},this.withHoldOrder);
            _postData.password = value;
            console.log(_postData)
            this.$http.post("manage/withHoldOrderWithTemp",_postData).then( response => {
              let {body} = response;
              this.withHoldOrderLoading = false;
              if(1 == body.code){
                try{
                  let data = JSON.parse(body.data);
                  this.$message({
                    type: 'info',
                    message: data.message
                  });
                }catch(e) {}
                this.$refs.withHoldOrder.resetFields();
              }else{
                this.$message.error(body.message);
              }
            }).catch(e => {this.withHoldOrderLoading = false;});

          }).catch(() => {});
        }
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
