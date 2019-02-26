import { providerCount, findUserList, queryProviderinfo, editWechatProvider,obscureUserList } from '@/service/getData';
export default {
    data() {
        return {
            labelPosition: 'left',
            labelWidth: '120px',
            editData: {
                id: '',
                providername: '',
                belongerid: '',
                sourcename: '',
                companyaddress: '',
                dockingpeople: '',
                position: '',
                wechatno: '',
                qqno: '',
                telphone: '',
                remarks: ''
            },
            belongerName: '',
            rules: {
                providername: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                belongerid: [
                    { type: 'number', required: true, message: '请输入跟进入姓名', trigger: 'change' }
                ],
                sourcename: [
                    { required: true, message: '请输入发掘源', trigger: 'blur' }
                ],
                companyaddress: [
                    { required: true, message: '请输入公司地址', trigger: 'blur' }
                ],
                dockingpeople: [
                    { required: true, message: '请输入对接人', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' }
                ],
                wechatno: [
                    { required: true, message: '请输入微信号', trigger: 'blur' }
                ],
                qqno: [
                    { required: true, message: '请输入QQ号', trigger: 'blur' }
                ],
                telphone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                remarks: [
                    { required: true, message: '请输入备注', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        /**
         * 
         * @param {*获取数据} data 
         */
        async getData(data) {
            let result = await queryProviderinfo(data);
            if (result.success) {
                this.editData = result.data;
                this.editData.belongerid = '';
            } else {
                this.$message.error(result.message);
            }
        },
        /**
         * 获取跟进人列表
         */
        async getUser(data) {
            let result = await obscureUserList(data);
            if (result.success) {
                let array = [];
                for (let i = 0; i < result.data.length; i++) {
                    array.push({ id: result.data[i].userId, value: result.data[i].username });
                }
                this.userList = array;
                return this.userList
            } else {
                this.$message.error(result.message);
            }
        },
        async querySearchAsync(queryString, cb) {
            let userList=[];
            if(this.userList.length){
                userList = this.userList;
            }else{
                userList = [{
                    value:"暂无数据",
                    id:"0"
                }]
            }
            // let results = queryString ? userList.filter(this.createStateFilter(queryString)) : userList;
            let results;
            if(queryString){
                results = await this.getUser({username:queryString});
            }else{
                results = await this.getUser();
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                console.log(results);
                cb(results);
            }, 100 * Math.random());
        },
        handleSelect(item) {
            this.editData.belongerid = item.id;
        },
        async submitForm(formName) {
            //移除提交多余属性
            delete this.editData.pageIndex;
            delete this.editData.pageSize;
            delete this.editData.status;
            delete this.editData.createtime;
            delete this.editData.updatetime;

            let vm = this;
            if (!vm.belongerName) {
                vm.editData.belongerid = '';
            }
            vm.$refs[formName].validate(async valid => {
                if (valid) {
                    let result = await editWechatProvider(vm.editData);
                    console.log(result);
                    if (result.success) {
                        vm.$message({
                            message: result.message,
                            type: "success"
                        });
                        setTimeout(function () {
                            vm.$router.push({path:'/supplierManager'})
                        }, 2000);
                    } else {
                        vm.$message({
                            message: result.msg,
                            type: "error"
                        });
                    }
                } else {
                    return false;
                }
            });
        }
    },
    mounted() {
        this.getData({ id: this.$route.query.id });
        this.getUser();
    }
}