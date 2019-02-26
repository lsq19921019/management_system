    import {providerCount,findUserList} from '@/service/getData';
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
                userList:[],
                userId:'',//跟进人id
                providername:'',//代理商名字
				total:0,
			}
		},
		components:{
            grid,
            baseDialog
		},
		mounted(){
            this.getData(this.pageModel({}));
            this.getUser();
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
				let result = await providerCount(data);
				if(result.success){
					this.tableData = result.data;
					this.total=result.data.total;
				}else{
					this.$message.error(result.message);
				}
            },
            /**
             * 获取跟进人列表
             */
            async getUser(data){
				let result = await findUserList();
				if(result.success){
					this.userList = result.data.list;
				}else{
					this.$message.error(result.message);
				}
            },
             
            /**
             * 
             * @param {*修改跟进人获取数据} selection 
             */
            changeUser(selection){
                this.getData(this.pageModel({belongerid:this.userId,providername:this.providername}));
            },
            searchProvider(){
				this.getData(this.pageModel({providername:this.providername,belongerid:this.userId}));
            },
            baseInfoDialog(id){
				
			},
			pageModel({pageIndex,pageSize,belongerid,providername}){
				var pageModel = {
                    pageIndex:pageIndex || 1,
                    pageSize:pageSize || 10,
                    order:'asc',
                    belongerid:belongerid||'',
                    providername:providername||''
                }
                return pageModel;
			}
	  	}
    }