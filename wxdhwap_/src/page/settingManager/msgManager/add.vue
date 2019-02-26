<template>
	<div class="msgAdd-page">
		<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
			
			<el-form-item label="手机号" prop="loginname">
				<el-input v-model="ruleForm.loginname" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="用户名" prop="username">
				<el-input  v-model="ruleForm.username" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="密码" prop="password">
				<el-input placeholder="******" type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="角色" prop="roleId">
				<el-select v-model="ruleForm.roleId" placeholder="全部">
					<el-option
					v-for="item in roleOptions" 
					:label="item.roleName"
					:value="item.roleId"
					:key="item.roleId"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="save('ruleForm')">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import msgAdd from './add.js';
	export default msgAdd;
</script>