<template>
  <section>
      <!--工具条-->
    <el-form :inline="true"  :model="searchForm" class="toolbar" label-width="100px" ref="searchForm">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item><br>
      <el-form-item label="新姓名" prop="realName">
        <el-input v-model="searchForm.realName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="bindGrid" type="info" :loading="confirmLoading">修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        searchForm: {
          mobile: '',
          realName: ''
        },
        confirmLoading: false,
      }
    },
    methods: {
      bindGrid() {
        let _data = Object.assign({},this.searchForm);
        this.confirmLoading = true;
        this.$http.post('manage/getUserListByMobile',_data).then(response =>{
          this.confirmLoading = false;

          let {body} = response;
          if(body.code == 1){
               this.$message({
                    type: 'success',
                    message: '修改成功'
                });
          
              this.$refs.searchForm && this.$refs.searchForm.resetFields();
    
           }else{
              this.$message.error(response.body.message);
           }

        },response=>{this.confirmLoading = false;});
      }
    },
    mounted() {

    }
  }
</script>
<style>
</style>