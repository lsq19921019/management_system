<style lang="scss" scoped>
	.secret-page{
		padding: 20px 0 0 20px;
	}
	.marBot20{
		margin-bottom: 20px;
	} 
</style>
<template>
	<div class="secret-page">
		<el-row>
			<el-col class="marBot20" :span="24">账号（手机号）：{{loginname}}</el-col>
			<el-col class="marBot20" :span="24">角色：{{roleName}}</el-col>
			<el-col class="marBot20" :span="24">名称：{{username}}</el-col>
			<el-col>
				<el-button @click="showUpdateDialog">修改密码</el-button>
			</el-col>
		</el-row>
		<el-dialog
			:visible.sync="visibleDialog"
		>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">

				<el-form-item label="原密码" prop="oldPassword">
					<el-input type="password" v-model="ruleForm.oldPassword" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="新密码" prop="newPwdword">
					<el-input type="password" v-model="ruleForm.newPwdword" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button @click="updateHandle">保存</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import secret from './index.js';
	export default secret;
</script>