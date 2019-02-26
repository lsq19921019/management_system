<style lang="scss" scoped>
	@import "../common.scss";
</style>
<template>
	<div class="child-firstContact">
		<div class="contact" v-if="contact">
			<el-row align="middle" type="flex"  class="marBottom20">
				<el-col :span="2">初次接洽</el-col>
				<el-col :span="6">接洽时间：{{contactQuery.createTime}}</el-col>
				<el-col :span="6">
					<el-button v-if="firStatus" @click="submitFirstForm('1')">编辑</el-button>
					<div v-else>
						<el-button @click="submitFirstForm('2')">取消</el-button>
						<el-button @click="submitFirstForm('3')">保存</el-button>
					</div>
				</el-col>
				<el-col :span="2" :offset="8" style="text-align: right">
					<router-link :to="{path:'/consultWith',query:{wechatId: wechatId, wechatName: wechatName, wechatNo: wechatNo}}">更多</router-link>
				</el-col>
			</el-row>
			<div class="contact conShadow padding20 marBottom20">
				<el-form :rules="rules" ref="firstContactForm" label-width="80px" :model="firstContactForm">
					<el-row>
						<el-col :span="6">
							<el-form-item label="联系人：" prop="contactPerson">
								<el-input 
									:size="sizeForm"
							    	placeholder="联系人姓名"
							    	v-model="firstContactForm.contactPerson"
							    	:disabled="firstContactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="QQ：" prop="contactQq">
								<el-input 
									:size="sizeForm"
							    	placeholder="请填写QQ号"
							    	v-model="firstContactForm.contactQq"
							    	:disabled="firstContactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="微信：" prop="contactWechat">
								<el-input 
									:size="sizeForm"
							    	placeholder="请填写微信号"
							    	v-model="firstContactForm.contactWechat"
							    	:disabled="firstContactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item 
								label="电话："
								prop="contactMobile"
								>
								<el-input 
									:size="sizeForm"
							    	placeholder="请填写电话号"
							    	v-model.number="firstContactForm.contactMobile"
							    	:disabled="firstContactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="性别：" prop="sex">
								<el-select :disabled="firstContactDisabled" v-model="firstContactForm.sex" placeholder="请选择" >
									<el-option
										v-for="item in fsexOptions"
										:key="item.value"
										:value="item.value"
										:label="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label-width="100px" label="是否接广告：" prop="advertiseEnable">
								<el-select :disabled="firstContactDisabled" v-model="firstContactForm.advertiseEnable" placeholder="请选择">
									<el-option
										v-for="item in isGuangOptions"
										:key="item.value"
										:value="item.value"
										:label="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						
						<el-col :span="6">
							<el-form-item
								label="粉丝数："
								prop="fansNum"
								:rules="[
									{ required: true, message: '该项不能为空，可以填0'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input 
									:size="sizeForm"
							    	placeholder="请填写粉丝数"
							    	v-model.number="firstContactForm.fansNum"
							    	:disabled="firstContactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="类型：" prop="accounttype">
								<el-select :disabled="firstContactDisabled" v-model="firstContactForm.accounttype" placeholder="请选择">
									<el-option
										v-for="item in types"
										:key="item.value"
										:value="item.value"
										:label="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="是否接金：" prop="mutualgold">
								<el-select :disabled="firstContactDisabled" v-model="firstContactForm.mutualgold" placeholder="请选择" >
									<el-option
										v-for="item in mutualgoldOptions"
										:key="item.value"
										:value="item.value"
										:label="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label-width="100px" label="广告类型：" prop="firChooseBox">
								<el-checkbox-group :disabled="firstContactDisabled" @change="arrToString" v-model="checkBox.firChooseBox">
									<el-checkbox :label="item" v-for="item in checkBox.firConCheckBox"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-show="price.h">
							<el-form-item label="头条：" prop="quoteHeadlinePrice"
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input v-model.number="firstContactForm.quoteHeadlinePrice" :disabled="firstContactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-show="price.s">
							<el-form-item prop="quoteSecondPrice" label="次条："
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input type="age" v-model.number="firstContactForm.quoteSecondPrice" :disabled="firstContactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-show="price.o">
							<el-form-item label="其他：" prop="quoteOtherPrice"
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input v-model.number="firstContactForm.quoteOtherPrice" :disabled="firstContactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col>
							<el-form-item label="沟通记录:" prop="contactRecord">
								<el-input :disabled="firstContactDisabled" type="textarea" :rows="5" placeholder="请输入内容" v-model="firstContactForm.contactRecord"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div v-else>
			<el-button @click="contact = true">初次接洽</el-button>
		</div>
	</div>
</template>
<script>
	import {leftOutNull, valFixedTel, valMoveTel} from '@/config/mUtils';
	import {queryContact, firstSaveContact} from '@/service/getData';

	const firstContactForm = {
		accounttype: 1,
		advertiseEnable: 1,
		advertiseType: '电商,教育',
		contactMobile: '',
		contactPerson: '',
		contactQq: '',
		contactRecord: '',
		contactWechat: '',
		fansNum: 0,
		id: '',
		level: 1,
		quoteHeadlinePrice : 0,
		quoteOtherPrice: 0,
		quoteSecondPrice: 0,
		sex: 1,
		wechatId: '',
		mutualgold: 1
	}

	export default{
		props:['wechatName', 'wechatNo', 'auth'],
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
				contactQuery: '',
				firstContactForm: Object.assign({}, firstContactForm),
				saveFirstContactForm: null,
				checkBox: {
					firChooseBox: [],
					firConCheckBox: ['电商', '教育', '金融', '医疗', '游戏'],
				},
				price:{
					h: true,
					s: true,
					o: true 
				},
				contact: true,
				firStatus : true,
				firstContactDisabled: true,
				wechatId: '',
				sizeForm: 'mini',
				fsexOptions: [{value:1, label: '男'}, {value:2, label: '女'}],
				isGuangOptions: [{value:1, label: '是'}, {value:0, label: '否'}],
				types: [{value:1, label: '订阅号'}, {value:2, label: '服务号'}],
				mutualgoldOptions: [{value:1, label: '是'}, {value:2, label: '否'}],
				rules : {
					contactMobile: [
						{ validator: validate, trigger: 'blur' }
					]
				}
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				this.wechatId = this.$route.query.wechatId || '';
				this.initContactQuery(this.wechatId);
			},
			async initContactQuery(wechatId){
				
				let contactQuery = await queryContact({level:1, wechatId: wechatId});
				let contactQueryData = contactQuery.data;
				// a{} 与 b{}的key不一样时候，a过滤b不一样的key，相同key可以赋值			
				
				if(contactQueryData != null){
					// this.contactQuery.createTime = contactQueryData.createTime || '';
					for (let key of Object.keys(contactQueryData)) {
						if(this.firstContactForm.hasOwnProperty(key)){
							this.firstContactForm[key] = contactQueryData[key];
						}
					}
				}else{
					this.contact = false;
				}

				leftOutNull(this.firstContactForm);
				
				this.firstContactForm.wechatId = wechatId;

				// 保存初次接洽原始数据
				this.saveFirstContactForm = Object.assign({}, this.firstContactForm);
				
				// 广告类型字符串转数组
				this.checkBox.firChooseBox = this.changeToArr(this.firstContactForm.advertiseType);

				// 报价
				this.quotePrice();
			},
			submitFirstForm(num){
				let vm = this;
				if(num == 1){
					this.firStatus = false;
					this.firstContactDisabled = false;
					
					// 重新打开报价所有选框
					Object.assign(this.price, {h: true, s: true, o:true})

				}else if(num == 2){
					
					this.firStatus = true;
					this.firstContactDisabled = true;
					
					this.firstContactForm = Object.assign({}, this.saveFirstContactForm);
					
					// 还原广告类型
					this.checkBox.firChooseBox = this.changeToArr(this.firstContactForm.advertiseType);
					
					this.quotePrice();
				}else{
					if(!this.auth.state){
						this.$message({
						    message: this.auth.msg,
						    type: 'error'
						});
						return;
					}
					this.$refs['firstContactForm'].validate(async (valid) => {
						if (valid) {
							let result = await firstSaveContact(vm.firstContactForm);
							if(result.success == true){
								vm.$message({
								    message: result.message,
								    type: 'success'
								});

								vm.firStatus = true;
								vm.firstContactDisabled = true;
								
								vm.quotePrice();
							}else{
								
								vm.$message({
								    message: result.message,
								    type: 'warning'
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
			changeToArr(str){
				if(str == null) return;
				let arr = str.split(",");
				return arr;
			},
			quotePrice(){
				let h = this.firstContactForm.quoteHeadlinePrice;
				let s = this.firstContactForm.quoteSecondPrice;
				let o = this.firstContactForm.quoteOtherPrice;
				
				let arr = [h,s,o];

				for(let i = 0; i < arr.length; i++){
					if(i == 0 && (arr[i] == 0 || arr[i] == null) ){
						this.price.h = false;
					}else if(i == 1 && (arr[i] == 0 || arr[i] == null)){
						this.price.s = false;
					}else if(i == 2 && (arr[i] == 0 || arr[i] == null)){
						this.price.o = false;
					}
				}
			},
			arrToString(){
				// 数组转字符串
				this.firstContactForm.advertiseType = ''; 
				let data = '';
				for(let i = 0; i < this.checkBox.firChooseBox.length; i++){

					data += this.checkBox.firChooseBox[i] + ',';
				}
				data = data.substr(0, data.lastIndexOf(','));
				this.firstContactForm.advertiseType = data;
			}
		}
	}
</script>