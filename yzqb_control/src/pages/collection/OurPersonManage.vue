<template>
	<section>
	  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" border>
      <el-table-column label="岗位" prop="postName"></el-table-column>
      <el-table-column label="人员" prop="name">
      	<template scope="scope">
    		  <el-tag v-for="item in (scope.row.staff)" :key="item.code" type="primary" style="margin-right:2px;">{{ item.name}}</el-tag>
      	</template>
      </el-table-column>
      <el-table-column label="操作">
      	<template scope="scope">
      		<el-button size="small" type="success" @click="edit(scope.row)">编 辑</el-button>
      	</template>
      </el-table-column>
    </el-table>

    <el-dialog :title="commonForm.title" v-model="editFormDigVisible" :close-on-click-modal="false">
   		<el-form :model="editForm" ref="editForm" :rules="editFormRules">
 			  <el-form-item prop="code">
          <el-checkbox-group v-model="editForm.code">
            <el-checkbox v-for="item in personList" :key="item.code" :label="item.code">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
   		</el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">确 定</el-button>
      </div>
  	</el-dialog>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				gridData: [],
				personList: [],
				gridLoading: false,
				editFormDigVisible: false,
				confirmLoading: false,
				commonForm: {
					title: '',
				},
				editForm: {
					code: []
				},
				postId: '',
				staff: [],
				editFormRules: { 
					code: [{
            type: 'array',
            required: true,
            message: '请至少选择一个人员',
            trigger: 'change'
					}]
				}
			}
		},
		methods: {
			getOurCollectionPerson() {
				this.$http.post('manage/getOurCollectionRateList',{status: '1'}).then(response => {
					let {body} = response;
					if(body.code == 1){
						this.personList = body.data;
					}else{
						this.personList = [];
					}
				},response =>{});
			},
			edit(row) {
				this.editForm.code = [];
				this.editFormDigVisible = true;
				this.commonForm.title = '编辑人员（'+row.postName+'）';
				row.staff.forEach(e =>{
					this.editForm.code.push(e.code);
				});
				this.postId = row.postId;
			},
			bindGrid() {
				this.gridLoading = true;
				this.$http.post('manage/collectionPostStaffList',{}).then(response => {
					this.gridLoading = false;
					let {body} = response;
					if(body.code ==1){
						this.gridData = body.data;
					}else{
						this.$message.error(body.message);
					}
				},response =>{this.gridLoading = false});
			},
			editFormSubmit() {
				this.$refs.editForm.validate((valid) => {
          if (valid) {
  					this.staff = [];
          	this.editForm.code.forEach(e => {
          		for(let i=0;i<this.personList.length;i++){
          			if(e == this.personList[i].code){
          				this.staff.push(this.personList[i]);
          			}
          		}
          	});
      			let _data = {
							postId: this.postId,
							staff: this.staff
						};
						this.confirmLoading = true;
						this.$http.post('manage/collectionPostStaffEdit',_data).then(response => {
							this.confirmLoading = false;
							let {body} = response;
							if(body.code == 1){
								this.editFormDigVisible = false;
								this.bindGrid();
							 	this.$message({message: '修改成功',type: 'success'});
							}else{
								this.$message.error(body.message);
							}
						},response =>{
							this.confirmLoading = false;
						});
          } else {}
        });
			},
		},
		mounted() {
			this.bindGrid();
			this.getOurCollectionPerson();
		}
	}
</script>
<style></style>