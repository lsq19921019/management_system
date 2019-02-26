import {queryWechatProvider,addWechatProvider,deleteWechatProvider} from '@/service/getData';
import grid from '../../../components/grid/index.vue';
import addDialog from './components/addDialog.vue';
export default {
	data() {
        return {
            tableData:  [],
            total: 0,
            pageSize:10,
            pageIndex:1,
            providername:'',
        }
    },
    components:{
        grid,
        addDialog
    },
    methods:{
        reload(obj){
            this.getData(this.pageModel(obj))
        },
        /**
         * 
         * @param {*获取数据} data 
         */
        async getData(data){
            let result = await queryWechatProvider(data);
            if(result.success){
                this.tableData = result.data;
                this.total=result.data.total;
            }else{
                this.$message.error(result.message);
            }
        },
        async getProvidername(data){
            let result = await addWechatProvider({providername:data.providername});
            if(result.success){
                this.$message.success(result.message);
                this.getData(this.pageModel({}));
            }else{
                this.$message.error(result.message);
            }
        },
        searchProvider(){
            this.getData(this.pageModel({providername:this.providername}))
        },
        /**
         * 删除
         */
        async handleDelete(id) {
            this.$confirm('此操作将删除所选供应商, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await deleteWechatProvider({id:id})
                if (result.success) {
                    this.$message.success(result.message);
                    this.getData(this.pageModel({}));
                } else{
                    this.$message.error(result.message);
                }
            });
        },
        pageModel({pageIndex,pageSize,providername}){
            var pageModel = {
                pageIndex:pageIndex || 1,
                pageSize:pageSize || 10,
                providername:providername||''
            }
            return pageModel;
        }
    },
    mounted(){
        this.getData(this.pageModel({}));
    }
}