<style lang="scss" scoped>
	@import "../common.scss";
</style>
<template>
	<div class="child-secondContact">
		<div class="secContact" v-if="isShowContact">
			<el-row align="middle" type="flex" class="marBottom20">
				<el-col :span="2">二次接洽</el-col>
				<el-col :span="6">接洽时间：{{contactQuery.createTime}}</el-col>
				<el-col :span="6">
					<el-button v-if="isEdit" @click="submitForm('1')">编辑</el-button>
					<div v-else>
						<el-button @click="submitForm('2')">取消</el-button>
						<el-button @click="submitForm('3')">保存</el-button>
					</div>
				</el-col>
			</el-row>
			<div class="conShadow padding20 marBottom20">
				<el-form ref="contactForm" label-width="80px" :model="contactForm">
					<el-row>
						<el-col :span="8">
							<el-form-item label-width="100px" label="是否接互金：">
								<el-select :disabled="contactDisabled" v-model="contactForm.p2pEnable" placeholder="请选择" >
									<el-option
										v-for="item in option1.enableOption"
										:key="item.value"
										:value="item.value"
										:label="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="原因/备注：" label-width="100px">
								<el-input 
									:size="sizeForm"
							    	placeholder="原因备注"
							    	v-model="contactForm.p2pEnableRemark"
							    	:disabled="contactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item 
								label="粉丝数：" 
								label-width="100px"
								:rules="[
									{ required: true, message: '该项不能为空，可以填0'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input 
									:size="sizeForm"
							    	placeholder="粉丝数"
							    	v-model.number="contactForm.fansNum"
							    	:disabled="contactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item  label="广告展现：" label-width="100px">
								<el-select :disabled="contactDisabled" v-model="contactForm.publishType" placeholder="请选择" >
									<el-option
										v-for="item in option1.publishTypeOption"
										:key="item.value"
										:value="item.value"
										:label="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="广告撰写：" label-width="100px">
								<el-select :disabled="contactDisabled" v-model="contactForm.advertiseWriteMan" placeholder="请选择" >
									<el-option
										v-for="item in option1.advertiseWriteManOption"
										:key="item.value"
										:value="item.value"
										:label="item.label">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="号主撰写稿费：" label-width="130px">
								<el-input 
									:size="sizeForm"
							    	placeholder="原因备注"
							    	v-model="contactForm.advertiseWritePrice"
							    	:disabled="contactDisabled">
							    </el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" v-show="quote.h">
							<el-form-item label-width="150px" label="报价------头条：" prop="quoteHeadlinePrice"
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input v-model.number="contactForm.quoteHeadlinePrice" :disabled="contactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-show="quote.s">
							<el-form-item prop="quoteSecondPrice" label="次条："
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input type="age" v-model.number="contactForm.quoteSecondPrice" :disabled="contactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-show="quote.o">
							<el-form-item label="其他：" prop="quoteOtherPrice"
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input v-model.number="contactForm.quoteOtherPrice" :disabled="contactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
					</el-row>					
					<el-row>
						<el-col :span="8" v-show="cooperate.h">
							<el-form-item label-width="170px" label="长期合作价---头条：" prop="publishHeadlinePrice"
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input v-model.number="contactForm.publishHeadlinePrice" :disabled="contactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-show="cooperate.s">
							<el-form-item prop="publishSecondPrice" label="次条："
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input v-model.number="contactForm.publishSecondPrice" :disabled="contactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-show="cooperate.o">
							<el-form-item label="其他：" prop="publishOtherPrice"
								:rules="[
								    { required: true, message: '该项不能为空，填0表示不选'},
								    { type: 'number', message: '该项必须是数字值'}
								]"
							>
								<el-input v-model.number="contactForm.publishOtherPrice" :disabled="contactDisabled" size="mini"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="沟通记录:" prop="contactRecord">
								<el-input :disabled="contactDisabled" type="textarea" :rows="5" placeholder="请输入内容" v-model="contactForm.contactRecord"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div v-else>
			<el-button @click="isShowContact = true">二次接洽</el-button>
		</div>
	</div>
