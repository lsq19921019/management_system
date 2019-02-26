import {findContact} from '@/service/getData'
import {getTime} from '@/config/mUtils'
import {format} from '@/utils/index.js'

let echartsOption = {
	title : {
		text: ''
	},
	tooltip : {
		trigger: 'axis'
	},
	legend: {
		// formatter:function(a){  
		// 	return ('总计：'+a );  
		// },
		 backgroundColor: '#eee',
		textStyle: {color: 'red'},
		data:['次数']
	},
	toolbox: {
		show : true,
	},
	calculable : true,
	xAxis : [
		{
			type : 'category',
			boundaryGap : false,
			data : [],
		}
	],
	yAxis : [
		{
			type : 'value',
			axisLabel : {
				formatter: '{value}'
			}
		}
	],
	series : [
		{
			name:'次数',
			type:'line',
			data:[11, 11, 35, 13, 12, 13, 10],
			markPoint : {
				data : [
					{type : 'max', name: '最大值'},
					{type : 'min', name: '最小值'}
				]
			},
		}
	]
}
export default{
	data(){
		return{
			tag: 1,
			reciveData: [],
			colum: [
				{property: "username", label: "收集人"},
				{property: "number", label: "待完成"}
			],
			pageIndex: 1,
			pageSize: 10,
			total: 10,
			tag2:2,
			reciveData2:[],
			colum2:[
				{property: "username", label: "收集人"},
				{property: "number", label: "完成"}
			],
			pageIndex2:1,
			pageSize2:10,
			total2:10,
			pickerOptions:{
				shortcuts: [
					{
						text: '最近七天',
						onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '上周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();

							start.setTime(getTime(7));
							end.setTime(getTime(1));
							picker.$emit('pick', [start, end]);
						}
					}
				]
			},
			value:'',
			type:'',
			xData: ['2017-11-15','2017-11-15','2017-11-15','2017-11-15','2017-11-15','2017-11-15','2017-11-15'],
			options: null,
		}
	},
	mounted(){
		this.init();
		this.allDone();
		format();
	},
	methods:{
		
		async init(){
			let obj = {
				level: 0,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			};
			let result = await findContact(obj);
			if(!result.success) return;
			this.reciveData = result.data.list;
			this.total = result.data.total;
			let newEchartsOption = Object.assign({},echartsOption);
			newEchartsOption.xAxis[0].data = this.xData;
			//newEchartsOption.legend.data[0] = '总计50次'
			this.options = newEchartsOption;
		},
		async allDone(){
			let obj = {
				pageIndex: this.pageIndex2,
				pageSize: this.pageSize2,
				level: 1
			}
			let result = await findContact(obj);
			if(!result.success) return;
			this.reciveData2 = result.data.list;
			this.total2 = result.data.total;
			console.log(this.reciveData2);
			console.log(this.total2);
			this.type = 'all';
		},
		async moreDone(){
			let startTime = this.value[0], endTime = this.value[1];
			let obj = {
				pageIndex: this.pageIndex2,
				pageSize: this.pageSize2,
				startTime: new Date(startTime).format("yyyy-MM-dd"),
				endTime: new Date(endTime).format("yyyy-MM-dd"),
				level: 1
			}

			let result = await findContact(obj);
			
			if(!result.success) {
				this.$message.error(result.message);
				return;
			}


			
			this.reciveData2 = result.data.list;
			this.total2 = result.data.total;
			this.type = 'more';
		},
		async initDone(){
			let obj = {
				pageIndex: this.pageIndex2,
				pageSize: this.pageSize2,
				level: 1
			}
			let result = await findContact(obj);
			if(!result.success) return;
			this.reciveData2 = result.data.list;
			this.total2 = result.data.total;
			this.type = 'all';
		},
		done(){
			if(this.type == 'all'){
				this.allDone()
			}else{
				this.moreDone()
			}
		},
		rowClick(row){
			console.log(row.username);
		}
	}
 }