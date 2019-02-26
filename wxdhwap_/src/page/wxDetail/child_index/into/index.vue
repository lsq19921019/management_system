<template>
	<div class="into-page">
		<el-row class="marBottom20">
			<el-col :span="12" style="text-align: left">投放记录</el-col>
			<el-col :span="12" style="text-align: right"><span @click="intoVisible = true">更多</span></el-col>
		</el-row>
		<div class="table conShadow marBottom20">
			<model :reciveData="filterData" :reciveColum="reciveColum">
			</model>	
		</div>
		<el-dialog width="80%" title="历史追踪" :visible.sync="intoVisible">
			<model :reciveData="reciveData" :reciveColum="reciveColum">
			</model>
			<el-pagination @size-change="changeSize" @current-change="changeCurrent" :current-page.sync="table.pageIndex"
	            :page-sizes="[10,20,30, 50]" :page-size="table.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	        </el-pagination>
		</el-dialog>
	</div>
</template>
<script>
	import into from './index.js'
	export default into;
</script>
<style lang="scss" scoped>
	@import "../../common.scss";
</style>