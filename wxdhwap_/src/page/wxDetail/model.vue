<template>
	<div class="child-history">
		<el-table :data="reciveData" style="width: 100%">
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column v-if="!item.routerlink &&!item.link && !item.action && !item.moreaction" v-for="item in reciveColum" :property="item.property" :label="item.label">
			</el-table-column>
			<el-table-column v-else-if="item.link" :label="item.label">
				<template slot-scope="scope">
				    <a target="_blank" :href="scope.row.link">{{scope.row.title}}</a>
				</template>
			</el-table-column>
			<el-table-column v-else-if="item.routerlink" :label="item.label">
				<template slot-scope="scope">
				    <router-link :to="{path:'/supplierDetail', query:{id:scope.row.providerid}}">{{scope.row.providerName}}</router-link>
				</template>
			</el-table-column>
			<el-table-column v-else-if="item.action" :label="item.label">
				<template slot-scope="scope">
				    <el-button
						size="mini"
						>
						<router-link target="_blank" :to="{path:'/trackDetail', query:{articleId: scope.row.id, name: trackDetailInfo.name, wechatNo: trackDetailInfo.wechatNo}}">详情</router-link>
					</el-button>
				</template>
			</el-table-column>
			<el-table-column v-else :label="item.label">
				<template slot-scope="scope">
				    <el-button
						size="mini"
						>
						<router-link target="_blank" :to="{path:'/myIntoDetail', query:{wid: scope.row.id}}">详情
						</router-link>
					</el-button>
				    <el-button 
						size="mini"
						type="danger"
						@click.native.prevent="deleteInto(scope.$index, reciveData)"
						>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import {deleteDelivery} from '@/service/getData'
	export default{
		props: {
			reciveColum:{
				type: Array
			},
			reciveData:{
				type: Array
			},
			trackDetailInfo:{
				type: Object
			}
		},
		methods:{
			async deleteInto(index, rows){
				
				var result = await deleteDelivery({id:rows[index].id});
				if(result.resultData){
					this.$message({
						message: result.msg,
						type: 'success'
					});
					rows.splice(index, 1);
				}else{
					this.$message.error('删除失败');
				}
			}
		}
	}
</script>