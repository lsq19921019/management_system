<style lang="scss" scoped>
	@import './common.scss';
	.trackdetail-page{
		padding: 20px;
	}
	.bg-purple{
		margin-bottom: 20px;
	}
</style>
<template>
	<div class="trackdetail-page width1200">
		<div class="conShadow padding20 marBottom20">
			<el-row>
				<el-col :span="8"><div class="grid-content bg-purple">{{name}}</div></el-col>
				<el-col :span="8"><div class="grid-content bg-purple">微信号：{{wechatNo}}</div></el-col>
				<el-col :span="8"><a :href="traData.url" target="_blank">{{traData.title}}</a></el-col>
			</el-row>
			<el-row>
				<el-col :span="8"><div class="grid-content bg-purple">任务提交时间：{{traData.taskSubmitTime}}</div></el-col>
				<el-col :span="8"><div class="grid-content bg-purple">阅读数：{{traData.readNum}}</div></el-col>
				<el-col :span="8"><div class="grid-content bg-purple">点赞数：{{traData.likeNum}}</div></el-col>
			</el-row>
			<el-row>
				<el-col :span="8"><div class="grid-content bg-purple">最后一次更新时间：{{traData.lastUpdateTime}}</div></el-col>
				<el-col :span="8"><div class="grid-content bg-purple">文章发布时间：{{traData.publishDate}}</div></el-col>
				<el-col :span="8"><div class="grid-content bg-purple">文章首次检测时间：{{traData.firstTrackTime}}</div></el-col>
			</el-row>
			<el-row>
				<el-col :span="8"><div class="grid-content bg-purple">文章发布位置：{{traData.pubLocation | pubLocation}}</div></el-col>
				<el-col :span="8"><div class="grid-content bg-purple">文末含阅读原文：{{traData.sourceFlag}}</div></el-col>
			</el-row>
		</div>
		<el-row>
			<el-tabs type="border-card">
				<el-tab-pane label="累计视图">
					<r-chart id="bar1" :options="options1" width="1100px" height="500px"></r-chart>
				</el-tab-pane>
				<el-tab-pane label="增量视图">
					<r-chart id="bar2" :options="options2" width="1100px" height="500px"></r-chart>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>
<script>
	import {trackDetail} from '@/service/getData';
	export default{
		data(){
			return{
				traData: {},
				options1: {},
				options2: {},
				name: null,
				wechatNo: null
			}
		},
		async mounted(){
			this.name = this.$route.query.name || '';
			this.wechatNo = this.$route.query.wechatNo || '';

			let articleId = this.$route.query.articleId;
			
			let trackData = await trackDetail({articleId: articleId});	
			
			this.traData = trackData.data;
			
			this.options1 = this.getOptionsData(this.traData.list, 'source');
			
			this.options2 = this.getOptionsData(this.traData.list, 'real');

		},
		methods:{
			changeHisData(data){
				Array.prototype.max = function(){ 
					return Math.max.apply({},this) 
				} 
				let max = data[1].max();
				return {
				    title : {
				        text: '数量与时间关系图',
				        x: 'center',
				        align: 'right'
				    },
				    grid: {
				        bottom: 80
				    },
				    toolbox: {
				        feature: {
				            dataZoom: {
				                yAxisIndex: 'none'
				            },
				            restore: {},
				            saveAsImage: {}
				        }
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            animation: false,
				            label: {
				                backgroundColor: '#505765'
				            }
				        }
				    },
				    dataZoom: [
				        {
				            show: true,
				            realtime: true,
				            start: 0,
				            end: 25
				        },
				        {
				            type: 'inside',
				            realtime: true,
				            start: 0,
				            end: 25
				        }
				    ],
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            axisLine: {onZero: false},
				            data : data[0].map(function (str) {
				                return str.replace(' ', '\n')
				            })
				        }
				    ],
				    yAxis: [
				        {
				            name: '数量',
				            type: 'value',
				            max: max
				        }
				    ],
				    series: [
				        {
				            name:'数量',
				            type:'line',
				            animation: false,
				            areaStyle: {
				                normal: {}
				            },
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            },
				            markArea: {
				                silent: true,
				                data: [[{
				                    xAxis: '2009/9/12\n7:00'
				                }, {
				                    xAxis: '2009/9/22\n7:00'
				                }]]
				            },
				            data:data[1]
				        }
				    ]
				};
			},

			changeData(data, type){
				let arr1 = [], arr2 = [], arr3 = [];
				for(let i = 0; i < data.length; i++){
					if(data[i][type] == null) continue;
					for(let j = 0; j < data[i][type].length ; j++){
						arr1.push(data[i][type][j].time);
						arr2.push(data[i][type][j].number);
					}
				}
				arr3.push(arr1);
				arr3.push(arr2);
				console.log('arr3', arr3);
				return arr3;
			},
			getOptionsData(list, name){
				if(list == null) return;
				let realData = this.changeData(list, name);
				return this.changeHisData(realData);
			}
		},
		filters: {
			pubLocation(val){
				if(val == 1){
					val = '头条';
				}else if(val == 2){
					val = '次条';
				}else if(val == 3){
					val = '三条';
				}else if(val == 4){
					val = '四条';
				}else if(val == 5){
					val = '五条';
				}else{
					val = '';
				}
				return val;
			}
		}
	}
</script>