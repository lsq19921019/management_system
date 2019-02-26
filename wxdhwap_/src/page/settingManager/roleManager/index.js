import { findRoleList, deleteRole } from '@/service/getData';
import addModel from './add.vue';
export default {
    data() {
        return {
            valueRole: '',
            tableData: [],
            total: 0,
            dialogVisible: false,
            updateDialogVisible: false,
            update: {
                // userId: 0,
                // olduserId: 0
            },
            visible2: false
        }
    },
    methods: {
        /**
         * 初始化数据  
         */
        async init() {
            {
                let result = await findRoleList();
                this.tableData = result.data;
            }
        },
        /**
         *编辑 
         */
        async editClick(val) {
            this.updateDialogVisible = true;
            this.update = Object.assign({}, this.update, { roleName: val.roleName, roleId: val.roleId });
        },
        /**
         * 删除角色
         */
        deleteRow(index, rows) {
            this.$confirm('确认删除？').then(async _ => {
                let result = await deleteRole({ roleId: rows[index].roleId });
                if (result.success == true) {
                    this.$message({
                        message: result.message,
                        type: 'success'
                    });
                    rows.splice(index, 1);
                } else {
                    this.$message.error(result.message);
                }
            }).catch(_ => { });
        }
    },
    
    mounted() {
        this.init();
    },
    components: {
        addModel
    }
}