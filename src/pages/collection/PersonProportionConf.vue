<template>
	<section>
    <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
      <el-table-column label="ID" prop="id" >
      </el-table-column>
      <el-table-column label="名称" prop="ruleName">
      </el-table-column>
       <el-table-column label="条件" prop="cdition" >
      </el-table-column>
      <el-table-column label="状态" prop="mobileNumber">
       <template slot-scope="scope">
            <el-tag :type="scope.row.status==0? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'禁用':'启用'}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="commonForm.title" v-model="editFormDigVisible" :close-on-click-modal="false">
      <!-- 委外机构/自建电催分配 -->
      <el-form :model="editForm" label-width="120px" v-if="code==1" :rules="editFormRule" ref="editForm">
        <el-form-item label="委外机构比例" prop="rate1">
          <el-input v-model="editForm.rate1" auto-complete="off"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item label="自建电催比例" prop="rate2">
          <el-input v-model="editForm.rate2" auto-complete="off"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item prop="status">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 自建电催分配 -->
      <div v-if="code == 2 || code == 3">
        <el-table :data="userListData" highlight-current-row v-loading="editGridLoading" class="grid" max-height="240">
          <el-table-column label="工号" prop="code" >
          </el-table-column>
          <el-table-column label="用户名" prop="name">
          </el-table-column>
          <el-table-column label="比例(%)" prop="rate" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.rate"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-form :model="editForm">
          <el-form-item prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import DataUtil from '../../common/dataUtil'
 export default {
  data () {
      var checkInteger = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入比例值'));
        } else {
          if (!DataUtil.isInteger(value)) {
            callback(new Error('请输入整数比例值'));
          }
          callback();
        }
      };
   		return {
        code: '',
        seen: false,
   			gridData: [],
        userListData: [],        
   			gridLoading: false,
        editGridLoading: false,
        editFormDigVisible: false,
        confirmLoading: false,
        editForm: {
          rate1:'',
          rate2: '',
          status: '',
          id:'',
          ruleName: '',
          cdition: ''
        },
        commonForm: {
          title: ''
        },
         editFormRule: {
          rate1: [{
            validator: checkInteger,required: true, trigger: 'blur'
          }],
          rate2: [{
            validator: checkInteger,required: true, trigger: 'blur'
          }]
        },
        canSubmit: false    //是否可以修改
   		}
    },
    methods: {
      bindGrid() {
        this.gridLoading = true;
        this.$http.post('manage/orderDistributeRuleList',{}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            this.gridLoading = false;
            if(body.data){
              this.gridData = body.data;
            }else {
              this.gridData = [];
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.gridLoading = false;
        });
      },
      //自催电催人员列表
      getOurCollectionRateList(status) {
         this.editGridLoading = true;
         this.$http.post('manage/getOurCollectionRateList',{status:status}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            this.editGridLoading = false;
            if(body.data){
              this.userListData = body.data;
            }else {
              this.userListData = [];
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      edit(row) {
        this.editFormDigVisible = true;
        this.commonForm.title = row.ruleName;
        this.code = row.code;
        //委外机构自建电催
        this.editForm.status = row.status;
        this.editForm.id = row.id;
        this.editForm.ruleName = row.ruleName;
        this.editForm.cdition = row.cdition;
        if(this.code == 1){
          this.editForm.rate1 = row.value.split('#')[0];
          this.editForm.rate2 = row.value.split('#')[1];
        }
        if(this.code == 2){      //自建电催
          this.getOurCollectionRateList(1);
        }
        if(this.code == 3){     //委外机构
          this.getOurCollectionRateList(0);
        }
      },
      editFormSubmit() {
        if(this.code == 1){
          this.$refs.editForm.validate((valid) => {
            if (valid) {
              let _data = Object.assign({}, this.editForm);
              _data.value = this.editForm.rate1 +'#'+ this.editForm.rate2;
              if((parseInt(this.editForm.rate1)+parseInt(this.editForm.rate2)) != 100){
                this.$message.error('数值有误');
                return;
              }
              this.confirmLoading = true;
              this.$http.post('manage/orderDistributeRuleEdit',_data).then(response => {
                this.confirmLoading = false;
                let {body} = response;
                if(body.code == 1){
                  this.editFormDigVisible = false;
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.bindGrid();
                }else{
                  this.$message.error(body.message);
                }
              },response => {
                this.$message.error('网络异常');
                this.confirmLoading = false;
                this.editFormDigVisible= false;
              });
            }
          });
        }
        if(this.code == 2 || this.code == 3){
          this.canSubmit  = true;
          let _data = {};
          _data.id = this.editForm.id;
          _data.status = this.editForm.status;
          _data.userRates = this.userListData;
          this.userListData.forEach(e => {
            if(!DataUtil.isInteger(e.rate)){
              this.$message.error('请输入整数比例值');
              this.canSubmit = false;
            }
          });
          if(!this.canSubmit){
            return;
          }
          this.confirmLoading = true;
          this.$http.post('manage/ourCollectionRateEdit',_data).then(response => {
            this.confirmLoading = false;
            let {body} = response;  
            if(body.code == 1){
              this.editFormDigVisible = false;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.bindGrid();
            }else{
              this.$message.error(body.message);
            }
          },response => {                
            this.$message.error("网络异常");
            this.editFormDigVisible= false;
            this.confirmLoading = false;});
        }
      }
    },
    mounted() {
      this.bindGrid();
    }
  }
</script>
<style scope></style>