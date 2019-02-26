    import {queryProviderCount,queryProviderinfo} from '@/service/getData';
    import grid from '../../../components/grid/index.vue';
    import baseDialog from './components/baseDialog.vue';
    export default {
		data() {
			return {
				pageSize:10,
				pageIndex:1,
				sortName:"id",
				sortOrder:"asc",	
                tableData:  [],
                baseInfo:'',
				total:0,
			}
		},
		components:{
            grid,
            baseDialog
		},
		mounted(){
            this.getData(this.pageModel({providerid:this.$route.query.id}));
			this.getBaseData({id:this.$route.query.id});
		},
		methods:{
			/**
			 * 
			 * @param {*表格头部点击排序} obj 
			 */
			reload(obj){
				obj.providerid = this.$route.query.id;
				this.getData(this.pageModel(obj))
			},
			
            /**
             * @param {*详情列表} data 
             */

		    async getData(data){
				let result = await queryProviderCount(data);
				if(result.success){
					this.tableData = result.data;
					this.total=result.data.total;
				}else{
					this.$message.error(result.message);
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
            /**
             * @param {*基础信息} data 
             */

            async getBaseData(data){
				let result = await queryProviderinfo(data);
				if(result.success){
					this.baseInfo = result.data;
				}else{
					this.$message.error(result.message);
				}
			},

            baseInfoDialog(id){
				
			},
			getMultiMarkID(){},
			pageModel({pageIndex,pageSize,providerid,wechatname}){
				var pageModel = {
                    pageIndex:pageIndex || 1,
                    pageSize:pageSize || 10,
                    providerid:providerid,
                    wechatname:wechatname||''
                }
                return pageModel;
			}
	  	}
    }