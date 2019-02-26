/**
* Created by alan on 18-3-09.
*/
<template>
  <section>
    <template>
      <el-row class="line-height">
        <h1 class="one-title">订单信息</h1>
        <el-col :span="6">
          <span>订单编号:</span><span>{{ uuid }}</span>
        </el-col>
        <el-col :span="6">
          <span>姓名:</span><span>{{ realName }}</span>
        </el-col>
        <el-col :span="6">
          <span>手机号: <span>{{ mobileNumber }}</span></span>
        </el-col>
        <el-col :span="6">
          <span>借款金额:</span><span>{{ amountApply }}</span>
        </el-col>

        <el-col :span="6">
          <span>借款期限:</span><span>{{ borrowingTerm }}</span>
        </el-col>
        <el-col :span="6">
          <span>应还日期: <span>{{ formatUnixTime(refundTime) }}</span></span>
        </el-col>
        <el-col :span="6">
          <span>逾期天数:</span><span>{{ overDueDay }}</span>
        </el-col>
        <el-col :span="6">
          <span>提交时间: <span>{{ formatUnixTime(updateTime) }}</span></span>
        </el-col>

        <el-col :span="6">
          <span>应还金额:</span><span>{{ refundMoney }}</span>
        </el-col>
        <el-col :span="6"><span>订单申请时间:</span><span>{{ formatUnixTime(createTime) }}</span></el-col>
        <el-col :span="6"><span>放款时间:</span><span>{{  formatUnixTime(lendingTime)  }}</span></el-col>
        <el-col :span="6">
          <el-button size="small" type="primary" @click="markRepayOrder()" :loading="markRepayOrderLoading">改为已还款</el-button>
          <el-button size="small" @click="markUnRepayOrder()" :loading="markUnRepayOrderLoading">改为待还款</el-button>
        </el-col>

      </el-row>
    </template>
    <div class="divid-line"></div>

    <template>
      <el-row>
        <h1 class="one-title">审核记录</h1>
        <el-table :data="orderHandleList" v-loading="orderHandleListLoading">
          <el-table-column prop="id" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="aliPayNo" label="支付宝账号">
          </el-table-column>

          <el-table-column prop="createTime" label="提交时间" width="150">
            <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
          </el-table-column>

          <el-table-column prop="actualAmount" label="实还金额">
          </el-table-column>
          <el-table-column prop="transNo" label="流水号">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
          <el-table-column prop="offineRefundType" label="还款渠道">
            <template scope="scope">{{formatChannel(scope.row.offineRefundType)}}</template>
          </el-table-column>
          <el-table-column prop="operateName" label="操作人">
          </el-table-column>

          <el-table-column label="操作" width="220" >
            <template scope="scope">
              <el-button size="small" @click="checkPic(scope.row)">查看附件</el-button>

              <el-button v-show="scope.row.status == 0" size="small" @click="enableIt(scope.row)">有效</el-button>
              <el-button v-show="scope.row.status == 0" size="small" @click="disableIt(scope.row)">无效</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-row>

    </template>

    <template>
      <!--有效-->
      <el-dialog title="有效操作" v-model="editHandleItemVisible" :close-on-click-modal="false" size="small">
        <el-form :model="editHandleItem" label-position="left" label-width="100px" :rules="editHandleItemRule" ref="editHandleItem">
          <el-form-item label="实还金额" prop="amount">
            <el-input v-model="editHandleItem.amount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="流水号" prop="dealNo">
            <el-input v-model="editHandleItem.dealNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="editHandleItem.remark" auto-complete="off" :maxlength="100"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editHandleItemVisible = false">取 消</el-button>
          <el-button type="primary" @click="editHandleItemSubmit" :loading="editHandleItemLoading">提 交</el-button>
        </div>
      </el-dialog>
    </template>

    <template>
      <!--订单状态修改-->
      <el-dialog title="更改订单状态确认弹框" v-model="editOrderStatusVisible" :close-on-click-modal="false" size="tiny">
        <el-row>
          <el-col>
            <span>共收到 : </span><span>{{ editOrder.amount }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>剩余未还金额 : </span><span>{{ editOrder.amountLeft }}</span>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="repayOrderClick" :loading="repayOrderLoading">更改订单为已还款</el-button>
          <el-button type="primary" @click="unRepayOrderClick" :loading="unRepayOrderLoading">更改订单为未还款</el-button>
        </div>
      </el-dialog>
    </template>

    <ml-photo-box ref='photoBox'></ml-photo-box>


  </section>
</template>

<script>
  import mlPhotoBox from '../../components/_photoBox.vue'
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'

    export default {
      components: {
        mlPhotoBox
      },
      data(){
        return{
          uuid:"",
          userUuid:"",
          historyUuid:"",
          realName:"",
          mobileNumber:"",
          amountApply:"",
          borrowingTerm:"",
          lendingTime:'',
          createTime:'',
          refundTime:"",
          overDueDay:"",
          updateTime:"",
          refundMoney:"",
          orderInfo:{

          },
          orderHandleList:[],
          orderHandleListLoading:false,
          editHandleItem:{
            amount:"",
            dealNo:'',
            remark:"",
          },
          editHandleItemVisible:false,
          editHandleItemLoading:false,
          editHandleItemRule:{
            amount: [{
              required: true,
              message: '请输入实还金额',
              trigger: 'blur'
            }],
            dealNo: [{
              required: true,
              message: '请输入流水号',
              trigger: 'blur'
            }],
          },
          repayOrderLoading:false,
          unRepayOrderLoading:false,
          editOrderStatusVisible:false,
          editOrder:{
            amount:"",
            amountLeft:""
          },
          markRepayOrderLoading:false,
          markUnRepayOrderLoading:false,
        }
      },
      methods:{
        getHistoryList(){
          let _data = {userUuid:this.userUuid,uuid:this.uuid};
          this.orderHandleListLoading = true;
          this.$http.post('manage/getOfflineRefundHistoryList',_data).then(response =>{
            let {body} = response;
            this.orderHandleList = body.data;
            this.orderHandleListLoading = false;
          })
        },
        getOrderInfo(){
          let _data = {uuid:this.uuid};
          this.$http.post("manage/",_data).then(response =>{
            let {body} = response;
          })
        },
        formatUnixTime(time){
          return DataUtil.formatUnixTime(time);
        },
        formatChannel(data){
          let channel = '';
          if(data == 1){
            channel = '支付宝'
          }
          if(data == 2){
            channel = '微信';
          }
          return channel;
        },
        repayOrderClick(){    /*更改订单为已还款按钮*/
          this.repayOrderLoading = true;
          this.repayOrder()
        },
        unRepayOrderClick(){  /*更改订单为未还款按钮*/
          this.unRepayOrderLoading = true;
          this.unRepayOrder();
        },
        markRepayOrder(){     /*将订单改为已还款*/
          this.markRepayOrderLoading = true;
          this.$http.post("manage/getActuallyStatus", {orderNo:this.uuid}).then((response) =>{
            this.markRepayOrderLoading = false;
            let {body} = response;
            if(body.code == 1){
              this.editOrder.amountLeft = body.data.amountLeft;
              this.$confirm("该笔订单将减免"+ body.data.amountLeft +"元，是否更改？","改为已还款",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() =>{
                this.repayOrder();
              }).catch(()=>{})
            }else{
              this.$message.info(body.message);
            }
          })
        },
        markUnRepayOrder(){   /*将订单改为待还款*/
          this.markUnRepayOrderLoading = true;
          this.$http.post("manage/getActuallyStatus", {orderNo:this.uuid}).then((response) =>{
            let {body} = response;
            if(body.code == 1){
              this.editOrder.amount = body.data.amount;
              this.$confirm("已收到"+ body.data.amount +"元，是否更改为待还款？","改为已还款",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() =>{
                this.unRepayOrder();
              }).catch(()=>{})
            }else{
              this.$message.info(body.message);
            }
          })
        },
        checkPic(row){
          console.log(row.images);
          if(row.images == null || row.images == ""){

          }
          let _image = row.images.split("|");
          for(let i = 0;i < _image.length;i++){
            _image[i] = Config.imageUrl+"offlineRefund/" + _image[i];
          }
          this.checkHandleImg(_image)
        },
        enableIt(row){
          this.editHandleItemVisible = true;
          this.historyUuid = row.uuid;
        },
        disableIt(row){
          /*将该条提交置为无效*/
          let _data = {status:2,sessionId:DataUtil.sid(),orderNo:this.uuid,uuid:row.uuid};

          this.$http.post("manage/updateOrderOfflineRefundLog",_data).then((response) => {
            let {body} = response;
            if(body.code == 1){
              this.resetPage();
              // window.location.reload();
            }else{
              this.$message.info(body.message);
            }

          })
        },
        repayOrder(){
          /*调用更新订单为已还款接口*/
          let _data = {uuid:this.uuid,sessionId:DataUtil.sid(),offlinePaymentLeft:this.editOrder.amountLeft};
          this.$http.post("manage/updateOrderTorefunded", _data).then((response) =>{
            let {body} = response;
            if(body.code == 1){
              this.resetPage();
              // window.location.reload();
            }else{
              this.$message.info(body.message);
            }
          })
        },
        unRepayOrder(){
          /*调用更新订单为待还款接口*/
          let _data = {uuid:this.uuid,sessionId:DataUtil.sid()};
          this.$http.post("manage/updateOrderToUnrefund", _data).then((response) =>{
            let {body} = response;
            if(body.code == 1){
              
              // this.unRepayOrderLoading = false;
              this.resetPage();
              // window.location.reload();
            }else{
              this.$message.info(body.message);
            }
          })
        },
        editHandleItemSubmit(){
          this.$refs.editHandleItem.validate((valid) =>{
            if(valid){
              let _data = Object.assign(this.editHandleItem, {status:1,sessionId:DataUtil.sid(),orderNo:this.uuid,uuid:this.historyUuid});
              console.log(_data);
              this.editHandleItemLoading = true;
              this.$http.post("manage/updateOrderOfflineRefundLog",_data).then((response) => {
                this.editHandleItemLoading = false;
                let {body} = response;
                if(body.code == 1){
                  this.editHandleItemVisible = false;
                  if(body.data.flag == 0){
                    /*展示订单状态修改*/
                    this.editOrder.amount = body.data.amount;         /*实际还款金额*/
                    this.editOrder.amountLeft = body.data.amountLeft;/*剩余还款金额*/
                    this.editOrderStatusVisible = true;
                  }else {
                    this.resetPage();
                    // window.location.reload();
                  }
                }else{
                  this.$message.info(body.message);
                }
              })
            }else{
              return false;
            }
          })
        },
        /**
         * 图片预览
         * @return {[type]} [description]
         */
        checkHandleImg(_photoList) {
          this.$refs.photoBox.show(_photoList)
        },
        resetPage(){
          this.$router.push('/OfflineOrderRepay');
          //     this.editHandleItemVisible = false;
          //     this.editOrderStatusVisible = false;
          // this.userUuid = this.$route.query['userUuid']||'';
          // this.uuid = this.$route.query['uuid']||'';
          // this.realName = this.$route.query['realName'] ||'';
          // this.mobileNumber = this.$route.query['mobileNumber'] ||'';
          // this.amountApply = this.$route.query['amountApply'] ||'';
          // this.borrowingTerm = this.$route.query['borrowingTerm'] ||'';
          // this.refundTime = parseInt(this.$route.query['refundTime'] ||'') || null;
          // this.lendingTime = parseInt(this.$route.query['lendingTime'] ||'') || null;
          // this.createTime = parseInt(this.$route.query['createTime'] ||'') || null;
          // this.overDueDay = this.$route.query['overDueDay'] ||'';
          // this.updateTime = parseInt(this.$route.query['updateTime'] ||'') || null;
          // this.refundMoney = this.$route.query['refundMoney'] ||'';
          // this.getHistoryList();
        }
      },
      mounted:function () {
        this.userUuid = this.$route.query['userUuid']||'';
        this.uuid = this.$route.query['uuid']||'';
        this.realName = this.$route.query['realName'] ||'';
        this.mobileNumber = this.$route.query['mobileNumber'] ||'';
        this.amountApply = this.$route.query['amountApply'] ||'';
        this.borrowingTerm = this.$route.query['borrowingTerm'] ||'';
        this.refundTime = parseInt(this.$route.query['refundTime'] ||'') || null;
        this.lendingTime = parseInt(this.$route.query['lendingTime'] ||'') || null;
        this.createTime = parseInt(this.$route.query['createTime'] ||'') || null;
        this.overDueDay = this.$route.query['overDueDay'] ||'';
        this.updateTime = parseInt(this.$route.query['updateTime'] ||'') || null;
        this.refundMoney = this.$route.query['refundMoney'] ||'';
        this.getHistoryList();
        //this.getOrderInfo();
      }
    }
</script>

<style scoped>
  /* 标题 */
  .one-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .el-row {
    margin: 15px 30px;
  }
  .grid-content {
    line-height: 28px;
  }
  .el-col span{
    margin-right: 10px;
  }
  .box-card .el-button{
    margin-right: 5px;
  }

  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }
  .line-height .el-col{
    margin-bottom: 10px;
  }
  .imgCss{
    display:block;
    width: 100%;
    height: 250px;
  }
</style>
