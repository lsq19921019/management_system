<style lang="scss" scoped>
	@import "../common.scss";
	.history{
		padding: 15px;
		&-circle{
			width: 80px;
			height: 80px;
			text-align: center;
			line-height: 80px;
			border: 1px solid #666;
			border-radius: 40px;
		}
	}
</style>
<template>
	<div class="child-history">
		<el-row class="hisTitle marBottom20" align="middle" type="flex" :gutter="20">
			<el-col :span="2">历史发文</el-col>
			<el-col :span="6">收集日期：{{MsgHistory.collectTime}}</el-col>
			<el-col :span="3"><el-button @click="sCollect">开始收集</el-button></el-col>
			<el-col :span="3" :offset="10" style="text-align: right">
				<div class="grid-content" @click="tableModel.history.dialogVisible = true">查看文章详情</div>
			</el-col>
		</el-row>
		<div class="history conShadow marBottom20">
			<el-row type="flex">
				<el-col>
					发布次数
					<div class="history-circle">{{MsgHistory.publishCount}}</div>
				</el-col>
				<el-col>
					发布篇数
					<div class="history-circle">{{MsgHistory.publishArticle}}</div>
				</el-col>
				<el-col>
					最高阅读数
					<div class="history-circle">{{MsgHistory.topReadnum}}</div>
				</el-col>
				<el-col>
					<el-table
					:data="tableData"
					style="width: 100%">
						<el-table-column
						prop="label"
						label="#"
						width="180">
						</el-table-column>
						<el-table-column
						prop="readnum"
						label="阅读数"
						width="180">
						</el-table-column>
						<el-table-column
						prop="likenum"
						label="点赞数"
						width="180">
						</el-table-column>
						<el-table-column
						prop="topreadnum"
						label="头条阅读数">
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
			<el-row>
				<el-tabs type="border-card">
					<el-tab-pane label="总阅读">
						<r-chart id="bar1" :options="options1" width="1100px" height="500px"></r-chart>
					</el-tab-pane>
					<el-tab-pane label="发布数">
						<r-chart id="bar2" :options="options2" width="1100px" height="500px"></r-chart>
					</el-tab-pane>
					<el-tab-pane label="头条阅读">
						<r-chart id="bar3" :options="options3" width="1100px" height="500px"></r-chart>
					</el-tab-pane>
				</el-tabs>
			</el-row>
		</div>
		<el-dialog width="80%" title="历史发文" :visible.sync="tableModel.history.dialogVisible">
			<model :reciveData ="tableModel.history.reciveData" :reciveColum="tableModel.history.reciveColum"></model>
			<div>
				<el-pagination @size-change="hisSize" @current-change="hisCurrent" :current-page.sync="tableModel.history.query.pageIndex"
		            :page-sizes="[10,20,30, 50]" :page-size="tableModel.history.query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableModel.history.total">
		        </el-pagination>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {pubLocation} from '@/config/mUtils';
	const tableModel = {
		history: {
			dialogVisible: false,
			reciveData: null,
			reciveColum: [
				{property: "title", label: "文章标题" , link: true},
				{property: "publishDate", label: "时间"},
				{property: "order", label: "文章位置"},
				{property: "author", label: "作者"},
				{property: "readNum", label: "阅读量"},
				{property: "likeNum", label: "点赞数"},
				{property: "originalFunc", label: "是否有原文阅读"},
				{property: "messageFunc", label: "是否有留言功能"},
				{property: "messageNum", label: "留言数"},
				{property: "id", label: "id"},		
			],
			query: {
				pageIndex: 1,
				pageSize: 10,
			},
			total:0
		}
	}
	import {getMsgHistory, hisarticleQuery, startCollect} from '@/service/getData';
	import model from '../model';
	export default{
		props:['auth'],
		data(){
			return{
				options1:{},
				options2:{},
				options3:{},
				MsgHistory: '',
				tableData: [],
				tableModel: Object.assign({}, tableModel),
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			async init(){
				let wechatId = this.$route.query.wechatId || '';
				this.initHistory(wechatId);
				this.initHisarticleQuery(wechatId);
			},
			async initHistory(wechatId){
				let getHistory = await getMsgHistory({wechatId: wechatId});
				this.MsgHistory = getHistory.data;
				this.initBarGraph();
				this.initTable();
			},
			async initHisarticleQuery(wechatId){
				this.tableModel.history.query.wechatId = wechatId;
				let getHisData = await hisarticleQuery(this.tableModel.history.query);
				this.tableModel.history.reciveData = getHisData.data.list;
				pubLocation(this.tableModel.history.reciveData, 'order');
				this.tableModel.history.total = getHisData.data.total;
			},
			initTable(){
				let msg1 = {
					label: '总计',
					readnum: this.MsgHistory.totalReadnum,
					likenum: this.MsgHistory.totalLikenum,
					topreadnum:	this.MsgHistory.totalTopReadnum
				}

				let msg2 = {
					label: '平均',
					readnum: this.MsgHistory.averageReadnum,
					likenum: this.MsgHistory.averageLikenum,
					topreadnum:	this.MsgHistory.averageTopReadnum 
				}

				this.tableData.push(msg1);
				this.tableData.push(msg2);
			},
			initBarGraph(){
				// 柱状图
				this.options1 = this.changeHisData(this.MsgHistory.allData[0].data, '总阅读');
				this.options2 = this.changeHisData(this.MsgHistory.allData[1].data, '发布数');
				this.options3 = this.changeHisData(this.MsgHistory.allData[2].data, '头条阅读');
			},
			hisSize(val){
				this.tableModel.history.query.pageSize = val;
				this.initHisarticleQuery(this.getWechatId());
			},
			hisCurrent(val){
				this.tableModel.history.query.pageIndex = val;
				this.initHisarticleQuery(this.getWechatId());
			},
			async sCollect(){
				if(!this.auth.state){
					this.$message({
					    message: this.auth.msg,
					    type: 'error'
					});
					return;
				}
				let result = await startCollect({wechatIds: this.getWechatId()});
				if(result.success == true){
					this.$message({
				        message: result.message,
				        type: 'success'
					});
				}else{
					this.$message.error(result.message);
				}
			},
			getWechatId(){
				return this.$route.query.wechatId || '';
			},
			changeHisData(data, title){
				let arr1 = [], arr2 = [];
				for(let i = 0; i < data.length; i++){
					arr1.push(data[i].date);
					arr2.push(data[i].num)
				}

				return {
				    color: ['#3398DB'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : arr1,
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name: title,
				            type:'bar',
				            barWidth: '60%',
				            data: arr2
				        }
				    ]
				};
			}
		},
		components:{
			model
		}
	}
</script>