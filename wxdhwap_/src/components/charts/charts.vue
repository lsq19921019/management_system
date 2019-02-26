<template>
	<div :class="className" :id="id" :style="{height:height,width:width}" :options="options"></div>
</template>
<script>
	import echarts from 'echarts'
	export default{
		name: 'r-chart',
		props:{
			className: {
				type: String,
				default: 'chart'
			},
			id: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '200px'
			},
			height: {
				type: String,
				default: '200px'
			},
			options: {
				type: Object,
				default: {}
			}
		},
		data(){
			return {
				chart: null
			}
		},
		mounted(){
			console.log(123)
			this.initChart();
		},
		beforeDestroy(){
			if(!this.char){
				return;
			}
			this.chart.dispose();
			this.chart = null;
		},
		methods: {
			initChart(){
				this.chart = echarts.init(document.getElementById(this.id));
				this.chart.setOption(this.options);
			}
		},
		watch: {
			options: function (){
				this.initChart();
			}
		}
	}
</script>