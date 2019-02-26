<style lang="scss" scoped>
	@import "common.scss";
	.wxDetail-page{
		padding: 20px 0 0 20px;
	}
</style>
<template>
	<div class="wxDetail-page width1200">
		<baseInfo :baseInfo="baseInfo" :wid="wechatId" :auth="checkRights.addDelivery"></baseInfo>
		<history :auth="checkRights.collect"></history>
		<into v-show="checkRights.into.state"></into>
		<firstContact v-show="checkRights.firstContact.state" :wechatName="baseInfo.name" :wechatNo="baseInfo.wechatNo" :auth="checkRights.firstSave"></firstContact>
		<secondContact v-show="checkRights.firstContact.state" :auth="checkRights.secondSave"></secondContact>
		<div class="track marBottom20" v-show="checkRights.track.state">
			<el-row align="middle" type="flex" class="marBottom20">
				<el-col :span="2">追踪信息</el-col>
				<el-col :span="6">追踪日期：{{tableModel.track.currentTrackDate}}</el-col>
				<el-col :span="6">
					<el-button @click="startTrack">开始追踪</el-button>
				</el-col>
				<el-col :span="10" style="text-align: right"><span @click="tableModel.track.dialogVisible = true">更多</span></el-col>
			</el-row>
			<models class="conShadow" :reciveData="tableModel.track.reciveData" :reciveColum="tableModel.track.reciveColum" :trackDetailInfo="trackDetailInfo"></models>
		</div>
		
		<div class="provider" v-show="checkRights.queryWechatProviderById.state">
			<el-row align="middle" type="flex" class="marBottom20">
				<el-col :span="12">
					代理商
				</el-col>
				<el-col :span="12" style="text-align: right"><span @click="agentData.dialogVisible = true">更多</span></el-col>
			</el-row>
			<models class="conShadow" :reciveData="agentData.reciveDataSamll" :reciveColum="agentData.reciveColum"></models>
		</div>

		<el-dialog title="代理商" :visible.sync="agentData.dialogVisible">
			<models :reciveData="agentData.reciveData" :reciveColum="agentData.reciveColum"></models>
			<div>
				<el-pagination @size-change="agentSize" @current-change="agentCurrent" :current-page.sync="agentData.query.pageIndex"
		            :page-sizes="[10,20,30, 50]" :page-size="agentData.query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="agentData.total">
		        </el-pagination>
			</div>
		</el-dialog>

		<div class="logger" v-show="checkRights.logger.state">
			<el-row class="marBottom20" align="middle" type="flex">
				<el-col :span="12">
					日志信息
				</el-col>
				<el-col :span="12" style="text-align: right"><span @click="tableModel.log.dialogVisible = true">更多</span></el-col>
			</el-row>
			
			<models class="conShadow" :reciveData="tableModel.log.reciveDataSamll" :reciveColum="tableModel.log.reciveColum"></models>
		</div>

		<el-dialog title="历史追踪" :visible.sync="tableModel.track.dialogVisible">
			<el-select @change="changeTrackID" v-model="tableModel.track.value" placeholder="请选择">
				<el-option
					v-for="item in tableModel.track.optionValue"
					:key="item.trackId"
					:label="item.trackDate"
					:value="item.trackId">
				</el-option>
			</el-select>
			<models :reciveData="tableModel.track.reciveData" :reciveColum="tableModel.track.reciveColum"></models>
			<div>
				<el-pagination @size-change="trackSize" @current-change="trackCurrent" :current-page.sync="trackQuery.page"
		            :page-sizes="[10,20,30, 50]" :page-size="trackQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="trackTotal">
		        </el-pagination>
			</div>
		</el-dialog>

		<el-dialog title="日志" :visible.sync="tableModel.log.dialogVisible">
			<models :reciveData="tableModel.log.reciveData" :reciveColum="tableModel.log.reciveColum"></models>
			<div>
				<el-pagination @size-change="logSize" @current-change="logCurrent" :current-page.sync="tableModel.log.query.pageIndex"
		            :page-sizes="[10,20,30, 50]" :page-size="tableModel.log.query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableModel.log.total">
		        </el-pagination>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import models from './model';
	import modelRender from '@/components/modelRender/model.js';
	import {leftOutNull, pubLocation} from '@/config/mUtils';
	import {getLogger, getTrack, getBaseInfo, editWXDetail, queryContact, executeTrack, wprq} from '@/service/getData';
	import {baseInfo, firstContact, history, secondContact, into} from './child_index/';
	import {roleCheckRights} from '@/utils/index.js';
	

	const tableModel = {
		track:{
			dialogVisible: false,
			reciveData: null,
			currentTrackDate: '',
			reciveColum: [
				{property: "likeNum", label: "点赞数"},
				{property: "pubLocation", label: "发布位置"},
				{property: "publishDate", label: "发布时间"},
				{property: "readNum", label: "阅读量"},
				{property: "isBrush", label: "是否刷量"},
				{property: "title", label: "标题" , link: true},
				{property: "action", label: "操作", action: true}	
			],
			query: {
				trackId:''
			},
			total:0,
			value:'',
			optionValue: []
		},
		log:{
			dialogVisible: false,
			reciveData: null,
			reciveDataSamll: null,
			reciveColum: [
				{property: "operation", label: "操作事件"},
				{property: "createTime", label: "操作时间"},
				{property: "role", label: "角色"},
				{property: "username", label: "用户名"}
			],
			query: {
				pageIndex: 1,
				pageSize: 10,
			},
			total:0
		}
	}

	const agentData = {
		dialogVisible: false,
		reciveData: null,
		reciveDataSamll:null,
		query: {
			pageIndex: 1,
			pageSize: 10,
		},
		reciveColum:[
			{property: "providerName", label: "代理商", routerlink: true},
			{property: "firstprice", label: "头条价"},
			{property: "secondprice", label: "次条价"},
			{property: "other", label: "其他"}
		],
		total:0
	}

	export default{
		data(){
			return{
				list:[1,2,3,4],
				trackQuery: {
					currentTrackDate: '',
					pageIndex: 1,
					pageSize: 10,
					wechatId: 815
				},
				trackTotal: null,
				baseInfo: {},
				contact: true,
				secContact: true,
				options:[{
					value: 2,
					label: '订阅号'
				},{
					value: 1,
					label: '服务号'
				}],
				disabled: true,
				inputWidth: {
					width: "50%"
				},
				btnStatus: true,
				firStatus: true,
				saveData: null,
				sizeForm: 'mini',
				tableModel: Object.assign({}, tableModel),
				wechatId: null,
				trackDetailInfo: null, // 传入文章追踪详情的值
				checkRights: {
					into:{
						url: '/delivery/findDeliveryByWechatIdList',
						state: true
					},
					firstContact: {
						url: '/contactmanage/query',
						state: true
					},
					secondContact:{
						url: '/contactmanage/query',
						state: true
					},
					track:{
						url: '/track/histrack',
						state: true
					},
					logger:{
						url: '/logmanage/query',
						state: true
					},
					addDelivery:{
						url: '/delivery/addDelivery',
						state: true
					},
					collect:{
						url: '/wechatmanage/collect',
						state: true
					},
					executeTrack:{
						url: '/track/executeTrack',
						state: true
					},
					firstSave:{
						url: '/contactmanage/first/save',
						state: true	
					},
					secondSave:{
						url: '/contactmanage/second/save',
						state: true	
					},
					queryWechatProviderById:{
						url: '/wechatProviderResource/queryWechatProviderById',
						state: true
					}
				},
				agentData: agentData
			}
		},
		mounted(){
			this.wechatId = this.getWechatId();
			this.initData(this.wechatId);
			roleCheckRights(this.checkRights);
		},
		methods:{
			initData(wechatId){
				
				this.initLogger(wechatId);

				this.initTrack(wechatId);
				
				this.initBaseInfo(wechatId);

				this.initAgent(wechatId);

			},
			async initLogger(wechatId){
				this.tableModel.log.query.wechatId = wechatId;
				let logList = await getLogger(this.tableModel.log.query);
				this.tableModel.log.total = logList.data.total;
				this.tableModel.log.reciveData = logList.data.list;
				this.tableModel.log.reciveDataSamll = this.tableModel.log.reciveData.slice(0,3);
			},
			async initTrack(wechatId, trackId = ''){
				this.tableModel.track.query.wechatId = wechatId;
				this.tableModel.track.query.trackId = trackId;
				let trackList = await getTrack(this.tableModel.track.query);
				this.tableModel.track.reciveData = trackList.data.info.list;
				pubLocation(this.tableModel.track.reciveData, 'pubLocation');
				this.tableModel.track.optionValue = trackList.data.allTrackHis;
				this.tableModel.track.currentTrackDate = trackList.data.info.currentTrackDate;
			},
			async initBaseInfo(wechatId){
				let getInfo = await getBaseInfo({wechatId: wechatId});
				this.baseInfo = getInfo.data;
				this.trackDetailInfo = {
					name: this.baseInfo.name,
					wechatNo: this.baseInfo.wechatNo
				}
			},
			async initAgent(wechatId){
				this.agentData.query.wechatId = wechatId;
				let result = await wprq(this.agentData.query);
				if(!result.success) return;
				this.agentData.reciveData = result.data.list;
				this.total = result.data.total;
				this.agentData.reciveDataSamll = this.agentData.reciveData.slice(0,3);

			},
			getWechatId(){
				return this.$route.query.wechatId || 815;
			},
			agentSize(val){
				this.agentData.query.pageSize = val;
				this.initAgent(this.getWechatId());
			},
			agentCurrent(val){
				this.agentData.query.pageIndex = val;
				this.initAgent(this.getWechatId());
			},
			trackSize(val){
				this.trackQuery.limit = val
				this.getTrackList();
			},
			logSize(val){
				this.tableModel.log.query.pageSize = val;
				this.initLogger(this.getWechatId());
			},
			trackCurrent(val){
				this.trackQuery.page = val
				this.getTrackList();
			},
			logCurrent(val){
				this.tableModel.log.query.pageIndex = val;
				this.initLogger(this.getWechatId());
			},
			changeTrackID(val){
				this.initTrack(this.getWechatId(), val);
			},
			changeEachBaoJia(){
				this.firstContactForm.advertiseType = ''; 
			},
			async startTrack(){
				if(!this.checkRights.executeTrack.state){
					this.$message({
					    message: this.checkRights.executeTrack.msg,
					    type: 'error'
					});
					return;
				}
				let result = await executeTrack({wechatIds:this.getWechatId()});
				if(result.success == true){
					this.$message({
					        message: result.message,
					        type: 'success'
					});
				}else{
					this.$message.error(result.message);
				}
			},
			async sCollect(){
				let result = await startCollect({wechatIds:this.getWechatId()});
				if(result.success == true){
					this.$message({
					        message: result.message,
					        type: 'success'
					});
				}else{
					this.$message.error(result.message);
				}
			}
		},
		components:{
			models,
			baseInfo,
			history,
			firstContact,
			secondContact,
			into,
			modelRender
		},
		filters: {
			listFilter(arr){
				// console.log(333)
			},
			typeFilter(type){
				if(type == null) return '';
				return type == 1 ? '服务号':'订阅号';
			}
		}
	}
</script>
