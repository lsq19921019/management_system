import {resetPwd, currentUserInfo} from '@/service/getData';

export default{
	data(){
		var validatePass = (rule, value, callback) => {
			if (this.ruleForm.checkPass !== '') {
				this.$refs.ruleForm.validateField('checkPass');
			}
			callback();
		};
		var validatePass2 = (rule, value, callback) => {
			if (value !== this.ruleForm.newPwdword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return{
			loginname:'',
			roleName:'',
			username:'',
			visibleDialog: false,
			ruleForm:{
				oldPassword:'',
				newPwdword:'',
				checkPass:''
			},
			checkPass: '',
			rules:{
				oldPassword:[
					{ required: true, message: '原密码不能为空'},
					{ min: 6,  message: '长度不少于6位', trigger: 'blur' }
				],
				newPwdword:[
					{ required: true, message: '新密码不能为空'},
					{ min: 6,  message: '长度不少于6位', trigger: 'blur' },
					{ validator: validatePass, trigger: 'blur' }
				],
				checkPass:[
					{ required: true, message: '确认密码不能为空'},
					{ min: 6,  message: '长度不少于6位', trigger: 'blur' },
					{ validator: validatePass2, trigger: 'blur' }
				]
			}
		}
	},
	mounted(){
		this.init();
	},
	methods:{
		async init(){
			
			let result = await currentUserInfo();
			this.loginname = result.data.loginname;
			this.roleName = result.data.roleName;
			this.username = result.data.username;
			if(!result.success){
				this.$message.error(result.message);
			}
		},
		showUpdateDialog(){
			this.visibleDialog = true;
		},
		async updateHandle(){
			let params = {
				oldPassword: this.ruleForm.oldPassword,
				newPwdword: this.ruleForm.newPwdword
			}
			let result = await resetPwd(params);
			if(result.success == true){
			    this.$message({
			          message: result.message,
			          type: 'success'
			    });
			    this.visibleDialog = false;
			}else{
			    this.$message.error(result.message);
			}
		}
	}
}