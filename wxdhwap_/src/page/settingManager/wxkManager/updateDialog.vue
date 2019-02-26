<template>
    <span class="updataDialog">
        <el-button type="primary" size="mini" plain @click="handleAdd()" class="menu-btn">{{btnText}}</el-button>
        <el-dialog :visible.sync="dialogFormVisible" :title="dialogTitle" id="multidialog" width="550px">
			<el-form class="small-space" 
					 ref="temps"
					 :model="temp" 
					 :rules="rules"
					 status-icon
					 label-position="right" 
					 label-width="100px" 
					 style='width: 400px; margin-left:50px;'
					 >
				<el-form-item label="名称" prop="name">
					<el-input v-model="temp.name" size="small" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="公众号ID" prop="no">
					<el-input v-model="temp.no" size="small" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="hideDialog">取 消</el-button>
				<el-button type="primary" @click="create">确 定</el-button>
			</div>
    	</el-dialog>
    </span>
</template>
<script>
import $ from 'jquery'
export default {
	props:['btnText','dialogTitle','wechatID'],
	data() {
		var checkName1 = (rule, value, callback) => {
			let reg = /^[~#^$@%&!*()<>:;'"{}【】  ]*$/; 
			if (reg.test(value)) {  
				return callback(new Error('公众号名称错误'));
			}else{
				callback();
			}
		};
		var checkName2 = (rule, value, callback) => {
			let strLen = this.getStringLenth(value);
			if( strLen < 4 || strLen > 30){
				return callback(new Error('公众号名称错误'));
			}else{
				callback();
			}
		};
		var checkID1 = (rule, value, callback) => {
			let reg = /^[~#^$@%&!*()<>:;'"{}【】  ]*$/;
			if (reg.test(value)) {  
				return callback(new Error('公众号ID错误'));
			}else{
				callback();
			}
		};
		var checkID2 = (rule, value, callback) => {
			// let reg = /^[A-Za-z][A-Za-z0-9_-]*$/;
			let reg = /^[a-zA-Z]{1}([a-zA-Z]|[0-9]|[-_]){4,19}$/
			 if(!reg.test(value)){
				return callback(new Error('公众号ID名称错误'));
			}else{
				callback();
			}
		};
		return {
			temp: {
				name: '',
				no:'',
				id:'',
				type:'',
			},
			rules: {
				name: [
					{ required: true, message:'请输入公众号名称', trigger: 'blur'},
					{ validator: checkName1, trigger: 'blur' },
					{ validator: checkName2, trigger: 'blur' }
				],
				no: [
					{ required: true, message:'请输入公众号ID', trigger: 'blur'},
					{ min: 5,max:20, message:'公众号ID名称错误', trigger: 'blur'},
					{ validator: checkID2, trigger: 'blur' },
					{ validator: checkID1, trigger: 'blur' },
				]
			},
			
			dialogFormVisible: false,
		};
	},
	mounted(){		
	},
	methods: {
		create() {
			this.$refs['temps'].validate((valid) => {
			if (valid) {
				this.$emit('updateData',this.temp);
				this.dialogFormVisible = false;
			} else {
				return false;
			}
			});
		},
		resetTemp() {
			this.temp = {
				name: '',
				no:'',
				id:'',
				type:'',
			}
			
		},
		getStringLenth(str){
			if (str == null) 
				return 0;  
			if (typeof str != "string"){  
				str += "";  
			}  
			return str.replace(/[^\x00-\xff]/g,"01").length;  
		},
		hideDialog(){
			this.dialogFormVisible = false;
			this.$refs['temps'].resetFields();
		},
		handleAdd() {
			this.dialogFormVisible = true;
			this.resetTemp();
			this.temp.type = this.dialogTitle;
			this.temp.id = this.wechatID;
			this.$refs['temps'].resetFields();
		},
	}
  };
</script>
<style lang="scss" scoped>
</style>