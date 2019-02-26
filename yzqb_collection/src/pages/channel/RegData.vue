/**
* Created by alan on 17-6-6.
*/
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="注册日期">
        <div class="block">
          <el-date-picker
            v-model="searchForm.time"
            type="date"
            :picker-options="pickerOptions1"
            :editable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info" v-loading="searchLoading">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="height: 20px;"></div>
    <el-row>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">激活数</span>
              <p class="bigAmount">{{amountTotal.count || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="dataContet">
            <div class="text-center">
              <span class="bigText">注册数</span>
              <p class="bigAmount">{{amountTotal.count || '0'}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="height: 20px;"></div>
  </section>
</template>

<script>
  import DataUtil from '../../common/dataUtil'
  export default{
    data(){
      return{
        amountTotal:{},
        searchForm:{
          time:''
        },
        searchLoading:false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      }
    },
    methods:{
      search(){
        let _data = {};
         _data.time = DataUtil.formatTime(this.searchForm.time || new Date());
         _data.uuid = DataUtil.uuid();
         this.getRegData(_data);
      },
      getRegData(_data){
        this.searchLoading = true;
        this.$http.post('manage/regCountByUuidTime',_data).then(response =>{
          this.searchLoading = false;
          let {body} = response;
          if(1 == body.code && body.data){
            this.amountTotal = body.data;
          }
        }).catch( e =>{this.searchLoading = false;});

      }

    },
    mounted(){
      this.search();
    }
  }
</script>
<style scoped>
  .button{
    padding: 0;
    float: right;
  }
  .dataContet{
    height: 90px;
  }
  .text-center{text-align: center;}
  .bigText{font-size: 20px;font-weight: bolder;}
  .bigAmount{font-size: 40px;font-weight: bolder;padding-top: 20px;}
</style>
