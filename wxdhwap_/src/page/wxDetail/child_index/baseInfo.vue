<style lang="scss" scoped>
	.header{
		h3{
			margin-bottom: 15px;
		}
		li{
			margin-bottom: 10px;
		}
	}
</style>
<template>
	<div class="child-baseinfo marBottom20 conShadow padding20">
		<el-row  class="header">
			<el-col :span="12">
				<h3>{{baseInfo.name}}</h3>
				<ul>
					<li>微信号：{{baseInfo.wechatNo}}</li>
					<li>主体：{{baseInfo.attribute}}</li>
					<li>电话：{{baseInfo.phoneNum}}</li>
					<li>简介：{{baseInfo.desc}}</li>
					<li style="cursor:pointer; text-decoration:underline" @click="dialogBaseInfoVisible  = true">查看详情</li>
				</ul>
			</el-col>
			<el-col :span="12">
				<ul class="news-status" style="text-align: right">
					<li class="news-title">
						{{baseInfo.trackStatus | filterTrackStatus}}{{baseInfo.markStatus |filterMarksSatus}}
						<markDialog @multiMarkID="markHandle">
						</markDialog>
					</li>
					<li class="news-time">{{baseInfo.updateTime}}</li>
					<li class="news-btn"><el-button @click="dialogVisible = true">开始投放</el-button></li>
				</ul>
			</el-col>
		</el-row>

		<el-dialog width="80%" :title="baseInfo.name" :visible.sync="dialogBaseInfoVisible">
			<el-form :model="baseForm" :rules="rules" ref="ruleForm">
				<el-row>
				    <el-col :span="6">
				    	<div class="grid-content">微信号类型：{{baseInfo.type | typeFilter}}</div>
				    </el-col>
				    <el-col :span="6">
				    	<el-form-item
				    		label="粉丝数量："
				    		prop="fansNum"
				    	>
					    	<el-input
					    		:style="inputWidth"
					    		size="mini"
						    	placeholder="粉丝数量"
						    	v-model.number="baseForm.fansNum"
						    	:disabled="disabled">
					    	</el-input>
				    	</el-form-item>
				    </el-col>
				    <el-col :span="6" >
				    	<el-form-item
							label="联系电话："
							prop="phoneNum"
				    	>
			    	    	<el-input
			    	    		:style="inputWidth"
			    	    		size="mini"
			    		    	placeholder="联系电话"
			    		    	v-model="baseForm.phoneNum"
			    		    	:disabled="disabled">
			    	    	</el-input>
		    	    	</el-form-item>
				    </el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item
							label="账号主体："
						>
					    	<el-input
					    		:style="inputWidth"
					    		size="mini"
						    	placeholder="账号主体"
						    	v-model="baseForm.attribute"
						    	:disabled="disabled">
					    	</el-input>
				    	</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="地区：">
							<div class="grid-content">{{baseInfo.region}}</div>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item
							label="是否开通打赏："
						>
					    	<el-select :style="inputWidth" v-model="baseForm.isOpenReward" placeholder="请选择" :disabled="disabled">
		    	        	    <el-option
		    	    	    	    v-for="item in dsoptions"
		    	    	    	    :key="item.value"
		    	    	    	    :label="item.label"
		    	    	    	    :value="item.value">
		    	        	    </el-option>
					    	</el-select>
					    </el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="注册时间：">
							<div class="grid-content">{{baseInfo.registDate}}</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="名称记录：">
							<div class="grid-content">{{baseInfo.nameRecord}}</div>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item
							label="是否开通流量主："
						>
					    	<el-select placeholder="请选择" :style="inputWidth" v-model="baseForm.isOpenFlow" :disabled="disabled">
		    	        	    <el-option
		    	    	    	    v-for="item in liuoptions"
		    	    	    	    :key="item.value"
		    	    	    	    :label="item.label"
		    	    	    	    :value="item.value">
		    	        	    </el-option>
					    	</el-select>
				    	</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item label="认证时间：">
							<div class="grid-content">{{baseInfo.authDate}}</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						<el-form-item
							label="简介："
						>
					    	<el-input
					    		:style="inputWidth"
					    		size="mini"
						    	v-model="baseForm.desc"
						    	:disabled="disabled">
					    	</el-input>
					    </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="企业全称：">
							<div class="grid-content">{{baseInfo.authInfo}}</div>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="企业类型：">
							<div class="grid-content">{{baseInfo.enterprizeType}}</div>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="企业成立日期：">
							<div class="grid-content">{{baseInfo.establishDate}}</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="工商执照：">
							<div class="grid-content">{{baseInfo.merchantNo}}</div>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="经营范围：">
							<div class="grid-content">{{baseInfo.normalManage}}</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						<el-form-item
							label="备注："
						>
							<el-input
								type="textarea"
								:rows="7"
								placeholder="请输入内容"
								v-model="baseForm.remark"
								:disabled="disabled">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item>
					<el-button v-if="btnStatus" type="primary" @click="submitForm('1')">编辑</el-button>
					<div v-else>
						<el-button type="primary" @click="submitForm('2')">取消</el-button>
						<el-button type="primary" @click="submitForm('3')">保存</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog
			:visible.sync="dialogVisible"
		>
			<el-form
				:model="addInto"
			>
				
				<el-form-item label="投放时间：">
					<el-date-picker
						v-model="addInto.deliverytime"
						type="date"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item label="位置：">
					<el-select v-model="addInto.position">
						<el-option
							v-for="item in options"
							:key="item.value"
					        :label="item.label"
					        :value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="价格：">
					<el-input v-model="addInto.price"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button @click="save">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import {editWXDetail, mark, addDelivery} from '@/service/getData';
	import {leftOutNull, mergePrivateKey, valFixedTel, valMoveTel} from '@/config/mUtils';
	import markDialog from './markDialog.vue';
	export default{
		props:['baseInfo', 'wid', 'auth'],
		data(){
			var validate = (rule, value, callback) => {
				{
					if(value == '') callback();
					let r1 = false, r2 = false;
					valMoveTel(value, function(result){
						r1 = result;
					});
					valFixedTel(value, function(result){
						r2 = result;
					});
					if(!r1 && !r2) callback(new Error('格式输入有误'));
					callback();
				}
			}
			return{
				dialogFormVisible: false,
				baseForm: {
					fansNum: '',
					attribute: '',
					phoneNum: '',
					isOpenReward: 0,
					isOpenFlow: 0,
					desc: '',
					remark: '',
					wechatId: ''
					
				},
				rules: {
					fansNum: [
						{ required: true, message: '必填，不填可以写个0'},
				        { type: 'number', message: '粉丝必须为数字值'}
					],
					phoneNum: [
						{ validator: validate, trigger: 'blur' }
					]
				},
				dialogBaseInfoVisible: false,
				btnStatus: true,
				disabled: true,
				inputWidth: {
					width: "50%"
				},
				liuoptions: [{value: 1, label: '是'},{value: 0, label: '否'}],
				dsoptions: [{value: 1, label: '是'},{value: 0, label: '否'}],
				saveData: '',   // save baseFrom
				options:[{
					value: '1',
					label: '头条'
				},{
					value: '2',
					label: '次条'
				},{
					value: '3',
					label: '3条'
				},{
					value: '4',
					label: '4条'
				},{
					value: '5',
					label: '5条'
				},{
					value: '6',
					label: '6条'
				},{
					value: '7',
					label: '7条'
				},{
					value: '8',
					label: '8条'
				}],
				addInto:{
					deliverytime:'',
					position: '',
					price: '',
					wechatid:'',
					wechatId:'',
					wechatname:''
				},
				dialogVisible: false
			}
		},
		methods:{
			async submitForm(num){
				let vm = this;
				if(num == 1){
					// 点击编辑
					this.btnStatus = false;
					this.disabled = false;
					
				}else if(num == 2){
					// 点击取消
					this.btnStatus = true;
					this.disabled = true;
					
					// 还原数据
					// 必须用浅复制，还原baseForm原始数据，否则saveData会关联baseForm
					this.baseForm = Object.assign({}, this.saveData);

				}else{
					// 点击保存
					// 请求修改接口
					this.$refs['ruleForm'].validate(async (valid) => {
						if(valid){
							let result = await editWXDetail(this.baseForm);
							if(result.success == true){
								vm.dialogBaseInfoVisible = false;
								vm.$message({
									message: result.message,
									type: 'success'
								});
								setTimeout(function(){
									window.location.reload();
								},1000);
							}else{
								vm.$message({
									message: result.message,
									type: 'error'
								});
							}
						}else{
							vm.$message({
								message: "再检测一下填写的信息",
								type: 'error'
							});
						}
					});

					
				}
			},
			async markHandle(obj){
				var result = await mark(obj);
				if(result.success){
					this.baseInfo.markStatus = obj.markStatus;
					this.$message({
				        message: result.message,
				        type: 'success'
					});
				}else{
					this.$message.error(result.message);
				}
			},
			async save(){
				this.addInto.wechatname = this.baseInfo.name;
				this.addInto.wechatid = this.baseInfo.wechatNo;
				this.addInto.wechatId = this.wid;
				if(!this.auth.state){
					this.$message({
					    message: this.auth.msg,
					    type: 'error'
					});
					return;
				}
				let result = await addDelivery(this.addInto);
				if(result.resultData){
					this.dialogVisible = false;
					this.$message({
					    message: result.msg,
					    type: 'success'
					});
				}else{
					this.$message.error(result.msg);
				}
			}
		},
		components:{
			markDialog
		},
		watch:{
			wid(){
				this.baseForm.wechatId = this.wid;
			},
			baseInfo(){
				leftOutNull(this.baseInfo);
				mergePrivateKey(this.baseForm, this.baseInfo);
				this.saveData = Object.assign({}, this.baseForm);
			}
		},
		filters: {
			typeFilter(type){
				if(type == null) return '';
				return type == 1 ? '服务号':'订阅号';
			},
			filterMarksSatus(value) { 
				if(value == '1'){
					return "(待观察)"
				}else if(value == '2'){
					return "(可投放)"
				}else if(value == '3'){
					return "(搁置)"
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
		}
	}
</script>