<template>

  <div id="getUserLastSmsCode">
    <el-row>
      <el-col :span="7">
        <el-form class="toolbar">
          <el-form-item label="风控开关">
            <el-switch v-model="riskOffOn" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="支付放款开关">
            <el-switch v-model="loanOffOn" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="是否校验富友余额开关">
            <el-switch v-model="loanBfAccountBalanceOff" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="">
            <el-button @click="saveSwitch" type="info">保存</el-button>
          </el-form-item>

        </el-form>

      </el-col>

      <el-col :span="6">
        <el-form class="toolbar" >
          <el-form-item label="每日超过放款数量不审核" >
            <el-input v-model="riskLendCount"><template slot="append">*1000(元)</template></el-input>
          </el-form-item>

          <el-form-item label="非放款区间">
            <el-input v-model="notInLoanSection"></el-input>
          </el-form-item>

          <el-form-item label="每天放款总金额上限">
            <el-input v-model="loanOmniaccountSysDayTotalAccount"><template slot="append">(元)</template></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button @click="saveInput" type="info">保存</el-button>
          </el-form-item>

        </el-form>
      </el-col>

      <el-col :span="6" :offset="2">
        <el-form class="toolbar" >
          <el-form-item label="放款流量" >
            <el-input-number v-model="loanRandomOffOn" :min="0" :max="10"></el-input-number>
          </el-form-item>
          
          <el-form-item label="还款流量" >
            <el-input-number v-model="refundRandomOffOn" :min="0" :max="10"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button @click="saveRouter" type="info">保存</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        gridLoading: false,
        tableData: [],
        contentsTitle:[],
        columnInfo:[],
        riskOffOn:'',
        loanOffOn:'',
        loanBfAccountBalanceOff:'',
        riskLendCount:'',
        notInLoanSection:'',
        loanOmniaccountSysDayTotalAccount:'',
        loanRandomOffOn:'',
        refundRandomOffOn:''
      }
    },
    methods: {
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      saveSwitch(){
        this.edit("risk:off:no",this.riskOffOn,()=>{});
        this.edit("loan:off:no",this.loanOffOn,()=>{});
        this.edit("loan:bf:account:balance:off",this.loanBfAccountBalanceOff,()=>{});
        this.saveUserOperate();
      },
      saveInput(){
        this.edit("risk:lend:count",this.riskLendCount,()=>{});
        this.edit("not:in:loan:section",this.notInLoanSection,()=>{});
        this.edit("loan:omniaccount:sys:day:total:account",this.loanOmniaccountSysDayTotalAccount,()=>{});
        this.saveUserOperate();
      },
      saveRouter(){
        this.edit("loan:random:off:no",this.loanRandomOffOn,()=>{});
        this.edit("refund:random:off:no",this.refundRandomOffOn,()=>{});
        this.saveUserOperate();
      },
      saveUserOperate(){
        let _data = {sessionId:DataUtil.sid(),desc:"修改redis开关控制",type:8};
        this.$http.post('manage/userOperateMark', _data).then(response =>{window.location.reload()})
      },
      search(key,callback) {
        this.$http.post('manage/redisStringValue', {key: key}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if (body.data.value) {
              callback(body.data);
            } else {}
          } else {
            this.$message.error(body.message);
          }
        }, response => {
        });
      },
      edit(key, value, callback){
        this.$http.post('manage/redisStringValueEdit', {key: key,value: value}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            callback(body.data);
          } else {
            this.$message.error(body.message);
          }
        }, response => {
        });
      },
      riskChange(data){
        this.edit("risk:off:no",data,()=>{})
      },
      initData(){
        this.search("risk:off:no",(data)=>{
          this.riskOffOn = data.value;
        });
        this.search("loan:off:no",(data)=>{
          this.loanOffOn = data.value;
        });
        this.search("loan:bf:account:balance:off",(data)=>{
          this.loanBfAccountBalanceOff = data.value;
        });

        this.search("risk:lend:count",(data) =>{
          this.riskLendCount = data.value;
        });
        this.search("not:in:loan:section",(data) =>{
          this.notInLoanSection = data.value;
        });
        this.search("loan:omniaccount:sys:day:total:account",(data) =>{
          this.loanOmniaccountSysDayTotalAccount  = data.value;
        });

        this.search("loan:random:off:no",(data) =>{
          this.loanRandomOffOn = data.value;
        });
        this.search("refund:random:off:no",(data) =>{
          this.refundRandomOffOn = data.value;
        })
      }
    },
    mounted() {
      this.initData();
    }
  }
</script>
<style>
  #getUserLastSmsCode {
    margin-top: 20px;
  }
</style>
