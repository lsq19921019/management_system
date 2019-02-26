import {valMoveTel} from '@/config/mUtils'
import {updateUser, addUser, findUserById} from '@/service/getData'
export default{
	props:{
		type:{
			type: String,
			default: ''
		},
		id:{
			type:Object,
			default:{}
		},
		roleOptions:{
			type: Array,
			default: []
		}
	},
	data(){
		
		// 手机格式验证
		var validate = (rule, value, callback) => {
			{
				if(value == '') callback(new Error('不能为空'));
				valMoveTel(value, function(result){
					if(!result) callback(new Error('格式输入有误'));
					callback();
				});
			}
		}

		return{
			ruleForm:{
				loginname:'',
				password:'',
				roleId:'',
				username:''
			},
			rules:{
				loginname:[
					{ validator: validate, trigger: 'blur' }
				],
				username:[
					{ required: true, message: '用户名不能为空', trigger: 'blur' },
					{ min: 2,  message: '用户名不能小于2位', trigger: 'blur' }
				],
				password:[
					// { required: true, message: '密码不能为空', trigger: 'blur' },
					{ min: 6,  message: '密码长度不小于6位', trigger: 'blur' }
				]
			}
		}
	},
	mounted(){
		this.showAddOrUpdate();
	},
	methods:{
		async showAddOrUpdate(){
			if(this.type == 'update'){
				let result = await findUserById({userId:this.id.userId});
				this.ruleForm.userId = result.data.userId;
				this.ruleForm.roleId = result.data.roleId;
				this.ruleForm.loginname = result.data.loginname;
				this.ruleForm.username = result.data.username;
			}else{
				this.ruleForm.roleId = this.roleOptions[0].roleId;
			}
		},
		save(formName){
			var vm = this;
			this.$refs[formName].validate(async (valid) => {
				if(valid){
					var result;
					if(vm.type == 'update'){
						result = await updateUser(vm.ruleForm);
					}else{
						result = await addUser(vm.ruleForm);
					}
					if(result.success){
						vm.$message({
						    message: result.message,
						    type: 'success'
						});

						vm.$emit('closeWindow');
						vm.$refs['ruleForm'].resetFields();
					}else{
						vm.$message.error(result.message);
					}
					
				}else{
					vm.$message.error("请检查输入的信息");
					return false;
				}
			});
		}
	},
	watch:{
		id(){
			this.showAddOrUpdate();
		}
	}
}