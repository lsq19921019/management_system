<template>
	<div>
		<el-row>
			<el-col :span="6">
				<span style="color:#5a5e66;font-size:14px;margin-right:5px">状态:</span>
				<el-select v-model="trackStatus" placeholder="请选择状态" @change="getTrackStatus" size="small" >
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
					>
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<span style="color:#5a5e66;font-size:14px;margin-right:5px">跟进人:</span>
				<el-select v-model="assignPerson" placeholder="请选择状态" @change="getAssignStatus" size="small" >
					<el-option
					v-for="item in personOptions"
					:key="item.userId"
					:label="item.username"
					:value="item.userId"
					>
					</el-option>
				</el-select>
			</el-col>

			<el-col :span="5" :offset="6">
				<div>
					<el-input placeholder="请输入微信名或者微信号" v-model="search_input_value" class="input-with-select" type="text" size="small">
						<el-button slot="append" icon="el-icon-search" @click="getWechatName">搜索</el-button>
					</el-input>
				</div>
			</el-col>
		</el-row>
		<el-row class="top-multi-menu">
			<el-col :span="24">
				<multiBtn btnText="批量选中" 
					  :multiCheckedID ="checkID"
					  @multiChoseID="getMultiChoseID"></multiBtn>
				<span @click="multiDelet">删除</span>
				<mark-btn btnText="标注" 
						:multiMarkedID ="checkID" 
						@multiMarkID="getMultiMarkID"></mark-btn>
				<span @click="multiCollect">收集</span>
				<assign-dialog 
					btnText="指派"
					:multiMarkedID ="checkID"
					:trackPerson = "personOptions"
					@multiAssignID = "getMultiAssignID"
				></assign-dialog>
				<el-button type="primary" class="add-btn" size="mini"><router-link :to="{path:'wxkManager_add'}" >新增</router-link></el-button>
			</el-col>
		</el-row>		
		<el-table :data="wechatData.list"  
				  :show-header="true" 
				  :fit="true"
				  @selection-change="getID">
			<el-table-column
				label="全选"   
				type="selection"
				width="55">
			</el-table-column>
			
			<el-table-column  label="" >
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column label="" >
				<template slot-scope="scope">
					<p>{{ scope.row.name }}</p>
					<p>{{ scope.row.no }}</p>
				</template>
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<span>(跟进人)：{{scope.row.followUserName }}</span>
				</template>
			</el-table-column>
			<el-table-column label="">
				<template slot-scope="scope">
					<i v-if="!(scope.row.marksSatus) || scope.row.marksSatus == 1">{{scope.row.trackStatus | filterTrackStatus}}</i>
                  	<i v-else>{{scope.row.trackStatus | filterTrackStatus}} ({{scope.row.marksSatus | filterMarksSatus}})</i>
					<p>{{ scope.row.updateTime }}</p>
				</template>
			</el-table-column>
			<el-table-column label="">
				<template slot-scope="scope">
					<!-- <update-dialog btnText="编辑" 
                                   dialogTitle="编辑" 
                                   :wechatID="scope.row.id"
                                   @updateData="getUpdateData"
                                   > -->
                    <!-- </update-dialog> -->
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block" style="margin-top:20px">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="cpageNum"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="cpageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="wechatData.total">
			</el-pagination>
		</div>
		
	</div>
</template>
<script>
import $ from 'jquery'
//状态
const options =[ {
	value: '1',
	label: '初始'
	}, {
	value: '2',
	label: '初次接洽'
	}, {
	value: '3',
	label: '接洽完成'
	}, {
	value: '4',
	label: '正在收集'
	}, {
	value: '5',
	label: '收集完成'
	}, {
	value: '6',
	label: '收集失败'
	}, {
	value: '7',
	label: '正在追踪'
	}, {
	value: '8',
	label: '追踪完成'
	},{
	value: '9',
	label: '正在投放'
	},{
	value: '10',
	label: '完成投放'
	}];
import MultiBtn from './multiCheck.vue';
import MarkBtn from './markDialog.vue';
import updateDialog from '../wxkManager/updateDialog.vue';
import assignDialog from './assignDialog.vue';

