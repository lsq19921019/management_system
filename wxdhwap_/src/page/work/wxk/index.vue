<template>
	<div class="wxk-page">
		<el-row type="flex" class="row-bg" justify="space-between">
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<label class="tag-title fl">标注:</label>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="全部" name="first"></el-tab-pane>
						<el-tab-pane label="待观察" name="second"></el-tab-pane>
						<el-tab-pane label="可投放" name="third"></el-tab-pane>
						<el-tab-pane label="搁置" name="fourth"></el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple-light">
					<label class="tag-title fl">状态:</label>
					<el-select v-model="searchItem.statusVal" filterable placeholder="请选择" @change="getWXKInf">
						<el-option v-for="item in trackStatus" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="5">
				<div class="grid-content bg-purple">
					<el-input placeholder="请输入微信名或微信号" v-model="searchItem.wechateName" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="sumbitBtn"></el-button>
					</el-input>
				</div>
			</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple export-btn">
					<a :href="exportsList">批量导出</a>
				</div>
			</el-col>
		</el-row>
		<el-row class="pgtp30">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-table :data="tableModel.wxkSearch.tableData" style="width: 100%">
						<el-table-column label="微信库" width="360">
							<template slot-scope="slot">
								<router-link :to="{path:'wxDetail',query:{wechatId:slot.row.id}}">
									<i>{{slot.row.name}}</i>
									<br/>
									<span>{{slot.row.no}}</span>
								</router-link>
							</template>
						</el-table-column>
						<el-table-column prop="status" label="状态" width="360">
							<template slot-scope="slot">
								<i v-if="!(slot.row.marksSatus) || slot.row.marksSatus == 1">{{slot.row.trackStatus | formateVal('track')}}</i>
								<i v-else>{{slot.row.trackStatus | formateVal('track')}} ({{slot.row.marksSatus | formateVal('marks')}})</i>
								<br/>
								<span>{{slot.row.updateTime}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="360">
							<template slot-scope="slot">
								<i class="el-icon-star-on" v-on:click="setCollectStatus(slot.row)" v-if="slot.row.collectionstate == 1"></i>
								<i class="el-icon-star-off" v-on:click="setCollectStatus(slot.row)" v-else-if="slot.row.collectionstate == 2"></i>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="pgtp30">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchItem.currentPage1" :page-sizes="[10, 20, 30, 40]" :page-size="searchItem.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import $ from 'jquery'
import { baseUrl } from '@/config/env';
import { wxkTable, wxkAreen, wxkcancelAreen } from '@/service/getData';
import {wxkStatus,filters} from '@/config/mUtils'

const tableModel = {
	wxkSearch: {
		wxkRequestList: {},
		tableData: [],//table内容
	}
}
export default {
	data() {
		return {
			isCollect: false,
			exportsList: baseUrl + '/wechatmanage/wechatExport?type=1',
			activeName: 'first', //当前tab表头
			tableModel: Object.assign({}, tableModel),
			total: 0,//总页数
			index: 0,
			houseid:0,
			searchItem: {
				tabIndex: '', //当前tab表头索引
				wechateName: '',//搜索--微信号或微信名称
				statusVal: '', //选中的状态
				deliverystate: '',//投放状态
				currentPage1: 1,  //当前页
				pageSize: 10, //分页数
				type: 1, //1 微信库，2收藏夹
			},
			trackStatus: wxkStatus.trackStatus, //筛选--状态
		}
	},
	mounted() {
		this.initData();
	},
	filters: filters,
	methods: {
		initData() {
			this.getWXKInf();
		},
		handleClick(tab, event) { //tab切换触发
			tab.index == '0' ? this.searchItem.tabIndex = '' : this.searchItem.tabIndex = tab.index;
			this.getWXKInf();
		},
		handleSizeChange(val) { //pageSize 改变时会触发
			this.searchItem.pageSize = val;
			this.getWXKInf();
		},
		handleCurrentChange(val) { //currentPage 改变时会触发 当前页
			this.searchItem.currentPage1 = val;
			this.getWXKInf();
		},
		sumbitBtn() {
			this.searchItem.currentPage1 = 1;
			this.getWXKInf();
		},
		//微信库表格
		async getWXKInf() {
			let obj = {
				markStatus: this.searchItem.tabIndex,//标注状态
				name: this.searchItem.wechateName, //微信公众号或微信名
				pageIndex: this.searchItem.currentPage1,//当前页
				pageSize: this.searchItem.pageSize,//分页数
				trackStatus: this.searchItem.statusVal,//跟踪状态
				deliverystate: this.searchItem.deliverystate,//选中状态
				type: this.searchItem.type
			}
			let trackList = await wxkTable(obj);
			this.tableModel.wxkSearch.tableData = trackList.data.list;
			this.total = trackList.data.total;
		},
		//未收藏状态 ---此时点击要添加收藏 默认colState 为2
		async setAreen(row) {
			let areen = await wxkAreen({ wehcatid: row.no, wehcatname: row.name });
			if (!!areen.resultData) {
				row.collectionstate = 1;
				this.houseid = areen.resultData;
			} else {
				alert(areen.msg);
			}
		},
		//收藏状态  --- 此时点击是删除收藏(未收藏) 默认colState 为1
		async cancelAreen(row) {
			let id;
			row.houseid == 0 ? id = this.houseid : id = row.houseid ;
			let cancelAreen = await wxkcancelAreen({ id: id });
			if (cancelAreen.resultData) {
				row.collectionstate = 2;
			} else {
				alert(cancelAreen.msg);
			}
		},
		//收藏 or 未收藏
		setCollectStatus(row) {
			if (row.collectionstate == 1) {
				this.cancelAreen(row);
			} else {
				this.setAreen(row);
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.wxk-page {
	padding: 10px 20px;
	.tag-title {
		height: 40px;
		line-height: 40px;
		margin-right: 10px;
	}
	.pgtp30 {
		padding-top: 30px;
	}
	.fl {
		float: left
	}
	.fr {
		float: right
	}
	.el-table::before {
		height: 0;
	}
	.el-table .cell a {
		color: #555;
	}
	.el-table .cell a:hover {
		color: #444;
	}
	.el-icon-star-off:before,
	.el-icon-star-on::before {
		font-size: 22px;
	}
	.export-btn a {
		display: inline-block;
		line-height: 30px;
		font-size: 14px;
		color: #5a5e66;
		text-align: right;
		background: #fff;
		border: 1px solid #409EFF;
		padding: 0 6px;
		border-radius: 12px;
	}
}
</style>