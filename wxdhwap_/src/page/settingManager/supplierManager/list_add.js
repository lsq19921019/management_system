import { queryProviderCount,
        deleteWechatProviderResource,
        editWechatProviderResource } from '@/service/getData';
import grid from '../../../components/grid/index.vue';
import addDialog from './components/addDialogforListAdd.vue';
import editDialog from './components/editDialog.vue';
export default {
    data() {
        return {
            pageSize: 10,
            pageIndex: 1,
            sortName: "id",
            sortOrder: "asc",
            tableData: [],
            providerName: '',
            wechatname: '',
            providerid: '',
            total: 0,
        }
    },
    components: {
        grid,
        addDialog,
        editDialog
    },
    mounted() {
        this.providerid = this.$route.query.providerid;
        this.providerName = this.$route.query.providername;
        this.getData(this.pageModel({}));
    },
    methods: {
        /**
         * 
         * @param {*表格头部点击排序} obj 
         */
        reload(obj) {
            obj.id = this.$route.query.id;
            this.getData(this.pageModel(obj))
        },

        /**
         * @param {*详情列表} data 
         */

        async getData(data) {
            let result = await queryProviderCount(data);
            if (result.success) {
                this.tableData = result.data;
                this.total = result.data.total;
            } else {
                this.$message.success(result.message);
            }
        },
        firstpriceFormat(row, column){
            if(row.firstprice=='0')
            {
                return '不接'
            }
            else{
                return row.firstprice;
            }
        },
        searchProvider() {
            this.getData(this.pageModel({ wechatname: this.wechatname }))
        },
        /**
         * 删除
         */
        async handleDelete(id) {
            this.$confirm('此操作将删除所选公众号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await deleteWechatProviderResource({id:id})
                if (result.success) {
                    this.$message.success(result.message);
                    this.getData(this.pageModel({}));
                }else{
                    this.$message.error(result.message);
                }
            });
        },

        /**
         * 
         * @param {*编辑} data 
         */
        async getUpdateData(data){
            let result = await editWechatProviderResource(data);
                if (result.success) {
                    this.$message.success(result.message);
                    this.getData(this.pageModel({}));
                }else{
                    this.$message.error(result.message);
                } 
        },
        
        pageModel({ pageIndex, pageSize, providerid, wechatname }) {
            var pageModel = {
                pageIndex: pageIndex || 1,
                pageSize: pageSize || 10,
                providerid: this.providerid,
                wechatname: wechatname || ''
            }
            return pageModel;
        }
    }
}