</template>
<script>
	import {leftOutNull} from '@/config/mUtils';
	import {queryContact, secSaveContact} from '@/service/getData';

	const contactForm = {
		advertiseWriteMan: 1,
		advertiseWritePrice: 0,
		id: '',
		contactRecord:'',
		level: 2,
		fansNum:0,
		p2pEnable: 0,
		p2pEnableRemark: '',
		publishHeadlinePrice: 0,
		publishOtherPrice: 0,
		publishSecondPrice : 0,
		publishType: 1,
		quoteHeadlinePrice : 0,
		quoteOtherPrice: 0,
		quoteSecondPrice: 0,
		wechatId: 0
	}
	export default{
		props:['auth'],
		data(){
			return{
				contactForm: Object.assign({}, contactForm),
				isShowContact: true,
				wechatId:'',
				contactQuery: {},
				saveContactForm: null,
				isEdit: true,
				contactDisabled: true,
				option1:{
					enableOption:[{value:0, label: '不可以'}, {value:1, label: '可以'}],
					publishTypeOption:[{value:1, label: '软广'}, {value:2, label: '硬广'},{value:3, label: '贴图'}, {value:4, label: '其他'}, {value:'', label:'不限'}],
					advertiseWriteManOption: [{value:1, label: '号主'}, {value:2, label: '投放人'}, {value:'', label:'不限'}]
				},
				sizeForm: 'mini',
				quote:{
					h: true,
					s: true,
					o: true 
				},
				cooperate:{
					h: true,
					s: true,
					o: true 
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
				let result = await queryContact({level:2, wechatId: wechatId});
				let resultData = result.data;
				if(resultData != null){
					this.contactQuery.createTime = resultData.createTime || '';
					for (let key of Object.keys(resultData)) {
						if(this.contactForm.hasOwnProperty(key)){
							this.contactForm[key] = resultData[key];
						}
					}
				}else{
					this.isShowContact = false;
				}
				
				leftOutNull(this.contactForm);

				this.contactForm.wechatId = wechatId;
				
				// 报价和长期合作
				this.quotePrice();
				this.benefit();

				// 保存初次接洽原始数据
				this.saveContactForm = Object.assign({}, this.contactForm);
			},
			submitForm(num){
				let vm = this;
				if(num == 1){
					this.isEdit = false;
					this.contactDisabled = false;
					
					// 重新打开报价所有选框
					Object.assign(this.quote, {h: true, s: true, o:true});
					Object.assign(this.cooperate, {h: true, s: true, o:true});

				}else if(num == 2){


					this.isEdit = true;
					this.contactDisabled = true;
					
					this.contactForm = Object.assign({}, this.saveContactForm);
					
					this.quotePrice();
					this.benefit();
				}else{
					if(!this.auth.state){
						this.$message({
						    message: this.auth.msg,
						    type: 'error'
						});
						return;
					}
					this.$refs['contactForm'].validate(async (valid) => {

						if (valid) {
							let result = await secSaveContact(vm.contactForm);
							if(result.success == true){
								vm.$message({
								    message: result.message,
								    type: 'success'
								});
								
								vm.isEdit = true;
								vm.contactDisabled = true;
								
								vm.quotePrice();
								vm.benefit();
							}else{
								
								vm.$message({
								    message: result.message,
								    type: 'warning'
								});
							}
						}else{
							vm.$message.error('保存失败');
							return false;
						}
					});				
				}
			},
			quotePrice(){
				let h = this.contactForm.quoteHeadlinePrice;
				let s = this.contactForm.quoteSecondPrice;
				let o = this.contactForm.quoteOtherPrice;
				let arr = [h,s,o];
				for(let i = 0; i < arr.length; i++){
					if(i == 0 && (arr[i] == 0 || arr[i] == null) ){
						this.quote.h = false;
					}else if(i == 1 && (arr[i] == 0 || arr[i] == null)){
						this.quote.s = false;
					}else if(i == 2 && (arr[i] == 0 || arr[i] == null)){
						this.quote.o = false;
					}
				}
			},
			benefit(){
				let h = this.contactForm.publishHeadlinePrice;
				let s = this.contactForm.publishSecondPrice;
				let o = this.contactForm.publishOtherPrice;
				
				let arr = [h,s,o];

				for(let i = 0; i < arr.length; i++){
					if(i == 0 && (arr[i] == 0 || arr[i] == null) ){
						this.cooperate.h = false;
					}else if(i == 1 && (arr[i] == 0 || arr[i] == null)){
						this.cooperate.s = false;
					}else if(i == 2 && (arr[i] == 0 || arr[i] == null)){
						this.cooperate.o = false;
					}
				}
			}
		}
	}
</script>