export default {
	props:{
		'wechatData': [Object, Array],
		'buttonText':String, 
		'personOptions':{
			type: Array,
			default: function(){return []}	
		}
	},
	components:{
		MultiBtn,
		MarkBtn,
		updateDialog,
		assignDialog
	},
	data() {
		return {
			checkID:'',//批量选中的微信ID
			options: options , //状态下拉框
			// wechatData:[],
			tab:'0',
			currentPage:'1',
			pageSize:'10',
			name:'',//微信名
			startId:'',//起始ID
			endId:'',//结束ID
			markStatus:'',//标注
			trackStatus:'',//跟踪状态
			search_input_value:'',//搜索
			cpageSize:10,
        	cpageNum:1,
        	assignPerson:''
		};
	},	
	mounted(){
		
	},
	filters: {  
		filterMarksSatus(value) { 
			if(value == '1'){
				return "待观察"
			}else if(value == '2'){
				return "可投放"
			}else if(value == '3'){
				return "搁置"
			}
		},
		filterTrackStatus(value){
			if(value == '1'){
				return "初始"
			}else if(value == '2'){
				return "初次接洽"
			}else if(value == '3'){
				return "接洽完成"
			}else if(value == '4'){
				return "正在收集"
			}else if(value == '5'){
				return "收集完成"
			}else if(value == '6'){
				return "收集失败"
			}else if(value == '7'){
				return "正在追踪"
			}else if(value == '8'){
				return "追踪完成"
			}else if(value == '9'){
				return "正在投放"
			}else if(value == '10'){
				return "完成投放"
			}
		}
	}, 
	methods: {
		/**
		 * 批量删除
		 */
		multiDelet(){
			if(this.checkID == ''){
				this.$message({
					type: 'warning',
					message: '请先选择需要删除的微信号!'
				});
			}else{
				this.$confirm('此操作将删除所选公众号, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$emit("multiDeletID",this.checkID);
				});
			}
		},
		/**
		 *批量收集
		 */
		multiCollect(){
			if(this.checkID == ''){
				this.$message({
					type: 'warning',
					message: '请先选择需要收集的微信号!'
				});
				return false;
			}
			this.$emit("multiCollectID",this.checkID);
		},
		updateWX(data){
			
		},
		/**
		 *获取多选ID
		 */
		getID(selection){
			this.checkID = [];
			selection.forEach((element)=>{
				this.checkID.push(element.id);
			});
		},
		getTrackStatus(selection){
			this.$emit("trackStatus",`${selection}`);
		},
		getAssignStatus(selection){
			this.$emit("assignStatus",`${selection}`);
		},
		getWechatName(){
			this.$emit("wechatName",this.search_input_value);
		},
		getMultiChoseID(data){
			this.$emit("multiChoseID",data);
		},
		getMultiMarkID(data){
			this.$emit("multiMarkID",data);
		},
		getUpdateData(data){
			this.$emit("updateID",data);
		},
		getTrackPerson(data){
			// this.$emit("");
		},
		getMultiAssignID(data){
			this.$emit("multiAssignID",data);
		},
		handleSizeChange(val) {
			this.cpageSize = val;
			this.$emit("paginationPageSize",`${val}`);
		},
		handleCurrentChange(val) {
			this.cpageNum = val;
			this.$emit("paginationCurrentPage",`${val}`);
		},
		handleDelete(id){
			this.$confirm('此操作将删除所选公众号, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$emit("multiDeletID",id);
			});
		},
	}
};
</script>
<style lang="scss" scoped>
.top-multi-menu{
	margin: 20px 5px;
	cursor: pointer;
	font-size: 14px;
}
.el-tabs__content{
	overflow: inherit;
}
.top-multi-menu span{
	display:inline-block;
	font-weight: 500;
	cursor: pointer;
	font-size: 14px;
	margin-right:20px;
	color: #409EFF;
}
.top-multi-menu span:hover{
	color: #409EFF;
}
.top-multi-menu button a{
	color: #fff;
}
.add-btn span{
	color: #fff;
	margin-right: 0;
}
.el-tabs__header{
	z-index: 9;
	background: pink;
}
.trackStatusSelect{
	position:absolute;
	left:300px;
	top:-58px;
	z-index: 99;
}
</style>