<template>
	<div class="taskData-page">
		<el-row>
			<el-col :span="24">
				<model :tag='tag' :reciveData='reciveData' :colum='colum' :pageIndex.sync='pageIndex' :pageSize.sync='pageSize' :total='total' @updateTable="init"></model>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="8">
				<el-button @click="initDone" class=''>全部</el-button>
				<el-date-picker
					v-model="value"
					type="daterange"
					align="right"
					unlink-panels
					range-separator="至"
					value-format="timestamp"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:picker-options="pickerOptions"
					@blur="moreDone">
				</el-date-picker>
			</el-col>	
		</el-row>
		<el-row>
			<el-col :span="24">
				<model :tag='tag2' :reciveData='reciveData2' :colum='colum2' :pageIndex.sync='pageIndex2' :pageSize.sync='pageSize2' :total='total2' @updateTable="done" @rowClick='rowClick'></model>
			</el-col>	
		</el-row>
		<el-row>
			<r-chart style="display: none;" id="bar1" :options="options" width="1100px" height="500px"></r-chart>
		</el-row>
		
	</div>
</template>
<script>
	import taskData from './index.js';
	export default taskData;
</script>
<style scoped>
	.taskData-page{
		padding:25px;
	}
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>