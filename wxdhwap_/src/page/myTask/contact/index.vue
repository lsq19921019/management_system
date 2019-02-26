<template>
	<div class="msgAdd-page">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="正在接洽" name="first">
				<el-row class="pgtp30">
					<el-col :span="24">
						<div class="grid-content bg-purple-dark">
							<el-table :data="isContactTableData" style="width: 100%" :default-sort = "{prop: 'createtime', order: 'descending'}">
								<el-table-column label="微信" width="360">
									<template slot-scope="slot">
										<i>{{slot.row.name}}</i>
										<br/>
										<span>{{slot.row.username}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="status" label="指派时间" sortable width="360">
									<template slot-scope="slot">
										<span>{{slot.row.assigntime}}</span>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="360">
									<template slot-scope="slot">
										<el-button type="primary" plain  @click='goContact(slot)'>开始接洽</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="pgtp30">
					<el-col :span="24">
						<div class="grid-content bg-purple">
							<el-pagination @size-change="isContactHandleSizeChange" @current-change="isContactHandleCurrentChange" :current-page="isContactItem.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="isContactItem.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="isContactTotal">
							</el-pagination>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="完成接洽" name="second">
				<el-row class="pgtp30">
					<el-col :span="24">
						<div class="grid-content bg-purple-dark">
							<el-table :data="completeContactTableData" style="width: 100%" :default-sort = "{prop: 'createtime', order: 'descending'}">
								<el-table-column label="微信" width="360">
									<template slot-scope="slot">
										<i>{{slot.row.name}}</i>
										<br/>
										<span>{{slot.row.username}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="status" label="编辑时间" sortable width="360">
									<template slot-scope="slot">
										<span>{{slot.row.edittime}}</span>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="360">
									<template slot-scope="slot">
										<el-button type="primary" plain  @click='goContact(slot)'>编辑</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="pgtp30">
					<el-col :span="24">
						<div class="grid-content bg-purple">
							<el-pagination @size-change="completeContactHandleSizeChange" @current-change="completeContactHandleCurrentChange" :current-page="completeContactItem.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="completeContactItem.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="completeContactTotal">
							</el-pagination>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
		
		<div class="contact-box" v-show="contactShow">
			<el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px" >
				<el-form-item label="账号类型" prop="accounttype">
					<el-select v-model="form.accounttype" placeholder="请选择账号类型" size="8">
						<el-option label="订阅号" value="1"></el-option>
						<el-option label="服务号" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系人" prop="contactPerson">
					<el-input v-model="form.contactPerson" size="10"></el-input>
				</el-form-item>
				<el-form-item label="粉丝数（万）" prop="fansNum">
					<el-input v-model="form.fansNum"  size="10"></el-input>
				</el-form-item>
				<br/>
				<el-form-item label="QQ号">
					<el-input v-model="form.contactQq" size="10"></el-input>
				</el-form-item>
				<el-form-item label="微信号" prop="contactWechat">
					<el-input v-model="form.contactWechat" size="10"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form.contactMobile" size="10"></el-input>
				</el-form-item>
				<br/>
				<el-form-item label="是否接广告" prop="advertiseEnable">
					<el-select v-model="form.advertiseEnable" placeholder="请选择" size="15">
						<el-option label="是" value="是"></el-option>
						<el-option label="否" value="否"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否接互金" prop="mutualgold">
					<el-select v-model="form.mutualgold" placeholder="请选择"  size="15">
						<el-option label="是" value="是"></el-option>
						<el-option label="否" value="否"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="广告类型">
					<el-checkbox-group v-model="form.advertiseType">
						<el-checkbox label="电商" name="电商"></el-checkbox>
						<el-checkbox label="教育" name="教育"></el-checkbox>
						<el-checkbox label="医疗" name="医疗"></el-checkbox>
						<el-checkbox label="金融" name="金融"></el-checkbox>
						<el-checkbox label="游戏" name="游戏"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<br/>
				<el-form-item label="头条价格（元）" prop="quoteHeadlinePrice" label-width="130px">
					<el-input v-model="form.quoteHeadlinePrice" size="10"></el-input>
				</el-form-item>
				<el-form-item label="次条价格（元）" prop="quoteSecondPrice" label-width="130px">
					<el-input v-model="form.quoteSecondPrice" size="10"></el-input>
				</el-form-item>
				<el-form-item label="其他条价格（元）" label-width="155px" prop="quoteOtherPrice">
					<el-input v-model="form.quoteOtherPrice" size="10"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="form.contactRecord" class="mark"></el-input>
				</el-form-item>
				<br/>
				<el-form-item class="contact-btn">
					<el-button @click="closeContact('form')">取消</el-button>
					<el-button type="primary" @click="onSubmit('form')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { baseUrl } from '@/config/env';
import { findMyTaskList,firstSaveContact,queryContact} from '@/service/getData';
import {wxkStatus,filters} from '@/config/mUtils'
const formData = {
	accounttype:'',//账户类型
	fansNum:'',//粉丝数量
	contactQq:'',//QQ号
	contactPerson:'',//联系人姓名
	contactMobile:'',//联系人电话
	contactWechat:'',//联系人微信
	wechatId:'',//微信号
	advertiseEnable:'',//是否可以接广告[0：不可以 1：可以]
	mutualgold:'', //是否接互金(1是/2否)必传)
	advertiseType:[],//可接广告类型(逗号分隔)
	quoteHeadlinePrice:'',//头条价格
	quoteSecondPrice:'',//次条价格
	quoteOtherPrice:'',//其他价格
	contactRecord:'', //沟通记录- 备注
}
export default {
	data() {
		return {
			contactShow: false, //显示弹框
			tabIndex:0,	//判断正在接洽还是完成接洽
			isContactTableData: [], //正在接洽表数据
			isContactTotal: 0,//正在接洽总页数
			completeContactTableData:[], //完成接洽表数据
			completeContactTotal: 0,//完成接洽总页数
			activeName: 'first',
			isContactItem: {
				"level": 0,//接洽阶段
				"order":"desc",//排序顺序
				"orderField":"edittime",//排序字段
				currentPage: 1,  //当前页
				pageSize: 10, //分页数
			},
			completeContactItem: {
				"level": 1,//接洽阶段
				"order":"desc",//排序顺序
				"orderField":"edittime",//排序字段
				currentPage: 1,  //当前页
				pageSize: 10, //分页数
			},
			form: Object.assign({},formData),
			rules: {
				accounttype: [
					{ required: true, message: '请选择账户类型', trigger: 'change' }
				],
				contactPerson: [
					{ required: true, message: '请输入联系人', trigger: 'blur' },
				],
				fansNum: [
					{ required: true, message: '请输入粉丝数',  trigger: 'blur' }
				],
				contactWechat: [
					{ required: true, message: '请输入微信', trigger: 'blur' }
				],
				advertiseEnable: [
					{ required: true, message: '请选择是否接受广告', trigger: 'change' }
				],
				mutualgold: [
					{ required: true, message: '请选择是否接受互金', trigger: 'change' }
				],
				quoteHeadlinePrice: [
					{ required: true, message: '请输入头条价格', trigger: 'blur' }
				],
				quoteSecondPrice: [
					{ required: true, message: '请输入次条价格',  trigger: 'blur' }
				],
				quoteOtherPrice: [
					{ required: true, message: '请输入其他价格', trigger: 'blur' }
				],
				date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				],
				type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			}
		}
	},
	mounted() {
		this.getIsContact();
		this.getCompleteContact();
	},
	methods: {
		//tab切换
		handleClick(tab, event) {
			this.tabIndex = tab.index;
		},
		//显示弹窗表格
		async goContact(data){
			if(this.tabIndex == 0){
				this.form.wechatId = data.row.wechatid;
				this.contactShow = true;
			}else{
				let queryContactParam={
					level: 1,
					wechatId: data.row.wechatid
				}
				let queryContactData = await queryContact(queryContactParam);

				let editData = {};
				for(let i in formData){
					if(i == 'advertiseEnable'){
						if(queryContactData.data.advertiseEnable == 1){
							editData.advertiseEnable = '是';
						}else if(queryContactData.data.advertiseEnable == 0){
							editData.advertiseEnable = '否';
						}
					}else if(i == 'mutualgold'){
						if(queryContactData.data.mutualgold == 1){
							editData.mutualgold = '是';
						}else if(queryContactData.data.mutualgold == 2){
							editData.mutualgold = '否';
						}
					}else{
						editData[i] = queryContactData.data[i];
					}	
					//editData[i] = queryContactData.data[i];
				}
				console.log('editData',editData);
				this.form = Object.assign({},this.form,editData,{advertiseType:queryContactData.data.advertiseType.split(',')});
				this.contactShow = true;
			}
		},
		//关闭弹窗表格
		closeContact(form){
			this.form = Object.assign({},formData);
			this.$refs[form].resetFields();
			this.contactShow = false;
		},
		//提交表单
		onSubmit(form) {
			var _this = this;
			this.$refs[form].validate(async (valid) => {
				if (valid) {
					// accounttype		number	账户类型(1 订阅号/ 2 服务号)必传)
					// advertiseEnable	是否可以接广告	number	是否可以接广告[0：不可以 1：可以]
					// advertiseType	可接广告类型	string	可接广告类型(逗号分隔)
					// contactMobile	联系人电话	string	
					// contactPerson	联系人姓名	string	
					// contactQq	联系人QQ	string	
					// contactRecord	沟通记录	string	
					// contactWechat	联系人微信	string	
					// fansNum	粉丝数	number	
					// id	ID	number	ID为空时表示新增，ID不为空时表示修改
					// level	接洽阶段	number	接洽阶段：[1:第一轮接洽 2:第二轮接洽](必传)
					// mutualgold		number	是否接互金(1是/2否)必传)
					// quoteHeadlinePrice	头条报价	number	
					// quoteOtherPrice	其他条报价	number	
					// quoteSecondPrice	次条报价	number	
					// sex	联系人姓别	number	姓别[1：男 2：女]
					// wechatId	公众号ID	number	(必传)
					
					let submitData = {};
					for(let i in formData){
						if(i == 'advertiseEnable'){
							if(_this.form.advertiseEnable == '是'){
								submitData.advertiseEnable = 1;
							}else if(_this.form.advertiseEnable == '否'){
								submitData.advertiseEnable = 0;
							}
						}else if(i == 'mutualgold'){
							if(_this.form.mutualgold == '是'){
								submitData.mutualgold = 1;
							}else if(_this.form.mutualgold == '否'){
								submitData.mutualgold = 2;
							}
						}else if(i == 'advertiseType'){
							submitData.advertiseType =  _this.form.advertiseType.join(',');
						}else{
							submitData[i] = _this.form[i];
						}	
					}

					let firstSaveData = await firstSaveContact(submitData);
					
					if(firstSaveData.success){
						if(this.tabIndex == 0){
							this.getIsContact();
							this.getCompleteContact();
						}
						// 清空表单
						_this.form = Object.assign({},formData);
						_this.$refs[form].resetFields();
						this.contactShow = false;
					}

					
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//正在接洽分页
		isContactHandleSizeChange(val) { //pageSize 改变时会触发
			this.isContactItem.pageSize = val;
			this.getIsContact();
		},
		//正在接洽分页
		isContactHandleCurrentChange(val) { //currentPage 改变时会触发 当前页
			this.isContactItem.currentPage = val;
			this.getIsContact();
		},
		//接洽任务--正在--表格
		async getIsContact() {
			let obj = {
				"level":this.isContactItem.level,
				"order":this.isContactItem.order, 
				"orderField":this.isContactItem.orderField,
				"pageIndex": this.isContactItem.currentPage,
				"pageSize": this.isContactItem.pageSize,
			};

			let isContactList = await findMyTaskList(obj);
			this.isContactTableData = isContactList.data.list;
			this.isContactTotal = isContactList.data.total;
		},
		//完成接洽分页
		completeContactHandleSizeChange(val) { //pageSize 改变时会触发
			this.completeContactItem.pageSize = val;
			this.getCompleteContact();
		},
		//完成接洽分页
		completeContactHandleCurrentChange(val) { //currentPage 改变时会触发 当前页
			this.completeContactItem.currentPage = val;
			this.getCompleteContact();
		},
		//接洽任务--完成--表格
		async getCompleteContact() {
			let obj = {
				"level": this.completeContactItem.level,
				"order":this.completeContactItem.order, 
				"orderField":this.completeContactItem.orderField,
				"pageIndex": this.completeContactItem.currentPage,
				"pageSize": this.completeContactItem.pageSize,
			}

			let completeContactList = await findMyTaskList(obj);
			this. completeContactTableData = completeContactList.data.list;
			this. completeContactTotal = completeContactList.data.total;
		},
		
	}
}
</script>
<style lang="scss" scoped>
.msgAdd-page{
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
	.contact-box{
		background:#fff;
		position:fixed;
		top:50%;
		left:50%;
		width: 800px;
		transform:translate(-50%,-50%);
		border:1px solid #ddd;
		padding:25px;
		.mark{
			width:620px;
		}
		.contact-btn{
			padding-left:560px;
		}
	}
}
</style>