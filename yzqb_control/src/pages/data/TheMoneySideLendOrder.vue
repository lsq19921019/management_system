/**
* Created by alan on 17-5-8.
*/
<template>
  <section>
    <el-tabs type="border-card" @tab-click="tabChange" v-model="activeName">
      <el-tab-pane label="大账户" name="dazhanghu">
        <ml-moneysideorder tab-value="1" ref="dazhanghuData"></ml-moneysideorder>
        <div style="height: 20px;"></div>
        <div class="dataContet">
          <el-card>
            <div class='text-center'>
              <p class="bigAmount">截止昨天在贷: {{thirdLoanData.allOutMoneyUntilYesterday}}万</p>
              <p class="bigAmount">昨日放款金额: {{thirdLoanData.allMoneyYesterday}}万</p>
              <p class="bigAmount">昨日应还金额: {{thirdLoanData.repayMoneyYesterday}}万</p>
              <p class="bigAmount">应付保证金: {{thirdLoanData.margin}}元</p>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="口袋理财" name="koudai">
        <ml-moneysideorder tab-value="2" ref="koudaiData"></ml-moneysideorder>
      </el-tab-pane>
      <el-tab-pane label="微贷" name="weidai">
        <ml-moneysideorder tab-value="3" ref="weidaiData"></ml-moneysideorder>
      </el-tab-pane>
<!--       <el-tab-pane label="合盘贷" name="hepandai">
        <ml-moneysideorder tab-value="4" ref="合盘贷"></ml-moneysideorder>
      </el-tab-pane> -->
    </el-tabs>
  </section>
</template>
<script>
import mlMoneysideorder from '../../components/ThirdmoneysideOrder.vue';
  export default {
    data() {
      return {
        activeName: 'dazhanghu',
        thirdLoanData: {
          allOutMoneyUntilYesterday: '',
          allMoneyYesterday: '',
          repayMoneyYesterday: '',
          margin: ''
        }
      }
    },
    components: {
      mlMoneysideorder
    },
    methods: {
      tabChange(e) {
        if(e.name == 'dazhanghu'){
            this.$refs['dazhanghuData'].bindGrid();
        }
        if(e.name == 'koudai'){
            this.$refs['koudaiData'].bindGrid();
        }
        if(e.name == 'weidai'){
            this.$refs['weidaiData'].bindGrid();
        }
        if(e.name == 'hepandai'){
            this.$refs['hepandai'].bindGrid();
        }
      },
      getThirdFundstais() {
        this.$http.post('manage/getThirdFundstais',{}).then(response=>{
          let {body} = response;
          if(body.code == 1){
            this.thirdLoanData = body.data;
          }else{
          }
        },response=>{});
      }
    },
    mounted() {
      this.$refs['dazhanghuData'].bindGrid();
      this.getThirdFundstais();
    }
  }
</script>
<style>
  .dataContet{width: 300px;}
  /*.text-center{text-align: center;}*/
  .bigAmount{font-size: 16px;font-weight: bolder;padding-top: 10px;}
</style>
