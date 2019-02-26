<template>
	<el-container>
		<!-- <el-header>我的投放</el-header> -->
		<el-main>
			<grid
			    :defaultData="tableData.list"
				:defaultTotal="total"
				style="width: 100%"
				@reload="reload"
                :pageIndex="pageIndex"
				:pageSize="pageSize"
				:sortName="sortName"
				:sortOrder="sortOrder"
				>
				<el-table-column
					prop="date"
					label="公众号"
					
					>
					<template slot-scope="scope">
						<router-link :to="{path:'wxDetail',query:{wechatId:scope.row.wechatid}}" class="wechatNameLink">
							<p>{{scope.row.wechatname}}</p>
							<p>{{scope.row.wechatid}}</p>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column
					prop="deliverystate"
					label="状态"
					sortable
					>
					<template slot-scope="scope">
						<p>{{scope.row.deliverystate | deliverystateFormat}}</p>
						<p>{{scope.row.deliverytime}}</p>
					</template>
				</el-table-column>
				<el-table-column
					prop="position"
					:formatter="positionFormat"  
					label="位置">
				</el-table-column>
				<el-table-column
					prop="price"
					sortable
					label="价格">
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<router-link :to="{path:'/myIntoDetail',query:{wid:scope.row.id}}" class="myIntoLink">
							详情
						</router-link>
						<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.row.id)"
							>删除</el-button>
					</template>
				</el-table-column>
				</grid>
		
		
		</el-main>
	</el-container>
</template>
 <script>
	import {myInto,myIntoDelete} from '@/service/getData';
	import grid from '../../../components/grid/index.vue';
    export default {
		data() {
			return {
				pageSize:10,
				pageIndex:1,
				sortName:"id",
				sortOrder:"asc",	
				tableData:  [],
				total:0,
			}
		},
		components:{
			grid
		},
		mounted(){
			this.getData(this.pageModel({}));
		},
		filters:{
			deliverystateFormat(val){
				 //	1 预备投放 2完成投放 3 正在投放 4投放失败
				if (val == '1') {  
					return "预备投放";  
				} else if (val == '2') {  
					return "完成投放";  
				} else if (val == '3') {  
					return "正在投放";  
				} else if (val == '4') {  
					return "投放失败";  
				}
			},
		},
		methods:{
			reload(obj){
				this.getData(this.pageModel(obj))
			},
			positionFormat(row, column){
				var position = row[column.property];  //1 头条 2 次条 3条 4条 5 条6条 7条 8 条
				if (position == '1') {  
					return "头条";  
				} else if (position == '2') {  
					return "次条";  
				}else if (position == '3') {  
					return "3条";  
				}else if (position == '4') {  
					return "4条";  
				}else if (position == '5') {  
					return "5条";  
				}else if (position == '6') {  
					return "6条";  
				}else if (position == '7') {  
					return "7条";  
				}else if (position == '8') {  
					return "8条";  
				}
				
			},
		    async getData(data){
				let result = await myInto(data);
				if(result.data == '-3'){//登陆态失效
					this.$message.error(result.message);
					setTimeout(function(){
						window.location.href = './login'
					},1000);  
				}
				else if(result.resultCode == '600001'){
					this.tableData = result.resultData;
					this.total=result.resultData.total;
				}else{
					this.$message.error(result.message);
				}
			},
			 handleDelete(id){
				this.$confirm('此操作将删除所选公众号, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let result = await myIntoDelete({id:id});
					if(result.data == '-3'){//登陆态失效
						this.$message.error(result.message);
						setTimeout(function(){
							window.location.href = './login'
						},1000);  
					}
					if(result.resultCode == '600001'){
						this.tableData = result.resultData;
						this.total = result.resultData.total;
						this.getData(this.pageModel({}))
					}else{
						this.$message.error(result.msg);
					}
				});
			},
			pageModel({pageIndex,pageSize,order,orderField}){
				var pageModel = {
                    pageIndex:pageIndex || 1,
                    pageSize:pageSize || 10,
					order:order || 'asc',
					orderField:orderField || 'deliverystate'
                }
                return pageModel;
			}
	  	}
    }
  </script>
  <style lang="scss" scoped>
  .wechatNameLink{
	color: #5a5e66;
  }
  .myIntoLink{
	display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
	color:#fff;
    background-color: #409EFF;
    border: 1px solid #409EFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 12px;
    border-radius: 3px;
	padding: 7px 15px;
  }
  </style>
  