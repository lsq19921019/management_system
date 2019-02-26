<template>
	<div class='model-table-box'>
		<el-table :data="reciveData"  v-if="tag==1" class='model-table'>
			<el-table-column v-for="item in colum" :property="item.property" :label="item.label" :highlight-current-row='true'>
			</el-table-column>
		</el-table>
		<el-table :data="reciveData"  v-if="tag==2"  @row-click="rowClick" class='model-table' id='rowClickTable'>
			<el-table-column v-if="tag==2" v-for="item in colum" :label="item.label" :prop="item.property" class="rowclicktd">
			</el-table-column>
		</el-table>
		<el-pagination @size-change="sizeHandle" @current-change="currentHandle" :current-page.sync="initPageIndex"
			:page-sizes="[10,20,30, 50]" :page-size="initPageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>
<style>
.model-table-box{
	margin-bottom:25px;
}
 .el-table{
 	margin-bottom:25px;
 }
</style>
<script>
	export default{
		name:'model',
		props:['tag', 'reciveData', 'colum', 'pageIndex', 'pageSize', 'total'],
		data(){
			return{
				initPageIndex: this.pageIndex,
				initPageSize: this.pageSize	
			}
		},
		methods:{
			rowClick(row,e){
				let allTds = document.querySelectorAll("#rowClickTable td");
				if(allTds.length > 0){
					for(var i = 0; i<allTds.length;i++){
						allTds[i].style.background="#fff";
					}
				}
				let tds = e.target.parentNode.parentNode.children;
				if(tds.length > 0){
					for(var i = 0; i<tds.length;i++){
						tds[i].style.background="#409eff";
					}
				}
				
				this.$emit('rowClick',row);
			},
			sizeHandle(val){
				this.initPageSize = val;
				this.$emit('update:initPageSize', val);
				this.$emit('updateTable');
			},
			currentHandle(val){
				this.initPageIndex = val;
				this.$emit('update:initPage', val);
				this.$emit('updateTable');
			}
		}
	}
</script>