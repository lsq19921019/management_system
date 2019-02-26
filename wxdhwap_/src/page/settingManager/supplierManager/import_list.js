import { baseUrl } from '@/config/env';
import {
    queryProviderCount,
    deleteWechatProviderResource,
    editImportProviderResource,
    addWechatProviderResource,
    saveWechatProviderResource,
    cleanWechatProviderResource,
    // providerResourceInfo,
    queryImportProviderResource,
} from '@/service/getData';
import grid from '../../../components/grid/index.vue';
import addDialog from './components/addDialogforListAdd.vue';
import uploadDialog from './components/fileUpload.vue';
export default {
    data() {
        return {
            pageSize: 10,
            pageIndex: 1,
            sortName: "id",
            sortOrder: "asc",
            tableData: [],
            wechatname: '',
            serialno: '',
            providerid: '',
            id: "",
            providername: '',
            total: 0,
            importUrl: baseUrl + '/wechatProviderResource/import',//上传链接
        }
    },
    components: {
        grid,
        addDialog,
        uploadDialog
    },
    mounted() {
        this.providerid = this.$route.query.providerid;
        this.providername = this.$route.query.providername;
    },
    methods: {
        /**
         * 
         * @param {*表格头部点击排序} obj 
         */
        reload(obj) {
            this.getData(this.pageModel(obj))
        },
        existFormat(row, column) {
            if (row.exist == '1') {
                return "入库"
            } else if (row.exist == '2') {
                return "未入库"
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
        secondpriceFormat(row, column){
            if(row.secondprice=='0')
            {
                return '不接'
            }
            else{
                return row.secondprice;
            }
        },
        otherFormat(row, column){
            if(row.other=='0')
            {
                return '不接'
            }
            else{
                return row.other;
            }
        },
        /**
         * 查询数据
         */ 
        async getData(data) {
            let result = await queryImportProviderResource(data);
            if (result.success) {
                this.tableData = result.data
            } else {
                this.$message.error(result.message);
            }
        },
        /**
         * 
         * @param {*新增} data 
         */
        async getAddData(data) {
            delete data.id;
            delete data.providername;
            let result = await addWechatProviderResource(data);
            if (result.success) {
                this.$message.success(result.message);
                this.tableData = result.data.resultList;
                this.serialno = result.data.serialno;
            } else {
                this.$message.error(result.message);
            }
        },
        /**
         * 
         * @param {*编辑} data 
         */
        async getUpdateData(data) {
            delete data.providername;
            data.serialno = this.serialno;
            let result = await editImportProviderResource(data)
            if (result.success) {
                this.$message.success(result.message);
                this.getData({ serialno: this.serialno })
            } else {
                this.$message.error(result.message);
            }
        },
        /**
         * 保存资源
         */
        async save() {
            let result = await saveWechatProviderResource({ serialno: this.serialno })
            if (result.success) {
                this.$message.success('成功：' + result.data.success + '条,失败：' + result.data.fail + '条。');
                this.getData({ serialno: this.serialno })
            } else {
                this.$message.error(result.message);
            }
        },
        /**
         * 删除/清空
         */ 
        async clean(index, rows) {
            index = index;
            if (index == '-1') {
                this.$confirm('此操作将删除全部公众号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let result = await cleanWechatProviderResource({ index: '-1', serialno: this.serialno })
                    if (result.success) {
                        this.$message.success(result.message);
                        this.tableData = ''
                    } else {
                        this.$message.error(result.message);
                    }
                });
            } else {
                this.$confirm('此操作将删除所选公众号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let result = await cleanWechatProviderResource({ index: index, serialno: this.serialno })
                    if (result.success) {
                        this.$message.success(result.message);
                        rows.splice(index, 1);
                    } else {
                        this.$message.error(result.message);
                    }
                });
            }
        },
        /**
         * 批量上传
         */ 
        getUploadData(data) {
            this.tableData = data.resultList;
            this.serialno = data.serialno;
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