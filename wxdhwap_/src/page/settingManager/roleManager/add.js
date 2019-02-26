import { valMoveTel } from '@/config/mUtils'
import { updateRole, addRole } from '@/service/getData'
export default {
    props: {
        type: {
            type: String,
            default: ''
        },
        id:{
			type:Object,
			default:{}
		},
    },
    data() {
        return {
            ruleForm: {
                roleName: '',
                roleId: ''
            },
            rules: {
                roleName: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.showAddOrUpdate();
    },
    methods: {
        async showAddOrUpdate() {
            if (this.type == 'update') {
                this.ruleForm.roleId = this.id.roleId;
                this.ruleForm.roleName = this.id.roleName;
            } else {
                this.ruleForm.roleName = this.id.roleName;
            }
        },
        save(formName) {
            var vm = this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    var result;
                    if (vm.type == 'update') {
                        result = await updateRole(vm.ruleForm);
                    } else {
                        result = await addRole(vm.ruleForm);
                    }
                    if (result.success) {
                        vm.$message({
                            message: result.message,
                            type: 'success'
                        });
                        vm.$emit('refreshList');//执行成功，调用父组件方法刷新页面数据
                        vm.$emit('closeWindow');
                        vm.$refs['ruleForm'].resetFields();
                    } else {
                        vm.$message.error(result.message);
                    }

                } else {
                    vm.$message.error("请检查输入的信息");
                    return false;
                }
            });
        }
    },
    watch: {
        id() {
            this.showAddOrUpdate();
        }
    }
}